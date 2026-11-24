import React from 'react';
import { Container } from '../../components/layout/Container';
import { SaveInstaUniversalSuite } from '../../components/tools/SaveInstaUniversalSuite';

export const metadata = {
  title: 'Moj Video Downloader - Download Moj App Videos Without Watermark Full HD | ClipVault',
  description: 'Download Moj short videos and reels without watermark in high quality Full HD MP4 and MP3 audio for free.',
};

export default function MojVideoPage() {
  return (
    <main className="py-8 sm:py-14">
      <Container>
        <SaveInstaUniversalSuite
          defaultPlatform="moj"
          pageTitle="Moj Video Downloader (No Watermark)"
          pageSubtitle="Download Moj app short videos and creator reels in high-speed original Full HD 1080p. Zero server storage, direct to your device."
        />
      </Container>
    </main>
  );
}
