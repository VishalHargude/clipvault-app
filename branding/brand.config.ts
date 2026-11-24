/**
 * CENTRALIZED BRANDING CONFIGURATION - BHARAT TOOLS FORMAL THEME
 * 
 * Configured with exact ClipVault PDF Suite formal theme:
 * - Font: 'Josefin Sans', sans-serif
 * - Primary: #FF8500 (Bharat Saffron / Orange)
 * - Background: #f8fafc (Clean formal light)
 * - Card: #ffffff
 * - Text: #0f172a / #64748b
 */

export interface BrandConfig {
  websiteName: string;
  shortName: string;
  tagline: string;
  description: string;
  domain: string;
  supportEmail: string;

  logo: {
    text: string;
    badgeIcon: string;
    imageUrl?: string;
    alt: string;
  };
  faviconUrl: string;

  colors: {
    primary: string;         // #FF8500 ClipVault Orange
    primaryHover: string;    // #e07500
    secondary: string;       // #0f172a Deep Slate
    secondaryHover: string;
    accent: string;          // #16a34a Emerald
    success: string;
    warning: string;
    danger: string;
  };

  theme: {
    defaultMode: 'dark' | 'light' | 'system';
    dark: {
      bgMain: string;
      bgCard: string;
      bgCardHover: string;
      borderColor: string;
      textMain: string;
      textMuted: string;
    };
    light: {
      bgMain: string;
      bgCard: string;
      bgCardHover: string;
      borderColor: string;
      textMain: string;
      textMuted: string;
    };
  };

  typography: {
    primaryFont: string;
    headingFont: string;
    monoFont: string;
  };

  borderRadius: string;

  footer: {
    copyrightText: string;
    builtWithText: string;
    statement: string;
    links: {
      label: string;
      href: string;
    }[];
  };
}

export const brandConfig: BrandConfig = {
  websiteName: "ClipVault - Universal Media & Video Downloader",
  shortName: "ClipVault",
  tagline: "Free Online Instagram, YouTube, Reels & Video Downloader",
  description: "Download public Instagram Videos, Reels, Stories, YouTube, TikTok & Social media videos online in Full HD with original audio. 100% Free, Private in-browser, Zero server storage.",
  domain: "clipvault.vercel.app",
  supportEmail: "support@clipvault.vercel.app",

  logo: {
    text: "ClipVault",
    badgeIcon: "Zap",
    alt: "ClipVault Media Downloader"
  },
  faviconUrl: "/favicon.ico",

  colors: {
    primary: "#FF8500",        // Signature Orange
    primaryHover: "#e07500",   // Darker orange hover
    secondary: "#0f172a",      // Slate 900 Deep Navy
    secondaryHover: "#1e293b", // Slate 800
    accent: "#16a34a",         // Emerald green for privacy/safe badges
    success: "#16a34a",
    warning: "#f59e0b",
    danger: "#ef4444",
  },

  theme: {
    defaultMode: "light",      // Formal Clean Light Theme
    dark: {
      bgMain: "#0f172a",
      bgCard: "#1e293b",
      bgCardHover: "#334155",
      borderColor: "#334155",
      textMain: "#f8fafc",
      textMuted: "#94a3b8",
    },
    light: {
      bgMain: "#f8fafc",       // Formal light background
      bgCard: "#ffffff",       // Pure white card
      bgCardHover: "#fffaf5",  // Gentle orange tint on hover
      borderColor: "#e2e8f0",   // Subtle clean border
      textMain: "#0f172a",     // Deep dark text
      textMuted: "#64748b",    // Professional muted slate
    }
  },

  typography: {
    primaryFont: "'Josefin Sans', sans-serif",
    headingFont: "'Josefin Sans', sans-serif",
    monoFont: "monospace",
  },

  borderRadius: "12px",

  footer: {
    copyrightText: "© 2026 ClipVault. 100% Free & Private Online Utilities.",
    builtWithText: "Direct-to-Device Zero-Storage Architecture",
    statement: "ClipVault operates with complete privacy. Files stream directly to your device without being stored on our servers.",
    links: [
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "DMCA / Copyright", href: "/legal/dmca" },
      { label: "Compliance", href: "/legal/compliance" },
      { label: "Admin Portal", href: "/admin/login" },
    ]
  }
};
