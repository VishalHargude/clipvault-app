'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, TranslationDictionary, getTranslation } from './languages';

interface LanguageContextType {
  currentLang: string;
  setLang: (lang: string) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLang: 'en',
  setLang: () => {},
  t: getTranslation('en'),
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLangState] = useState<string>('en');

  useEffect(() => {
    // Read persisted language on initial mount
    const saved = localStorage.getItem('saveclip_lang') || localStorage.getItem('bharattools_lang');
    if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
      setCurrentLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = (code: string) => {
    setCurrentLangState(code);
    localStorage.setItem('saveclip_lang', code);
    document.documentElement.lang = code;
    // Dispatch custom event for any non-React listeners
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: code } }));
  };

  const t = getTranslation(currentLang);

  return (
    <LanguageContext.Provider value={{ currentLang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useI18n must be used within a LanguageProvider');
  }
  return context;
}
