import type { ImageCompressionOptions, ImageResizeOptions } from './types';

export class ImageProcessor {
  /**
   * Browser-Side Image Compression & Resizing using OffscreenCanvas or Canvas
   * Zero server upload, immediate garbage collection.
   */
  static async compress(file: File, options: ImageCompressionOptions): Promise<Blob> {
    const { quality = 0.8, maxWidth = 1920, maxHeight = 1080, outputFormat = 'image/webp' } = options;

    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);

        let { naturalWidth: w, naturalHeight: h } = img;

        // Calculate scaled dimensions
        if (w > maxWidth || h > maxHeight) {
          const ratio = Math.min(maxWidth / w, maxHeight / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return reject(new Error('Canvas 2D context unavailable in current browser.'));
        }

        ctx.drawImage(img, 0, 0, w, h);

        canvas.toBlob(
          (blob) => {
            // Nullify canvas context
            canvas.width = 0;
            canvas.height = 0;

            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Image blob encoding failed.'));
            }
          },
          outputFormat,
          quality
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Could not load image into canvas.'));
      };
    });
  }

  static async resize(file: File, options: ImageResizeOptions): Promise<Blob> {
    const { targetWidth, targetHeight, maintainAspectRatio, outputFormat = 'image/jpeg', quality = 0.9 } = options;

    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);

        let finalW = targetWidth;
        let finalH = targetHeight;

        if (maintainAspectRatio) {
          const aspect = img.naturalWidth / img.naturalHeight;
          if (finalW / finalH > aspect) {
            finalW = Math.round(finalH * aspect);
          } else {
            finalH = Math.round(finalW / aspect);
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = finalW;
        canvas.height = finalH;
        const ctx = canvas.getContext('2d');

        if (!ctx) return reject(new Error('Canvas 2D context error.'));

        ctx.drawImage(img, 0, 0, finalW, finalH);

        canvas.toBlob(
          (blob) => {
            canvas.width = 0;
            canvas.height = 0;
            if (blob) resolve(blob);
            else reject(new Error('Failed to create resized image blob.'));
          },
          outputFormat,
          quality
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Failed to load image for resizing.'));
      };
    });
  }
}
