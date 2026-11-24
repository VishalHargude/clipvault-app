'use client';

import React, { useState } from 'react';
import { adsConfig, AdSlotConfig } from '../../configuration/ads.config';
import { ShieldCheck, Cloud, ExternalLink, X, Sparkles, Lock } from 'lucide-react';

interface SideSkyscraperAdProps {
  position: 'left' | 'right';
  className?: string;
}

export function SideSkyscraperAd({ position, className = '' }: SideSkyscraperAdProps) {
  const [closed, setClosed] = useState(false);

  if (!adsConfig.globalEnabled || closed) return null;

  const slotKey = position === 'left' ? 'leftSkyscraper' : 'rightSkyscraper';
  const slotConfig: AdSlotConfig = adsConfig.slots[slotKey];
  if (!slotConfig || !slotConfig.enabled) return null;

  // Real Google AdSense Skyscraper (Auto-adjusting 160x600 / 120x600)
  if (adsConfig.adsenseClientId && slotConfig.type === 'adsense' && slotConfig.adsenseSlot) {
    return (
      <div className={`w-[140px] xl:w-[160px] text-center overflow-hidden transition-all ${className}`}>
        <div className="flex items-center justify-between text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 mb-1 px-1 select-none">
          <span>Ad</span>
          <button onClick={() => setClosed(true)} className="hover:text-slate-600">×</button>
        </div>
        <div className="w-full overflow-hidden flex items-center justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'inline-block', width: '100%', minHeight: '500px', maxHeight: '600px' }}
            data-ad-client={adsConfig.adsenseClientId}
            data-ad-slot={slotConfig.adsenseSlot}
          />
        </div>
      </div>
    );
  }

  // Custom Ad Network Script or HTML (e.g. Adsterra, PropellerAds)
  if (slotConfig.type === 'custom' && slotConfig.customHtml) {
    return (
      <div className={`w-[140px] xl:w-[160px] text-center overflow-hidden transition-all ${className}`}>
        <div className="flex items-center justify-between text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 mb-1 px-1 select-none">
          <span>Sponsored</span>
          <button onClick={() => setClosed(true)} className="hover:text-slate-600">×</button>
        </div>
        <div className="w-full overflow-hidden" dangerouslySetInnerHTML={{ __html: slotConfig.customHtml }} />
      </div>
    );
  }

  // Realistic High-Converting Skyscraper Creative (Auto-adjusting height & width)
  const isLeft = position === 'left';

  return (
    <div className={`w-[140px] xl:w-[160px] select-none transition-all ${className}`}>
      {/* Top Header Label & Dismiss */}
      <div className="flex items-center justify-between px-1.5 mb-1.5 text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400">
        <span className="flex items-center gap-1">
          <span>Sponsored</span>
          <span className="text-[9px] text-slate-400">ⓘ</span>
        </span>
        <button
          onClick={() => setClosed(true)}
          aria-label="Close Advertisement"
          className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-0.5 rounded cursor-pointer"
          title="Dismiss ad"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Vertical Card (Auto-Adjusts smoothly) */}
      <div className="w-full min-h-[520px] max-h-[600px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all flex flex-col justify-between p-3 xl:p-3.5 text-center relative group">
        
        {/* Top Section */}
        <div className="space-y-2.5 pt-2">
          {/* Badge */}
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-brand-primary text-[10px] font-extrabold uppercase">
            <Sparkles className="w-3 h-3" />
            <span>{isLeft ? 'VPN Shield' : '100GB Cloud'}</span>
          </div>

          {/* Icon */}
          <div className="w-12 h-12 xl:w-14 xl:h-14 mx-auto rounded-2xl bg-gradient-to-tr from-brand-primary to-orange-400 text-white flex items-center justify-center shadow-md">
            {isLeft ? <Lock className="w-6 h-6 xl:w-7 xl:h-7" /> : <Cloud className="w-6 h-6 xl:w-7 xl:h-7" />}
          </div>

          {/* Headline */}
          <div>
            <h4 className="font-extrabold text-xs xl:text-sm text-slate-900 dark:text-white leading-tight">
              {isLeft ? 'Anonymous Downloads' : 'Cloud Media Backup'}
            </h4>
            <p className="text-[10px] xl:text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              {isLeft 
                ? 'Protect your IP address and download at 1Gbps unmetered speed.' 
                : 'Safely backup all your downloaded Reels, Shorts & MP3s.'}
            </p>
          </div>
        </div>

        {/* Middle Feature List */}
        <div className="space-y-1.5 xl:space-y-2 py-2 border-y border-slate-100 dark:border-slate-700/60 text-left">
          {isLeft ? (
            <>
              <div className="flex items-center gap-1 text-[10px] text-slate-600 dark:text-slate-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>Zero Log Policy</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-600 dark:text-slate-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>AES-256 Bit</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-600 dark:text-slate-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>100+ Locations</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1 text-[10px] text-slate-600 dark:text-slate-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>100GB Free Storage</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-600 dark:text-slate-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>Instant Auto-Sync</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-600 dark:text-slate-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>Works on All Devices</span>
              </div>
            </>
          )}
        </div>

        {/* Bottom CTA Button */}
        <div className="space-y-1 pb-1">
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 xl:py-2.5 px-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-extrabold shadow-md flex items-center justify-center gap-1 transition-all group-hover:scale-[1.02]"
          >
            <span>{isLeft ? 'Protect Now' : 'Claim Storage'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <div className="text-[9px] text-slate-400">
            Ad by Partner • 30-day Free
          </div>
        </div>

      </div>
    </div>
  );
}
