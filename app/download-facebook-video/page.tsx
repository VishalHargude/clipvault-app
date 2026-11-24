import React from 'react';
import { Container } from '../../components/layout/Container';
import { SaveInstaUniversalSuite } from '../../components/tools/SaveInstaUniversalSuite';

export const metadata = {
  title: 'Facebook Video Downloader - Download Facebook Videos & Reels Online Full HD | ClipVault',
  description: 'Download Facebook videos and reels online in Full HD 1080p with audio. Completely free, no registration required, direct to your device.',
};

export default function DownloadFacebookVideoPage() {
  return (
    <main className="py-10 sm:py-16">
      <Container>
        <SaveInstaUniversalSuite
          defaultPlatform="facebook"
          pageTitle="Facebook Video & Reels Downloader"
          pageSubtitle="Download Facebook Watch videos, public Reels, and clips in Full HD 1080p MP4. Free, fast, direct-to-device."
        />
      </Container>
    </main>
  );
}
