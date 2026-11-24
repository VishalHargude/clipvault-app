import React from 'react';
import { Container } from '../../components/layout/Container';
import { SaveInstaUniversalSuite } from '../../components/tools/SaveInstaUniversalSuite';

export const metadata = {
  title: 'Twitter / X Video Downloader - Download X Videos & GIFs Online Full HD | ClipVault',
  description: 'Download Twitter and X videos in Full HD 1080p MP4 and MP3 audio. Free, no registration required, direct to your device.',
};

export default function DownloadTwitterVideoPage() {
  return (
    <main className="py-10 sm:py-16">
      <Container>
        <SaveInstaUniversalSuite
          defaultPlatform="x-twitter"
          pageTitle="Twitter / X Video & GIF Downloader"
          pageSubtitle="Download public Twitter and X video clips, GIFs, and tweets in Full HD MP4 directly to your phone or computer."
        />
      </Container>
    </main>
  );
}
