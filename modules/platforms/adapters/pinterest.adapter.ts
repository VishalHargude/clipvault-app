import type { IPlatformAdapter, ValidationResult, PlatformComplianceDoc } from '../types';

export class PinterestAdapter implements IPlatformAdapter {
  id = 'pinterest' as const;
  displayName = 'Pinterest';
  icon = 'Pin';
  brandColor = '#BD081C';
  supportedDomains = ['pinterest.com', 'www.pinterest.com', 'pin.it'];
  supportedOperations = ['INSPECT_METADATA'] as const;

  availabilityStatus = 'DISABLED_UNVERIFIED' as const;
  permissionStatus = 'RESTRICTED_BY_PLATFORM_TOS' as const;

  validateUrl(url: string): ValidationResult {
    try {
      const parsed = new URL(url);
      const isDomainMatch = this.supportedDomains.some(d => parsed.hostname === d || parsed.hostname.endsWith('.' + d));
      if (!isDomainMatch) return { isValid: false, errorMessage: 'Not a recognized Pinterest domain.' };

      return { isValid: true, platformId: this.id, sanitizedUrl: url };
    } catch {
      return { isValid: false, errorMessage: 'Invalid Pinterest URL.' };
    }
  }

  getComplianceDocumentation(): PlatformComplianceDoc {
    return {
      termsOfServiceUrl: 'https://policy.pinterest.com/en/terms-of-service',
      developerPolicyUrl: 'https://developers.pinterest.com/terms/',
      legalRationale: 'Pinterest Terms prohibit unauthorized mass harvesting or scraping of pins.',
      corsBehavior: 'Pinterest media endpoints block non-whitelisted browser origins.',
      drmPolicy: 'Content copyright ownership applies.'
    };
  }

  async executeOperation(): Promise<{ success: boolean; error?: string; details?: string }> {
    return {
      success: false,
      error: 'OPERATION_DISABLED_COMPLIANCE',
      details: 'Pinterest media downloading is disabled until official API clearance.'
    };
  }
}

export const pinterestAdapter = new PinterestAdapter();
