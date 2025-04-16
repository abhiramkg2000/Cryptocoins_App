import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  CryptoCurrencyDataType,
  WatchlistCryptoCurrencyType,
} from "../../types/common.types";

// Define a type for the slice state
interface WatchlistSliceType {
  list: WatchlistCryptoCurrencyType[];
  currentPage: number;
  searchCoin: string;
  // marketCapRankSort: boolean;
}

// Define the initial state using that type
const initialState: WatchlistSliceType = {
  list: [],
  currentPage: 1,
  searchCoin: "",
  // marketCapRankSort: false,
};

const watchlistSlice = createSlice({
  name: "watchlist",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToWatchlist: (
      state,
      action: PayloadAction<{
        coinData: CryptoCurrencyDataType;
        bookmark: boolean;
      }>
    ) => {
      const newCoin = {
        ...action.payload.coinData,
        bookmark: action.payload.bookmark,
      };
      state.list = [...state.list, newCoin];
    },
    deleteFromWatchlist: (
      state,
      action: PayloadAction<CryptoCurrencyDataType>
    ) => {
      state.list = state.list.filter((coin) => coin.id !== action.payload.id);
    },
    // watchlistSortMarketCapRank: (state, action: PayloadAction<boolean>) => {
    //   state.marketCapRankSort = action.payload;
    // },
    updateWatchlistPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    watchlistCoinSearch: (state, action: PayloadAction<string>) => {
      state.searchCoin = action.payload;
    },
  },
});

export const {
  addToWatchlist,
  deleteFromWatchlist,
  // watchlistSortMarketCapRank,
  updateWatchlistPage,
  watchlistCoinSearch,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
