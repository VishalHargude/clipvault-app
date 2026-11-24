import React from 'react';
import { Container } from '../../components/layout/Container';
import { SaveInstaUniversalSuite } from '../../components/tools/SaveInstaUniversalSuite';

export const metadata = {
  title: 'Snapchat Video Downloader - Download Snapchat Spotlight & Stories Online HD | ClipVault',
  description: 'Download Snapchat Spotlight videos and public story clips in Full HD MP4 directly to your phone or computer for free.',
};

export default function SnapchatVideoPage() {
  return (
    <main className="py-8 sm:py-14">
      <Container>
        <SaveInstaUniversalSuite
          defaultPlatform="snapchat"
          pageTitle="Snapchat Spotlight & Story Downloader"
          pageSubtitle="Download Snapchat Spotlight videos, public stories, and creator snaps in crystal-clear Full HD. 100% Free, zero server storage, direct to your device."
        />
      </Container>
    </main>
  );
}
