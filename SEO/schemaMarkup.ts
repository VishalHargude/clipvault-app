import { brandConfig } from '../branding/brand.config';

export class SchemaMarkup {
  static getWebApplicationSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: brandConfig.websiteName,
      alternateName: brandConfig.shortName,
      url: `https://${brandConfig.domain}`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All modern browsers (Desktop, Android, iOS)',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description: brandConfig.description,
      featureList: [
        'Direct-to-Device Download Streamer',
        'In-Browser Video Compressor',
        'Precision Video Trimmer',
        'Web Audio Extractor',
        'Zero Server Video Storage'
      ]
    };
  }

  static getOrganizationSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: brandConfig.shortName,
      url: `https://${brandConfig.domain}`,
      email: brandConfig.supportEmail,
    };
  }
}
