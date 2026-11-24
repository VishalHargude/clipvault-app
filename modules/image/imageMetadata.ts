import type { ImageMetadata } from './types';

export class ImageMetadataExtractor {
  static async extract(file: File): Promise<ImageMetadata> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;

      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        URL.revokeObjectURL(objectUrl);

        const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
        const d = gcd(width, height);

        resolve({
          fileName: file.name,
          fileSizeBytes: file.size,
          fileSizeFormatted: this.formatBytes(file.size),
          width,
          height,
          aspectRatio: `${width / d}:${height / d}`,
          mimeType: file.type || 'image/jpeg'
        });
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error(`Failed to load image '${file.name}'.`));
      };
    });
  }

  static formatBytes(bytes: number): string {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
  }
}
