import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  CryptoCurrencyDataType,
  TrendingCryptoCurrencyType,
} from "../../types/common.types";

// Define a type for the slice state
interface WatchlistSliceType {
  list: (CryptoCurrencyDataType | TrendingCryptoCurrencyType)[];
  currentPage: number;
  searchCoin: string;
}

// Define the initial state using that type
const initialState: WatchlistSliceType = {
  list: [],
  currentPage: 1,
  searchCoin: "",
};

const watchlistSlice = createSlice({
  name: "watchlist",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateWatchlist: (
      state,
      action: PayloadAction<CryptoCurrencyDataType | TrendingCryptoCurrencyType>
    ) => {
      state.list = [...state.list, action.payload];
    },
    updateWatchlistPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    watchlistCoinSearch: (state, action: PayloadAction<string>) => {
      state.searchCoin = action.payload;
    },
  },
});

export const { updateWatchlist, updateWatchlistPage, watchlistCoinSearch } =
  watchlistSlice.actions;

export default watchlistSlice.reducer;
