import React from 'react';
import { Container } from '../../components/layout/Container';
import { SaveInstaUniversalSuite } from '../../components/tools/SaveInstaUniversalSuite';

export const metadata = {
  title: 'Instagram Reels Downloader - Download Instagram Reels Video Full HD with Audio | ClipVault SaveInsta',
  description: 'Download Instagram Reels in high quality MP4 1080p with original audio and sound. 100% free, unlimited, and fast.',
};

export default function InstagramReelsPage() {
  return (
    <main className="py-10 sm:py-16">
      <Container>
        <SaveInstaUniversalSuite
          defaultPlatform="instagram"
          pageTitle="Instagram Reels Downloader"
          pageSubtitle="Download Instagram Reels videos in Full HD with crystal-clear audio. Fast, unlimited, zero server storage, direct to your device."
        />
      </Container>
    </main>
  );
}
