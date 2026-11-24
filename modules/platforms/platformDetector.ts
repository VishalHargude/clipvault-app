export type SupportedPlatform = 
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'youtube'
  | 'x-twitter'
  | 'pinterest'
  | 'reddit'
  | 'threads'
  | 'sharechat'
  | 'moj'
  | 'telegram'
  | 'snapchat'
  | 'ok-ru'
  | 'generic';

export function detectPlatform(rawUrl: string): SupportedPlatform {
  try {
    const url = new URL(rawUrl.trim());
    const host = url.hostname.toLowerCase();

    if (host.includes('instagram.com')) return 'instagram';
    if (host.includes('facebook.com') || host.includes('fb.watch') || host.includes('fb.com')) return 'facebook';
    if (host.includes('tiktok.com')) return 'tiktok';
    if (host.includes('youtube.com') || host.includes('youtu.be')) return 'youtube';
    if (host.includes('twitter.com') || host.includes('x.com')) return 'x-twitter';
    if (host.includes('pinterest.com') || host.includes('pin.it')) return 'pinterest';
    if (host.includes('reddit.com') || host.includes('redd.it')) return 'reddit';
    if (host.includes('threads.net')) return 'threads';
    if (host.includes('sharechat.com') || host.includes('sharechat.co.in')) return 'sharechat';
    if (host.includes('mojapp.in') || host.includes('moj.app')) return 'moj';
    if (host.includes('t.me') || host.includes('telegram.me') || host.includes('telegram.org')) return 'telegram';
    if (host.includes('snapchat.com')) return 'snapchat';
    if (host.includes('ok.ru') || host.includes('odnoklassniki.ru')) return 'ok-ru';

    return 'generic';
  } catch {
    return 'generic';
  }
}

export function getPlatformName(platform: SupportedPlatform): string {
  switch (platform) {
    case 'instagram': return 'Instagram';
    case 'facebook': return 'Facebook';
    case 'tiktok': return 'TikTok';
    case 'youtube': return 'YouTube';
    case 'x-twitter': return 'Twitter / X';
    case 'pinterest': return 'Pinterest';
    case 'reddit': return 'Reddit';
    case 'threads': return 'Threads';
    case 'sharechat': return 'ShareChat';
    case 'moj': return 'Moj';
    case 'telegram': return 'Telegram';
    case 'snapchat': return 'Snapchat';
    case 'ok-ru': return 'Ok.ru';
    default: return 'Online Video';
  }
}
