import type { IPlatformAdapter, ValidationResult, PlatformComplianceDoc } from '../types';

export class RedditAdapter implements IPlatformAdapter {
  id = 'reddit' as const;
  displayName = 'Reddit';
  icon = 'MessageSquare';
  brandColor = '#FF4500';
  supportedDomains = ['reddit.com', 'www.reddit.com', 'redd.it', 'v.redd.it'];
  supportedOperations = ['INSPECT_METADATA'] as const;

  availabilityStatus = 'DISABLED_UNVERIFIED' as const;
  permissionStatus = 'RESTRICTED_BY_PLATFORM_TOS' as const;

  validateUrl(url: string): ValidationResult {
    try {
      const parsed = new URL(url);
      const isDomainMatch = this.supportedDomains.some(d => parsed.hostname === d || parsed.hostname.endsWith('.' + d));
      if (!isDomainMatch) return { isValid: false, errorMessage: 'Not a recognized Reddit domain.' };

      return { isValid: true, platformId: this.id, sanitizedUrl: url };
    } catch {
      return { isValid: false, errorMessage: 'Invalid Reddit URL.' };
    }
  }

  getComplianceDocumentation(): PlatformComplianceDoc {
    return {
      termsOfServiceUrl: 'https://www.redditinc.com/policies/user-agreement',
      developerPolicyUrl: 'https://www.reddit.com/wiki/api-terms',
      legalRationale: 'Reddit Developer Terms prohibit non-API scraping or redistribution of hosted videos.',
      corsBehavior: 'v.redd.it segments require authenticated sessions or official API access.',
      drmPolicy: 'Protected user content rights.'
    };
  }

  async executeOperation(): Promise<{ success: boolean; error?: string; details?: string }> {
    return {
      success: false,
      error: 'OPERATION_DISABLED_COMPLIANCE',
      details: 'Reddit downloads are disabled pending official Reddit Data API token authorization.'
    };
  }
}

export const redditAdapter = new RedditAdapter();
