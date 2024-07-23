import { configureStore } from '@reduxjs/toolkit';

import auctionReducer from './slices/auctionSlice';

export const store = configureStore({
  reducer: {
    auction: auctionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
