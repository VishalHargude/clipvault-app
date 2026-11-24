const test = require('node:test');
const assert = require('node:assert');

test('Video Engine & Metadata Orientation Tests (Section E)', async (t) => {
  const { VideoMetadataExtractor } = require('../modules/video/videoMetadata.ts');

  await t.test('Correctly identifies landscape orientation (16:9 ratio)', () => {
    const orientation = VideoMetadataExtractor.determineOrientation(1920, 1080);
    assert.strictEqual(orientation, 'landscape');

    const { ratioStr, ratioDecimal } = VideoMetadataExtractor.calculateAspectRatio(1920, 1080);
    assert.strictEqual(ratioStr, '16:9');
    assert.strictEqual(ratioDecimal, 1.78);
  });

  await t.test('Correctly identifies portrait orientation for Shorts & Reels (9:16 ratio)', () => {
    const orientation = VideoMetadataExtractor.determineOrientation(1080, 1920);
    assert.strictEqual(orientation, 'portrait');

    const { ratioStr, ratioDecimal } = VideoMetadataExtractor.calculateAspectRatio(1080, 1920);
    assert.strictEqual(ratioStr, '9:16');
    assert.strictEqual(ratioDecimal, 0.56);
  });

  await t.test('Correctly identifies square orientation (1:1 ratio)', () => {
    const orientation = VideoMetadataExtractor.determineOrientation(1080, 1080);
    assert.strictEqual(orientation, 'square');

    const { ratioStr, ratioDecimal } = VideoMetadataExtractor.calculateAspectRatio(1080, 1080);
    assert.strictEqual(ratioStr, '1:1');
    assert.strictEqual(ratioDecimal, 1);
  });

  await t.test('Correctly classifies resolution tiers (4K, Full HD, HD, SD)', () => {
    assert.strictEqual(VideoMetadataExtractor.classifyResolution(3840, 2160), '4K');
    assert.strictEqual(VideoMetadataExtractor.classifyResolution(1920, 1080), 'Full HD');
    assert.strictEqual(VideoMetadataExtractor.classifyResolution(1280, 720), 'HD');
    assert.strictEqual(VideoMetadataExtractor.classifyResolution(854, 480), 'SD');
  });

  await t.test('Formats duration correctly', () => {
    assert.strictEqual(VideoMetadataExtractor.formatDuration(65), '01:05');
    assert.strictEqual(VideoMetadataExtractor.formatDuration(12), '00:12');
    assert.strictEqual(VideoMetadataExtractor.formatDuration(3600), '60:00');
  });
});
