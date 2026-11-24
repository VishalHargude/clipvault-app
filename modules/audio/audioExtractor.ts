import type { AudioMetadata } from './types';

export class AudioExtractor {
  /**
   * Browser-Side Audio Extraction via Web Audio API
   * Zero external dependencies, 100% native in all modern browsers.
   */
  static async extractAudioFromVideo(
    videoFile: File,
    onProgress?: (pct: number, status: string) => void
  ): Promise<{ blob: Blob; metadata: AudioMetadata }> {
    if (onProgress) onProgress(15, 'Reading file into memory buffer...');
    const arrayBuffer = await videoFile.arrayBuffer();

    if (onProgress) onProgress(40, 'Decoding audio track with Web Audio API...');
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audioCtx = new AudioContextClass();
    
    let audioBuffer: AudioBuffer;
    try {
      audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    } finally {
      await audioCtx.close();
    }

    if (onProgress) onProgress(75, 'Encoding audio into lossless PCM WAV...');
    const wavBlob = this.encodeAudioBufferToWav(audioBuffer);

    const layout = audioBuffer.numberOfChannels === 1 ? 'Mono' : audioBuffer.numberOfChannels === 2 ? 'Stereo' : 'Multi-Channel';
    const metadata: AudioMetadata = {
      fileName: `${videoFile.name.replace(/\.[^/.]+$/, '')}.wav`,
      fileSizeBytes: wavBlob.size,
      durationSeconds: audioBuffer.duration,
      durationFormatted: this.formatDuration(audioBuffer.duration),
      sampleRateHz: audioBuffer.sampleRate,
      numberOfChannels: audioBuffer.numberOfChannels,
      channelLayout: layout
    };

    if (onProgress) onProgress(100, 'Audio extraction complete!');
    return { blob: wavBlob, metadata };
  }

  static encodeAudioBufferToWav(buffer: AudioBuffer): Blob {
    const numChannels = buffer.numberOfChannels;
    const length = buffer.length * numChannels * 2 + 44;
    const out = new DataView(new ArrayBuffer(length));
    const channels: Float32Array[] = [];
    const sampleRate = buffer.sampleRate;
    let offset = 0;
    let pos = 0;

    const setUint16 = (data: number) => { out.setUint16(pos, data, true); pos += 2; };
    const setUint32 = (data: number) => { out.setUint32(pos, data, true); pos += 4; };

    // WAV RIFF header
    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8);
    setUint32(0x45564157); // "WAVE"
    setUint32(0x20746d66); // "fmt "
    setUint32(16);         // PCM format length
    setUint16(1);          // Linear PCM
    setUint16(numChannels);
    setUint32(sampleRate);
    setUint32(sampleRate * 2 * numChannels);
    setUint16(numChannels * 2);
    setUint16(16);         // 16-bit
    setUint32(0x61746164); // "data"
    setUint32(length - pos - 4);

    for (let i = 0; i < numChannels; i++) {
      channels.push(buffer.getChannelData(i));
    }

    while (offset < buffer.length) {
      for (let i = 0; i < numChannels; i++) {
        let sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
        out.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }

    return new Blob([out.buffer], { type: 'audio/wav' });
  }

  private static formatDuration(sec: number): string {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
}
