/**
 * Zero-Persistence Privacy Manager (Rule 1, 6, 7)
 * Guarantees that in-browser Object URLs and memory buffers are purged post-processing.
 */

export class ZeroPersistenceManager {
  private static activeUrls = new Set<string>();

  /**
   * Registers an ObjectURL for monitored ephemeral lifecycle
   */
  static trackUrl(url: string): string {
    this.activeUrls.add(url);
    return url;
  }

  /**
   * Immediately revokes an ObjectURL and removes from tracking
   */
  static revoke(url: string) {
    if (!url) return;
    try {
      URL.revokeObjectURL(url);
      this.activeUrls.delete(url);
    } catch {
      // Ignored
    }
  }

  /**
   * Schedule automatic revocation with a safety delay to allow browser download initiation
   */
  static scheduleRevoke(url: string, delayMs = 2000) {
    setTimeout(() => {
      this.revoke(url);
    }, delayMs);
  }

  /**
   * Emergency purge of all active tracked Object URLs
   */
  static purgeAll() {
    this.activeUrls.forEach((url) => {
      this.revoke(url);
    });
    this.activeUrls.clear();
  }

  /**
   * Explicitly zeros out a Uint8Array before releasing reference
   */
  static wipeBuffer(buffer: Uint8Array) {
    buffer.fill(0);
  }
}
