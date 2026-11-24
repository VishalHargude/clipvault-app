'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { 
  Download, 
  Loader2, 
  Clipboard, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Share2, 
  Copy, 
  Send, 
  Check, 
  Play, 
  Music, 
  Video, 
  ChevronDown
} from 'lucide-react';
import { 
  InstagramLogo, 
  FacebookLogo, 
  TikTokLogo, 
  YouTubeLogo, 
  TwitterXLogo, 
  PinterestLogo, 
  RedditLogo,
  ThreadsLogo,
  ShareChatLogo,
  MojLogo,
  TelegramLogo,
  SnapchatLogo,
  OkRuLogo
} from '../ui/PlatformLogos';
import { detectPlatform, SupportedPlatform } from '../../modules/platforms/platformDetector';
import { AdBanner } from '../ads/AdBanner';
import { StickyBottomAd } from '../ads/StickyBottomAd';
import { SideSkyscraperAd } from '../ads/SideSkyscraperAd';
import { useI18n } from '../../modules/i18n/LanguageContext';

export interface UniversalMediaOption {
  id: string;
  type: 'video' | 'audio' | 'image';
  label: string;
  quality: string;
  format: 'MP4' | 'MP3' | 'JPG' | 'M4A' | 'WEBP';
  downloadUrl: string;
  sizeEstimate?: string;
}

export interface UniversalResolveResult {
  success: boolean;
  platform: SupportedPlatform;
  platformName: string;
  mediaId: string;
  originalUrl: string;
  title: string;
  author: {
    username: string;
    fullName?: string;
    avatarUrl?: string;
  };
  thumbnailUrl: string;
  previewVideoUrl?: string;
  duration?: string;
  options: UniversalMediaOption[];
  error?: string;
}

interface SaveInstaUniversalSuiteProps {
  defaultPlatform?: SupportedPlatform;
  pageTitle?: string;
  pageSubtitle?: string;
}

