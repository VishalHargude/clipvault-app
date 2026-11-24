'use client';

import React, { useState } from 'react';
import { Container } from '../../../components/layout/Container';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Alert } from '../../../components/ui/Alert';
import { Badge } from '../../../components/ui/Badge';
import { ImageProcessor } from '../../../modules/image/imageProcessor';
import { ImageMetadataExtractor } from '../../../modules/image/imageMetadata';
import { ImageMetadata } from '../../../modules/image/types';
import { ZeroPersistenceManager } from '../../../privacy/zeroPersistence';
import { 
  Image as ImageIcon, 
  Upload, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  Scaling, 
  Layers,
  Sliders
} from 'lucide-react';

export default function ImageToolsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [activeTab, setActiveTab] = useState<'convert' | 'compress' | 'resize' | 'batch'>('convert');

  // Conversion / Compression settings
  const [targetFormat, setTargetFormat] = useState<'image/webp' | 'image/jpeg' | 'image/png'>('image/png');
  const [quality, setQuality] = useState(85);

  // Resize settings
  const [resizeWidth, setResizeWidth] = useState(800);
  const [resizeHeight, setResizeHeight] = useState(600);
  const [maintainAspect, setMaintainAspect] = useState(true);

  // Output
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Batch conversion
  const [batchFiles, setBatchFiles] = useState<File[]>([]);
  const [batchResults, setBatchResults] = useState<{ name: string; blob: Blob }[]>([]);
  const [batchLoading, setBatchLoading] = useState(false);

  const handleSingleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setSelectedFile(file);
    setOutputBlob(null);
    setError(null);

    try {
      const meta = await ImageMetadataExtractor.extract(file);
      setMetadata(meta);
      setResizeWidth(meta.width);
      setResizeHeight(meta.height);
    } catch (err: any) {
      setError(err.message || 'Failed to inspect image.');
    }
  };

  const handleConvertOrCompress = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);

    try {
      const blob = await ImageProcessor.compress(selectedFile, {
        quality: quality / 100,
        outputFormat: targetFormat,
      });
      setOutputBlob(blob);
    } catch (err: any) {
      setError(err.message || 'Image processing failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleResize = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);

    try {
      const blob = await ImageProcessor.resize(selectedFile, {
        targetWidth: resizeWidth,
        targetHeight: resizeHeight,
        maintainAspectRatio: maintainAspect,
        outputFormat: targetFormat,
        quality: quality / 100
      });
      setOutputBlob(blob);
    } catch (err: any) {
      setError(err.message || 'Resize failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleBatchConvert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const files = Array.from(e.target.files);
    setBatchFiles(files);
    setBatchResults([]);
    setBatchLoading(true);
    setError(null);

    try {
      const results: { name: string; blob: Blob }[] = [];
      const ext = targetFormat === 'image/webp' ? 'webp' : targetFormat === 'image/png' ? 'png' : 'jpg';

      for (const file of files) {
        const blob = await ImageProcessor.compress(file, {
          quality: quality / 100,
          outputFormat: targetFormat
        });
        const base = file.name.replace(/\.[^/.]+$/, '');
        results.push({ name: `${base}_converted.${ext}`, blob });
      }

      setBatchResults(results);
    } catch (err: any) {
      setError(`Batch conversion error: ${err.message}`);
    } finally {
      setBatchLoading(false);
    }
  };

  const handleDownloadOutput = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
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
            <span>🇮🇳</span> ClipVault Image Studio • 100% Private In-Browser
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Browser Image Studio & Converter
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            Fast in-browser JPG to PNG, PNG to JPG, WebP conversion, compression, and resizing with zero server uploads.
          </p>
        </div>

        <Card className="p-8">
          {/* Sub-tool tabs */}
          <div className="flex border-b border-surface-border gap-2 text-sm font-semibold mb-6">
            <button
              onClick={() => setActiveTab('convert')}
              className={`pb-3 px-3 transition-colors ${activeTab === 'convert' ? 'border-b-2 border-brand-secondary text-brand-secondary' : 'text-content-muted hover:text-content-main'}`}
            >
              Format Converter (JPG/PNG/WebP)
            </button>
            <button
              onClick={() => setActiveTab('compress')}
              className={`pb-3 px-3 transition-colors ${activeTab === 'compress' ? 'border-b-2 border-brand-secondary text-brand-secondary' : 'text-content-muted hover:text-content-main'}`}
            >
              Image Compressor
            </button>
            <button
              onClick={() => setActiveTab('resize')}
              className={`pb-3 px-3 transition-colors ${activeTab === 'resize' ? 'border-b-2 border-brand-secondary text-brand-secondary' : 'text-content-muted hover:text-content-main'}`}
            >
              Dimension Resizer
            </button>
            <button
              onClick={() => setActiveTab('batch')}
              className={`pb-3 px-3 transition-colors ${activeTab === 'batch' ? 'border-b-2 border-brand-secondary text-brand-secondary' : 'text-content-muted hover:text-content-main'}`}
            >
              Batch Conversion
            </button>
          </div>

          {/* Single File Drop Zone for Convert, Compress, Resize */}
          {activeTab !== 'batch' && (
            <div className="border-2 border-dashed border-surface-border rounded-custom p-8 text-center hover:border-brand-secondary/50 transition-colors">
              <Upload className="w-10 h-10 text-brand-secondary mx-auto mb-3" />
              <h3 className="font-bold text-base text-content-main mb-1">
                Select an image file
              </h3>
              <p className="text-xs text-content-muted mb-4">Supports PNG, JPG, WebP, BMP</p>
              <label className="cursor-pointer">
                <Button type="button" onClick={() => document.getElementById('image-file-input')?.click()}>
                  Choose Image
                </Button>
                <input id="image-file-input" type="file" accept="image/*" className="hidden" onChange={handleSingleFile} />
              </label>
            </div>
          )}

          {/* Batch Drop Zone */}
          {activeTab === 'batch' && (
            <div className="border-2 border-dashed border-surface-border rounded-custom p-8 text-center hover:border-brand-secondary/50 transition-colors">
              <Layers className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <h3 className="font-bold text-base text-content-main mb-1">
                Select multiple images for batch processing
              </h3>
              <p className="text-xs text-content-muted mb-4">Files are processed one-by-one in browser memory</p>
              <label className="cursor-pointer">
                <Button type="button" onClick={() => document.getElementById('batch-file-input')?.click()}>
                  Select Multiple Files
                </Button>
                <input id="batch-file-input" type="file" accept="image/*" multiple className="hidden" onChange={handleBatchConvert} />
              </label>
            </div>
          )}

          {error && <div className="mt-6"><Alert variant="danger">{error}</Alert></div>}

          {/* Controls for Single File (Convert, Compress, Resize) */}
          {metadata && activeTab !== 'batch' && (
            <div className="mt-8 pt-8 border-t border-surface-border space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                  <span className="text-content-muted block mb-1">Dimensions</span>
                  <strong className="text-content-main">{metadata.width} × {metadata.height}</strong>
                </div>
                <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                  <span className="text-content-muted block mb-1">Aspect Ratio</span>
                  <strong className="text-content-main">{metadata.aspectRatio}</strong>
                </div>
                <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                  <span className="text-content-muted block mb-1">Original Size</span>
                  <strong className="text-content-main">{metadata.fileSizeFormatted}</strong>
                </div>
                <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                  <span className="text-content-muted block mb-1">Source Format</span>
                  <strong className="text-brand-secondary uppercase">{metadata.mimeType.split('/')[1]}</strong>
                </div>
              </div>

              {/* Tab 1: Format Converter */}
              {activeTab === 'convert' && (
                <div className="p-5 bg-surface-bg border border-surface-border rounded-custom space-y-4">
                  <h4 className="font-bold text-sm text-content-main">Target Output Format</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'image/png', label: 'PNG (Lossless with Transparency)' },
                      { id: 'image/jpeg', label: 'JPG / JPEG (Standard)' },
                      { id: 'image/webp', label: 'WebP (Modern, Small Size)' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setTargetFormat(opt.id as any)}
                        className={`p-3 rounded-custom text-xs font-bold text-left border transition-all ${
                          targetFormat === opt.id
                            ? 'border-brand-secondary bg-brand-secondary/10 text-brand-secondary'
                            : 'border-surface-border bg-surface-card text-content-muted'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleConvertOrCompress} isLoading={loading}>
                      <RefreshCw className="w-4 h-4 mr-2" /> Convert Image
                    </Button>
                  </div>
                </div>
              )}

              {/* Tab 2: Compressor */}
              {activeTab === 'compress' && (
                <div className="p-5 bg-surface-bg border border-surface-border rounded-custom space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-content-main">Compression Quality</h4>
                    <span className="font-mono text-brand-secondary font-bold text-sm">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-brand-secondary cursor-pointer"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleConvertOrCompress} isLoading={loading}>
                      <Sliders className="w-4 h-4 mr-2" /> Compress Image
                    </Button>
                  </div>
                </div>
              )}

              {/* Tab 3: Resizer */}
              {activeTab === 'resize' && (
                <div className="p-5 bg-surface-bg border border-surface-border rounded-custom space-y-4">
                  <h4 className="font-bold text-sm text-content-main flex items-center gap-2">
                    <Scaling className="w-4 h-4 text-brand-secondary" /> Resize Dimensions
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-content-muted mb-1">Width (px)</label>
                      <input
                        type="number"
                        value={resizeWidth}
                        onChange={(e) => setResizeWidth(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-surface-card border border-surface-border rounded-custom text-xs text-content-main"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-content-muted mb-1">Height (px)</label>
                      <input
                        type="number"
                        value={resizeHeight}
                        onChange={(e) => setResizeHeight(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-surface-card border border-surface-border rounded-custom text-xs text-content-main"
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-xs text-content-muted cursor-pointer">
                    <input
                      type="checkbox"
                      checked={maintainAspect}
                      onChange={(e) => setMaintainAspect(e.target.checked)}
                      className="accent-brand-secondary"
                    />
                    Maintain Aspect Ratio ({metadata.aspectRatio})
                  </label>
                  <div className="flex justify-end">
                    <Button onClick={handleResize} isLoading={loading}>
                      <Scaling className="w-4 h-4 mr-2" /> Resize Image
                    </Button>
                  </div>
                </div>
              )}

              {/* Single Output Alert & Save */}
              {outputBlob && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-custom flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <div className="text-xs">
                      <strong className="text-content-main block">Ready for Direct-to-Device Save</strong>
                      <span className="text-content-muted">Output Size: {ImageMetadataExtractor.formatBytes(outputBlob.size)}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      const ext = targetFormat === 'image/webp' ? 'webp' : targetFormat === 'image/png' ? 'png' : 'jpg';
                      handleDownloadOutput(outputBlob, `processed_image.${ext}`);
                    }}
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-1.5" /> Save to Device
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Batch Results */}
          {activeTab === 'batch' && (
            <div className="mt-8 pt-8 border-t border-surface-border space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-content-main">Batch Converted Files ({batchResults.length})</h4>
                <div className="text-xs text-content-muted">Output: {targetFormat.split('/')[1].toUpperCase()}</div>
              </div>

              {batchLoading && (
                <div className="text-center py-6 text-sm text-content-muted font-mono flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  Converting batch in browser memory...
                </div>
              )}

              <div className="space-y-2">
                {batchResults.map((item, idx) => (
                  <div key={idx} className="p-3 bg-surface-bg border border-surface-border rounded-custom flex items-center justify-between text-xs">
                    <span className="font-mono text-content-main">{item.name}</span>
                    <Button onClick={() => handleDownloadOutput(item.blob, item.name)} size="sm" variant="outline">
                      <Download className="w-3.5 h-3.5 mr-1" /> Save
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </Container>
    </main>
  );
}
