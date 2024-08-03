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
  IAuctionEndStatusSocketData,
  IAuctionSocketData,
  IPlaceBidSectionProps,
} from './PlaceBidSection.types';
import { bidTheAuction } from '@/utils/actions/auction-actions';
import { UpdatedBidSchema } from '@/schemas/AuctionSchemas';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { updateAuctionCurrentPrice } from '@/redux/slices/auctionSlice';
import RotatingLoader from '../atoms/RotatingLoader/RotatingLoader';
import { formatTimeLeft } from '@/functions';
import TimerIcon from '@/assets/icons/TimerIcon';
import clsx from 'clsx';

const socket = io('http://localhost:5000');

const PlaceBidSection = ({
  auctionId,
  currentPriceServerSide,
  endsAt,
}: IPlaceBidSectionProps) => {
  const t = useTranslations();

  const dispatch = useAppDispatch();

  const currentPrice = useAppSelector(
    (state) => state.auction.currentAuctionPrice,
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [bidInputValue, setBidInputValue] = useState<string>('0');

  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const [endsAtLive, setEndsAtLive] = useState<string>(endsAt);

  const [isTimeManipulated, setIsTimeManipulated] = useState<boolean>(false);

  const initialCheckAuctionStatus = new Date(endsAtLive).getTime() < Date.now();

  const [isAuctionEnded, setIsAuctionEnded] = useState<boolean>(
    initialCheckAuctionStatus,
  );

  const [isBidding, setIsBidding] = useState<boolean>(false);

  useEffect(() => {
    if (isBidding && !isAuctionEnded) handleAddBid();
  }, [isBidding, isAuctionEnded]);

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const timeLeft = new Date(endsAtLive).getTime() - now;

      if (timeLeft <= 0) {
        clearInterval(timer);
        setIsAuctionEnded(true);
        return 0;
      } else {
        setTimeLeft(timeLeft);
      }
    };

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const currentTime = Date.now();
    socket.emit('get_server_time', { currentClientTime: currentTime });

    dispatch(
      updateAuctionCurrentPrice({ currentPrice: currentPriceServerSide }),
    );
    setBidInputValue((Number(currentPriceServerSide) + 300).toString());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    socket.on(
      'received_server_time',
      ({ isTimeManipulated }: { isTimeManipulated: boolean }) => {
        setIsTimeManipulated(isTimeManipulated);

        const timeRemaining = new Date(endsAtLive).getTime() - Date.now();

        setTimeLeft(timeRemaining);
      },
    );

    socket.on(
      'received_auction_end_status',
      ({ isAuctionEnded }: IAuctionEndStatusSocketData) => {
        setIsAuctionEnded(isAuctionEnded);
        setIsBidding(true);
      },
    );

    socket.on(
      'price_updated',
      ({
        auctionIdForSocket,
        amountForSocket,
        upcomingEndsAt,
      }: IAuctionSocketData) => {
        const remainingTimeToUpdate = upcomingEndsAt - Date.now();
        setEndsAtLive(new Date(upcomingEndsAt).toISOString());
        setTimeLeft(remainingTimeToUpdate);

        if (auctionIdForSocket === auctionId) {
          // TODO implement bidding outbid value when it will be customizable by user (now it is hardcoded 300)
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

  const checkAuctionTimeStatus = () => {
    socket.emit('check_if_auction_ended', {
      endsAt: new Date(endsAtLive).getTime(),
    });
  };

  const handleAddBid = async () => {
    try {
      if (!timeLeft) return;
      // TODO refactor this hardcoded userId when adapting auth
      const result = await bidTheAuction({
        amount: bidInputValue,
        auctionId,
        userId: 1,
        endsAt: endsAtLive,
        timeLeft,
      });

      const validatedResult = UpdatedBidSchema.parse(result);

      const upcomingEndsAt = validatedResult.endsAt.getTime();

      socket.emit('new_bid', {
        auctionIdForSocket: auctionId,
        amountForSocket: validatedResult.currentPrice,
        upcomingEndsAt,
      });

      setIsBidding(false);
    } catch (error) {
      // TODO generate toast
      console.log('error', error);
    }
  };

  const isAuctionEnding = !timeLeft || timeLeft < 120000;

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
          {isTimeManipulated ? (
            <div className="flex p-6 content-center">
              <span className="text-3xl font-bold text-center text-red-600">
                {t('errorMessages.timeManipulationDetected')}
              </span>
            </div>
          ) : (
            <>
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
                      disabled={isAuctionEnded}
                    />
                    <div className="flex items-center gap-2">
                      <span>PLN</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <TimerIcon className="h-4 w-4" />
                      <span
                        className={clsx(
                          isAuctionEnding ? 'text-red-600' : 'text-green-600',
                        )}
                      >
                        {isAuctionEnded
                          ? t('messages.auctionEnded')
                          : formatTimeLeft(timeLeft)}
                      </span>
                    </div>
                    <Button
                      onClick={checkAuctionTimeStatus}
                      disabled={isAuctionEnded}
                    >
                      {t('messages.bid')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default PlaceBidSection;
