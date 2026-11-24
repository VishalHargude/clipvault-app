import type { IPlatformAdapter, ValidationResult, PlatformComplianceDoc } from '../types';

export class FacebookAdapter implements IPlatformAdapter {
  id = 'facebook' as const;
  displayName = 'Facebook';
  icon = 'Facebook';
  brandColor = '#1877F2';
  supportedDomains = ['facebook.com', 'www.facebook.com', 'fb.watch', 'web.facebook.com'];
  supportedOperations = ['INSPECT_METADATA'] as const;

  availabilityStatus = 'DISABLED_UNVERIFIED' as const;
  permissionStatus = 'RESTRICTED_BY_PLATFORM_TOS' as const;

  validateUrl(url: string): ValidationResult {
    try {
      const parsed = new URL(url);
      const isDomainMatch = this.supportedDomains.some(d => parsed.hostname === d || parsed.hostname.endsWith('.' + d));
      if (!isDomainMatch) return { isValid: false, errorMessage: 'Not a recognized Facebook domain.' };

      return { isValid: true, platformId: this.id, sanitizedUrl: url };
    } catch {
      return { isValid: false, errorMessage: 'Invalid Facebook URL.' };
    }
  }

  getComplianceDocumentation(): PlatformComplianceDoc {
    return {
      termsOfServiceUrl: 'https://www.facebook.com/terms.php',
      developerPolicyUrl: 'https://developers.facebook.com/terms',
      legalRationale: 'Meta Commercial Terms prohibit extracting media from the platform without authorization.',
      corsBehavior: 'CORS origins restricted to verified Facebook web domains.',
      drmPolicy: 'Protected digital rights and user privacy controls.'
    };
  }

  async executeOperation(): Promise<{ success: boolean; error?: string; details?: string }> {
    return {
      success: false,
      error: 'OPERATION_DISABLED_COMPLIANCE',
      details: 'Facebook downloads are disabled in strict adherence to Meta Terms of Service.'
    };
  }
}

export const facebookAdapter = new FacebookAdapter();
