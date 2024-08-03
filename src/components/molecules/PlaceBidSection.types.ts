export interface IPlaceBidSectionProps {
  auctionId: number;
  currentPriceServerSide: string;
  endsAt: string;
}

export interface IAuctionSocketData {
  auctionIdForSocket: number;
  amountForSocket: string;
  upcomingEndsAt: number;
}

export interface IAuctionEndStatusSocketData {
  isAuctionEnded: boolean;
}
