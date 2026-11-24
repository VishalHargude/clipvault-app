/**
 * Global Site Configuration & Navigation
 */

export interface NavItem {
  label: string;
  href: string;
  platformId?: string;
}

export interface SiteConfig {
  navItems: NavItem[];
  categories: {
    id: string;
    name: string;
    description: string;
    icon: string;
    href: string;
  }[];
}

export const siteConfig: SiteConfig = {
  navItems: [
    { label: "Instagram", href: "/download-video-instagram", platformId: "instagram" },
    { label: "Facebook", href: "/download-facebook-video", platformId: "facebook" },
    { label: "TikTok", href: "/download-tiktok-video", platformId: "tiktok" },
    { label: "YouTube", href: "/download-youtube-video", platformId: "youtube" },
    { label: "Pinterest", href: "/download-pinterest-video", platformId: "pinterest" },
    { label: "ShareChat", href: "/download-sharechat-video", platformId: "sharechat" },
    { label: "Moj", href: "/download-moj-video", platformId: "moj" },
    { label: "Snapchat", href: "/download-snapchat-video", platformId: "snapchat" },
    { label: "Telegram", href: "/download-telegram-video", platformId: "telegram" },
    { label: "Ok.ru", href: "/download-okru-video", platformId: "ok-ru" },
    { label: "Twitter / X", href: "/download-twitter-video", platformId: "x-twitter" },
    { label: "Reddit", href: "/download-reddit-video", platformId: "reddit" },
    { label: "Threads", href: "/download-video-instagram", platformId: "threads" },
  ],
  categories: [
    {
      id: "instagram-video",
      name: "Instagram Video Downloader",
      description: "Download public Instagram videos and Reels in original Full HD 1080p.",
      icon: "Instagram",
      href: "/download-video-instagram"
    },
    {
      id: "facebook-video",
      name: "Facebook Video Downloader",
      description: "Download public Facebook videos and Watch reels directly to device.",
      icon: "Facebook",
      href: "/download-facebook-video"
    },
    {
      id: "tiktok-video",
      name: "TikTok Video Downloader",
      description: "Download TikTok videos without watermark in HD quality.",
      icon: "TikTok",
      href: "/download-tiktok-video"
    },
    {
      id: "youtube-video",
      name: "YouTube Shorts & Video Downloader",
      description: "Extract YouTube videos and audio tracks with direct-to-device streaming.",
      icon: "YouTube",
      href: "/download-youtube-video"
    },
  ]
};
