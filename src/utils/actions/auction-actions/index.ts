'use server';

import { updateAuctionBid } from '@/lib/db';
import { IUpdateAuctionBidInput } from '@/types/Auction';

export const bidTheAuction = async ({
  amount,
  auctionId,
  userId,
}: IUpdateAuctionBidInput) => {
  try {
    const result = await updateAuctionBid({
      amount,
      auctionId,
      userId,
    });

    return result;
  } catch (error) {
    return error;
  }
};
