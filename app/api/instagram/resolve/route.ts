import { NextRequest, NextResponse } from 'next/server';
import { InstagramEngine } from '../../../../modules/platforms/instagramEngine';
import { SSRFProtector } from '../../../../security/ssrfProtection';
import { RateLimiter } from '../../../../security/rateLimiter';

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting by IP
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = RateLimiter.check(ip, 30, 60000); // 30 requests per minute
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment before downloading another video.' },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const body = await req.json();
    const rawUrl = body.url;

    if (!rawUrl || typeof rawUrl !== 'string') {
      return NextResponse.json(
        { error: 'A valid Instagram URL is required.' },
        { status: 400 }
      );
    }

    // 3. SSRF Check
    const ssrfCheck = SSRFProtector.isSafeRemoteUrl(rawUrl);
    if (!ssrfCheck.safe) {
      return NextResponse.json(
        { error: `Security check failed: ${ssrfCheck.reason}` },
        { status: 403 }
      );
    }

    // 4. Resolve Instagram media
    const result = await InstagramEngine.resolve(rawUrl);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to extract media from this Instagram link.' },
        { status: 422 }
      );
    }

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('API /instagram/resolve error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error while resolving media.' },
      { status: 500 }
    );
  }
}
