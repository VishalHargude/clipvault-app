/**
 * Web Worker for Off-Thread Media & Chunk Processing
 */

self.onmessage = async (e: MessageEvent) => {
  const { type, payload, taskId } = e.data;

  try {
    switch (type) {
      case 'ANALYZE_CHUNKS': {
        const { chunks } = payload;
        let totalBytes = 0;
        for (const chunk of chunks) {
          totalBytes += chunk.byteLength;
        }
        self.postMessage({ taskId, success: true, result: { totalBytes } });
        break;
      }

      case 'COMPUTE_CHECKSUM': {
        const { arrayBuffer } = payload;
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        self.postMessage({ taskId, success: true, result: { hash: hashHex } });
        break;
      }

      default:
        self.postMessage({ taskId, success: false, error: `Unknown task type: ${type}` });
    }
  } catch (err: any) {
    self.postMessage({ taskId, success: false, error: err.message || 'Worker processing error' });
  }
};

export {};
