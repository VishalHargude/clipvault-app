import React from 'react';
import { Container } from '../../components/layout/Container';
import { SaveInstaUniversalSuite } from '../../components/tools/SaveInstaUniversalSuite';

export const metadata = {
  title: 'Instagram Photo Downloader - Download Instagram Photos & Carousel HD | ClipVault',
  description: 'Download Instagram photos, carousel multiple images, and post pictures in full original resolution.',
};

export default function InstagramPhotoPage() {
  return (
    <main className="py-10 sm:py-16">
      <Container>
        <SaveInstaUniversalSuite
          defaultPlatform="instagram"
          pageTitle="Instagram Photo & Carousel Downloader"
          pageSubtitle="Download Instagram photos, high-resolution pictures, and multi-image carousel posts in original quality for free. Zero server storage, direct to your device."
        />
      </Container>
    </main>
  );
}
