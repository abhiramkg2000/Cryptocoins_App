import { configureStore } from "@reduxjs/toolkit";

import topNavigationSlice from "../slice/topNavigationSlice";
import cryptoListSlice from "../slice/cryptoListSlice";
import trendingCryptoListSlice from "../slice/trendingListSlice";
import watchlistSlice from "../slice/watchlistSlice";

export const store = configureStore({
  reducer: {
    topNavigation: topNavigationSlice,
    listPage: cryptoListSlice,
    trendingPage: trendingCryptoListSlice,
    watchlistPage: watchlistSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
