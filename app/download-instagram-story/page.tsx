import React from 'react';
import { Container } from '../../components/layout/Container';
import { SaveInstaUniversalSuite } from '../../components/tools/SaveInstaUniversalSuite';

export const metadata = {
  title: 'Instagram Story Downloader - Download Instagram Stories & Highlights HD | ClipVault',
  description: 'Download Instagram Stories and Highlights in Full HD anonymously and fast.',
};

export default function InstagramStoryPage() {
  return (
    <main className="py-10 sm:py-16">
      <Container>
        <SaveInstaUniversalSuite
          defaultPlatform="instagram"
          pageTitle="Instagram Story & Highlights Downloader"
          pageSubtitle="Download Instagram Stories and Highlights in high quality Full HD. 100% anonymous, zero server storage, direct to your device."
        />
      </Container>
    </main>
  );
}
