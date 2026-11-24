/**
 * In-Memory Sliding-Window Rate Limiter
 * Protects lightweight serverless endpoints from flood or abuse.
 */

interface RateLimitRecord {
  timestamps: number[];
}

export class RateLimiter {
  private static store = new Map<string, RateLimitRecord>();

  static check(key: string, limit = 30, windowMs = 60000): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const record = this.store.get(key) || { timestamps: [] };

    // Evict timestamps outside the window
    record.timestamps = record.timestamps.filter(ts => now - ts < windowMs);

    if (record.timestamps.length >= limit) {
      return { allowed: false, remaining: 0 };
    }

    record.timestamps.push(now);
    this.store.set(key, record);

    return {
      allowed: true,
      remaining: limit - record.timestamps.length
    };
  }

  static clean() {
    const now = Date.now();
    for (const [key, record] of this.store.entries()) {
      record.timestamps = record.timestamps.filter((ts: number) => now - ts < 60000);
      if (record.timestamps.length === 0) {
        this.store.delete(key);
      }
    }
  }
}
