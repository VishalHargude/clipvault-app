'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SUPPORTED_LANGUAGES } from '../../modules/i18n/languages';
import { useI18n } from '../../modules/i18n/LanguageContext';
import { Globe, Search, ChevronDown, Check } from 'lucide-react';

export function LanguageSelector() {
  const { currentLang, setLang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectLang = (code: string) => {
    setLang(code);
    setIsOpen(false);
    setSearchQuery('');
  };

  const currentOption = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  const filteredLanguages = SUPPORTED_LANGUAGES.filter((l) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      l.name.toLowerCase().includes(q) ||
      l.nativeName.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q)
    );
  });

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Header Button with 🌐 Globe Icon */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-brand-primary hover:text-brand-primary transition-all text-xs font-bold shadow-xs cursor-pointer"
      >
        <Globe className="w-4 h-4 text-brand-primary flex-shrink-0" />
        <span className="hidden sm:inline font-medium">{currentOption.nativeName}</span>
        <span className="sm:hidden font-mono uppercase">{currentOption.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Searchable Dropdown Modal / Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Search Bar inside Language Menu */}
          <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search language (e.g. Marathi, Hindi, English)..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary font-medium"
                autoFocus
              />
            </div>
          </div>

          {/* Languages Scroll List */}
          <div className="max-h-64 overflow-y-auto p-1.5 divide-y divide-slate-100 dark:divide-slate-800/40">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => {
                const isSelected = lang.code === currentLang;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelectLang(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-orange-50 dark:bg-slate-800 text-brand-primary font-extrabold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base leading-none">{lang.flag}</span>
                      <div className="text-left">
                        <div className="font-bold text-slate-900 dark:text-white leading-tight">
                          {lang.nativeName}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {lang.name}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-brand-primary" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                No matching language found.
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
