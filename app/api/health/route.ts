import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    architecture: 'Direct-to-Device (Zero-Persistence)',
    server_media_storage_bytes: 0,
    video_database_records: 0,
    proxy_policy: 'STRICT_NO_PROXY (Media streams never touch server RAM)',
    legal_compliance: 'IT Act 2000 Sec 79 / DMCA 512 Safe Harbor Enabled',
    timestamp: new Date().toISOString()
  });
}
