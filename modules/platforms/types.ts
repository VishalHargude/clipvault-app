/**
 * Platform Adapter Architecture Types
 * Enforces strict legal compliance, zero unauthorized scraping, and anti-circumvention.
 */

export type PlatformId = 
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'youtube'
  | 'pinterest'
  | 'x-twitter'
  | 'reddit'
  | 'generic-direct';

export type PlatformAvailabilityStatus = 
  | 'DISABLED_UNVERIFIED'
  | 'DISABLED_NO_DIRECT_SUPPORT'
  | 'ENABLED_AUTHORIZED_API_ONLY'
  | 'ENABLED_PUBLIC_CREATOR_API';

export type PlatformPermissionStatus = 
  | 'RESTRICTED_BY_PLATFORM_TOS'
  | 'OAUTH_AUTHORIZATION_REQUIRED'
  | 'PUBLIC_METADATA_ONLY'
  | 'OPEN_DIRECT_CDN';

export type OperationType = 
  | 'INSPECT_METADATA'
  | 'CREATOR_OAUTH_EXPORT'
  | 'DIRECT_STREAM'
  | 'LINK_PREVIEW';

export interface ValidationResult {
  isValid: boolean;
  platformId?: PlatformId;
  sanitizedUrl?: string;
  errorMessage?: string;
}

export interface PlatformComplianceDoc {
  termsOfServiceUrl: string;
  developerPolicyUrl: string;
  legalRationale: string;
  corsBehavior: string;
  drmPolicy: string;
}

export interface IPlatformAdapter {
  id: PlatformId;
  displayName: string;
  icon: string;
  brandColor: string;
  supportedDomains: string[];
  supportedOperations: readonly OperationType[];
  availabilityStatus: PlatformAvailabilityStatus;
  permissionStatus: PlatformPermissionStatus;
  
  // Validation
  validateUrl(url: string): ValidationResult;

  // Compliance Documentation
  getComplianceDocumentation(): PlatformComplianceDoc;

  // Safe Execution Hook (Returns disabled state unless legally verified)
  executeOperation(operation: OperationType, targetUrl: string): Promise<{
    success: boolean;
    error?: string;
    details?: string;
  }>;
}
