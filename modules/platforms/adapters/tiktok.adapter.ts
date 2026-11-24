import type { IPlatformAdapter, ValidationResult, PlatformComplianceDoc } from '../types';

export class TikTokAdapter implements IPlatformAdapter {
  id = 'tiktok' as const;
  displayName = 'TikTok';
  icon = 'Video';
  brandColor = '#000000';
  supportedDomains = ['tiktok.com', 'www.tiktok.com', 'vm.tiktok.com', 'vt.tiktok.com'];
  supportedOperations = ['INSPECT_METADATA'] as const;

  availabilityStatus = 'DISABLED_UNVERIFIED' as const;
  permissionStatus = 'RESTRICTED_BY_PLATFORM_TOS' as const;

  validateUrl(url: string): ValidationResult {
    try {
      const parsed = new URL(url);
      const isDomainMatch = this.supportedDomains.some(d => parsed.hostname === d || parsed.hostname.endsWith('.' + d));
      if (!isDomainMatch) return { isValid: false, errorMessage: 'Not a recognized TikTok domain.' };

      return { isValid: true, platformId: this.id, sanitizedUrl: url };
    } catch {
      return { isValid: false, errorMessage: 'Invalid TikTok URL.' };
    }
  }

  getComplianceDocumentation(): PlatformComplianceDoc {
    return {
      termsOfServiceUrl: 'https://www.tiktok.com/legal/terms-of-service',
      developerPolicyUrl: 'https://developers.tiktok.com/doc/terms-of-service',
      legalRationale: 'TikTok terms prohibit unauthorized scraping and unauthenticated video retrieval. Watermark stripping without creator authorization violates copyright policies.',
      corsBehavior: 'TikTok CDN requires active session cookies and dynamic sign headers.',
      drmPolicy: 'Platform access controls protect creator media.'
    };
  }

  async executeOperation(): Promise<{ success: boolean; error?: string; details?: string }> {
    return {
      success: false,
      error: 'OPERATION_DISABLED_COMPLIANCE',
      details: 'TikTok direct downloading is disabled until an official authorized developer API agreement is established.'
    };
  }
}

export const tiktokAdapter = new TikTokAdapter();
