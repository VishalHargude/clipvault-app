import type { IPlatformAdapter, ValidationResult, PlatformComplianceDoc } from '../types';

export class YouTubeAdapter implements IPlatformAdapter {
  id = 'youtube' as const;
  displayName = 'YouTube';
  icon = 'Youtube';
  brandColor = '#FF0000';
  supportedDomains = ['youtube.com', 'www.youtube.com', 'youtu.be', 'm.youtube.com'];
  supportedOperations = ['INSPECT_METADATA'] as const;

  availabilityStatus = 'DISABLED_UNVERIFIED' as const;
  permissionStatus = 'RESTRICTED_BY_PLATFORM_TOS' as const;

  validateUrl(url: string): ValidationResult {
    try {
      const parsed = new URL(url);
      const isDomainMatch = this.supportedDomains.some(d => parsed.hostname === d || parsed.hostname.endsWith('.' + d));
      if (!isDomainMatch) {
        return { isValid: false, errorMessage: 'URL is not a recognized YouTube domain.' };
      }

      let videoId = '';
      if (parsed.hostname.includes('youtu.be')) {
        videoId = parsed.pathname.slice(1);
      } else {
        videoId = parsed.searchParams.get('v') || '';
      }

      if (!videoId && !parsed.pathname.includes('/shorts/')) {
        return { isValid: false, errorMessage: 'YouTube URL does not specify a valid video or shorts identifier.' };
      }

      return {
        isValid: true,
        platformId: this.id,
        sanitizedUrl: url
      };
    } catch {
      return { isValid: false, errorMessage: 'Invalid YouTube URL.' };
    }
  }

  getComplianceDocumentation(): PlatformComplianceDoc {
    return {
      termsOfServiceUrl: 'https://www.youtube.com/t/terms',
      developerPolicyUrl: 'https://developers.google.com/youtube/terms/developer-policies',
      legalRationale: 'YouTube Terms of Service Section 5.B prohibits downloading any content unless a "download" or similar link is displayed by YouTube on the Service. Rule 9 & 11 strictly forbid circumventing this restriction.',
      corsBehavior: 'Google video playback servers enforce strict origin checks and encrypted signatures.',
      drmPolicy: 'Content protected by digital rights tokens and cipher signatures.'
    };
  }

  async executeOperation(): Promise<{ success: boolean; error?: string; details?: string }> {
    return {
      success: false,
      error: 'OPERATION_DISABLED_COMPLIANCE',
      details: 'YouTube direct downloads are not permitted by YouTube Terms of Service. In compliance with Rule 9 & 11, this platform will never advertise or execute unauthorized YouTube stream downloading.'
    };
  }
}

export const youtubeAdapter = new YouTubeAdapter();
