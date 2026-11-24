'use client';

import React, { useState } from 'react';
import { Container } from '../../../components/layout/Container';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Alert } from '../../../components/ui/Alert';
import { Badge } from '../../../components/ui/Badge';
import { AudioExtractor } from '../../../modules/audio/audioExtractor';
import { AudioMetadata } from '../../../modules/audio/types';
import { ZeroPersistenceManager } from '../../../privacy/zeroPersistence';
import { Music, Upload, Download, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AudioToolsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedBlob, setExtractedBlob] = useState<Blob | null>(null);
  const [metadata, setMetadata] = useState<AudioMetadata | null>(null);
  const [progressMsg, setProgressMsg] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtract = async (file: File) => {
    setSelectedFile(file);
    setLoading(true);
    setError(null);
    setExtractedBlob(null);

    try {
      const res = await AudioExtractor.extractAudioFromVideo(file, (pct, msg) => {
        setProgressMsg(`${pct}% - ${msg}`);
      });
      setExtractedBlob(res.blob);
      setMetadata(res.metadata);
    } catch (err: any) {
      setError(err.message || 'Failed to extract audio track.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!extractedBlob || !metadata) return;
    const url = URL.createObjectURL(extractedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = metadata.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    ZeroPersistenceManager.scheduleRevoke(url, 2000);
  };

  return (
    <main className="py-12">
      <Container className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-800 border border-orange-200 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide mb-3">
            <span>🇮🇳</span> ClipVault Audio Studio • 100% Private In-Browser
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Client-Side Web Audio Extractor
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            Extract pure 16-bit 44.1kHz stereo audio from video files in browser memory using Web Audio API. Zero uploads.
          </p>
        </div>

        <Card className="p-8">
          <div className="border-2 border-dashed border-surface-border rounded-custom p-8 text-center hover:border-brand-primary/50 transition-colors">
            <Upload className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <h3 className="font-bold text-base text-content-main mb-1">
              Select video to rip audio track
            </h3>
            <p className="text-xs text-content-muted mb-4">Supports MP4, WebM, MKV, MOV, AVI</p>
            <label className="cursor-pointer">
              <Button type="button" onClick={() => document.getElementById('audio-upload')?.click()}>
                Select Video File
              </Button>
              <input
                id="audio-upload"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => e.target.files?.length && handleExtract(e.target.files[0])}
              />
            </label>
          </div>

          {loading && (
            <div className="mt-6 text-center text-sm text-content-muted flex items-center justify-center gap-2 font-mono">
              <span className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
              {progressMsg || 'Processing audio stream...'}
            </div>
          )}

          {error && <div className="mt-6"><Alert variant="danger">{error}</Alert></div>}

          {metadata && extractedBlob && (
            <div className="mt-8 pt-8 border-t border-surface-border space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-base text-content-main">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Audio Extracted
                </div>
                <Badge variant="success">
                  <ShieldCheck className="w-3.5 h-3.5" /> Web Audio PCM
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                  <span className="text-content-muted block mb-1">Duration</span>
                  <span className="font-bold text-content-main">{metadata.durationFormatted}</span>
                </div>
                <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                  <span className="text-content-muted block mb-1">Sample Rate</span>
                  <span className="font-bold text-content-main">{metadata.sampleRateHz} Hz</span>
                </div>
                <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                  <span className="text-content-muted block mb-1">Channels</span>
                  <span className="font-bold text-content-main">{metadata.channelLayout}</span>
                </div>
                <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                  <span className="text-content-muted block mb-1">Output Format</span>
                  <span className="font-bold text-emerald-400">Lossless WAV</span>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Button onClick={handleDownload} variant="primary">
                  <Download className="w-4 h-4 mr-2" /> Save Audio Track to Device
                </Button>
              </div>
            </div>
          )}
        </Card>
      </Container>
    </main>
  );
}
