'use client';

import React, { useState, useRef } from 'react';
import { Container } from '../../../components/layout/Container';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Alert } from '../../../components/ui/Alert';
import { Badge } from '../../../components/ui/Badge';
import { VideoMetadataExtractor } from '../../../modules/video/videoMetadata';
import { VideoMetadata } from '../../../modules/video/types';
import { ZeroPersistenceManager } from '../../../privacy/zeroPersistence';
import { 
  Video, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  Scissors, 
  Minimize2, 
  Download, 
  Play, 
  Pause,
  RotateCcw
} from 'lucide-react';

export default function VideoToolsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Active Tool Mode
  const [activeTab, setActiveTab] = useState<'inspect' | 'trim' | 'compress'>('inspect');

  // Video Player Ref
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Trimming State
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(10);
  const [trimming, setTrimming] = useState(false);
  const [trimmedBlob, setTrimmedBlob] = useState<Blob | null>(null);

  // Compression State
  const [compressPreset, setCompressPreset] = useState<'mobile' | 'email' | 'web' | 'hd'>('web');
  const [compressing, setCompressing] = useState(false);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressProgress, setCompressProgress] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setSelectedFile(file);
    setError(null);
    setLoading(true);
    setTrimmedBlob(null);
    setCompressedBlob(null);

    // Create object URL for preview
    const url = URL.createObjectURL(file);
    setVideoUrl(url);

    try {
      const meta = await VideoMetadataExtractor.extract(file);
      setMetadata(meta);
      setStartTime(0);
      setEndTime(Math.min(meta.durationSeconds, 30));
    } catch (err: any) {
      setError(err.message || 'Failed to inspect video.');
    } finally {
      setLoading(false);
    }
  };

  // Trimmer implementation using MediaRecorder and Canvas
  const handleTrim = async () => {
    if (!selectedFile || !videoRef.current || !metadata) return;
    if (endTime <= startTime) {
      setError('End time must be greater than start time.');
      return;
    }

    setTrimming(true);
    setError(null);

    try {
      const video = videoRef.current;
      video.pause();
      video.currentTime = startTime;

      await new Promise(r => { video.onseeked = r; });

      const canvas = document.createElement('canvas');
      canvas.width = metadata.width;
      canvas.height = metadata.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Canvas 2D context unavailable.');

      const stream = canvas.captureStream(30);
      const mimeType = MediaRecorder.isTypeSupported('video/mp4;codecs=avc1') ? 
        'video/mp4;codecs=avc1' : 'video/webm;codecs=vp8';

      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 2500000 });
      const chunks: Blob[] = [];

      recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };

      const trimDuration = endTime - startTime;

      const completionPromise = new Promise<Blob>((resolve) => {
        recorder.onstop = () => {
          stream.getTracks().forEach(t => t.stop());
          resolve(new Blob(chunks, { type: mimeType }));
        };
      });

      recorder.start(100);
      await video.play();

      const drawLoop = () => {
        if (video.currentTime >= endTime || video.paused || video.ended) {
          video.pause();
          recorder.stop();
          return;
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(drawLoop);
      };

      drawLoop();

      const blob = await completionPromise;
      setTrimmedBlob(blob);
    } catch (err: any) {
      setError(`Trim failed: ${err.message}`);
    } finally {
      setTrimming(false);
    }
  };

  // Compressor implementation
  const handleCompress = async () => {
    if (!selectedFile || !videoRef.current || !metadata) return;
    setCompressing(true);
    setCompressProgress(0);
    setError(null);

    let targetWidth = 1280;
    let targetHeight = 720;
    let bitrate = 2000000;

    if (compressPreset === 'mobile') { targetWidth = 854; targetHeight = 480; bitrate = 1000000; }
    else if (compressPreset === 'email') { targetWidth = 640; targetHeight = 360; bitrate = 600000; }
    else if (compressPreset === 'hd') { targetWidth = 1920; targetHeight = 1080; bitrate = 3500000; }

    try {
      const video = videoRef.current;
      video.pause();
      video.currentTime = 0;
      await new Promise(r => { video.onseeked = r; });

      const aspect = metadata.width / metadata.height;
      let w = targetWidth;
      let h = Math.round(targetWidth / aspect);
      if (h > targetHeight) {
        h = targetHeight;
        w = Math.round(targetHeight * aspect);
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas error');

      const stream = canvas.captureStream(30);
      const mimeType = MediaRecorder.isTypeSupported('video/mp4;codecs=avc1') ? 
        'video/mp4;codecs=avc1' : 'video/webm;codecs=vp9';

      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: bitrate });
      const chunks: Blob[] = [];
      recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };

      const donePromise = new Promise<Blob>((resolve) => {
        recorder.onstop = () => {
          stream.getTracks().forEach(t => t.stop());
          resolve(new Blob(chunks, { type: mimeType }));
        };
      });

      recorder.start(100);
      await video.play();

      const duration = metadata.durationSeconds || 10;
      const processLoop = () => {
        if (video.paused || video.ended) {
          recorder.stop();
          return;
        }
        ctx.drawImage(video, 0, 0, w, h);
        const pct = Math.min(99, Math.round((video.currentTime / duration) * 100));
        setCompressProgress(pct);
        requestAnimationFrame(processLoop);
      };

      processLoop();

      const blob = await donePromise;
      setCompressedBlob(blob);
      setCompressProgress(100);
    } catch (err: any) {
      setError(`Compression error: ${err.message}`);
    } finally {
      setCompressing(false);
    }
  };

  const handleDownloadBlob = (blob: Blob, suffix: string) => {
    if (!selectedFile) return;
    const base = selectedFile.name.replace(/\.[^/.]+$/, '');
    const ext = blob.type.includes('mp4') ? 'mp4' : 'webm';
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${base}_${suffix}.${ext}`;
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
            <span>🇮🇳</span> ClipVault Video Studio • 100% Private In-Browser
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            In-Browser Video Tools Studio
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            Inspect exact metadata (portrait, landscape, square), precision trim clips, and compress bitrate right in your device memory. Zero server uploads.
          </p>
        </div>

        {/* Upload Zone */}
        <Card className="p-8">
          <div className="border-2 border-dashed border-surface-border rounded-custom p-8 text-center hover:border-brand-primary/50 transition-colors">
            <Upload className="w-10 h-10 text-brand-primary mx-auto mb-3" />
            <h3 className="font-bold text-base text-content-main mb-1">
              Select any video file to inspect and process
            </h3>
            <p className="text-xs text-content-muted mb-4">
              Preserves portrait (9:16 Shorts/Reels), landscape (16:9), and square (1:1) ratios. Never forced.
            </p>
            <label className="cursor-pointer">
              <Button type="button" onClick={() => document.getElementById('video-upload-input')?.click()}>
                Select Video File
              </Button>
              <input
                id="video-upload-input"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {loading && (
            <div className="mt-6 text-center text-sm text-content-muted flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
              Reading video metadata in local browser memory...
            </div>
          )}

          {error && (
            <div className="mt-6">
              <Alert variant="danger" title="Notice">{error}</Alert>
            </div>
          )}

          {/* Active Video Workspace */}
          {metadata && videoUrl && (
            <div className="mt-8 pt-8 border-t border-surface-border space-y-6">
              {/* Aspect Ratio Safe Video Preview (Rule E: object-fit: contain) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-content-muted">
                  <span className="font-bold uppercase tracking-wider text-content-main">
                    Preview: {metadata.aspectRatio} ({metadata.orientation})
                  </span>
                  <Badge variant={metadata.orientation === 'portrait' ? 'secondary' : 'primary'}>
                    {metadata.resolutionTier} ({metadata.width}×{metadata.height})
                  </Badge>
                </div>

                <div className="w-full bg-black/90 rounded-custom border border-surface-border overflow-hidden flex items-center justify-center p-2 min-h-[300px] max-h-[500px]">
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    controls
                    playsInline
                    className="max-h-[480px] max-w-full rounded"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>

              {/* Sub-Tool Selector Tabs */}
              <div className="flex border-b border-surface-border gap-2 text-sm font-semibold">
                <button
                  onClick={() => setActiveTab('inspect')}
                  className={`pb-3 px-3 transition-colors ${activeTab === 'inspect' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-content-muted hover:text-content-main'}`}
                >
                  Metadata Inspection
                </button>
                <button
                  onClick={() => setActiveTab('trim')}
                  className={`pb-3 px-3 transition-colors ${activeTab === 'trim' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-content-muted hover:text-content-main'}`}
                >
                  Precision Trimmer
                </button>
                <button
                  onClick={() => setActiveTab('compress')}
                  className={`pb-3 px-3 transition-colors ${activeTab === 'compress' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-content-muted hover:text-content-main'}`}
                >
                  Video Compressor
                </button>
              </div>

              {/* Tab 1: Metadata Inspection */}
              {activeTab === 'inspect' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                  <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                    <span className="text-content-muted block mb-1">Dimensions</span>
                    <strong className="text-content-main text-sm">{metadata.width} × {metadata.height}</strong>
                  </div>
                  <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                    <span className="text-content-muted block mb-1">Aspect Ratio</span>
                    <strong className="text-content-main text-sm">{metadata.aspectRatio} ({metadata.orientation})</strong>
                  </div>
                  <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                    <span className="text-content-muted block mb-1">Duration</span>
                    <strong className="text-content-main text-sm">{metadata.durationFormatted} ({metadata.durationSeconds.toFixed(1)}s)</strong>
                  </div>
                  <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                    <span className="text-content-muted block mb-1">File Size & MIME</span>
                    <strong className="text-content-main text-sm">{metadata.fileSizeFormatted} ({metadata.mimeType})</strong>
                  </div>
                </div>
              )}

              {/* Tab 2: Trimmer */}
              {activeTab === 'trim' && (
                <div className="space-y-4 p-5 bg-surface-bg border border-surface-border rounded-custom">
                  <h4 className="font-bold text-sm text-content-main flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-brand-primary" /> Cut Video Segment
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-content-muted uppercase mb-1">
                        Start Time: {startTime.toFixed(1)}s
                      </label>
                      <input
                        type="range"
                        min="0"
                        max={metadata.durationSeconds}
                        step="0.1"
                        value={startTime}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          setStartTime(v);
                          if (videoRef.current) videoRef.current.currentTime = v;
                        }}
                        className="w-full accent-brand-primary cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-content-muted uppercase mb-1">
                        End Time: {endTime.toFixed(1)}s
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max={metadata.durationSeconds}
                        step="0.1"
                        value={endTime}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          setEndTime(v);
                          if (videoRef.current) videoRef.current.currentTime = v;
                        }}
                        className="w-full accent-brand-primary cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-content-muted font-mono">
                      Clip length: {(endTime - startTime).toFixed(1)} seconds
                    </span>
                    <Button onClick={handleTrim} isLoading={trimming} disabled={trimming}>
                      <Scissors className="w-4 h-4 mr-2" /> Render Trim in Browser
                    </Button>
                  </div>

                  {trimmedBlob && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-custom flex items-center justify-between">
                      <div className="text-xs">
                        <strong className="text-emerald-400 block mb-0.5">Trimmed Segment Ready!</strong>
                        <span>Size: {VideoMetadataExtractor.formatBytes(trimmedBlob.size)}</span>
                      </div>
                      <Button onClick={() => handleDownloadBlob(trimmedBlob, 'trimmed')} size="sm">
                        <Download className="w-4 h-4 mr-1.5" /> Save to Device
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Compressor */}
              {activeTab === 'compress' && (
                <div className="space-y-4 p-5 bg-surface-bg border border-surface-border rounded-custom">
                  <h4 className="font-bold text-sm text-content-main flex items-center gap-2">
                    <Minimize2 className="w-4 h-4 text-brand-secondary" /> In-Browser Hardware Compression
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-content-muted uppercase mb-1">
                        Target Profile
                      </label>
                      <select
                        value={compressPreset}
                        onChange={(e) => setCompressPreset(e.target.value as any)}
                        className="w-full px-3 py-2 bg-surface-card border border-surface-border rounded-custom text-xs text-content-main"
                      >
                        <option value="mobile">Mobile & Messaging (Small, Fast, 480p)</option>
                        <option value="email">Email Sharing (Ultra Small, 360p)</option>
                        <option value="web">Web & Social Optimized (720p Balanced)</option>
                        <option value="hd">Full HD (1080p Crisp)</option>
                      </select>
                    </div>

                    <div className="text-xs text-content-muted leading-relaxed flex items-center">
                      Processing runs in client browser memory using Canvas and MediaRecorder APIs. No upload bandwidth used.
                    </div>
                  </div>

                  {compressing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono text-content-muted">
                        <span>Compressing frames...</span>
                        <span>{compressProgress}%</span>
                      </div>
                      <div className="w-full bg-surface-card h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-brand-primary to-brand-secondary h-full transition-all" style={{ width: `${compressProgress}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-end pt-2">
                    <Button onClick={handleCompress} isLoading={compressing} disabled={compressing}>
                      <Minimize2 className="w-4 h-4 mr-2" /> Start Compression
                    </Button>
                  </div>

                  {compressedBlob && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-custom flex items-center justify-between">
                      <div className="text-xs">
                        <strong className="text-emerald-400 block mb-0.5">Compression Complete!</strong>
                        <span>Original: {metadata.fileSizeFormatted} → Compressed: {VideoMetadataExtractor.formatBytes(compressedBlob.size)}</span>
                      </div>
                      <Button onClick={() => handleDownloadBlob(compressedBlob, 'compressed')} size="sm">
                        <Download className="w-4 h-4 mr-1.5" /> Save to Device
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </Card>
      </Container>
    </main>
  );
}
