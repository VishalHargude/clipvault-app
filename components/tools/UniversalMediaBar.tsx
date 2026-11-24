'use client';

import React, { useState } from 'react';
import { platformRegistry } from '../../modules/platforms/adapterRegistry';
import { PlatformId } from '../../modules/platforms/types';
import { useDirectDownload } from '../../hooks/useDirectDownload';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Alert } from '../ui/Alert';
import { 
  Clipboard, 
  DownloadCloud, 
  Search, 
  AlertTriangle, 
  Lock, 
  ShieldCheck, 
  ExternalLink,
  CheckCircle2,
  Gauge,
  Clock,
  HardDrive
} from 'lucide-react';

const platformOptions = [
  { id: 'all', name: 'Auto-Detect Platform' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'youtube', name: 'YouTube' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'x-twitter', name: 'X (Twitter)' },
  { id: 'pinterest', name: 'Pinterest' },
  { id: 'reddit', name: 'Reddit' },
  { id: 'generic-direct', name: 'Direct Media URL (MP4/CDN)' },
];

export function UniversalMediaBar() {
  const [url, setUrl] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [statusResult, setStatusResult] = useState<any>(null);
  const [probeLoading, setProbeLoading] = useState(false);

  const { isDownloading, metrics, error: dlError, isCompleted, startDownload } = useDirectDownload();

  // Paste button handler with fallback
  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text.trim());
          handleEvaluate(text.trim(), selectedPlatform);
        }
      } else {
        alert('Clipboard access not supported by your browser. Please paste manually into the input box.');
      }
    } catch {
      alert('Clipboard permission denied. Please paste manually using Ctrl+V or right-click.');
    }
  };

  const handleEvaluate = async (targetUrl: string, platformChoice: string) => {
    if (!targetUrl.trim()) return;
    setStatusResult(null);

    // 1. Check if user selected or provided a generic direct media link
    const isDirectExtension = /\.(mp4|webm|mov|mkv|mp3|wav|jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(targetUrl);
    if (platformChoice === 'generic-direct' || isDirectExtension) {
      setProbeLoading(true);
      try {
        const res = await fetch('/api/inspect-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: targetUrl }),
        });
        const data = await res.json();
        setStatusResult({
          type: 'DIRECT_URL',
          data,
          targetUrl
        });
      } catch (err: any) {
        setStatusResult({
          type: 'DIRECT_URL',
          data: { error: true, message: err.message },
          targetUrl
        });
      } finally {
        setProbeLoading(false);
      }
      return;
    }

    // 2. Evaluate against social platform adapter registry
    const match = platformRegistry.findAdapterForUrl(targetUrl);
    if (match.adapter) {
      const doc = match.adapter.getComplianceDocumentation();
      setStatusResult({
        type: 'PLATFORM_ADAPTER',
        adapter: match.adapter,
        doc,
        validation: match.validation
      });
    } else {
      // Unrecognized platform, check if probe-able direct URL
      setProbeLoading(true);
      try {
        const res = await fetch('/api/inspect-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: targetUrl }),
        });
        const data = await res.json();
        if (data.contentType && data.contentType.includes('video')) {
          setStatusResult({
            type: 'DIRECT_URL',
            data,
            targetUrl
          });
        } else {
          setStatusResult({
            type: 'UNKNOWN_PLATFORM',
            message: match.validation.errorMessage || 'URL is not from a supported platform adapter. If this is a direct media file, select "Direct Media URL" above.'
          });
        }
      } catch {
        setStatusResult({
          type: 'UNKNOWN_PLATFORM',
          message: 'Unable to recognize platform. For direct video files, please ensure the URL ends with .mp4 or .webm.'
        });
      } finally {
        setProbeLoading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleEvaluate(url, selectedPlatform);
  };

  const handleStartDirectDownload = () => {
    if (!url.trim()) return;
    const filename = url.split('/').pop()?.split('?')[0] || 'direct_download.mp4';
    startDownload(url.trim(), filename.includes('.') ? filename : `${filename}.mp4`);
  };

  return (
    <div className="w-full space-y-6">
      {/* Universal Search & Input Card */}
      <div className="bg-surface-card border border-surface-border rounded-custom p-4 sm:p-6 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Platform Selector Tabs / Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-surface-border">
            <span className="text-xs font-bold uppercase tracking-wider text-content-muted flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-brand-primary" /> Target Source
            </span>
            <select
              value={selectedPlatform}
              onChange={(e) => {
                setSelectedPlatform(e.target.value);
                if (url.trim()) handleEvaluate(url, e.target.value);
              }}
              className="w-full sm:w-auto px-3 py-1.5 text-xs bg-surface-bg border border-surface-border rounded-custom text-content-main font-semibold outline-none focus:border-brand-primary cursor-pointer"
            >
              {platformOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.name}</option>
              ))}
            </select>
          </div>

          {/* Main Input Row with Paste & Process Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste media link (Instagram, TikTok, YouTube, or direct MP4/CDN URL)..."
                required
                className="w-full h-12 pl-4 pr-24 bg-surface-bg border border-surface-border rounded-custom text-content-main placeholder:text-content-muted/60 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-mono"
              />
              <button
                type="button"
                onClick={handlePaste}
                className="absolute right-2 top-2 h-8 px-3 rounded-custom bg-surface-card-hover hover:bg-surface-border text-content-muted hover:text-content-main text-xs font-semibold inline-flex items-center gap-1.5 transition-colors border border-surface-border"
                title="Paste from clipboard"
              >
                <Clipboard className="w-3.5 h-3.5" /> Paste
              </button>
            </div>

            <Button
              type="submit"
              size="lg"
              isLoading={probeLoading}
              className="h-12 px-6 whitespace-nowrap"
            >
              Process URL
            </Button>
          </div>
        </form>

        {/* Live Status Result Card */}
        {statusResult && (
          <div className="mt-6 pt-6 border-t border-surface-border">
            {/* Case 1: Social Platform Adapter (Strict Rule 9 & 11 Compliance) */}
            {statusResult.type === 'PLATFORM_ADAPTER' && (
              <div className="p-5 rounded-custom bg-amber-500/10 border border-amber-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    <span className="font-bold text-base text-content-main">
                      {statusResult.adapter.displayName} URL Detected
                    </span>
                  </div>
                  <Badge variant="warning">
                    <Lock className="w-3 h-3 mr-1" /> Disabled by Policy (Rule 11)
                  </Badge>
                </div>

                <div className="text-xs text-content-muted leading-relaxed space-y-2">
                  <p>
                    <strong>Why direct download is disabled:</strong> {statusResult.doc.legalRationale}
                  </p>
                  <p>
                    <strong>Access Controls & DRM:</strong> {statusResult.doc.corsBehavior}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-amber-500/15">
                  <span className="text-content-muted">
                    We strictly uphold intellectual property rights and never deploy fake download bypasses.
                  </span>
                  <a
                    href={statusResult.doc.developerPolicyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-brand-primary hover:underline font-semibold"
                  >
                    View Official Terms <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Case 2: Authorized Direct URL -> Ready for Zero-Storage Download */}
            {statusResult.type === 'DIRECT_URL' && (
              <div className="p-5 rounded-custom bg-emerald-500/10 border border-emerald-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-base text-content-main">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Authorized Direct Media Stream Ready
                  </div>
                  <Badge variant="success">Direct-to-Device Supported</Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-content-muted">
                  <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                    <span className="block text-content-muted/80 mb-1">MIME Type</span>
                    <strong className="text-content-main">{statusResult.data.contentType || 'video/mp4'}</strong>
                  </div>
                  <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                    <span className="block text-content-muted/80 mb-1">Total Size</span>
                    <strong className="text-content-main">{statusResult.data.sizeMb ? `${statusResult.data.sizeMb} MB` : 'Stream'}</strong>
                  </div>
                  <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                    <span className="block text-content-muted/80 mb-1">Resumable</span>
                    <strong className="text-emerald-400">{statusResult.data.resumableRangesSupported ? 'Yes (Byte-Ranges)' : 'Standard'}</strong>
                  </div>
                  <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                    <span className="block text-content-muted/80 mb-1">Server Proxy</span>
                    <strong className="text-emerald-400">0 KB (Direct Client)</strong>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-2">
                  <Button onClick={handleStartDirectDownload} isLoading={isDownloading} disabled={isDownloading}>
                    <DownloadCloud className="w-4 h-4 mr-2" /> Download Directly to Device Disk
                  </Button>
                </div>
              </div>
            )}

            {/* Case 3: Unknown Platform Warning */}
            {statusResult.type === 'UNKNOWN_PLATFORM' && (
              <Alert variant="warning" title="Platform Notice">
                {statusResult.message}
              </Alert>
            )}
          </div>
        )}

        {/* Live Stream Telemetry when downloading */}
        {isDownloading && metrics && (
          <div className="mt-4 p-4 rounded-custom bg-surface-bg border border-surface-border space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-content-main flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
                Streaming Directly to Device Storage ({metrics.streamMode})
              </span>
              <span className="font-mono text-brand-primary font-bold">{metrics.percent !== null ? `${metrics.percent}%` : 'Streaming...'}</span>
            </div>
            <div className="w-full bg-surface-card h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-brand-primary to-brand-secondary h-full transition-all duration-150" style={{ width: `${metrics.percent || 100}%` }} />
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono text-content-muted">
              <div>Speed: <strong className="text-content-main">{metrics.speedMbps} MB/s</strong></div>
              <div>Received: <strong className="text-content-main">{metrics.receivedFormatted}</strong></div>
              <div>Memory: <strong className="text-emerald-400">Auto-Revoking</strong></div>
            </div>
          </div>
        )}

        {isCompleted && (
          <div className="mt-4">
            <Alert variant="success" title="Download Complete">
              The media file has been saved directly to your local device disk. All temporary memory was revoked immediately.
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}
