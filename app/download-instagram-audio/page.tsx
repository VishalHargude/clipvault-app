import React from 'react';
import { Container } from '../../components/layout/Container';
import { SaveInstaUniversalSuite } from '../../components/tools/SaveInstaUniversalSuite';

export const metadata = {
  title: 'Instagram Audio Downloader - Extract MP3 / Audio from Instagram Reels | ClipVault',
  description: 'Extract and download high-quality audio and background music from Instagram Reels and videos for free.',
};

export default function InstagramAudioPage() {
  return (
    <main className="py-10 sm:py-16">
      <Container>
        <SaveInstaUniversalSuite
          defaultPlatform="instagram"
          pageTitle="Instagram Audio & MP3 Downloader"
          pageSubtitle="Extract and download audio tracks, background songs, and voice clips from Instagram Reels and Videos in pristine 320kbps MP3."
        />
      </Container>
    </main>
  );
}
