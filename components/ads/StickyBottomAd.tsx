'use client';

import React, { useState } from 'react';
import { adsConfig } from '../../configuration/ads.config';
import { AdsterraFrame } from './AdsterraFrame';
import { AdErrorBoundary } from './AdErrorBoundary';
import { X } from 'lucide-react';

export function StickyBottomAd() {
  const [closed, setClosed] = useState(false);

  if (!adsConfig.globalEnabled || !adsConfig.slots.stickyBottom?.enabled || closed) {
    return null;
  }

  return (
    <AdErrorBoundary>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-1.5 px-2 sm:px-4 shadow-[0_-4px_25px_rgba(0,0,0,0.15)] transition-all animate-in slide-in-from-bottom-2 duration-300">
        <div className="relative max-w-6xl mx-auto flex flex-col items-center justify-center">
          {/* Top micro-bar: Sponsored label & Close button */}
          <div className="w-full flex items-center justify-between text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-1 px-1">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
              Advertisement • Sponsored
            </span>
            <button
              onClick={() => setClosed(true)}
              aria-label="Close Advertisement"
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
              title="Close Ad"
            >
              <span className="text-[10px] font-sans lowercase hidden sm:inline">close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Desktop 728x90 Live Adsterra Banner */}
          <div className="hidden sm:flex justify-center w-full min-h-[90px] items-center overflow-hidden">
            <AdsterraFrame
              adKey={adsConfig.adsterra.banner728x90.key}
              scriptUrl={adsConfig.adsterra.banner728x90.scriptUrl}
              width={728}
              height={90}
            />
          </div>

          {/* Mobile 320x50 Live Adsterra Banner */}
          <div className="flex sm:hidden justify-center w-full min-h-[50px] items-center overflow-hidden">
            <AdsterraFrame
              adKey={adsConfig.adsterra.banner320x50.key}
              scriptUrl={adsConfig.adsterra.banner320x50.scriptUrl}
              width={320}
              height={50}
            />
          </div>
        </div>
      </div>
    </AdErrorBoundary>
  );
}
