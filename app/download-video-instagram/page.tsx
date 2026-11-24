import React from 'react';
import { Container } from '../../components/layout/Container';
import { SaveInstaUniversalSuite } from '../../components/tools/SaveInstaUniversalSuite';

export const metadata = {
  title: 'Instagram Video Downloader - Download Instagram Videos Online Full HD | ClipVault SaveInsta',
  description: 'Download Instagram Videos, Reels, Stories and Photos in Full HD 1080p for free. Fast, high quality, direct-to-device saving with zero server storage.',
};

export default function DownloadVideoInstagramPage() {
  return (
    <main className="py-10 sm:py-16">
      <Container>
        <SaveInstaUniversalSuite
          defaultPlatform="instagram"
          pageTitle="Instagram Video & Reels Downloader"
          pageSubtitle="Download Instagram Videos, Reels, Stories & IGTV online in high quality 1080p, 2K, 4K for free. Zero server storage, direct to your device."
        />
      </Container>
    </main>
  );
}
