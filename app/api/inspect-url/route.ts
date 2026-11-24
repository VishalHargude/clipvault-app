import { NextRequest, NextResponse } from 'next/server';
import { SSRFProtector } from '../../../security/ssrfProtection';
import { RateLimiter } from '../../../security/rateLimiter';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  // Rate limiting (30 requests per minute per IP)
  const clientIp = req.headers.get('x-forwarded-for') || '127.0.0.1';
  const { allowed } = RateLimiter.check(clientIp, 30, 60000);
  if (!allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded. Try again in 60 seconds.' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const targetUrl = (body.url || '').trim();

    if (!targetUrl) {
      return NextResponse.json({ error: 'Missing target URL.' }, { status: 400 });
    }

    // SSRF Check (Blocks private CIDRs, loopbacks, AWS/GCP metadata)
    const ssrfCheck = SSRFProtector.isSafeRemoteUrl(targetUrl);
    if (!ssrfCheck.safe) {
      return NextResponse.json({ error: `Security check failed: ${ssrfCheck.reason}` }, { status: 403 });
    }

    // Execute HEAD request only (Zero binary proxying)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const headResp = await fetch(targetUrl, {
      method: 'HEAD',
      headers: { 'User-Agent': 'Kinetix-Media-Inspector/1.0' },
      signal: controller.signal
    });
    clearTimeout(timeout);

    const headers = headResp.headers;
    const contentType = headers.get('content-type') || 'unknown';
    const contentLength = headers.get('content-length');
    const acceptRanges = headers.get('accept-ranges') || 'none';
    const accessControl = headers.get('access-control-allow-origin') || 'None';

    const sizeMb = contentLength && !isNaN(+contentLength) ? +(+contentLength / (1024 * 1024)).toFixed(2) : null;
    const isCorsOpen = accessControl === '*' || accessControl.toLowerCase() === 'null' || Boolean(accessControl && accessControl !== 'None');

    return NextResponse.json({
      url: headResp.url,
      statusCode: headResp.status,
      contentType,
      contentLengthBytes: contentLength ? parseInt(contentLength, 10) : null,
      sizeMb,
      resumableRangesSupported: acceptRanges.toLowerCase() === 'bytes',
      directBrowserFetchCorsAllowed: isCorsOpen,
      recommendedDownloadMode: isCorsOpen ? 'Direct Browser Stream' : 'Direct Browser Anchor Navigation',
      drmDetected: contentType.toLowerCase().includes('drm') || targetUrl.toLowerCase().includes('widevine')
    });
  } catch (err: any) {
    return NextResponse.json({
      error: true,
      message: `Endpoint probe failed: ${err.message}`,
      recommendedDownloadMode: 'Direct Browser Anchor Navigation'
    });
  }
}
