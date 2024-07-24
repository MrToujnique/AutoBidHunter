export interface IPlaceBidSectionProps {
  auctionId: number;
  currentPriceServerSide: string;
}

export interface IAuctionSocketData {
  auctionIdForSocket: number;
  amountForSocket: string;
}
