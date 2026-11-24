import React from 'react';
import { Container } from '../../../components/layout/Container';
import { Card } from '../../../components/ui/Card';
import { Alert } from '../../../components/ui/Alert';
import { brandConfig } from '../../../branding/brand.config';

export default function DMCAPage() {
  return (
    <main className="py-12">
      <Container className="max-w-4xl space-y-8">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-amber-400">Intellectual Property</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-content-main tracking-tight mt-1">
            DMCA & Copyright Compliance
          </h1>
          <p className="text-xs text-content-muted mt-2">Last Updated: November 2026</p>
        </div>

        <Card className="p-8 space-y-6 text-sm text-content-muted leading-relaxed">
          <Alert variant="info" title="Zero-Storage Takedown Reality">
            {brandConfig.websiteName} does not host, store, or cache user media. Any media requested via direct URLs resides exclusively on the external third-party server hosting that file.
          </Alert>

          <h2 className="text-base font-bold text-content-main">1. Statutory Grievance Redressal (IT Act, 2000)</h2>
          <p>
            In compliance with Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, rights holders may contact our designated officer:
          </p>
          <div className="p-4 bg-surface-bg border border-surface-border rounded-custom text-xs font-mono space-y-1">
            <div>Officer: <strong>Grievance & DMCA Compliance Officer</strong></div>
            <div>Platform: <strong>{brandConfig.websiteName}</strong></div>
            <div>Official Email: <strong>{brandConfig.supportEmail}</strong></div>
            <div>Jurisdiction: <strong>Maharashtra, India / Global Safe Harbor</strong></div>
          </div>

          <h2 className="text-base font-bold text-content-main">2. Submitting an Infringement Notice</h2>
          <p>
            To submit an intellectual property notice, provide:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Identification of the copyrighted work claimed to be infringed.</li>
            <li>Specific URL or tool reference involved.</li>
            <li>Your physical or electronic signature and contact information.</li>
            <li>A statement of good faith belief that the use is not authorized.</li>
          </ul>
        </Card>
      </Container>
    </main>
  );
}
