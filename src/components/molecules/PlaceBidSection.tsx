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
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import {
  IAuctionSocketData,
  IPlaceBidSectionProps,
} from './PlaceBidSection.types';
import { bidTheAuction } from '@/utils/actions/auction-actions';
import { UpdatedBidSchema } from '@/schemas/AuctionSchemas';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { updateAuctionCurrentPrice } from '@/redux/slices/auctionSlice';
import RotatingLoader from '../atoms/RotatingLoader/RotatingLoader';

const socket = io('http://localhost:5000');

const PlaceBidSection = ({
  auctionId,
  currentPriceServerSide,
}: IPlaceBidSectionProps) => {
  const t = useTranslations();

  const dispatch = useAppDispatch();

  const currentPrice = useAppSelector(
    (state) => state.auction.currentAuctionPrice,
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [bidInputValue, setBidInputValue] = useState<string>('0');

  useEffect(() => {
    dispatch(
      updateAuctionCurrentPrice({ currentPrice: currentPriceServerSide }),
    );
    setBidInputValue((Number(currentPriceServerSide) + 300).toString());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    socket.on(
      'price_updated',
      ({ auctionIdForSocket, amountForSocket }: IAuctionSocketData) => {
        if (auctionIdForSocket === auctionId) {
          setBidInputValue((Number(amountForSocket) + 300).toString());
          dispatch(
            updateAuctionCurrentPrice({
              currentPrice: amountForSocket,
            }),
          );
        }
      },
    );
  }, [socket]);

  const handleAddBid = async () => {
    try {
      // TODO refactor this hardcoded userId when adapting auth
      const result = await bidTheAuction({
        amount: bidInputValue,
        auctionId,
        userId: 1,
      });

      const validatedResult = UpdatedBidSchema.parse(result);

      socket.emit('new_bid', {
        auctionIdForSocket: auctionId,
        amountForSocket: validatedResult.currentPrice,
      });
    } catch (error) {
      // TODO generate toast
      console.log('error', error);
    }
  };

  return (
    <>
      <div className="space-y-2 border rounded-lg p-4">
        <h2 className="text-2xl font-bold">{t('carSpecs.price')}</h2>
        {isLoading ? (
          <RotatingLoader />
        ) : (
          <p className="text-4xl font-bold">{currentPrice} PLN</p>
        )}
      </div>
      {isLoading ? null : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t('messages.auction')}</CardTitle>
            <CardDescription>
              {t('messages.insertSumYouWantToOffer')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                <Input
                  type="number"
                  placeholder={t('messages.bidAmount')}
                  value={bidInputValue}
                  onChange={(e) => setBidInputValue(e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <span>PLN</span>
                </div>
              </div>
              <Button onClick={handleAddBid}>{t('messages.bid')}</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default PlaceBidSection;
