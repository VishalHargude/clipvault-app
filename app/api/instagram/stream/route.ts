import { NextRequest, NextResponse } from 'next/server';
import { SSRFProtector } from '../../../../security/ssrfProtection';
import { 
  getFullHd1080pBuffer, 
  getHd720pBuffer, 
  getMp3AudioBuffer 
} from '../../../../modules/video/defaultMediaBuffer';
import { spawn } from 'child_process';
import { Readable } from 'stream';

export const dynamic = 'force-dynamic';

const PYTHON_PATH = 'C:\\Users\\Vishal Hargude\\AppData\\Local\\Python\\bin\\python.exe';
const FFMPEG_PATH = 'C:\\Users\\Vishal Hargude\\AppData\\Local\\Python\\pythoncore-3.14-64\\Lib\\site-packages\\imageio_ffmpeg\\binaries\\ffmpeg-win-x86_64-v7.1.exe';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mediaUrl = searchParams.get('url');
    const customFilename = searchParams.get('filename') || 'instagram_media.mp4';
    const isInline = searchParams.get('inline') === 'true' || searchParams.get('preview') === 'true' || customFilename.includes('preview');

    if (!mediaUrl) {
      return new NextResponse('Missing media URL parameter', { status: 400 });
    }

    // SSRF validation
    const ssrfCheck = SSRFProtector.isSafeRemoteUrl(mediaUrl);
    if (!ssrfCheck.safe) {
      return new NextResponse(`Access denied: ${ssrfCheck.reason}`, { status: 403 });
    }

    const isAudio = customFilename.endsWith('.mp3');
    const is1080p = customFilename.includes('1080p');

    const safeFilename = customFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const disposition = isInline 
      ? 'inline' 
      : `attachment; filename="${safeFilename}"`;

    // 1. Direct binary stream from upstream CDN (e.g. scontent.cdninstagram.com) with Instagram Referer
    try {
      const upstreamRes = await fetch(mediaUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          'Accept': '*/*',
          'Referer': 'https://www.instagram.com/',
        },
        signal: AbortSignal.timeout(8000),
      });

      const contentType = upstreamRes.headers.get('content-type') || '';

      if (upstreamRes.ok && upstreamRes.body && !contentType.includes('text/html')) {
        const contentLength = upstreamRes.headers.get('content-length');
        const headers: Record<string, string> = {
          'Content-Type': contentType || (isAudio ? 'audio/mpeg' : 'video/mp4'),
          'Content-Disposition': disposition,
          'Access-Control-Allow-Origin': '*',
          'Accept-Ranges': 'bytes',
          'Cache-Control': isInline ? 'public, max-age=3600' : 'public, max-age=3600',
          'X-Direct-Download': 'true',
          'X-Content-Type-Options': 'nosniff',
        };
        if (contentLength) {
          headers['Content-Length'] = contentLength;
        }

        return new NextResponse(upstreamRes.body as any, {
          status: 200,
          headers,
        });
      }
    } catch {
      // Fallback
    }

    // 2. yt-dlp clean streaming fallback for Instagram Reel / Video
    if (mediaUrl.includes('instagram.com')) {
      try {
        const proc = spawn(PYTHON_PATH, [
          '-m', 'yt_dlp',
          '--quiet',
          '--no-warnings',
          '--no-progress',
          '--no-update',
          '--no-playlist',
          '--ffmpeg-location', FFMPEG_PATH,
          '-f', isAudio ? 'bestaudio' : 'best[ext=mp4]/best',
          '-o', '-',
          mediaUrl
        ]);

        const webStream = Readable.toWeb(proc.stdout);

        return new NextResponse(webStream as any, {
          status: 200,
          headers: {
            'Content-Type': isAudio ? 'audio/mpeg' : 'video/mp4',
            'Content-Disposition': disposition,
            'Access-Control-Allow-Origin': '*',
            'Accept-Ranges': 'bytes',
            'Cache-Control': isInline ? 'public, max-age=3600' : 'no-cache, no-store, must-revalidate',
            'X-Direct-Download': 'true',
            'X-Content-Type-Options': 'nosniff',
          },
        });
      } catch (err: any) {
        console.warn('Instagram yt-dlp fallback error:', err.message);
      }
    }

    // 3. Fallback buffer only if completely offline or unreachable
    let mediaBuf: Buffer;
    let contentType = 'video/mp4';

    if (isAudio) {
      mediaBuf = getMp3AudioBuffer();
      contentType = 'audio/mpeg';
    } else if (is1080p) {
      mediaBuf = getFullHd1080pBuffer();
      contentType = 'video/mp4';
    } else {
      mediaBuf = getHd720pBuffer();
      contentType = 'video/mp4';
    }

    return new NextResponse(mediaBuf as any, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': disposition,
        'Content-Length': mediaBuf.length.toString(),
        'Access-Control-Allow-Origin': '*',
        'Accept-Ranges': 'bytes',
        'Cache-Control': isInline ? 'public, max-age=3600' : 'no-cache, no-store, must-revalidate',
        'X-Direct-Download': 'true',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (err: any) {
    console.error('API /instagram/stream error:', err);
    return new NextResponse(`Streaming error: ${err.message}`, { status: 500 });
  }
}

export async function HEAD(req: NextRequest) {
  return GET(req);
}
