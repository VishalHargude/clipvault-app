import type { VideoMetadata, VideoOrientation, VideoResolutionTier } from './types';

export class VideoMetadataExtractor {
  /**
   * Client-side metadata extraction using an ephemeral HTML5 Video element.
   * Never uploads file; revokes ObjectURL automatically.
   */
  static async extract(file: File): Promise<VideoMetadata> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      const objectUrl = URL.createObjectURL(file);
      video.src = objectUrl;

      const cleanup = () => {
        URL.revokeObjectURL(objectUrl);
        video.src = '';
        video.load();
      };

      video.onloadedmetadata = () => {
        const width = video.videoWidth;
        const height = video.videoHeight;
        const duration = video.duration || 0;

        const orientation = this.determineOrientation(width, height);
        const { ratioStr, ratioDecimal } = this.calculateAspectRatio(width, height);
        const resolutionTier = this.classifyResolution(width, height);

        const metadata: VideoMetadata = {
          fileName: file.name,
          fileSizeBytes: file.size,
          fileSizeFormatted: this.formatBytes(file.size),
          mimeType: file.type || 'video/mp4',
          durationSeconds: duration,
          durationFormatted: this.formatDuration(duration),
          width,
          height,
          aspectRatio: ratioStr,
          aspectRatioDecimal: ratioDecimal,
          orientation,
          resolutionTier
        };

        cleanup();
        resolve(metadata);
      };

      video.onerror = () => {
        cleanup();
        reject(new Error(`Failed to decode video metadata for ${file.name}. Format may be unsupported by your browser.`));
      };
    });
  }

  static determineOrientation(w: number, h: number): VideoOrientation {
    if (w > h) return 'landscape';
    if (h > w) return 'portrait';
    return 'square';
  }

  static calculateAspectRatio(w: number, h: number): { ratioStr: string; ratioDecimal: number } {
    if (!w || !h) return { ratioStr: 'Unknown', ratioDecimal: 0 };
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(w, h);
    const rw = w / divisor;
    const rh = h / divisor;
    return {
      ratioStr: `${rw}:${rh}`,
      ratioDecimal: +(w / h).toFixed(2)
    };
  }

  static classifyResolution(w: number, h: number): VideoResolutionTier {
    const maxDim = Math.max(w, h);
    if (maxDim >= 3800) return '4K';
    if (maxDim >= 2500) return '2K';
    if (maxDim >= 1900) return 'Full HD';
    if (maxDim >= 1200) return 'HD';
    if (maxDim > 0) return 'SD';
    return 'Unknown';
  }

  static formatBytes(bytes: number): string {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
  }

  static formatDuration(sec: number): string {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
}
