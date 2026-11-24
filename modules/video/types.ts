/**
 * Video Processing Types & Data Contracts
 */

export type VideoOrientation = 'landscape' | 'portrait' | 'square';

export type VideoResolutionTier = 'SD' | 'HD' | 'Full HD' | '2K' | '4K' | 'Unknown';

export interface VideoMetadata {
  fileName: string;
  fileSizeBytes: number;
  fileSizeFormatted: string;
  mimeType: string;
  durationSeconds: number;
  durationFormatted: string;
  width: number;
  height: number;
  aspectRatio: string;
  aspectRatioDecimal: number;
  orientation: VideoOrientation;
  resolutionTier: VideoResolutionTier;
}

export interface VideoValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  metadata?: VideoMetadata;
}
