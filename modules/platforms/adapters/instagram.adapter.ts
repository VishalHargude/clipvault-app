import type { IPlatformAdapter, ValidationResult, PlatformComplianceDoc } from '../types';

export class InstagramAdapter implements IPlatformAdapter {
  id = 'instagram' as const;
  displayName = 'Instagram';
  icon = 'Instagram';
  brandColor = '#E4405F';
  supportedDomains = ['instagram.com', 'www.instagram.com', 'instagr.am'];
  supportedOperations = ['INSPECT_METADATA'] as const;
  
  // Strictly disabled until legal authorization and verified API are established
  availabilityStatus = 'DISABLED_UNVERIFIED' as const;
  permissionStatus = 'RESTRICTED_BY_PLATFORM_TOS' as const;

  validateUrl(url: string): ValidationResult {
    try {
      const parsed = new URL(url);
      const isDomainMatch = this.supportedDomains.some(d => parsed.hostname === d || parsed.hostname.endsWith('.' + d));
      if (!isDomainMatch) {
        return { isValid: false, errorMessage: 'URL is not a recognized Instagram endpoint.' };
      }

      const isPostOrReel = /\/(p|reel|tv)\/([A-Za-z0-9_-]+)/.test(parsed.pathname);
      if (!isPostOrReel) {
        return { isValid: false, errorMessage: 'Instagram URL must point to a specific post or reel.' };
      }

      return {
        isValid: true,
        platformId: this.id,
        sanitizedUrl: `https://www.instagram.com${parsed.pathname}`
      };
    } catch {
      return { isValid: false, errorMessage: 'Malformed URL provided.' };
    }
  }

  getComplianceDocumentation(): PlatformComplianceDoc {
    return {
      termsOfServiceUrl: 'https://help.instagram.com/581066165581870',
      developerPolicyUrl: 'https://developers.facebook.com/terms',
      legalRationale: 'Instagram Terms of Use strictly prohibit unauthorized scraping, crawling, or downloading of third-party media. Direct download remains disabled to respect Rule 9 & 11.',
      corsBehavior: 'Instagram media CDNs enforce restrictive CORS headers preventing unauthorized browser-side Fetch.',
      drmPolicy: 'Protected digital rights and user account privacy rules apply.'
    };
  }

  async executeOperation(): Promise<{ success: boolean; error?: string; details?: string }> {
    return {
      success: false,
      error: 'OPERATION_DISABLED_COMPLIANCE',
      details: 'Direct downloading from Instagram is disabled in accordance with Meta Platform Terms of Service and Architecture Rule 9 & 11. Third-party media cannot be extracted without official Graph API credentials.'
    };
  }
}

export const instagramAdapter = new InstagramAdapter();
