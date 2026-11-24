import React from 'react';
import { Container } from '../../components/layout/Container';
import { SaveInstaUniversalSuite } from '../../components/tools/SaveInstaUniversalSuite';

export const metadata = {
  title: 'TikTok Video Downloader - Download TikTok Without Watermark Full HD | ClipVault',
  description: 'Download TikTok videos without watermark in Full HD 1080p MP4 and MP3 audio. Free, no registration required, direct to your device.',
};

export default function DownloadTikTokVideoPage() {
  return (
    <main className="py-10 sm:py-16">
      <Container>
        <SaveInstaUniversalSuite
          defaultPlatform="tiktok"
          pageTitle="TikTok Video Downloader (No Watermark)"
          pageSubtitle="Download clean TikTok videos without watermark in Full HD 1080p and extract audio MP3. 100% free and private."
        />
      </Container>
    </main>
  );
}
