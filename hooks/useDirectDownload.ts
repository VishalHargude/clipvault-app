'use client';

import { useState, useCallback } from 'react';
import { ZeroPersistenceManager } from '../privacy/zeroPersistence';

export interface DownloadMetrics {
  speedMbps: string;
  receivedBytes: number;
  receivedFormatted: string;
  totalBytes: number;
  totalFormatted: string;
  percent: number | null;
  etaSeconds: number | null;
  streamMode: string;
}

export function useDirectDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [metrics, setMetrics] = useState<DownloadMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const startDownload = useCallback(async (sourceUrl: string, defaultFilename = 'downloaded_media.mp4') => {
    setIsDownloading(true);
    setError(null);
    setIsCompleted(false);

    try {
      const hasFileSystem = 'showSaveFilePicker' in window;
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

      // Path A: Desktop with File System Access API (Zero RAM accumulation)
      if (hasFileSystem && !isMobile) {
        await streamViaFileSystemAccess(sourceUrl, defaultFilename, setMetrics);
      } else {
        // Path B: In-memory stream chunks with immediate memory revocation
        await streamViaMemoryBlob(sourceUrl, defaultFilename, setMetrics);
      }

      setIsCompleted(true);
    } catch (err: any) {
      // If CORS blocks in-browser Fetch, trigger native browser anchor download
      if (err.name === 'TypeError' || err.message?.includes('Failed to fetch') || err.message?.includes('CORS')) {
        fallbackAnchorDownload(sourceUrl, defaultFilename);
        setIsCompleted(true);
      } else {
        setError(err.message || 'Direct download failed.');
      }
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return {
    isDownloading,
    metrics,
    error,
    isCompleted,
    startDownload,
  };
}

async function streamViaFileSystemAccess(
  sourceUrl: string,
  filename: string,
  onProgress: (m: DownloadMetrics) => void
) {
  const ext = filename.split('.').pop() || 'mp4';
  const fileHandle = await (window as any).showSaveFilePicker({
    suggestedName: filename,
    types: [{
      description: 'Media File',
      accept: { [`video/${ext}`]: [`.${ext}`] }
    }]
  });

  const writable = await fileHandle.createWritable();
  const resp = await fetch(sourceUrl, { mode: 'cors' });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);

  const contentLength = +(resp.headers.get('Content-Length') || 0);
  const reader = resp.body!.getReader();

  let received = 0;
  const startTime = performance.now();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    await writable.write(value);
    received += value.length;

    const elapsed = (performance.now() - startTime) / 1000;
    const speed = elapsed > 0 ? (received / (1024 * 1024)) / elapsed : 0;
    const percent = contentLength > 0 ? Math.round((received / contentLength) * 100) : null;
    const eta = (contentLength > 0 && speed > 0) ? Math.round(((contentLength - received) / (1024 * 1024)) / speed) : null;

    onProgress({
      speedMbps: speed.toFixed(2),
      receivedBytes: received,
      receivedFormatted: formatBytes(received),
      totalBytes: contentLength,
      totalFormatted: formatBytes(contentLength),
      percent,
      etaSeconds: eta,
      streamMode: 'Zero-RAM Disk Stream'
    });
  }

  await writable.close();
}

async function streamViaMemoryBlob(
  sourceUrl: string,
  filename: string,
  onProgress: (m: DownloadMetrics) => void
) {
  const resp = await fetch(sourceUrl, { mode: 'cors' });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);

  const contentLength = +(resp.headers.get('Content-Length') || 0);
  const contentType = resp.headers.get('Content-Type') || 'video/mp4';
  const reader = resp.body!.getReader();

  const chunks: Uint8Array[] = [];
  let received = 0;
  const startTime = performance.now();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    chunks.push(value);
    received += value.length;

    const elapsed = (performance.now() - startTime) / 1000;
    const speed = elapsed > 0 ? (received / (1024 * 1024)) / elapsed : 0;
    const percent = contentLength > 0 ? Math.round((received / contentLength) * 100) : null;
    const eta = (contentLength > 0 && speed > 0) ? Math.round(((contentLength - received) / (1024 * 1024)) / speed) : null;

    onProgress({
      speedMbps: speed.toFixed(2),
      receivedBytes: received,
      receivedFormatted: formatBytes(received),
      totalBytes: contentLength,
      totalFormatted: formatBytes(contentLength),
      percent,
      etaSeconds: eta,
      streamMode: 'In-Memory Stream Chunk'
    });
  }

  const blob = new Blob(chunks as any, { type: contentType });
  chunks.length = 0; // Release memory

  const objectUrl = URL.createObjectURL(blob);
  triggerDownload(objectUrl, filename);
  ZeroPersistenceManager.scheduleRevoke(objectUrl, 2000);
}

function fallbackAnchorDownload(url: string, filename: string) {
  triggerDownload(url, filename);
}

function triggerDownload(href: string, filename: string) {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = href;
  a.download = filename;
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function formatBytes(bytes: number): string {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}
