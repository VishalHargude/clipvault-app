import { NextRequest, NextResponse } from 'next/server';
import { AdminAuth } from '../../../../admin/auth';
import { RateLimiter } from '../../../../security/rateLimiter';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const clientIp = req.headers.get('x-forwarded-for') || '127.0.0.1';
  const { allowed } = RateLimiter.check(`admin_login_${clientIp}`, 5, 60000); // 5 attempts per min
  if (!allowed) {
    return NextResponse.json({ error: 'Too many login attempts. Please wait 1 minute.' }, { status: 429 });
  }

  try {
    const { password } = await req.json();
    const isValid = await AdminAuth.verifyCredentials(password);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid administrator credentials.' }, { status: 401 });
    }

    const token = await AdminAuth.createSessionToken('admin');
    return NextResponse.json({ success: true, token });
  } catch (err: any) {
    return NextResponse.json({ error: 'Authentication processing error.' }, { status: 500 });
  }
}
