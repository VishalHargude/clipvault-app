import type { VideoValidationResult } from './types';
import { VideoMetadataExtractor } from './videoMetadata';

export class VideoValidator {
  private static supportedMimes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-matroska'];

  static async validate(file: File, maxMb = 500): Promise<VideoValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!file) {
      return { isValid: false, errors: ['No file provided.'], warnings: [] };
    }

    // Check MIME type
    if (file.type && !this.supportedMimes.includes(file.type.toLowerCase())) {
      warnings.push(`File type '${file.type}' might require desktop browser codecs.`);
    }

    // Check size limit
    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > maxMb) {
      errors.push(`File size (${sizeMb.toFixed(1)} MB) exceeds the browser memory safety limit of ${maxMb} MB.`);
    }

    try {
      const metadata = await VideoMetadataExtractor.extract(file);

      if (metadata.durationSeconds <= 0) {
        errors.push('Video duration is zero or invalid.');
      }
      if (metadata.width === 0 || metadata.height === 0) {
        errors.push('Invalid video dimensions (0x0).');
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        metadata
      };
    } catch (e: any) {
      return {
        isValid: false,
        errors: [e.message || 'Failed to parse video file.'],
        warnings
      };
    }
  }
}
