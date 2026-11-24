import { NextRequest, NextResponse } from 'next/server';
import { UniversalEngine } from '../../../../modules/platforms/universalEngine';
import { SSRFProtector } from '../../../../security/ssrfProtection';
import { RateLimiter } from '../../../../security/rateLimiter';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = RateLimiter.check(ip, 60, 60000); // 60 requests per minute
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment before downloading another video.' },
        { status: 429 }
      );
    }

    // 2. Parse request
    const body = await req.json();
    const rawUrl = body.url;

    if (!rawUrl || typeof rawUrl !== 'string') {
      return NextResponse.json(
        { error: 'Please enter a valid video link from Instagram, Facebook, TikTok, YouTube, Twitter, Pinterest, or Reddit.' },
        { status: 400 }
      );
    }

    // 3. SSRF Protection
    const ssrfCheck = SSRFProtector.isSafeRemoteUrl(rawUrl);
    if (!ssrfCheck.safe) {
      return NextResponse.json(
        { error: `Access denied: ${ssrfCheck.reason}` },
        { status: 403 }
      );
    }

    // 4. Resolve multi-platform media
    const result = await UniversalEngine.resolve(rawUrl);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to extract media from this link.' },
        { status: 422 }
      );
    }

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('API /universal/resolve error:', err);
    return NextResponse.json(
      { error: err.message || 'Server error occurred while resolving link.' },
      { status: 500 }
    );
  }
}
