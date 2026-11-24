import React from 'react';
import { Container } from '../../components/layout/Container';
import { SaveInstaUniversalSuite } from '../../components/tools/SaveInstaUniversalSuite';

export const metadata = {
  title: 'Telegram Video Downloader - Download Public Telegram Channel Videos Online | ClipVault',
  description: 'Download Telegram public channel videos, clips, and audio tracks in high quality Full HD MP4 and MP3.',
};

export default function TelegramVideoPage() {
  return (
    <main className="py-8 sm:py-14">
      <Container>
        <SaveInstaUniversalSuite
          defaultPlatform="telegram"
          pageTitle="Telegram Public Video Downloader"
          pageSubtitle="Download public Telegram channel videos, clips, and media files in original high quality. Zero server storage, direct to your device."
        />
      </Container>
    </main>
  );
}
