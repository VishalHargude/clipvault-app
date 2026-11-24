'use client';

import React from 'react';
import { adsConfig, AdSlotConfig } from '../../configuration/ads.config';
import { AdsterraFrame } from './AdsterraFrame';
import { AdErrorBoundary } from './AdErrorBoundary';
import { Zap, Shield, HardDrive } from 'lucide-react';

interface AdBannerProps {
  slot: keyof typeof adsConfig.slots;
  className?: string;
}

export function AdBanner({ slot, className = '' }: AdBannerProps) {
  if (!adsConfig.globalEnabled) return null;

  const slotConfig: AdSlotConfig = adsConfig.slots[slot];
  if (!slotConfig || !slotConfig.enabled) return null;

  return (
    <AdErrorBoundary>
      <AdBannerInner slot={slot} slotConfig={slotConfig} className={className} />
    </AdErrorBoundary>
  );
}

function AdBannerInner({
  slot,
  slotConfig,
  className = '',
}: {
  slot: keyof typeof adsConfig.slots;
  slotConfig: AdSlotConfig;
  className?: string;
}) {
  // 1. Live Official Adsterra Integration
  if (slotConfig.type === 'adsterra' && adsConfig.adsterra?.enabled) {
    if (slot === 'topLeaderboard') {
      return (
        <div className={`w-full max-w-full text-center my-3 sm:my-4 flex flex-col items-center justify-center transition-all ${className}`}>
          <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 mb-1 select-none">
            Advertisement • Sponsored
          </div>
          {/* Desktop 728x90 */}
          <div className="hidden sm:flex justify-center w-full">
            <AdsterraFrame
              adKey={adsConfig.adsterra.banner728x90.key}
              scriptUrl={adsConfig.adsterra.banner728x90.scriptUrl}
              width={728}
              height={90}
            />
          </div>
          {/* Mobile 320x50 */}
          <div className="flex sm:hidden justify-center w-full">
            <AdsterraFrame
              adKey={adsConfig.adsterra.banner320x50.key}
              scriptUrl={adsConfig.adsterra.banner320x50.scriptUrl}
              width={320}
              height={50}
            />
          </div>
        </div>
      );
    }

    if (slot === 'afterResult' || slot === 'inFeed') {
      return (
        <div className={`w-full max-w-full text-center my-4 flex flex-col items-center justify-center transition-all ${className}`}>
          <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 mb-1 select-none">
            Sponsored Content
          </div>
          <AdsterraFrame
            adKey={adsConfig.adsterra.banner300x250.key}
            scriptUrl={adsConfig.adsterra.banner300x250.scriptUrl}
            width={300}
            height={250}
          />
        </div>
      );
    }
  }

  // 2. Real Google AdSense
  if (adsConfig.adsenseClientId && slotConfig.type === 'adsense') {
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
            {...(slotConfig.adsenseSlot ? { 'data-ad-slot': slotConfig.adsenseSlot } : {})}
            data-ad-format={slotConfig.format || 'auto'}
            data-full-width-responsive="true"
          />
        </div>
      </div>
    );
  }

  // 3. Custom Ad Network Script or HTML
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

  // 4. Clean Responsive Fallback Banner
  const isLeaderboard = slot === 'topLeaderboard';
  const isAfterResult = slot === 'afterResult';

  return (
    <div className={`w-full max-w-full my-3 sm:my-4 select-none transition-all ${className}`}>
      <div className="flex items-center justify-between px-2 mb-1 text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400">
        <span className="flex items-center gap-1">
          <span>Advertisement • Sponsored</span>
        </span>
      </div>

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
        </div>
      </div>
    </div>
  );
}
