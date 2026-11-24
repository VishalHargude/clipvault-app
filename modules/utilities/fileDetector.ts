/**
 * Magic Byte File Detection & Binary Signature Inspector
 * Accurate client-side format identification immune to deceptive file extensions.
 */

export interface DetectedFormat {
  extension: string;
  mimeType: string;
  category: 'video' | 'image' | 'audio' | 'document' | 'archive' | 'unknown';
  description: string;
}

export class FileDetector {
  static async detectFromBlob(blob: Blob): Promise<DetectedFormat> {
    const slice = blob.slice(0, 16);
    const buffer = await slice.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

    // PNG: 89 50 4E 47 0D 0A 1A 0A
    if (hex.startsWith('89504E470D0A1A0A')) {
      return { extension: 'png', mimeType: 'image/png', category: 'image', description: 'Portable Network Graphics' };
    }

    // JPEG: FF D8 FF
    if (hex.startsWith('FFD8FF')) {
      return { extension: 'jpg', mimeType: 'image/jpeg', category: 'image', description: 'JPEG Image' };
    }

    // WebP: 52 49 46 46 ... 57 45 42 50
    if (hex.startsWith('52494646') && hex.slice(16, 24) === '57454250') {
      return { extension: 'webp', mimeType: 'image/webp', category: 'image', description: 'WebP Image' };
    }

    // GIF: 47 49 46 38
    if (hex.startsWith('47494638')) {
      return { extension: 'gif', mimeType: 'image/gif', category: 'image', description: 'Graphics Interchange Format' };
    }

    // MP4 / MOV: ftyp box (bytes 4-8: 66 74 79 70)
    if (hex.slice(8, 16) === '66747970') {
      return { extension: 'mp4', mimeType: 'video/mp4', category: 'video', description: 'MPEG-4 Video' };
    }

    // WebM / Matroska: 1A 45 DF A3
    if (hex.startsWith('1A45DFA3')) {
      return { extension: 'webm', mimeType: 'video/webm', category: 'video', description: 'WebM / Matroska Video' };
    }

    // WAV: 52 49 46 46 ... 57 41 56 45
    if (hex.startsWith('52494646') && hex.slice(16, 24) === '57415645') {
      return { extension: 'wav', mimeType: 'audio/wav', category: 'audio', description: 'WAV Audio' };
    }

    // MP3 with ID3: 49 44 33
    if (hex.startsWith('494433') || hex.startsWith('FFF3') || hex.startsWith('FFFB')) {
      return { extension: 'mp3', mimeType: 'audio/mpeg', category: 'audio', description: 'MP3 Audio' };
    }

    // PDF: 25 50 44 46
    if (hex.startsWith('25504446')) {
      return { extension: 'pdf', mimeType: 'application/pdf', category: 'document', description: 'Adobe Portable Document' };
    }

    // ZIP: 50 4B 03 04
    if (hex.startsWith('504B0304')) {
      return { extension: 'zip', mimeType: 'application/zip', category: 'archive', description: 'ZIP Archive' };
    }

    return {
      extension: 'bin',
      mimeType: blob.type || 'application/octet-stream',
      category: 'unknown',
      description: 'Generic Binary Stream'
    };
  }

  static formatBytes(bytes: number): string {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
  }
}
