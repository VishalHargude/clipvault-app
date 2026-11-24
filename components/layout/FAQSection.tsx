'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'Why are my files never stored on your servers?',
    a: 'We built this platform using a Direct-to-Device architecture. Processing (video compression, image resizing, audio extraction) is performed right in your browser using modern WebAssembly and Web Audio technologies. We do not have a media storage database, ensuring 100% privacy and eliminating server bandwidth costs.'
  },
  {
    q: 'Do I need to sign up or create an account to use the tools?',
    a: 'No. Strictly following our privacy standards, public users never need to log in, register, or provide an email address. All public utilities are freely accessible immediately.'
  },
  {
    q: 'Why are direct downloads from YouTube or Instagram marked disabled?',
    a: 'In strict compliance with Architecture Rule 9 (Never bypass DRM/CORS/Auth) and Rule 11 (Never advertise unsupported direct downloads), we respect platform terms of service. Social platforms restrict third-party unauthorized scraping. We refuse to display fake buttons or violate copyright law.'
  },
  {
    q: 'How does in-browser video compression compare to cloud servers?',
    a: 'Because video processing occurs on your device GPU/CPU, there is zero time wasted uploading a 1GB file to a server and re-downloading it. For files up to 500MB, local processing is dramatically faster and safer.'
  },
  {
    q: 'Does this platform work on Android Chrome and iPhone Safari?',
    a: 'Yes. On mobile devices, downloads pipe directly into your device Files app or Downloads folder, and memory buffers are immediately revoked to protect your phone’s RAM and battery.'
  }
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-content-main tracking-tight flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6 text-brand-primary" /> Frequently Asked Questions
        </h2>
        <p className="text-sm text-content-muted">
          Clear, transparent answers about our technology, zero-storage model, and privacy guarantees.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <Card
              key={idx}
              className="p-5 cursor-pointer transition-colors"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-bold text-sm sm:text-base text-content-main select-none">
                  {faq.q}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-content-muted transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'rotate-180 text-brand-primary' : ''
                  }`}
                />
              </div>
              {isOpen && (
                <div className="mt-3 pt-3 border-t border-surface-border text-xs sm:text-sm text-content-muted leading-relaxed">
                  {faq.a}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}
