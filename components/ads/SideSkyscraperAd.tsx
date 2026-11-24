'use client';

import React, { useState } from 'react';
import { adsConfig, AdSlotConfig } from '../../configuration/ads.config';
import { AdsterraFrame } from './AdsterraFrame';
import { AdErrorBoundary } from './AdErrorBoundary';
import { X, ExternalLink } from 'lucide-react';

interface SideSkyscraperAdProps {
  position: 'left' | 'right';
  className?: string;
}

export function SideSkyscraperAd({ position, className = '' }: SideSkyscraperAdProps) {
  return (
    <AdErrorBoundary>
      <SideSkyscraperAdInner position={position} className={className} />
    </AdErrorBoundary>
  );
}

function SideSkyscraperAdInner({
  position,
  className = '',
}: {
  position: 'left' | 'right';
  className?: string;
}) {
  const [closed, setClosed] = useState(false);

  if (!adsConfig.globalEnabled || closed) return null;

  const slotKey = position === 'left' ? 'leftSkyscraper' : 'rightSkyscraper';
  const slotConfig: AdSlotConfig = adsConfig.slots[slotKey];
  if (!slotConfig || !slotConfig.enabled) return null;

  // 1. Live Official Adsterra Skyscraper
  if (slotConfig.type === 'adsterra' && adsConfig.adsterra?.enabled) {
    return (
      <div className={`w-[160px] text-center overflow-hidden transition-all ${className}`}>
        <div className="flex items-center justify-between text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 mb-1 px-1 select-none">
          <span>Sponsored</span>
          <button
            onClick={() => setClosed(true)}
            className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded cursor-pointer"
            title="Dismiss ad"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Adsterra 160x300 Unit */}
        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-1">
          <AdsterraFrame
            adKey={adsConfig.adsterra.skyscraper160x300.key}
            scriptUrl={adsConfig.adsterra.skyscraper160x300.scriptUrl}
            width={160}
            height={300}
          />

          {/* Adsterra Smartlink Monetization Button */}
          {adsConfig.adsterra.smartlinkUrl && (
            <a
              href={adsConfig.adsterra.smartlinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full py-1.5 px-2 rounded-lg bg-brand-primary text-white text-[11px] font-bold flex items-center justify-center gap-1 hover:bg-orange-600 transition-colors shadow-xs"
            >
              <span>Explore Deals</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    );
  }

  // 2. Real Google AdSense Skyscraper
  if (adsConfig.adsenseClientId && slotConfig.type === 'adsense') {
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
            {...(slotConfig.adsenseSlot ? { 'data-ad-slot': slotConfig.adsenseSlot } : {})}
          />
        </div>
      </div>
    );
  }

  return null;
}
