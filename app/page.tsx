import React from 'react';
import { Container } from '../components/layout/Container';
import { SaveInstaUniversalSuite } from '../components/tools/SaveInstaUniversalSuite';

export default function HomePage() {
  return (
    <main className="py-8 sm:py-14">
      <Container>
        <SaveInstaUniversalSuite />
      </Container>
    </main>
  );
}
