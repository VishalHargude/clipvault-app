import sys
import json
import yt_dlp
import imageio_ffmpeg

def extract(url):
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'skip_download': True,
        'ffmpeg_location': ffmpeg_exe,
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
        }
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        formats = info.get('formats', [])
        
        # 1080p video URL or format ID
        v1080 = next((f['url'] for f in reversed(formats) if f.get('height') == 1080 or '1080' in str(f.get('resolution')) or f.get('format_id') == '137'), None)
        # 720p video URL or format ID
        v720 = next((f['url'] for f in reversed(formats) if f.get('height') == 720 or '720' in str(f.get('resolution')) or f.get('format_id') == '136' or f.get('format_id') == '22'), None)
        # Audio URL
        audio = next((f['url'] for f in reversed(formats) if f.get('acodec') != 'none' and f.get('vcodec') == 'none'), None)
        # Fallback best progressive
        best = next((f['url'] for f in reversed(formats) if f.get('url') and f.get('ext') == 'mp4'), None) or next((f['url'] for f in reversed(formats) if f.get('url')), None)

        duration = info.get('duration')
        mins = (duration // 60) if duration else 0
        secs = (duration % 60) if duration else 0
        dur_str = f"{mins}:{secs:02d}" if duration else ""

        channel_name = info.get('channel') or info.get('uploader') or info.get('uploader_id') or 'Media Creator'

        result = {
            'success': True,
            'title': info.get('title'),
            'channel': channel_name,
            'duration': duration,
            'durationStr': dur_str,
            'thumbnail': info.get('thumbnail'),
            'v1080': v1080 or best,
            'v720': v720 or best,
            'audio': audio,
            'id': info.get('id')
        }
        return result

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(json.dumps({'success': False, 'error': 'No URL provided'}))
        sys.exit(1)
    try:
        data = extract(sys.argv[1])
        print(json.dumps(data))
    except Exception as e:
        print(json.dumps({'success': False, 'error': str(e)}))
        sys.exit(0)
