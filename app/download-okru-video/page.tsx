import React from 'react';
import { Container } from '../../components/layout/Container';
import { SaveInstaUniversalSuite } from '../../components/tools/SaveInstaUniversalSuite';

export const metadata = {
  title: 'Ok.ru Video Downloader - Download Odnoklassniki Videos Online HD | ClipVault',
  description: 'Download Odnoklassniki (OK.ru) videos and movies in Full HD MP4 directly to your mobile phone or PC for free.',
};

export default function OkRuVideoPage() {
  return (
    <main className="py-8 sm:py-14">
      <Container>
        <SaveInstaUniversalSuite
          defaultPlatform="ok-ru"
          pageTitle="Ok.ru Video Downloader"
          pageSubtitle="Download Odnoklassniki (OK.ru) public videos, movies, and clips in crisp HD MP4 directly to your device without installing software."
        />
      </Container>
    </main>
  );
}
