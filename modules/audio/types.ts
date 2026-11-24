/**
 * Audio Module Types
 */

export interface AudioMetadata {
  fileName: string;
  fileSizeBytes: number;
  durationSeconds: number;
  durationFormatted: string;
  sampleRateHz: number;
  numberOfChannels: number;
  channelLayout: 'Mono' | 'Stereo' | 'Multi-Channel';
}

export interface AudioExtractionOptions {
  sampleRate?: number;
  outputFormat?: 'wav';
}
