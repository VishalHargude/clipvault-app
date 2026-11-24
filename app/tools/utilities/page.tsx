'use client';

import React, { useState } from 'react';
import { Container } from '../../../components/layout/Container';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { FileDetector, DetectedFormat } from '../../../modules/utilities/fileDetector';
import { Wrench, Binary, Calculator, Upload, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function UtilitiesPage() {
  const [activeTab, setActiveTab] = useState<'detector' | 'calculator'>('detector');

  // MIME Detector State
  const [detected, setDetected] = useState<DetectedFormat | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [detectLoading, setDetectLoading] = useState(false);

  // File Size Calculator State
  const [inputBytes, setInputBytes] = useState<number>(10485760); // 10 MB default

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setFileName(file.name);
    setFileSize(FileDetector.formatBytes(file.size));
    setDetectLoading(true);

    try {
      const res = await FileDetector.detectFromBlob(file);
      setDetected(res);
    } finally {
      setDetectLoading(false);
    }
  };

  return (
    <main className="py-12">
      <Container className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-800 border border-orange-200 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide mb-3">
            <span>🇮🇳</span> ClipVault Utilities • 100% Private In-Browser
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            File Utilities Studio
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            Inspect true binary magic bytes, uncover deceptive file extensions, and calculate precise storage units in memory.
          </p>
        </div>

        <Card className="p-8">
          {/* Sub-tool tabs */}
          <div className="flex border-b border-surface-border gap-2 text-sm font-semibold mb-6">
            <button
              onClick={() => setActiveTab('detector')}
              className={`pb-3 px-3 transition-colors ${activeTab === 'detector' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-content-muted hover:text-content-main'}`}
            >
              Binary Magic Byte Detector
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`pb-3 px-3 transition-colors ${activeTab === 'calculator' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-content-muted hover:text-content-main'}`}
            >
              File Storage Size Calculator
            </button>
          </div>

          {/* Tab 1: Magic Byte Detector */}
          {activeTab === 'detector' && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-surface-border rounded-custom p-8 text-center hover:border-brand-primary/50 transition-colors">
                <Binary className="w-10 h-10 text-brand-secondary mx-auto mb-3" />
                <h3 className="font-bold text-base text-content-main mb-1">
                  Select any file to inspect binary signatures
                </h3>
                <p className="text-xs text-content-muted mb-4">
                  Reads magic header bytes directly in browser memory without server uploads
                </p>
                <label className="cursor-pointer">
                  <Button type="button" onClick={() => document.getElementById('mime-file-input')?.click()}>
                    Choose File to Audit
                  </Button>
                  <input id="mime-file-input" type="file" className="hidden" onChange={handleFile} />
                </label>
              </div>

              {detectLoading && (
                <div className="text-center py-4 text-xs font-mono text-content-muted">
                  Reading magic header bytes...
                </div>
              )}

              {detected && (
                <div className="pt-6 border-t border-surface-border space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-sm text-content-main">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Signature Identified
                    </div>
                    <Badge variant="success">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Client-Side
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                    <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                      <span className="text-content-muted block mb-1">True Extension</span>
                      <strong className="text-brand-primary text-sm uppercase">{detected.extension}</strong>
                    </div>
                    <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                      <span className="text-content-muted block mb-1">MIME Type</span>
                      <strong className="text-content-main">{detected.mimeType}</strong>
                    </div>
                    <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                      <span className="text-content-muted block mb-1">Category</span>
                      <strong className="text-brand-secondary capitalize">{detected.category}</strong>
                    </div>
                    <div className="p-3 bg-surface-bg border border-surface-border rounded-custom">
                      <span className="text-content-muted block mb-1">File Size</span>
                      <strong className="text-content-main">{fileSize}</strong>
                    </div>
                  </div>

                  <div className="p-4 bg-surface-bg border border-surface-border rounded-custom text-xs text-content-muted">
                    Description: <strong className="text-content-main">{detected.description}</strong> ({fileName})
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: File Size Calculator */}
          {activeTab === 'calculator' && (
            <div className="space-y-6">
              <div className="p-5 bg-surface-bg border border-surface-border rounded-custom space-y-4">
                <h4 className="font-bold text-sm text-content-main flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-brand-primary" /> Storage Converter (Decimal vs Binary Units)
                </h4>

                <div>
                  <label className="block text-xs font-bold text-content-muted uppercase mb-1">
                    Enter Size in Bytes:
                  </label>
                  <input
                    type="number"
                    value={inputBytes}
                    onChange={(e) => setInputBytes(Math.max(0, Number(e.target.value)))}
                    className="w-full px-4 py-2.5 bg-surface-card border border-surface-border rounded-custom text-content-main text-sm font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono pt-2">
                  <div className="p-3 bg-surface-card border border-surface-border rounded-custom">
                    <span className="text-content-muted block mb-1">Kilobytes (KB)</span>
                    <strong className="text-content-main">{(inputBytes / 1000).toFixed(2)} KB</strong>
                  </div>
                  <div className="p-3 bg-surface-card border border-surface-border rounded-custom">
                    <span className="text-content-muted block mb-1">Megabytes (MB)</span>
                    <strong className="text-content-main">{(inputBytes / (1000 * 1000)).toFixed(2)} MB</strong>
                  </div>
                  <div className="p-3 bg-surface-card border border-surface-border rounded-custom">
                    <span className="text-content-muted block mb-1">Kibibytes (KiB - Binary)</span>
                    <strong className="text-brand-secondary">{(inputBytes / 1024).toFixed(2)} KiB</strong>
                  </div>
                  <div className="p-3 bg-surface-card border border-surface-border rounded-custom">
                    <span className="text-content-muted block mb-1">Mebibytes (MiB - Binary)</span>
                    <strong className="text-brand-secondary">{(inputBytes / (1024 * 1024)).toFixed(2)} MiB</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </Container>
    </main>
  );
}
