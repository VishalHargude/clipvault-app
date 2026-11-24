import React from 'react';
import { Card } from '../ui/Card';
import { Link2, Cpu, DownloadCloud, ShieldCheck } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: <Link2 className="w-6 h-6 text-brand-primary" />,
    title: 'Provide Media or Link',
    description: 'Select a local video/image file or paste an authorized direct media stream link.'
  },
  {
    step: '02',
    icon: <Cpu className="w-6 h-6 text-brand-secondary" />,
    title: 'Local Browser Processing',
    description: 'Compression, trimming, and extraction occur in-memory via Web Workers and WebAssembly. 0 KB server upload.'
  },
  {
    step: '03',
    icon: <DownloadCloud className="w-6 h-6 text-emerald-400" />,
    title: 'Direct-to-Device Save',
    description: 'Piped straight to your local hard drive or phone gallery via native browser download APIs.'
  },
  {
    step: '04',
    icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
    title: 'Instant Memory Revocation',
    description: 'All temporary in-memory buffers and Blob URLs are immediately destroyed to protect your privacy.'
  }
];

export function HowItWorks() {
  return (
    <section className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-content-main tracking-tight">
          How Direct-to-Device Works
        </h2>
        <p className="text-sm text-content-muted">
          Our architecture eliminates server bottlenecks by leveraging your device’s local computing power.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s) => (
          <Card key={s.step} className="p-6 relative overflow-hidden flex flex-col justify-between">
            <span className="absolute top-4 right-4 text-3xl font-extrabold text-surface-border select-none">
              {s.step}
            </span>
            <div className="mb-4 w-12 h-12 rounded-custom bg-surface-bg border border-surface-border flex items-center justify-center">
              {s.icon}
            </div>
            <div>
              <h3 className="font-bold text-base text-content-main mb-1.5">{s.title}</h3>
              <p className="text-xs text-content-muted leading-relaxed">{s.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
