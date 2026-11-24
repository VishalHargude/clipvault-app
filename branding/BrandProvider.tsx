'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { brandConfig, BrandConfig } from './brand.config';

interface BrandContextType {
  brand: BrandConfig;
  updateBrand: (newConfig: Partial<BrandConfig>) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const BrandContext = createContext<BrandContextType>({
  brand: brandConfig,
  updateBrand: () => {},
  isDark: true,
  toggleTheme: () => {},
});

export const useBrand = () => useContext(BrandContext);

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brand, setBrand] = useState<BrandConfig>(brandConfig);
  const [isDark, setIsDark] = useState<boolean>(brandConfig.theme.defaultMode === 'dark');

  // Apply CSS custom properties dynamically based on brand.config.ts
  useEffect(() => {
    const root = document.documentElement;
    const themeTokens = isDark ? brand.theme.dark : brand.theme.light;

    // Brand Palette
    root.style.setProperty('--brand-primary', brand.colors.primary);
    root.style.setProperty('--brand-primary-hover', brand.colors.primaryHover);
    root.style.setProperty('--brand-secondary', brand.colors.secondary);
    root.style.setProperty('--brand-secondary-hover', brand.colors.secondaryHover);
    root.style.setProperty('--brand-accent', brand.colors.accent);
    root.style.setProperty('--brand-radius', brand.borderRadius);

    // Surface Tokens
    root.style.setProperty('--surface-bg', themeTokens.bgMain);
    root.style.setProperty('--surface-card', themeTokens.bgCard);
    root.style.setProperty('--surface-card-hover', themeTokens.bgCardHover);
    root.style.setProperty('--surface-border', themeTokens.borderColor);
    root.style.setProperty('--content-main', themeTokens.textMain);
    root.style.setProperty('--content-muted', themeTokens.textMuted);

    // Toggle class for Tailwind dark mode
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [brand, isDark]);

  const updateBrand = (newConfig: Partial<BrandConfig>) => {
    setBrand((prev) => ({ ...prev, ...newConfig }));
  };

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <BrandContext.Provider value={{ brand, updateBrand, isDark, toggleTheme }}>
      {children}
    </BrandContext.Provider>
  );
}
