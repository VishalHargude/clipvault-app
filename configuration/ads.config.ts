/**
 * ClipVault Advertisement & Monetization Configuration
 * Integrates official Google AdSense and official Adsterra network units.
 */

export interface AdSlotConfig {
  enabled: boolean;
  type: 'adsterra' | 'adsense' | 'custom' | 'placeholder';
  adsenseSlot?: string;
  customHtml?: string;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical' | 'sticky';
}

export interface AdsConfig {
  globalEnabled: boolean;
  adsenseClientId: string; // "ca-pub-9124179274908260"
  adsterra: {
    enabled: boolean;
    socialBarUrl: string;
    popunderUrl: string;
    smartlinkUrl: string;
    nativeBannerScript: string;
    nativeBannerContainerId: string;
    banner728x90: {
      key: string;
      scriptUrl: string;
    };
    skyscraper160x300: {
      key: string;
      scriptUrl: string;
    };
    banner300x250: {
      key: string;
      scriptUrl: string;
    };
    banner320x50: {
      key: string;
      scriptUrl: string;
    };
  };
  slots: {
    topLeaderboard: AdSlotConfig;  // 728x90 desktop / 320x50 mobile above input
    inFeed: AdSlotConfig;          // Native Banner / 300x250
    afterResult: AdSlotConfig;     // 300x250 high-converting banner below download options
    stickyBottom: AdSlotConfig;    // 320x50 mobile sticky banner
    leftSkyscraper: AdSlotConfig;  // 160x300 Desktop Left Gutter Banner
    rightSkyscraper: AdSlotConfig; // 160x300 Desktop Right Gutter Banner
  };
}

export const adsConfig: AdsConfig = {
  globalEnabled: true,
  adsenseClientId: 'ca-pub-9124179274908260', // Verified Google AdSense Account ID
  adsterra: {
    enabled: true,
    socialBarUrl: 'https://afders.org/1/2a33d69ca35b673aebc99a22b35bf48a',
    popunderUrl: 'https://bicea.org/14/f4dcb094a142d6f948ca688283a79fb5',
    smartlinkUrl: 'https://arwf.org/4/0ccefc8fc3e4993a632bf25ccdfe4c2e',
    nativeBannerScript: 'https://bicea.org/21/740f72bdb6fb0655c44ba0b6b5aeeacd',
    nativeBannerContainerId: 'container-740f72bdb6fb0655c44ba0b6b5aeeacd',
    banner728x90: {
      key: '343aaca7408edb1b90e00bbeb7b8d027',
      scriptUrl: 'https://bicea.org/22/343aaca7408edb1b90e00bbeb7b8d027',
    },
    skyscraper160x300: {
      key: 'c6c74c8628de27b9811f24d273fa99e4',
      scriptUrl: 'https://bicea.org/22/c6c74c8628de27b9811f24d273fa99e4',
    },
    banner300x250: {
      key: '741d521175cbff3068ca7761c0de496d',
      scriptUrl: 'https://bicea.org/22/741d521175cbff3068ca7761c0de496d',
    },
    banner320x50: {
      key: '52f09c0863b0372b8c752007bb3fd36d',
      scriptUrl: 'https://bicea.org/22/52f09c0863b0372b8c752007bb3fd36d',
    },
  },
  slots: {
    topLeaderboard: {
      enabled: true,
      type: 'adsterra',
      format: 'horizontal',
    },
    inFeed: {
      enabled: true,
      type: 'adsterra',
      format: 'auto',
    },
    afterResult: {
      enabled: true,
      type: 'adsterra',
      format: 'auto',
    },
    stickyBottom: {
      enabled: true,
      type: 'adsterra',
      format: 'sticky',
    },
    leftSkyscraper: {
      enabled: true,
      type: 'adsterra',
      format: 'vertical',
    },
    rightSkyscraper: {
      enabled: true,
      type: 'adsterra',
      format: 'vertical',
    },
  },
};
