import type { Metadata } from 'next';
import '../globals.css';
import { Cormorant_Garamond } from 'next/font/google';
import { Chivo } from 'next/font/google';
import { getLocale } from 'next-intl/server';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant_garamond',
  weight: '500',
});

const chivo = Chivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-chivo',
});

export const metadata: Metadata = {
  title: 'Auto Bid Hunter',
  description: 'Best cars auctions platform ever made!',
};

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={cormorantGaramond.variable + ' ' + chivo.variable}
    >
      <body>{children}</body>
    </html>
  );
};

export default MainLayout;
