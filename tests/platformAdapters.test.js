const test = require('node:test');
const assert = require('node:assert');

test('Platform Adapters - Strict Compliance & Disabled State Verification', async (t) => {
  const { InstagramAdapter } = require('../modules/platforms/adapters/instagram.adapter.ts');
  const { YouTubeAdapter } = require('../modules/platforms/adapters/youtube.adapter.ts');
  const { TikTokAdapter } = require('../modules/platforms/adapters/tiktok.adapter.ts');
  const { FacebookAdapter } = require('../modules/platforms/adapters/facebook.adapter.ts');
  const { XTwitterAdapter } = require('../modules/platforms/adapters/x-twitter.adapter.ts');
  const { PinterestAdapter } = require('../modules/platforms/adapters/pinterest.adapter.ts');
  const { RedditAdapter } = require('../modules/platforms/adapters/reddit.adapter.ts');

  const adapters = [
    new InstagramAdapter(),
    new YouTubeAdapter(),
    new TikTokAdapter(),
    new FacebookAdapter(),
    new XTwitterAdapter(),
    new PinterestAdapter(),
    new RedditAdapter()
  ];

  await t.test('All 7 required platform adapters are initialized', () => {
    assert.strictEqual(adapters.length, 7);
  });

  await t.test('All adapters are strictly DISABLED_UNVERIFIED by default (Rule 11)', () => {
    adapters.forEach(adapter => {
      assert.strictEqual(
        adapter.availabilityStatus,
        'DISABLED_UNVERIFIED',
        `Adapter ${adapter.id} must be DISABLED_UNVERIFIED until verified legal API exists`
      );
    });
  });

  await t.test('Instagram adapter validates Instagram URLs and rejects malformed domains', () => {
    const ig = new InstagramAdapter();
    const valid = ig.validateUrl('https://www.instagram.com/reel/DgCafg4Obtf/');
    assert.strictEqual(valid.isValid, true);

    const invalidDomain = ig.validateUrl('https://malicious-site.com/reel/123');
    assert.strictEqual(invalidDomain.isValid, false);
  });

  await t.test('YouTube adapter validates video identifiers and rejects invalid paths', () => {
    const yt = new YouTubeAdapter();
    const valid = yt.validateUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    assert.strictEqual(valid.isValid, true);

    const invalid = yt.validateUrl('https://notyoutube.com');
    assert.strictEqual(invalid.isValid, false);
  });

  await t.test('Adapters return OPERATION_DISABLED_COMPLIANCE when execution is attempted', async () => {
    const ig = new InstagramAdapter();
    const res = await ig.executeOperation();
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.error, 'OPERATION_DISABLED_COMPLIANCE');
  });
});
