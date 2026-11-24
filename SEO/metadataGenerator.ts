import type { Metadata } from 'next';
import { brandConfig } from '../branding/brand.config';

export class SEOMetadataGenerator {
  static generate(params: {
    title?: string;
    description?: string;
    path?: string;
  } = {}): Metadata {
    const { title, description, path = '' } = params;

    const fullTitle = title 
      ? `${title} | ${brandConfig.shortName}`
      : `${brandConfig.websiteName} — ${brandConfig.tagline}`;

    const metaDescription = description || brandConfig.description;
    const canonicalUrl = `https://${brandConfig.domain}${path}`;

    return {
      title: fullTitle,
      description: metaDescription,
      applicationName: brandConfig.shortName,
      authors: [{ name: brandConfig.shortName }],
      keywords: [
        'direct to device download',
        'browser video compressor',
        'video trimmer online',
        'extract audio from video',
        'zero storage media tools',
        'wasm video processor'
      ],
      metadataBase: new URL(`https://${brandConfig.domain}`),
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: fullTitle,
        description: metaDescription,
        url: canonicalUrl,
        siteName: brandConfig.websiteName,
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: fullTitle,
        description: metaDescription,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }
}
