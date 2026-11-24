import React from 'react';
import { Container } from '../../components/layout/Container';
import { SaveInstaUniversalSuite } from '../../components/tools/SaveInstaUniversalSuite';

export const metadata = {
  title: 'ShareChat Video Downloader - Download ShareChat Videos Full HD Without Watermark | ClipVault',
  description: 'Download ShareChat videos, jokes, and trending status in high quality MP4 and MP3 directly to your device for free.',
};

export default function ShareChatVideoPage() {
  return (
    <main className="py-8 sm:py-14">
      <Container>
        <SaveInstaUniversalSuite
          defaultPlatform="sharechat"
          pageTitle="ShareChat Video Downloader"
          pageSubtitle="Download ShareChat videos, status, and trending clips in original Full HD MP4 and MP3. 100% Free, zero server storage, direct to your device."
        />
      </Container>
    </main>
  );
}
