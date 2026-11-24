import { NextRequest, NextResponse } from 'next/server';
import { AdminAuth } from '../../../../admin/auth';
import { brandConfig } from '../../../../branding/brand.config';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || '';
  const token = authHeader.replace('Bearer ', '');
  const session = await AdminAuth.verifySessionToken(token);

  if (!session.isValid) {
    return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
  }

  return NextResponse.json({
    brand: brandConfig,
    serverUptimeSeconds: process.uptime(),
    nodeVersion: process.version,
    memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
  });
}
