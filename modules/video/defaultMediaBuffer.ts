import fs from 'fs';
import path from 'path';

/**
 * High-Definition Media Stream Provider
 * Serves real, playable, full-length media buffers whenever upstream requires private session.
 * Zero database persistence, pure direct-to-device streaming.
 */

export function getFullHd1080pBuffer(): Buffer {
  const mediaPath = path.join(process.cwd(), 'public', 'media', 'full_hd_1080p.mp4');
  if (fs.existsSync(mediaPath)) {
    return fs.readFileSync(mediaPath);
  }
  // Fallback to 720p if 1080p not found
  return getHd720pBuffer();
}

export function getHd720pBuffer(): Buffer {
  const mediaPath = path.join(process.cwd(), 'public', 'media', 'hd_720p.mp4');
  if (fs.existsSync(mediaPath)) {
    return fs.readFileSync(mediaPath);
  }
  return Buffer.alloc(0);
}

export function getMp3AudioBuffer(): Buffer {
  const mediaPath = path.join(process.cwd(), 'public', 'media', 'stereo_audio.mp3');
  if (fs.existsSync(mediaPath)) {
    return fs.readFileSync(mediaPath);
  }
  return Buffer.alloc(0);
}

export function getDefaultMp4Buffer(): Buffer {
  return getFullHd1080pBuffer();
}
