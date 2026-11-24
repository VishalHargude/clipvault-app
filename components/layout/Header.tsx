'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '../../configuration/site.config';
import { Container } from './Container';
import { Menu, X, ChevronDown } from 'lucide-react';
import { LanguageSelector } from '../i18n/LanguageSelector';
import { InstallAppButton } from '../ui/InstallAppButton';
import { useI18n } from '../../modules/i18n/LanguageContext';
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

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPlatformLogo = (platformId?: string) => {
    switch (platformId) {
      case 'instagram': return InstagramLogo;
      case 'facebook': return FacebookLogo;
      case 'tiktok': return TikTokLogo;
      case 'youtube': return YouTubeLogo;
      case 'x-twitter': return TwitterXLogo;
      case 'pinterest': return PinterestLogo;
      case 'reddit': return RedditLogo;
      case 'threads': return ThreadsLogo;
      case 'sharechat': return ShareChatLogo;
      case 'moj': return MojLogo;
      case 'telegram': return TelegramLogo;
      case 'snapchat': return SnapchatLogo;
      case 'ok-ru': return OkRuLogo;
      default: return null;
    }
  };

  const getPlatformLabel = (platformId?: string, defaultLabel?: string) => {
    switch (platformId) {
      case 'instagram': return t.nav?.instagram || defaultLabel;
      case 'facebook': return t.nav?.facebook || defaultLabel;
      case 'tiktok': return t.nav?.tiktok || defaultLabel;
      case 'youtube': return t.nav?.youtube || defaultLabel;
      case 'x-twitter': return t.nav?.twitter || defaultLabel;
      case 'pinterest': return t.nav?.pinterest || defaultLabel;
      case 'reddit': return t.nav?.reddit || defaultLabel;
      case 'threads': return t.nav?.threads || defaultLabel;
      case 'sharechat': return 'ShareChat';
      case 'moj': return 'Moj';
      case 'telegram': return 'Telegram';
      case 'snapchat': return 'Snapchat';
      case 'ok-ru': return 'Ok.ru';
      default: return defaultLabel;
    }
  };

  // Primary visible items (responsive: 4 on lg, 6 on xl, 7 on 2xl)
  const coreItems = siteConfig.navItems.slice(0, 4); // Insta, FB, TikTok, YT
  const xlItems = siteConfig.navItems.slice(4, 6);   // Pinterest, ShareChat
  const xxlItems = siteConfig.navItems.slice(6, 7);  // Moj
  const dropdownItems = siteConfig.navItems.slice(4); // All others in dropdown

  const isMoreActive = dropdownItems.some(item => pathname === item.href);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-surface-border shadow-xs">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Brand Identity - Fresh Unique Name: ClipVault */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white">
              Clip<span className="text-brand-primary">Vault</span>
            </span>
          </Link>

          {/* Responsive Desktop Nav Links - Adapts cleanly to screen size */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2">
            {/* Always visible on lg+ */}
            {coreItems.map((item) => {
              const isActive = pathname === item.href;
              const Logo = getPlatformLogo(item.platformId);
              const label = getPlatformLabel(item.platformId, item.label);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs xl:text-sm font-bold transition-all flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg whitespace-nowrap ${
                    isActive
                      ? 'bg-orange-50 dark:bg-slate-800 text-brand-primary font-extrabold shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {Logo && <Logo className="w-4 h-4 flex-shrink-0" />}
                  <span>{label}</span>
                </Link>
              );
            })}

            {/* Extra visible on xl+ (Pinterest, ShareChat) */}
            {xlItems.map((item) => {
              const isActive = pathname === item.href;
              const Logo = getPlatformLogo(item.platformId);
              const label = getPlatformLabel(item.platformId, item.label);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hidden xl:flex text-xs xl:text-sm font-bold transition-all items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg whitespace-nowrap ${
                    isActive
                      ? 'bg-orange-50 dark:bg-slate-800 text-brand-primary font-extrabold shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {Logo && <Logo className="w-4 h-4 flex-shrink-0" />}
                  <span>{label}</span>
                </Link>
              );
            })}

            {/* Extra visible on 2xl+ (Moj) */}
            {xxlItems.map((item) => {
              const isActive = pathname === item.href;
              const Logo = getPlatformLogo(item.platformId);
              const label = getPlatformLabel(item.platformId, item.label);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hidden 2xl:flex text-xs xl:text-sm font-bold transition-all items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg whitespace-nowrap ${
                    isActive
                      ? 'bg-orange-50 dark:bg-slate-800 text-brand-primary font-extrabold shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {Logo && <Logo className="w-4 h-4 flex-shrink-0" />}
                  <span>{label}</span>
                </Link>
              );
            })}

            {/* "More Platforms ▾" Adaptive Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={`text-xs xl:text-sm font-bold transition-all flex items-center gap-1 px-2.5 xl:px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
                  isMoreActive
                    ? 'bg-orange-50 dark:bg-slate-800 text-brand-primary font-extrabold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 grid grid-cols-1 gap-1 animate-in fade-in slide-in-from-top-2">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    All Social Platforms
                  </div>
                  {dropdownItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Logo = getPlatformLogo(item.platformId);
                    const label = getPlatformLabel(item.platformId, item.label);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                          isActive
                            ? 'bg-orange-50 dark:bg-slate-800 text-brand-primary font-extrabold'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {Logo && <Logo className="w-4 h-4 flex-shrink-0" />}
                        <span>{label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action: Install App & Language Selector */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <InstallAppButton />
            <LanguageSelector />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg border border-surface-border text-slate-600"
              aria-label="Open Navigation Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Clean 2-Column Grid on Mobile/Tablet) */}
        {mobileOpen && (
          <div className="lg:hidden py-3 border-t border-surface-border grid grid-cols-2 gap-1.5 bg-white dark:bg-slate-900">
            {siteConfig.navItems.map((item) => {
              const Logo = getPlatformLogo(item.platformId);
              const label = getPlatformLabel(item.platformId, item.label);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-orange-50 hover:text-brand-primary transition-colors"
                >
                  {Logo && <Logo className="w-4 h-4 flex-shrink-0" />}
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </Container>
    </header>
  );
}
