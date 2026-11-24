/**
 * Image Processing Module Types
 */

export interface ImageMetadata {
  fileName: string;
  fileSizeBytes: number;
  fileSizeFormatted: string;
  width: number;
  height: number;
  aspectRatio: string;
  mimeType: string;
}

export interface ImageCompressionOptions {
  quality: number; // 0.1 to 1.0
  maxWidth?: number;
  maxHeight?: number;
  outputFormat?: 'image/jpeg' | 'image/webp' | 'image/png';
}

export interface ImageResizeOptions {
  targetWidth: number;
  targetHeight: number;
  maintainAspectRatio: boolean;
  outputFormat?: 'image/jpeg' | 'image/webp' | 'image/png';
  quality?: number;
}
