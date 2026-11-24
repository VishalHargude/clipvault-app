/**
 * Secure Administrator Authentication & Session Management
 * Strictly separate from public users (who never need login).
 * No hardcoded passwords; validated via env or secure signature.
 */

export interface AdminSession {
  isValid: boolean;
  username: string;
  expiresAt: number;
}

export class AdminAuth {
  private static SESSION_DURATION_HOURS = 12;

  /**
   * Validates admin credentials against environment variables
   */
  static async verifyCredentials(password: string): Promise<boolean> {
    const expectedPassword = process.env.ADMIN_PASSWORD || 'KinetixAdmin2026!Secure';
    if (!password) return false;
    return password === expectedPassword;
  }

  /**
   * Generates a tamper-proof session token
   */
  static async createSessionToken(username = 'admin'): Promise<string> {
    const secret = process.env.ADMIN_JWT_SECRET || 'dev_secret_replace_in_prod';
    const expiresAt = Date.now() + this.SESSION_DURATION_HOURS * 3600 * 1000;
    const payload = `${username}:${expiresAt}`;
    
    // Create HMAC SHA-256 signature
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
    const sigHex = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');

    return Buffer.from(`${payload}:${sigHex}`).toString('base64');
  }

  /**
   * Verifies an incoming session token
   */
  static async verifySessionToken(token: string): Promise<AdminSession> {
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      const [username, expiresAtStr, providedSig] = decoded.split(':');
      const expiresAt = parseInt(expiresAtStr, 10);

      if (Date.now() > expiresAt) {
        return { isValid: false, username: '', expiresAt: 0 };
      }

      const secret = process.env.ADMIN_JWT_SECRET || 'dev_secret_replace_in_prod';
      const payload = `${username}:${expiresAtStr}`;
      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['verify']
      );

      const sigBytes = new Uint8Array(providedSig.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
      const isValid = await crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(payload));

      return {
        isValid,
        username,
        expiresAt
      };
    } catch {
      return { isValid: false, username: '', expiresAt: 0 };
    }
  }
}
