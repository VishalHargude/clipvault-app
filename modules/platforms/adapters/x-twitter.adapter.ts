import type { IPlatformAdapter, ValidationResult, PlatformComplianceDoc } from '../types';

export class XTwitterAdapter implements IPlatformAdapter {
  id = 'x-twitter' as const;
  displayName = 'X (Twitter)';
  icon = 'Twitter';
  brandColor = '#000000';
  supportedDomains = ['x.com', 'twitter.com', 'mobile.twitter.com'];
  supportedOperations = ['INSPECT_METADATA'] as const;

  availabilityStatus = 'DISABLED_UNVERIFIED' as const;
  permissionStatus = 'RESTRICTED_BY_PLATFORM_TOS' as const;

  validateUrl(url: string): ValidationResult {
    try {
      const parsed = new URL(url);
      const isDomainMatch = this.supportedDomains.some(d => parsed.hostname === d || parsed.hostname.endsWith('.' + d));
      if (!isDomainMatch) return { isValid: false, errorMessage: 'Not a recognized X/Twitter domain.' };

      return { isValid: true, platformId: this.id, sanitizedUrl: url };
    } catch {
      return { isValid: false, errorMessage: 'Invalid X/Twitter URL.' };
    }
  }

  getComplianceDocumentation(): PlatformComplianceDoc {
    return {
      termsOfServiceUrl: 'https://twitter.com/tos',
      developerPolicyUrl: 'https://developer.twitter.com/en/developer-terms/agreement-and-policy',
      legalRationale: 'X Terms of Service Section 4 restricts copying, modifying, and redistributing user tweets and attached media without Developer API agreement.',
      corsBehavior: 'Restricted CORS configuration for video manifests.',
      drmPolicy: 'Protected user privacy and media ownership boundaries.'
    };
  }

  async executeOperation(): Promise<{ success: boolean; error?: string; details?: string }> {
    return {
      success: false,
      error: 'OPERATION_DISABLED_COMPLIANCE',
      details: 'X (Twitter) downloads are disabled until X Developer API v2 integration is verified and approved.'
    };
  }
}

export const xTwitterAdapter = new XTwitterAdapter();
