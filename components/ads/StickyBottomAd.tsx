'use client';

import React, { useState } from 'react';
import { adsConfig } from '../../configuration/ads.config';
import { X, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

export function StickyBottomAd() {
  const [closed, setClosed] = useState(false);

  if (!adsConfig.globalEnabled || !adsConfig.slots.stickyBottom?.enabled || closed) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-2.5 px-3 sm:px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-all animate-in slide-in-from-bottom-2 duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Ad info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-brand-primary flex items-center justify-center font-bold flex-shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate flex items-center gap-1.5">
              <span>Unlimited High-Speed Media Downloader Pro</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-brand-primary text-white font-extrabold uppercase">
                Ad
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate hidden sm:flex items-center gap-2">
              <span>Save Reels, 4K YouTube Shorts & MP3 audio instantly to your device memory.</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Virus Free
              </span>
            </p>
          </div>
        </div>

        {/* Right: CTA & Close */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold transition-all flex items-center gap-1 shadow-sm whitespace-nowrap hover:scale-[1.02]"
          >
            <span>Install App Free</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setClosed(true)}
            aria-label="Close Advertisement"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Close ad"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
