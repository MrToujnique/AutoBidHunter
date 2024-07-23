import AuctionPage from '@/components/pages/AuctionPage/AuctionPage';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface IPageParams {
  params: {
    locale: string;
    auctionId: string;
  };
}

export async function generateMetadata({
  params,
}: IPageParams): Promise<Metadata> {
  const { locale, auctionId } = params;

  const t = await getTranslations({ locale, namespace: 'metadata' });

  // TODO adapt to query
  return {
    title: 'Auction page',
    description: 'Description of auction page',
  };
}

const page = async ({ params }: IPageParams) => {
  return <AuctionPage auctionId={params.auctionId} locale={params.locale} />;
};

export default page;
