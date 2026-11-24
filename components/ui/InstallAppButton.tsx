'use client';

import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Check, X, ShieldCheck } from 'lucide-react';

export function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Check if app is already running as standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // Open modal with instructions for manual Android / iOS install
      setModalOpen(true);
    }
  };

  if (isInstalled) {
    return (
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
        <Check className="w-3.5 h-3.5 text-emerald-600" />
        <span>App Installed</span>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-brand-primary border border-orange-200 dark:border-orange-800/60 hover:bg-brand-primary hover:text-white transition-all text-xs font-extrabold shadow-xs cursor-pointer group"
        title="Install Android / Mobile App"
      >
        <Smartphone className="w-4 h-4 transition-transform group-hover:scale-110" />
        <span className="hidden xs:inline">Get App</span>
        <span className="xs:hidden">App</span>
      </button>

      {/* Install App Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-5">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center shadow-md">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Install ClipVault Mobile App
                </h3>
                <p className="text-xs text-slate-500">
                  Direct-to-Device WebAPK • 100% Free
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>📱 Android Phone (Chrome)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  1. वरती उजव्या कोपऱ्यातील तीन ठिपक्यांवर (<strong>⋮ Menu</strong>) टॅप करा.<br />
                  2. <strong>&quot;Install app&quot;</strong> किंवा <strong>&quot;Add to Home screen&quot;</strong> निवडा.<br />
                  3. तुमच्या फोनवर ClipVault चे अधिकृत ॲप आयकॉन लगेच तयार होईल!
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>🍏 iPhone / iPad (Safari)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  1. Safari मध्ये खालील <strong>Share</strong> बटनावर टॅप करा.<br />
                  2. खाली स्क्रोल करून <strong>&quot;Add to Home Screen&quot;</strong> दाबा.<br />
                  3. <strong>&quot;Add&quot;</strong> वर क्लिक करा.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>सुरक्षित: कोणतीही संशयास्पद थर्ड-पार्टी फाइल नाही, थेट अधिकृत Google WebAPK!</span>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="w-full py-3 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-orange-600 transition-colors shadow-md"
            >
              समजले (Got it)
            </button>
          </div>
        </div>
      )}
    </>
  );
}
