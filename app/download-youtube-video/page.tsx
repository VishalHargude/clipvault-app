import React from 'react';
import { Container } from '../../components/layout/Container';
import { SaveInstaUniversalSuite } from '../../components/tools/SaveInstaUniversalSuite';

export const metadata = {
  title: 'YouTube Shorts & Video Downloader - Download YouTube Shorts Online Full HD | ClipVault',
  description: 'Download YouTube Shorts and videos in Full HD 1080p MP4 and MP3 audio. Free, fast, direct-to-device.',
};

export default function DownloadYouTubeVideoPage() {
  return (
    <main className="py-10 sm:py-16">
      <Container>
        <SaveInstaUniversalSuite
          defaultPlatform="youtube"
          pageTitle="YouTube Shorts & Video Downloader"
          pageSubtitle="Download public YouTube Shorts and videos in Full HD 1080p MP4 with high quality audio. Completely free, no login."
        />
      </Container>
    </main>
  );
}
