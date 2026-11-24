import React from 'react';
import { Container } from '../../components/layout/Container';
import { Card } from '../../components/ui/Card';
import { DirectDownloadEngine } from '../../components/tools/DirectDownloadEngine';
import { SEOMetadataGenerator } from '../../SEO/metadataGenerator';
import { DownloadCloud, ShieldCheck, Zap } from 'lucide-react';

export const metadata = SEOMetadataGenerator.generate({
  title: 'Direct URL Stream Saver — Zero Server Storage',
  description: 'Download authorized media directly from source URLs straight to your device disk without server proxying.',
  path: '/direct-download'
});

export default function DirectDownloadPage() {
  return (
    <main className="py-12">
      <Container className="max-w-4xl space-y-8">
        <div>
          <div className="flex items-center gap-2 text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4" /> Direct-to-Device Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-content-main tracking-tight">
            Direct-to-Device Stream Saver
          </h1>
          <p className="text-sm sm:text-base text-content-muted mt-2">
            Stream authorized media from cloud storage, CDN endpoints, and direct links straight to your local device. Zero server storage, zero proxy bandwidth.
          </p>
        </div>

        <Card className="p-6 sm:p-8">
          <DirectDownloadEngine />
        </Card>

        {/* Feature Explanations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <Card className="p-5">
            <h4 className="font-bold text-sm text-content-main mb-2">1. Zero Server Proxy</h4>
            <p className="text-xs text-content-muted leading-relaxed">
              Your browser opens a direct connection to the content host. Media streams never transit through or accumulate in server memory.
            </p>
          </Card>
          <Card className="p-5">
            <h4 className="font-bold text-sm text-content-main mb-2">2. Direct Disk Streaming</h4>
            <p className="text-xs text-content-muted leading-relaxed">
              Desktop browsers use File System Access API (showSaveFilePicker) to write chunks directly to disk with zero RAM overflow.
            </p>
          </Card>
          <Card className="p-5">
            <h4 className="font-bold text-sm text-content-main mb-2">3. Auto Memory Cleanup</h4>
            <p className="text-xs text-content-muted leading-relaxed">
              On Android and iOS, temporary Blob URLs are revoked immediately after browser download initiation to protect device memory.
            </p>
          </Card>
        </div>
      </Container>
    </main>
  );
}
