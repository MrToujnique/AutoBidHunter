'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const PlaceBidSection = () => {
  const t = useTranslations();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('messages.auction')}</CardTitle>
        <CardDescription>
          {t('messages.insertSumYouWantToOffer')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            <Input type="number" placeholder={t('messages.bidAmount')} />
            <div className="flex items-center gap-2">
              <span>PLN</span>
            </div>
          </div>
          <Button type="submit">{t('messages.bid')}</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PlaceBidSection;
