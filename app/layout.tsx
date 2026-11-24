import './globals.css';
import { BrandProvider } from '../branding/BrandProvider';
import { LanguageProvider } from '../modules/i18n/LanguageContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEOMetadataGenerator } from '../SEO/metadataGenerator';
import { SchemaMarkup } from '../SEO/schemaMarkup';
import { adsConfig } from '../configuration/ads.config';

export const metadata = SEOMetadataGenerator.generate();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webAppSchema = SchemaMarkup.getWebApplicationSchema();
  const orgSchema = SchemaMarkup.getOrganizationSchema();

  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#FF8500" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ClipVault" />
        {adsConfig.globalEnabled && adsConfig.adsenseClientId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsConfig.adsenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) { console.log('ClipVault SW registered:', registration.scope); },
                    function(err) { console.log('ClipVault SW registration failed:', err); }
                  );
                });
              }
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-brand-primary selection:text-white overflow-x-hidden min-h-screen flex flex-col" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
        <LanguageProvider>
          <BrandProvider>
            <Header />
            <div className="flex-1 flex flex-col w-full">{children}</div>
            <Footer />
          </BrandProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
