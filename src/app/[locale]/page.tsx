import MainPage from '@/components/pages/MainPage/MainPage';
import { Metadata } from 'next';
import React from 'react';

interface Params {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = params;

  // const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: 'Auto Bid Hunter',
    description: 'Sprzedaj u nas swoje 4 kółka!',
  };
}

const Home = ({ params }: Params) => {
  return <MainPage locale={params.locale} />;
};

export default Home;
