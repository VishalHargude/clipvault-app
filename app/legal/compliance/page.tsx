import React from 'react';
import { Container } from '../../../components/layout/Container';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { ARCHITECTURE_RULES } from '../../../configuration/architecture.config';
import { CheckCircle2, ShieldCheck, DollarSign, Smartphone } from 'lucide-react';

export default function CompliancePage() {
  return (
    <main className="py-12">
      <Container className="space-y-10">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">Rule 8 Compliance</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-content-main tracking-tight mt-1">
            Architecture & Cost Transparency Report
          </h1>
          <p className="text-sm sm:text-base text-content-muted mt-2 max-w-3xl">
            Complete technical audit documenting our zero-storage guarantees, cost breakdown, and cross-browser execution model.
          </p>
        </div>

        {/* Cost Comparison Table */}
        <Card className="p-6 sm:p-8 space-y-6">
          <h3 className="font-extrabold text-lg text-content-main">Cost & Infrastructure Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-surface-border text-content-muted">
                  <th className="pb-3 font-bold uppercase">Dimension</th>
                  <th className="pb-3 font-bold uppercase text-red-400">Legacy Proxy Server</th>
                  <th className="pb-3 font-bold uppercase text-emerald-400">Direct-to-Device (Kinetix)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border text-content-muted">
                <tr>
                  <td className="py-3 font-semibold text-content-main">Media Storage Database</td>
                  <td className="py-3 text-red-400">$200 - $2,000 / mo (TB/PB storage)</td>
                  <td className="py-3 text-emerald-400 font-bold">$0.00 / mo (Zero DB)</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-content-main">Egress Bandwidth (Video Transfer)</td>
                  <td className="py-3 text-red-400">2x proxy egress ($$$)</td>
                  <td className="py-3 text-emerald-400 font-bold">$0.00 / mo (Direct client stream)</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-content-main">Transcoding CPU Clusters</td>
                  <td className="py-3 text-red-400">$500 - $5,000 / mo (Heavy GPU)</td>
                  <td className="py-3 text-emerald-400 font-bold">$0.00 / mo (Client-Side WASM)</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-content-main">Static Asset CDN (Cloudflare Pages)</td>
                  <td className="py-3">$20 / mo</td>
                  <td className="py-3 text-emerald-400 font-bold">$0.00 / mo (Free Tier)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* 11 Rules Matrix */}
        <Card className="p-6 sm:p-8 space-y-6">
          <h3 className="font-extrabold text-lg text-content-main">11 Critical Architecture Requirements Audit</h3>
          <div className="space-y-4">
            {ARCHITECTURE_RULES.map((rule) => (
              <div key={rule.id} className="p-4 bg-surface-bg border border-surface-border rounded-custom flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-bold text-sm text-content-main mb-1">
                    Rule #{rule.id}: {rule.title}
                  </div>
                  <div className="text-xs text-content-muted leading-relaxed">
                    {rule.enforcementMethod}
                  </div>
                </div>
                <Badge variant="success">{rule.verificationStatus}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Mobile Testing & Device Compatibility (Rule 10) */}
        <Card className="p-6 sm:p-8 space-y-6">
          <h3 className="font-extrabold text-lg text-content-main flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-brand-primary" /> Cross-Browser & Mobile Execution Model (Rule 10)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-content-muted">
            <div className="p-4 bg-surface-bg border border-surface-border rounded-custom space-y-2">
              <strong className="text-content-main block">Android Chrome</strong>
              <p>Streams trigger native Android Download Manager. Files save straight to <code>/sdcard/Download/</code>. Immediate memory revocation prevents memory spikes.</p>
            </div>
            <div className="p-4 bg-surface-bg border border-surface-border rounded-custom space-y-2">
              <strong className="text-content-main block">iPhone Safari (iOS)</strong>
              <p>Respects WebKit 1GB memory boundary by chunked garbage collection hints. Direct download triggers native Files save dialog.</p>
            </div>
            <div className="p-4 bg-surface-bg border border-surface-border rounded-custom space-y-2">
              <strong className="text-content-main block">Desktop Chrome / Edge</strong>
              <p>Supports File System Access API (showSaveFilePicker) with direct streaming to disk, requiring 0 MB RAM accumulation.</p>
            </div>
          </div>
        </Card>
      </Container>
    </main>
  );
}
