/**
 * ClipVault Advertisement & Monetization Configuration
 * Compatible with Google AdSense, Adsterra, PropellerAds, Monetag, and custom ad networks.
 */

export interface AdSlotConfig {
  enabled: boolean;
  type: 'adsense' | 'custom' | 'placeholder';
  adsenseSlot?: string;
  customHtml?: string;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical' | 'sticky';
}

export interface AdsConfig {
  globalEnabled: boolean;
  adsenseClientId: string; // e.g. "ca-pub-XXXXXXXXXXXXXXXX"
  slots: {
    topLeaderboard: AdSlotConfig;  // 728x90 desktop / 320x50 mobile above input
    inFeed: AdSlotConfig;          // Responsive native banner between form & how-to
    afterResult: AdSlotConfig;     // High-CTR banner right below media download options
    stickyBottom: AdSlotConfig;    // Sticky footer banner with close button
    leftSkyscraper: AdSlotConfig;  // 160x600 Desktop Left Gutter Banner
    rightSkyscraper: AdSlotConfig; // 160x600 Desktop Right Gutter Banner
  };
}

export const adsConfig: AdsConfig = {
  globalEnabled: true,
  adsenseClientId: 'ca-pub-9124179274908260', // Verified Google AdSense Account ID
  slots: {
    topLeaderboard: {
      enabled: true,
      type: 'placeholder',
      format: 'horizontal',
    },
    inFeed: {
      enabled: true,
      type: 'placeholder',
      format: 'auto',
    },
    afterResult: {
      enabled: true,
      type: 'placeholder',
      format: 'auto',
    },
    stickyBottom: {
      enabled: true,
      type: 'placeholder',
      format: 'sticky',
    },
    leftSkyscraper: {
      enabled: true,
      type: 'placeholder',
      format: 'vertical',
    },
    rightSkyscraper: {
      enabled: true,
      type: 'placeholder',
      format: 'vertical',
    },
  },
};
