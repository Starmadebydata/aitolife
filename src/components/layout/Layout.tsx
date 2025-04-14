import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { useTranslation } from '@utils/i18n';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
  keywords,
  ogImage,
}) => {
  const { t } = useTranslation('common');
  const siteTitle = title ? `${title} | AIToLife.net` : 'AIToLife.net - 日常生活AI应用指南';
  const siteDescription = description || t('meta.description');
  const siteKeywords = keywords || t('meta.keywords');
  const siteOgImage = ogImage || `${process.env.NEXT_PUBLIC_SITE_URL || ''}/images/og-image.jpg`;

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={siteKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={siteOgImage} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AIToLife.net" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={siteOgImage} />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout; 