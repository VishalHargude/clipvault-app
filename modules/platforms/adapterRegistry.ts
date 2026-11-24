import type { IPlatformAdapter, PlatformId, ValidationResult } from './types';
import { instagramAdapter } from './adapters/instagram.adapter';
import { youtubeAdapter } from './adapters/youtube.adapter';
import { tiktokAdapter } from './adapters/tiktok.adapter';
import { facebookAdapter } from './adapters/facebook.adapter';
import { xTwitterAdapter } from './adapters/x-twitter.adapter';
import { pinterestAdapter } from './adapters/pinterest.adapter';
import { redditAdapter } from './adapters/reddit.adapter';

export class PlatformAdapterRegistry {
  private adapters: Map<PlatformId, IPlatformAdapter> = new Map();

  constructor() {
    this.register(instagramAdapter);
    this.register(youtubeAdapter);
    this.register(tiktokAdapter);
    this.register(facebookAdapter);
    this.register(xTwitterAdapter);
    this.register(pinterestAdapter);
    this.register(redditAdapter);
  }

  register(adapter: IPlatformAdapter) {
    this.adapters.set(adapter.id, adapter);
  }

  get(id: PlatformId): IPlatformAdapter | undefined {
    return this.adapters.get(id);
  }

  getAll(): IPlatformAdapter[] {
    return Array.from(this.adapters.values());
  }

  findAdapterForUrl(url: string): { adapter?: IPlatformAdapter; validation: ValidationResult } {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.toLowerCase();

      for (const adapter of this.adapters.values()) {
        const matches = adapter.supportedDomains.some((d: string) => host === d || host.endsWith('.' + d));
        if (matches) {
          const validation = adapter.validateUrl(url);
          return { adapter, validation };
        }
      }

      return {
        validation: {
          isValid: false,
          errorMessage: 'URL does not belong to a supported platform adapter. If this is a direct media file, use the Direct URL Downloader.'
        }
      };
    } catch {
      return {
        validation: {
          isValid: false,
          errorMessage: 'Malformed URL provided.'
        }
      };
    }
  }
}

export const platformRegistry = new PlatformAdapterRegistry();
