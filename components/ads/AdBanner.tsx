'use client';

import React from 'react';
import { adsConfig, AdSlotConfig } from '../../configuration/ads.config';
import { ExternalLink, Sparkles, Shield, Zap, HardDrive } from 'lucide-react';

interface AdBannerProps {
  slot: keyof typeof adsConfig.slots;
  className?: string;
}

export function AdBanner({ slot, className = '' }: AdBannerProps) {
  if (!adsConfig.globalEnabled) return null;

  const slotConfig: AdSlotConfig = adsConfig.slots[slot];
  if (!slotConfig || !slotConfig.enabled) return null;

  // Real Google AdSense (Auto-adjusts to ANY ad size: 728x90, 300x250, 320x50, 970x250, etc.)
  if (adsConfig.adsenseClientId && slotConfig.type === 'adsense' && slotConfig.adsenseSlot) {
    return (
      <div className={`w-full max-w-full text-center overflow-hidden my-3 sm:my-4 flex flex-col items-center justify-center transition-all ${className}`}>
        <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 mb-1 select-none">
          Advertisement • Sponsored
        </div>
        <div className="w-full max-w-full overflow-hidden flex items-center justify-center min-h-[50px] sm:min-h-[90px]">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center', maxWidth: '100%' }}
            data-ad-client={adsConfig.adsenseClientId}
            data-ad-slot={slotConfig.adsenseSlot}
            data-ad-format={slotConfig.format || 'auto'}
            data-full-width-responsive="true"
          />
        </div>
      </div>
    );
  }

  // Custom Ad Network Script or HTML (e.g. Adsterra, PropellerAds, Monetag)
  if (slotConfig.type === 'custom' && slotConfig.customHtml) {
    return (
      <div className={`w-full max-w-full text-center overflow-hidden my-3 sm:my-4 flex flex-col items-center justify-center transition-all ${className}`}>
        <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 mb-1 select-none">
          Sponsored
        </div>
        <div className="w-full max-w-full overflow-hidden flex items-center justify-center" dangerouslySetInnerHTML={{ __html: slotConfig.customHtml }} />
      </div>
    );
  }

  // Realistic Responsive High-CTR Sponsor Banner (Dynamically adjusts to screen & content size)
  const isLeaderboard = slot === 'topLeaderboard';
  const isAfterResult = slot === 'afterResult';

  return (
    <div className={`w-full max-w-full my-3 sm:my-4 select-none transition-all ${className}`}>
      {/* Label Strip */}
      <div className="flex items-center justify-between px-2 mb-1 text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400">
        <span className="flex items-center gap-1">
          <span>Advertisement • Sponsored</span>
        </span>
        <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer">
          AdChoices ⓘ
        </span>
      </div>

      {/* Responsive Auto-Adjusting Banner Box */}
      <div className="relative w-full max-w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          
          <div className="flex items-center gap-2.5 sm:gap-3.5 text-center sm:text-left min-w-0 w-full sm:w-auto">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-brand-primary border border-orange-200/60 dark:border-orange-800/40 flex items-center justify-center font-extrabold shadow-xs flex-shrink-0 mx-auto sm:mx-0">
              {isLeaderboard ? (
                <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : isAfterResult ? (
                <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <HardDrive className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="font-extrabold text-xs sm:text-sm md:text-base text-slate-900 dark:text-white tracking-tight flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 flex-wrap">
                <span>
                  {isLeaderboard 
                    ? 'Ultra-Fast 4K Cloud Media Downloader & Video Converter' 
                    : isAfterResult 
                    ? 'High-Speed 1Gbps Private VPN — Safe & Anonymous Downloads'
                    : '100GB Free Cloud Storage — Backup Downloaded Media Online'}
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-brand-primary text-white font-extrabold uppercase flex-shrink-0">
                  Ad
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 sm:line-clamp-none leading-relaxed">
                {isLeaderboard
                  ? 'Download unlimited social videos in original Full HD 1080p & 4K with no daily limits or buffering.'
                  : isAfterResult
                  ? 'Protect your IP address, prevent tracking & download videos with military-grade AES-256 encryption.'
                  : 'Never lose a video again. Automatic cloud backup for your downloaded Instagram Reels, YouTube videos & MP3s.'}
              </p>
            </div>
          </div>

          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap flex items-center justify-center gap-1.5 flex-shrink-0 hover:scale-[1.02]"
          >
            <span>{isLeaderboard ? 'Try Free' : isAfterResult ? 'Get Protection' : 'Claim 100GB'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

        </div>
      </div>
    </div>
  );
}
