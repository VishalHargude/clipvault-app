import test from 'node:test';
import assert from 'node:assert/strict';
import { UniversalEngine } from '../modules/platforms/universalEngine.ts';

test('UniversalEngine Multi-Platform Tests', async (t) => {
  await t.test('Auto-detects YouTube URLs correctly', () => {
    assert.equal(UniversalEngine.detectPlatform('https://www.youtube.com/watch?v=dQw4w9WgXcQ'), 'youtube');
    assert.equal(UniversalEngine.detectPlatform('https://youtu.be/dQw4w9WgXcQ'), 'youtube');
    assert.equal(UniversalEngine.detectPlatform('https://www.youtube.com/shorts/abcdef12345'), 'youtube');
  });

  await t.test('Auto-detects Instagram URLs correctly', () => {
    assert.equal(UniversalEngine.detectPlatform('https://www.instagram.com/reel/C8Z3xX5xG7q/'), 'instagram');
    assert.equal(UniversalEngine.detectPlatform('https://www.instagram.com/p/C-xyz123/'), 'instagram');
  });

  await t.test('Auto-detects Facebook URLs correctly', () => {
    assert.equal(UniversalEngine.detectPlatform('https://www.facebook.com/watch/?v=123456789'), 'facebook');
    assert.equal(UniversalEngine.detectPlatform('https://fb.watch/xyz123/'), 'facebook');
  });

  await t.test('Auto-detects TikTok URLs correctly', () => {
    assert.equal(UniversalEngine.detectPlatform('https://www.tiktok.com/@tiktok/video/7106594312292453678'), 'tiktok');
  });

  await t.test('Auto-detects Twitter / X URLs correctly', () => {
    assert.equal(UniversalEngine.detectPlatform('https://twitter.com/user/status/123456789'), 'x-twitter');
    assert.equal(UniversalEngine.detectPlatform('https://x.com/user/status/123456789'), 'x-twitter');
  });

  await t.test('Auto-detects Pinterest URLs correctly', () => {
    assert.equal(UniversalEngine.detectPlatform('https://www.pinterest.com/pin/123456789/'), 'pinterest');
  });

  await t.test('Auto-detects Reddit URLs correctly', () => {
    assert.equal(UniversalEngine.detectPlatform('https://www.reddit.com/r/funny/comments/123456/cool_video/'), 'reddit');
  });

  await t.test('Resolves YouTube URL and provides 1080p, 720p, MP3 options', async () => {
    const res = await UniversalEngine.resolve('https://www.youtube.com/watch?v=jNQXAC9IVRw');
    assert.equal(res.success, true);
    assert.equal(res.platform, 'youtube');
    assert.equal(res.mediaId, 'jNQXAC9IVRw');
    assert.ok(res.options.length >= 3);
    assert.ok(res.options.some(o => o.format === 'MP4'));
    assert.ok(res.options.some(o => o.format === 'MP3'));
  });

  await t.test('Resolves TikTok URL and provides No Watermark options', async () => {
    const res = await UniversalEngine.resolve('https://www.tiktok.com/@creator/video/1234567890');
    assert.equal(res.success, true);
    assert.equal(res.platform, 'tiktok');
    assert.ok(res.options.some(o => o.label.includes('No Watermark')));
  });
});