export function SaveInstaUniversalSuite({
  defaultPlatform = 'instagram',
  pageTitle,
  pageSubtitle,
}: SaveInstaUniversalSuiteProps) {
  const { t, currentLang } = useI18n();
  const [activePlatform, setActivePlatform] = useState<SupportedPlatform>(defaultPlatform);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UniversalResolveResult | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Platform definitions with localized names & official brand logos
  const platforms = [
    { 
      id: 'instagram' as const, 
      name: t.nav?.instagram || 'Instagram', 
      logo: InstagramLogo, 
      placeholder: 'https://www.instagram.com/reel/...' 
    },
    { 
      id: 'facebook' as const, 
      name: t.nav?.facebook || 'Facebook', 
      logo: FacebookLogo, 
      placeholder: 'https://www.facebook.com/watch/...' 
    },
    { 
      id: 'youtube' as const, 
      name: t.nav?.youtube || 'YouTube', 
      logo: YouTubeLogo, 
      placeholder: 'https://youtu.be/... or https://www.youtube.com/watch?v=...' 
    },
    { 
      id: 'tiktok' as const, 
      name: t.nav?.tiktok || 'TikTok', 
      logo: TikTokLogo, 
      placeholder: 'https://www.tiktok.com/@.../video/...' 
    },
    { 
      id: 'pinterest' as const, 
      name: t.nav?.pinterest || 'Pinterest', 
      logo: PinterestLogo, 
      placeholder: 'https://pin.it/... or https://www.pinterest.com/pin/...' 
    },
    { 
      id: 'sharechat' as const, 
      name: 'ShareChat', 
      logo: ShareChatLogo, 
      placeholder: 'https://sharechat.com/post/... or https://sharechat.com/video/...' 
    },
    { 
      id: 'moj' as const, 
      name: 'Moj', 
      logo: MojLogo, 
      placeholder: 'https://mojapp.in/@.../video/...' 
    },
    { 
      id: 'snapchat' as const, 
      name: 'Snapchat', 
      logo: SnapchatLogo, 
      placeholder: 'https://www.snapchat.com/spotlight/... or story link...' 
    },
    { 
      id: 'telegram' as const, 
      name: 'Telegram', 
      logo: TelegramLogo, 
      placeholder: 'https://t.me/c/... or public channel post link...' 
    },
    { 
      id: 'ok-ru' as const, 
      name: 'Ok.ru', 
      logo: OkRuLogo, 
      placeholder: 'https://ok.ru/video/... or odnoklassniki link...' 
    },
    { 
      id: 'x-twitter' as const, 
      name: t.nav?.twitter || 'Twitter / X', 
      logo: TwitterXLogo, 
      placeholder: 'https://x.com/.../status/...' 
    },
    { 
      id: 'reddit' as const, 
      name: t.nav?.reddit || 'Reddit', 
      logo: RedditLogo, 
      placeholder: 'https://www.reddit.com/r/.../comments/...' 
    },
    { 
      id: 'threads' as const, 
      name: t.nav?.threads || 'Threads', 
      logo: ThreadsLogo, 
      placeholder: 'https://www.threads.net/@.../post/...' 
    },
  ];

  const currentPlatformInfo = platforms.find(p => p.id === activePlatform) || platforms[0];

  // Auto-detect platform when URL changes
  useEffect(() => {
    if (url.trim()) {
      const detected = detectPlatform(url.trim());
      if (detected !== 'generic' && detected !== activePlatform) {
        setActivePlatform(detected);
      }
    }
  }, [url, activePlatform]);

  // Handle clipboard paste
  const handlePaste = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text);
          setError(null);
          const detected = detectPlatform(text.trim());
          if (detected !== 'generic') {
            setActivePlatform(detected);
          }
        }
      } else {
        setError('Clipboard access not supported in this browser. Please paste manually (Ctrl+V).');
      }
    } catch {
      setError('Clipboard permission denied. Please paste manually into the input box.');
    }
  };

  // Submit and resolve media
  const handleResolve = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim()) {
      setError(currentLang === 'mr' ? 'कृपया एक वैध लिंक पेस्ट करा.' : 'Please paste a valid video or post link.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/universal/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      let data: any = null;
      const text = await res.text();
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          res.status >= 500
            ? 'Server or network gateway timeout. Please refresh and try again.'
            : (text && text.length < 150 ? text : 'Unexpected server response. Please verify the URL and try again.')
        );
      }

      if (!res.ok) {
        throw new Error(data?.error || 'Failed to extract media from this link.');
      }

      setResult(data);
      if (data.platform && data.platform !== activePlatform && data.platform !== 'generic') {
        setActivePlatform(data.platform);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while processing the link.');
    } finally {
      setLoading(false);
    }
  };

  // Direct-to-Device download trigger
  const triggerDownload = (downloadUrl: string, optionId: string, filename: string) => {
    setDownloadingId(optionId);
    setError(null);

    try {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err: any) {
      setError(err.message || 'Download failed. Please try again.');
    } finally {
      setTimeout(() => {
        setDownloadingId(null);
      }, 1500);
    }
  };

  // Share handlers
  const handleNativeShare = async () => {
    const shareUrl = result?.originalUrl || url || (typeof window !== 'undefined' ? window.location.href : '');
    const shareTitle = result?.title || 'Watch this video';
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `Download and watch: ${shareTitle}`,
          url: shareUrl,
        });
      } catch {
        // User dismissed
      }
    } else {
      handleCopyShareLink();
    }
  };

  const handleCopyShareLink = () => {
    const shareUrl = result?.originalUrl || url || (typeof window !== 'undefined' ? window.location.href : '');
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const openTelegramShare = () => {
    const shareUrl = result?.originalUrl || url;
    const text = result?.title || 'Watch video';
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="w-full flex justify-center items-start gap-4 lg:gap-6 xl:gap-8 pb-16">
      
      {/* Left Sticky Skyscraper Ad (Desktop >= 1280px) */}
      <aside className="hidden xl:block w-[160px] flex-shrink-0 sticky top-24 pt-2">
        <SideSkyscraperAd position="left" />
      </aside>

      {/* Main Center Downloader Column */}
      <div className="w-full max-w-4xl min-w-0 space-y-8 sm:space-y-10">
        
        {/* 1. Hero Header - Localized & Balanced */}
        <div className="text-center space-y-3 sm:space-y-4 px-2">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          {pageTitle || t.heroTitle}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          {pageSubtitle || t.heroSubtitle}
        </p>
      </div>

      {/* Top Leaderboard Ad Slot (728x90 Responsive) */}
      <AdBanner slot="topLeaderboard" />

      {/* 2. Platform Selector Tabs (SaveInsta Style with Official Logos) */}
      <div className="flex items-center justify-center w-full px-1">
        <div className="flex flex-wrap items-center justify-center p-1.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm max-w-full gap-1.5">
          {platforms.map((p) => {
            const Logo = p.logo;
            const isActive = activePlatform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setActivePlatform(p.id);
                  setError(null);
                }}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                }`}
              >
                <Logo className="w-4 h-4 flex-shrink-0" />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Universal Smart Input Bar */}
      <Card className="p-4 sm:p-5 shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <form onSubmit={handleResolve} className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-grow">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={currentPlatformInfo.placeholder || t.inputPlaceholder}
                className="w-full pl-4 pr-24 py-3.5 sm:py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all font-medium"
                required
              />

              {url && (
                <button
                  type="button"
                  onClick={() => {
                    setUrl('');
                    setResult(null);
                    setError(null);
                  }}
                  className="absolute right-14 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                  title="Clear"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={handlePaste}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-orange-50 hover:text-brand-primary transition-colors shadow-sm"
                title="Paste from clipboard"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>{t.pasteBtn}</span>
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              size="lg"
              className="py-3.5 sm:py-4 px-6 sm:px-8 font-extrabold text-sm sm:text-base bg-brand-primary hover:bg-brand-primary-hover text-white shadow-md shadow-orange-500/20 flex-shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> {t.fetchingBtn}
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" /> {t.downloadBtn}
                </>
              )}
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 px-1 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> {t.directToDeviceBadge}
            </span>
            <span className="text-slate-400">Original Full HD MP4 • 320kbps MP3 Audio</span>
          </div>
        </form>
      </Card>

      {/* 4. Error Notice */}
      {error && (
        <Alert variant="danger" title={currentLang === 'mr' ? 'डाउनलोड सूचना' : 'Download Notice'}>
          {error}
        </Alert>
      )}

      {/* 5. Master Result Card with REAL Video Player & Options */}
      {result && (
        <Card className="p-5 sm:p-6 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header: Platform Info & Share Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-brand-primary flex items-center justify-center font-bold">
                <Play className="w-5 h-5 fill-brand-primary" />
              </div>
              <div>
                <div className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
                  {result.platformName} Media
                  <span className="text-xs font-mono font-normal text-slate-400">[{result.mediaId}]</span>
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  ✓ {currentLang === 'mr' ? 'व्हेरिफाईड पब्लिक स्ट्रीम • डाऊनलोडसाठी तयार' : 'Verified Public Stream • Ready to Save'}
                </div>
              </div>
            </div>

            {/* Share Toolbar (Clean & Symmetrical) */}
            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
              <button
                onClick={handleNativeShare}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold transition-all shadow-sm"
                title="Share to any app"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{t.share?.share || 'Share'}</span>
              </button>

              <button
                onClick={openTelegramShare}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-all shadow-sm"
                title="Share on Telegram"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.share?.telegram || 'Telegram'}</span>
              </button>

              <button
                onClick={handleCopyShareLink}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold transition-all"
                title="Copy Link"
              >
                {copiedShare ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600">{t.share?.copied || 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.share?.copy || 'Copy'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Media Presentation & Action Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Visual Real HTML5 Video Player or YouTube Player */}
            <div className="space-y-3">
              <div className="w-full relative rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800 flex items-center justify-center min-h-[280px] sm:min-h-[340px] aspect-video">
                {result.platform === 'youtube' ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${result.mediaId}?autoplay=0&rel=0&enablejsapi=1`}
                    title={result.title}
                    className="absolute inset-0 w-full h-full border-0 rounded-2xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <video
                    key={result.previewVideoUrl || result.options[0]?.downloadUrl}
                    controls
                    playsInline
                    preload="metadata"
                    poster={result.thumbnailUrl || undefined}
                    src={result.previewVideoUrl || result.options[0]?.downloadUrl}
                    className="w-full h-full max-h-[380px] object-contain rounded-xl"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
                {result.duration && (
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-black/85 backdrop-blur-sm text-white text-xs font-mono font-bold rounded-lg pointer-events-none shadow-md z-10 flex items-center gap-1 border border-white/10">
                    <span>⏱ {result.duration}</span>
                  </div>
                )}
              </div>

              <div className="text-center space-y-1.5">
                <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white line-clamp-2">
                  {result.title}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-center justify-center flex-wrap gap-2 pt-0.5">
                  {result.author?.username && (
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 px-2.5 py-1 rounded-full shadow-xs">
                      <span>By {result.author.username}</span>
                      <svg className="w-3.5 h-3.5 text-blue-500 fill-current inline-block" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                  {result.duration && (
                    <span className="font-bold text-brand-primary bg-orange-50 dark:bg-orange-950/40 px-2.5 py-1 rounded-full border border-orange-200/60 dark:border-orange-800/40">
                      Duration: {result.duration}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Download Options */}
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t.formatSelectTitle}
                </div>
                <div className="text-xs text-slate-400">
                  {t.formatSelectSubtitle}
                </div>
              </div>

              <div className="space-y-2.5">
                {result.options.map((option) => {
                  const isDownloading = downloadingId === option.id;
                  const isAudio = option.type === 'audio';

                  return (
                    <div
                      key={option.id}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-primary/60 bg-slate-50 dark:bg-slate-900/50 transition-all gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isAudio ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-brand-primary'
                        }`}>
                          {isAudio ? <Music className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                        </div>
                        <div className="min-w-0">
                          <div className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                            {option.label}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                            <span className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                              {option.format}
                            </span>
                            <span>{option.quality}</span>
                            {option.sizeEstimate && (
                              <span className="text-emerald-600 font-semibold">{option.sizeEstimate}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => triggerDownload(
                          option.downloadUrl,
                          option.id,
                          `${result.platform}_${result.mediaId}_${option.quality.replace(/\s+/g, '_')}.${option.format.toLowerCase()}`
                        )}
                        disabled={isDownloading}
                        variant="primary"
                        size="sm"
                        className="font-bold text-xs bg-brand-primary hover:bg-brand-primary-hover text-white flex-shrink-0 shadow-sm"
                      >
                        {isDownloading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> {t.fetchingBtn || 'Saving...'}
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" /> {t.downloadBtn || 'Download'}
                          </>
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/40 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-orange-900 dark:text-orange-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t.resultDirectBadge}
                </div>
                <div>
                  {t.resultZeroServerNotice}
                </div>
              </div>
            </div>

          </div>
        </Card>
      )}

      {/* After-Result High-CTR Ad Slot */}
      {result && <AdBanner slot="afterResult" />}

      {/* 6. Step-by-Step Guide: How to Download */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            {t.howToTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.howToSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 sm:p-5 text-center space-y-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="w-8 h-8 rounded-full bg-brand-primary text-white font-extrabold flex items-center justify-center mx-auto text-sm shadow-md">
              1
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">{t.step1Title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.step1Desc}
            </p>
          </Card>

          <Card className="p-4 sm:p-5 text-center space-y-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="w-8 h-8 rounded-full bg-brand-primary text-white font-extrabold flex items-center justify-center mx-auto text-sm shadow-md">
              2
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">{t.step2Title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.step2Desc}
            </p>
          </Card>

          <Card className="p-4 sm:p-5 text-center space-y-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="w-8 h-8 rounded-full bg-brand-primary text-white font-extrabold flex items-center justify-center mx-auto text-sm shadow-md">
              3
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">{t.step3Title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.step3Desc}
            </p>
          </Card>
        </div>
      </div>

      {/* In-Feed Native Ad Slot */}
      <AdBanner slot="inFeed" />

      {/* 8. FAQ Accordion (100% Localized from Dictionary) */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            {t.faqTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.faqSubtitle}
          </p>
        </div>

        <div className="space-y-2.5 max-w-3xl mx-auto">
          {t.faqs && t.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-slate-900 dark:text-white hover:text-brand-primary transition-colors gap-3"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180 text-brand-primary' : 'text-slate-400'}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

        {/* Sticky Bottom Ad Banner */}
        <StickyBottomAd />

      </div>

      {/* Right Sticky Skyscraper Ad (Desktop >= 1280px) */}
      <aside className="hidden xl:block w-[160px] flex-shrink-0 sticky top-24 pt-2">
        <SideSkyscraperAd position="right" />
      </aside>

    </div>
  );
}
