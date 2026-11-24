import { test, describe } from 'node:test';
import assert from 'node:assert';
import { InstagramEngine } from '../modules/platforms/instagramEngine.ts';

describe('SaveClip Instagram Downloader Engine Tests', () => {
  test('Correctly parses Instagram Reel URL and extracts shortcode', () => {
    const parsed = InstagramEngine.parseInstagramUrl('https://www.instagram.com/reel/C8qLd9nS2_g/?igsh=MzRlODBiNWFlZA==');
    assert.ok(parsed);
    assert.strictEqual(parsed.shortcode, 'C8qLd9nS2_g');
    assert.strictEqual(parsed.postType, 'reel');
  });

  test('Correctly parses Instagram Post / Photo URL', () => {
    const parsed = InstagramEngine.parseInstagramUrl('https://www.instagram.com/p/C6W9Wb-s19X/');
    assert.ok(parsed);
    assert.strictEqual(parsed.shortcode, 'C6W9Wb-s19X');
    assert.strictEqual(parsed.postType, 'post');
  });

  test('Correctly parses Instagram TV (IGTV) URL', () => {
    const parsed = InstagramEngine.parseInstagramUrl('https://www.instagram.com/tv/B_q1234abcd/');
    assert.ok(parsed);
    assert.strictEqual(parsed.shortcode, 'B_q1234abcd');
    assert.strictEqual(parsed.postType, 'tv');
  });

  test('Rejects invalid non-Instagram URLs safely', () => {
    const parsed = InstagramEngine.parseInstagramUrl('https://example.com/not-instagram');
    assert.strictEqual(parsed, null);
  });

  test('Resolves media without throwing and returns valid Direct-to-Device media structure', async () => {
    const result = await InstagramEngine.resolve('https://www.instagram.com/reel/C8qLd9nS2_g/');
    assert.ok(result);
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.shortcode, 'C8qLd9nS2_g');
    assert.ok(result.media.length > 0);
    assert.ok(result.media[0].downloadUrl.includes('/api/instagram/stream'));
  });
});
