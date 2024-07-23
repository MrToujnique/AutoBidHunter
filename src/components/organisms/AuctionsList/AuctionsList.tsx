'use client';

import React from 'react';
import { translateCondition } from '@/functions';
import { useAppSelector } from '@/hooks/useRedux';
import Link from 'next/link';
import { IAuctionsListProps } from './AuctionsList.types';

const AuctionsList = ({ locale }: IAuctionsListProps) => {
  const auctions = useAppSelector((state) => state.auction.auctions);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {auctions.map((auction) => (
        <Link href={`${locale}/auction/${auction.id}`}>
          <div
            key={auction.id}
            className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden border border-gray"
          >
            <img
              src="https://wykop.pl/cdn/c3201142/comment_MJtwAOw38qR1ZzwjNnhEFYijUCYDsSoP.jpg"
              alt={`${auction.make} ${auction.model}`}
              width={400}
              height={225}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                {auction.make} {auction.model}
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 dark:text-gray-400">
                  {auction.year} - {auction.mileage} km -{' '}
                  {translateCondition(auction.isNew)}
                </span>
                <span className="text-primary font-semibold">
                  {auction.currentPrice.toLocaleString()} PLN
                </span>
              </div>
              {/* TODO time remaining with schema db */}
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                Pozostały czas: 2h 15m
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AuctionsList;
