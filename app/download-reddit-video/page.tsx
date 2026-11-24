import React from 'react';
import { Container } from '../../components/layout/Container';
import { SaveInstaUniversalSuite } from '../../components/tools/SaveInstaUniversalSuite';

export const metadata = {
  title: 'Reddit Video Downloader - Download Reddit Videos with Audio Online | ClipVault',
  description: 'Download Reddit videos with sound in Full HD 1080p MP4. Free, no registration required, direct to your device.',
};

export default function DownloadRedditVideoPage() {
  return (
    <main className="py-10 sm:py-16">
      <Container>
        <SaveInstaUniversalSuite
          defaultPlatform="reddit"
          pageTitle="Reddit Video Downloader (with Audio)"
          pageSubtitle="Download public Reddit videos with combined audio in Full HD 1080p MP4 directly to your device."
        />
      </Container>
    </main>
  );
}
