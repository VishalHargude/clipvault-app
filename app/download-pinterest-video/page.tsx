import React from 'react';
import { Container } from '../../components/layout/Container';
import { SaveInstaUniversalSuite } from '../../components/tools/SaveInstaUniversalSuite';

export const metadata = {
  title: 'Pinterest Video Downloader - Download Pinterest Video Pins & Images | ClipVault',
  description: 'Download Pinterest video pins and original high-resolution pin images. Free, fast, direct-to-device.',
};

export default function DownloadPinterestVideoPage() {
  return (
    <main className="py-10 sm:py-16">
      <Container>
        <SaveInstaUniversalSuite
          defaultPlatform="pinterest"
          pageTitle="Pinterest Video & Pin Downloader"
          pageSubtitle="Download public Pinterest video pins and original high-resolution pin images directly to your device."
        />
      </Container>
    </main>
  );
}
