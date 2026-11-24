'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from './Container';
import { ShieldCheck } from 'lucide-react';
import { useI18n } from '../../modules/i18n/LanguageContext';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto pt-14 pb-36 sm:pb-40">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
          {/* Col 1: Brand & Statement */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                Clip<span className="text-brand-primary">Vault</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              {t.footerStatement}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3.5 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% In-Browser Privacy • Zero Server Storage
            </div>
          </div>

          {/* Col 2: Social & Video Tools */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-primary mb-4">
              {t.footerSocialTitle}
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/download-video-instagram" className="hover:text-brand-primary transition-colors font-medium">Instagram Downloader</Link></li>
              <li><Link href="/download-facebook-video" className="hover:text-brand-primary transition-colors font-medium">Facebook Video</Link></li>
              <li><Link href="/download-tiktok-video" className="hover:text-brand-primary transition-colors font-medium">TikTok (No Watermark)</Link></li>
              <li><Link href="/download-youtube-video" className="hover:text-brand-primary transition-colors font-medium">YouTube Shorts & Video</Link></li>
              <li><Link href="/download-sharechat-video" className="hover:text-brand-primary transition-colors font-medium">ShareChat Video</Link></li>
              <li><Link href="/download-moj-video" className="hover:text-brand-primary transition-colors font-medium">Moj Video Downloader</Link></li>
              <li><Link href="/download-snapchat-video" className="hover:text-brand-primary transition-colors font-medium">Snapchat Spotlight</Link></li>
              <li><Link href="/download-telegram-video" className="hover:text-brand-primary transition-colors font-medium">Telegram Media</Link></li>
              <li><Link href="/download-okru-video" className="hover:text-brand-primary transition-colors font-medium">Ok.ru Video Downloader</Link></li>
            </ul>
          </div>

          {/* Col 3: Media Utilities & Legal */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-primary mb-4">
              {t.footerLegalTitle}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/tools/video" className="hover:text-brand-primary transition-colors font-medium">Video Compressor & Trimmer</Link></li>
              <li><Link href="/tools/image" className="hover:text-brand-primary transition-colors font-medium">Image Tools & Transcoder</Link></li>
              <li><Link href="/tools/audio" className="hover:text-brand-primary transition-colors font-medium">Audio Tools & WAV Ripper</Link></li>
              <li><Link href="/legal/terms" className="hover:text-brand-primary transition-colors font-medium">Terms of Service</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-brand-primary transition-colors font-medium">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>{t.copyrightText}</div>
          <div className="font-semibold text-slate-600 dark:text-slate-400">
            Crafted for Creators • 100% Free Forever
          </div>
        </div>
      </Container>
    </footer>
  );
}
