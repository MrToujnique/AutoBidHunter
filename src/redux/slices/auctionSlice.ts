import { TAuction } from './../../types/Auction';
import { IAuctionSliceState } from '@/types/Auction';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IAuctionSliceState = {
  auctions: [],
  currentAuctionPrice: '0',
};

export const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    setAuctions: (
      state,
      { payload }: PayloadAction<{ auctions: TAuction[] }>,
    ) => {
      state.auctions = payload.auctions;
    },
    updateAuctionCurrentPrice: (
      state,
      { payload }: PayloadAction<{ currentPrice: string }>,
    ) => {
      state.currentAuctionPrice = payload.currentPrice;
    },
  },
});

export const { setAuctions, updateAuctionCurrentPrice } = auctionSlice.actions;

export default auctionSlice.reducer;
