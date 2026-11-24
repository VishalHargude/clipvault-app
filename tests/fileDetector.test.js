const test = require('node:test');
const assert = require('node:assert');

test('File Utilities & Magic Byte Detection (Section D & E)', async (t) => {
  const { FileDetector } = require('../modules/utilities/fileDetector.ts');

  await t.test('Detects PNG binary signature (89 50 4E 47 0D 0A 1A 0A)', async () => {
    const pngBytes = new Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D]);
    const blob = new Blob([pngBytes], { type: 'application/octet-stream' });
    const detected = await FileDetector.detectFromBlob(blob);
    assert.strictEqual(detected.extension, 'png');
    assert.strictEqual(detected.mimeType, 'image/png');
    assert.strictEqual(detected.category, 'image');
  });

  await t.test('Detects JPEG binary signature (FF D8 FF)', async () => {
    const jpgBytes = new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46]);
    const blob = new Blob([jpgBytes]);
    const detected = await FileDetector.detectFromBlob(blob);
    assert.strictEqual(detected.extension, 'jpg');
    assert.strictEqual(detected.mimeType, 'image/jpeg');
  });

  await t.test('Detects WebP binary signature (RIFF...WEBP)', async () => {
    const webpBytes = new Uint8Array([
      0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50
    ]);
    const blob = new Blob([webpBytes]);
    const detected = await FileDetector.detectFromBlob(blob);
    assert.strictEqual(detected.extension, 'webp');
    assert.strictEqual(detected.mimeType, 'image/webp');
  });

  await t.test('Detects MP4 ftyp box signature', async () => {
    // 00 00 00 18 66 74 79 70 ('ftyp' at byte 4)
    const mp4Bytes = new Uint8Array([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6F, 0x6D]);
    const blob = new Blob([mp4Bytes]);
    const detected = await FileDetector.detectFromBlob(blob);
    assert.strictEqual(detected.extension, 'mp4');
    assert.strictEqual(detected.mimeType, 'video/mp4');
    assert.strictEqual(detected.category, 'video');
  });

  await t.test('Formats file bytes accurately (B, KB, MB, GB)', () => {
    assert.strictEqual(FileDetector.formatBytes(0), '0 B');
    assert.strictEqual(FileDetector.formatBytes(1024), '1.00 KB');
    assert.strictEqual(FileDetector.formatBytes(1048576), '1.00 MB');
    assert.strictEqual(FileDetector.formatBytes(1073741824), '1.00 GB');
  });
});
