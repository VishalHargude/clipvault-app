'use client';

import React, { useState } from 'react';
import { useDirectDownload } from '../../hooks/useDirectDownload';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Alert } from '../ui/Alert';
import { Badge } from '../ui/Badge';
import { DownloadCloud, Gauge, HardDrive, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function DirectDownloadEngine() {
  const [url, setUrl] = useState('');
  const [filename, setFilename] = useState('');
  const { isDownloading, metrics, error, isCompleted, startDownload } = useDirectDownload();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    let targetFilename = filename.trim();
    if (!targetFilename && url.includes('/')) {
      targetFilename = url.split('/').pop()?.split('?')[0] || 'direct_media.mp4';
      if (!targetFilename.includes('.')) targetFilename += '.mp4';
    }

    startDownload(url.trim(), targetFilename || 'direct_media.mp4');
  };

  return (
    <div className="space-y-6">
      {/* Compliance Box */}
      <Alert variant="info" title="Direct-to-Device Architecture (Rules 1-5, 9, 11)">
        This tool streams media directly from the authorized remote server to your local device disk. Media binary never touches or transits through our servers. You must have authorization or rights to download media from the target endpoint. DRM-protected streams and unauthorized platform scraping are strictly unsupported.
      </Alert>

      {/* Input Form */}
      <form onSubmit={handleStart} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Authorized Direct Media URL (MP4, WebM, MP3, Cloud CDN):"
              type="url"
              placeholder="https://example.com/authorized_video.mp4"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              label="Save As Filename (Optional):"
              type="text"
              placeholder="my_video.mp4"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Badge variant="success">
            <ShieldCheck className="w-3.5 h-3.5" /> 0 KB Server Bandwidth
          </Badge>

          <Button type="submit" isLoading={isDownloading} disabled={isDownloading}>
            <DownloadCloud className="w-4 h-4 mr-2" /> Start Direct Download
          </Button>
        </div>
      </form>

      {/* Download Progress & Telemetry */}
      {isDownloading && metrics && (
        <div className="bg-surface-bg border border-surface-border rounded-custom p-5 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-content-main flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-ping" />
              Direct Streaming Active ({metrics.streamMode})
            </span>
            <span className="font-mono text-brand-primary font-bold">
              {metrics.percent !== null ? `${metrics.percent}%` : 'Streaming...'}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-surface-card h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-primary to-brand-secondary h-full transition-all duration-150"
              style={{ width: `${metrics.percent || 100}%` }}
            />
          </div>

          {/* Live Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-content-muted">
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-brand-primary" />
              <span>Speed: <strong>{metrics.speedMbps} MB/s</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-brand-secondary" />
              <span>Received: <strong>{metrics.receivedFormatted}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>ETA: <strong>{metrics.etaSeconds !== null ? `${metrics.etaSeconds}s` : '—'}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Memory: <strong className="text-emerald-400">Auto-Revoking</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* Success Alert */}
      {isCompleted && (
        <Alert variant="success" title="Direct-to-Device Download Completed">
          The media file was streamed directly to your device storage. All temporary browser memory and object URLs were revoked automatically.
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" title="Download Notice">
          {error}
        </Alert>
      )}
    </div>
  );
}
