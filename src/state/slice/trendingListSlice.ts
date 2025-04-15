import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TrendingCryptoCurrencyListType } from "../../types/common.types";

// Define a type for the slice state
interface TrendingCryptoListSliceType {
  list: TrendingCryptoCurrencyListType;
  currentPage: number;
  searchCoin: string;
}

// Define the initial state using that type
const initialState: TrendingCryptoListSliceType = {
  list: [],
  currentPage: 1,
  searchCoin: "",
};

const trendingCryptoListSlice = createSlice({
  name: "trendingCryptoList",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateTrendingCryptoList: (
      state,
      action: PayloadAction<TrendingCryptoCurrencyListType>
    ) => {
      state.list = action.payload;
    },
    updateTrendingPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    trendingCoinSearch: (state, action: PayloadAction<string>) => {
      state.searchCoin = action.payload;
    },
  },
});

export const {
  updateTrendingCryptoList,
  updateTrendingPage,
  trendingCoinSearch,
} = trendingCryptoListSlice.actions;

export default trendingCryptoListSlice.reducer;
