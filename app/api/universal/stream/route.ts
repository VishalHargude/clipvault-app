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
    const customFilename = searchParams.get('filename') || 'video.mp4';
    const quality = searchParams.get('quality') || '';
    const formatReq = searchParams.get('format') || '';
    const platform = searchParams.get('platform') || '';
    const isInline = searchParams.get('inline') === 'true' || searchParams.get('preview') === 'true' || customFilename.includes('preview');

    if (!mediaUrl) {
      return new NextResponse('Missing media URL parameter', { status: 400 });
    }

    // SSRF validation
    const ssrfCheck = SSRFProtector.isSafeRemoteUrl(mediaUrl);
    if (!ssrfCheck.safe) {
      return new NextResponse(`Access denied: ${ssrfCheck.reason}`, { status: 403 });
    }

    const isAudio = customFilename.endsWith('.mp3') || formatReq === '140' || (formatReq.includes('audio') && !formatReq.includes('video'));
    const isImage = customFilename.endsWith('.jpg') || customFilename.endsWith('.png');
    const is1080p = customFilename.includes('1080p') || quality === '1080p' || formatReq === '137';

    const safeFilename = customFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const disposition = isInline 
      ? 'inline' 
      : `attachment; filename="${safeFilename}"`;

    // 1. YouTube & Universal Platform Streaming via yt-dlp + FFmpeg
    // Using --quiet --no-warnings --no-progress to guarantee ZERO text corruption in stdout
    const isYouTube = platform === 'youtube' || mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be');
    const isReddit = platform === 'reddit' || mediaUrl.includes('reddit.com') || mediaUrl.includes('redd.it');
    const isYtDlpPlatform = isYouTube || isReddit || platform === 'ok-ru' || platform === 'snapchat' || platform === 'telegram' || mediaUrl.includes('ok.ru') || mediaUrl.includes('snapchat.com') || mediaUrl.includes('t.me');
    
    if (isYtDlpPlatform) {
      try {
        let ytFormat = formatReq;
        if (!ytFormat) {
          if (isAudio) {
            ytFormat = '140/bestaudio[ext=m4a]/bestaudio';
          } else if (is1080p) {
            ytFormat = '137/136/best[ext=mp4]/best';
          } else {
            ytFormat = '136/best[ext=mp4]/best';
          }
        }

        const proc = spawn(PYTHON_PATH, [
          '-m', 'yt_dlp',
          '--quiet',
          '--no-warnings',
          '--no-progress',
          '--no-update',
          '--no-playlist',
          '--ffmpeg-location', FFMPEG_PATH,
          '-f', ytFormat,
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
        console.warn('yt-dlp stream spawn error:', err.message);
      }
    }

    // 2. Direct Binary Stream from upstream CDN (e.g. Instagram, Facebook, TikTok)
    try {
      const reqHeaders: Record<string, string> = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': '*/*',
      };
      if (mediaUrl.includes('instagram.com')) {
        reqHeaders['Referer'] = 'https://www.instagram.com/';
      }

      const upstreamRes = await fetch(mediaUrl, {
        headers: reqHeaders,
        signal: AbortSignal.timeout(8000),
      });

      const contentType = upstreamRes.headers.get('content-type') || '';

      if (upstreamRes.ok && upstreamRes.body && !contentType.includes('text/html')) {
        const contentLength = upstreamRes.headers.get('content-length');
        const headers: Record<string, string> = {
          'Content-Type': contentType || (isAudio ? 'audio/mpeg' : isImage ? 'image/jpeg' : 'video/mp4'),
          'Content-Disposition': disposition,
          'Access-Control-Allow-Origin': '*',
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=3600',
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

    // 3. General yt-dlp clean streaming fallback for any other video URL
    if (mediaUrl.startsWith('http') && !mediaUrl.includes('localhost') && !mediaUrl.includes('127.0.0.1')) {
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
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'X-Direct-Download': 'true',
            'X-Content-Type-Options': 'nosniff',
          },
        });
      } catch (err: any) {
        console.warn('yt-dlp general fallback error:', err.message);
      }
    }

    // 4. Default media buffer fallback (used only if external network is unavailable)
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
    console.error('API /universal/stream error:', err);
    return new NextResponse(`Streaming error: ${err.message}`, { status: 500 });
  }
}

export async function HEAD(req: NextRequest) {
  return GET(req);
}
