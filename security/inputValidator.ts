/**
 * Strict Input Validation and URL Sanitizer
 */

export class InputValidator {
  static sanitizeUrl(input: string): string {
    return input.trim().replace(/[\x00-\x1F\x7F]/g, '');
  }

  static isValidHttpUrl(input: string): boolean {
    if (!input || typeof input !== 'string') return false;
    const clean = this.sanitizeUrl(input);

    try {
      const url = new URL(clean);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  static sanitizeFilename(filename: string): string {
    return filename
      .trim()
      .replace(/[/\\?%*:|"<>]/g, '_')
      .replace(/\s+/g, '_')
      .slice(0, 100);
  }
}
