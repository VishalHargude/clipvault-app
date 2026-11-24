import React from 'react';
import { Container } from '../../../components/layout/Container';
import { Card } from '../../../components/ui/Card';
import { Alert } from '../../../components/ui/Alert';
import { brandConfig } from '../../../branding/brand.config';

export default function PrivacyPage() {
  return (
    <main className="py-12">
      <Container className="max-w-4xl space-y-8">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-brand-secondary">Privacy Policy</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-content-main tracking-tight mt-1">
            Zero-Storage Privacy Architecture
          </h1>
          <p className="text-xs text-content-muted mt-2">Last Updated: November 2026</p>
        </div>

        <Card className="p-8 space-y-6 text-sm text-content-muted leading-relaxed">
          <Alert variant="success" title="Privacy by Design">
            We cannot view, store, inspect, or sell your private video or audio files because they <strong>never leave your device</strong>.
          </Alert>

          <h2 className="text-base font-bold text-content-main">1. Zero File Retention</h2>
          <p>
            Unlike traditional cloud media services that upload private files to data centers, all operations on {brandConfig.websiteName} occur in your browser's private memory space. We maintain 0 media database records and 0 cloud storage buckets.
          </p>

          <h2 className="text-base font-bold text-content-main">2. Automatic Memory Revocation (Rule 7)</h2>
          <p>
            Every temporary JavaScript Blob URL is automatically revoked immediately after processing completes, releasing browser memory and preventing memory leakage on mobile devices.
          </p>

          <h2 className="text-base font-bold text-content-main">3. No Public Login or User Tracking</h2>
          <p>
            Public users can access all tools freely without registration, login, profile creation, or mandatory email collection. No third-party behavioral cookies are deployed on media processing tools.
          </p>
        </Card>
      </Container>
    </main>
  );
}
