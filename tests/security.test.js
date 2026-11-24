const test = require('node:test');
const assert = require('node:assert');

test('Security Engine - SSRF & Input Validation', async (t) => {
  const { SSRFProtector } = require('../security/ssrfProtection.ts');

  await t.test('SSRFProtector blocks localhost and loopback IPv4', () => {
    assert.strictEqual(SSRFProtector.isSafeRemoteUrl('http://localhost:8000/api').safe, false);
    assert.strictEqual(SSRFProtector.isSafeRemoteUrl('http://127.0.0.1/video.mp4').safe, false);
    assert.strictEqual(SSRFProtector.isSafeRemoteUrl('http://127.0.0.2/secret').safe, false);
  });

  await t.test('SSRFProtector blocks private RFC1918 CIDR networks', () => {
    assert.strictEqual(SSRFProtector.isSafeRemoteUrl('http://192.168.1.1/').safe, false);
    assert.strictEqual(SSRFProtector.isSafeRemoteUrl('http://10.0.0.1/admin').safe, false);
    assert.strictEqual(SSRFProtector.isSafeRemoteUrl('http://172.16.0.1/data').safe, false);
  });

  await t.test('SSRFProtector blocks Cloud Metadata IP (169.254.169.254)', () => {
    assert.strictEqual(SSRFProtector.isSafeRemoteUrl('http://169.254.169.254/latest/meta-data').safe, false);
  });

  await t.test('SSRFProtector blocks forbidden protocols and credential embedding', () => {
    assert.strictEqual(SSRFProtector.isSafeRemoteUrl('file:///etc/passwd').safe, false);
    assert.strictEqual(SSRFProtector.isSafeRemoteUrl('gopher://internal/').safe, false);
    assert.strictEqual(SSRFProtector.isSafeRemoteUrl('https://admin:pass@example.com/').safe, false);
  });

  await t.test('SSRFProtector allows public HTTPS URLs', () => {
    assert.strictEqual(SSRFProtector.isSafeRemoteUrl('https://example.com/media.mp4').safe, true);
    assert.strictEqual(SSRFProtector.isSafeRemoteUrl('https://cdn.pixabay.com/video/123.mp4').safe, true);
  });
});
