/**
 * SSRF (Server-Side Request Forgery) Protection Engine
 * Blocks internal networks, loopback addresses, AWS/GCP metadata endpoints, and private CIDR ranges.
 */

export class SSRFProtector {
  private static blockedHostnames = new Set([
    'localhost',
    'metadata.google.internal',
    'instance-data',
    'kubernetes.default.svc'
  ]);

  static isSafeRemoteUrl(targetUrl: string): { safe: boolean; reason?: string } {
    try {
      const parsed = new URL(targetUrl);

      // Only allow standard HTTP / HTTPS
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return { safe: false, reason: `Forbidden protocol: ${parsed.protocol}` };
      }

      // Prohibit credentials embedded in URL (e.g. https://user:pass@domain)
      if (parsed.username || parsed.password) {
        return { safe: false, reason: 'Embedded URL credentials are prohibited.' };
      }

      const hostname = parsed.hostname.toLowerCase();

      // Check explicit blocked hostnames
      if (this.blockedHostnames.has(hostname) || hostname.endsWith('.local') || hostname.endsWith('.internal')) {
        return { safe: false, reason: 'Access to internal hostname is prohibited.' };
      }

      // Check IPv4 private and loopback addresses
      if (this.isPrivateOrRestrictedIp(hostname)) {
        return { safe: false, reason: 'Target resolved to private or link-local address.' };
      }

      return { safe: true };
    } catch {
      return { safe: false, reason: 'Malformed URL.' };
    }
  }

  private static isPrivateOrRestrictedIp(ip: string): boolean {
    // Basic IPv4 check
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = ip.match(ipv4Regex);

    if (match) {
      const [, o1, o2, o3, o4] = match.map(Number);

      // 127.0.0.0/8 (Loopback)
      if (o1 === 127) return true;

      // 10.0.0.0/8 (Private)
      if (o1 === 10) return true;

      // 172.16.0.0/12 (Private)
      if (o1 === 172 && o2 >= 16 && o2 <= 31) return true;

      // 192.168.0.0/16 (Private)
      if (o1 === 192 && o2 === 168) return true;

      // 169.254.0.0/16 (Link-Local & Cloud Metadata e.g. 169.254.169.254)
      if (o1 === 169 && o2 === 254) return true;

      // 0.0.0.0/8 (Current network)
      if (o1 === 0) return true;

      // 224.0.0.0/4 (Multicast)
      if (o1 >= 224) return true;
    }

    // IPv6 Loopback & Link-local
    if (ip === '::1' || ip === '::' || ip.startsWith('fe80:') || ip.startsWith('fc00:') || ip.startsWith('fd00:')) {
      return true;
    }

    return false;
  }
}
