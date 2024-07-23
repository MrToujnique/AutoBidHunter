'use client';

import { useRef } from 'react';
import { IMainPagePreloaderProps } from './MainPagePreloader.types';
import { useAppSelector } from '@/hooks/useRedux';
import { store } from '@/redux/store';
import { setAuctions } from '@/redux/slices/auctionSlice';

const MainPagePreloader = ({ auctions }: IMainPagePreloaderProps) => {
  const isLoaded = useRef<boolean>(false);
  const isLoadedAuctions = useAppSelector((state) => state.auction.auctions);

  if (!isLoaded.current) {
    isLoaded.current = true;

    if (isLoadedAuctions?.length === 0) {
      store.dispatch(
        setAuctions({
          auctions,
        }),
      );
    }
  }

  return null;
};

export default MainPagePreloader;
