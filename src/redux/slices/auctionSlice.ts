import { TAuction } from './../../types/Auction';
import { IAuctionSliceState } from '@/types/Auction';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IAuctionSliceState = {
  auctions: [],
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
  },
});

export const { setAuctions } = auctionSlice.actions;

export default auctionSlice.reducer;
