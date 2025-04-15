import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { CryptoCurrencyListType } from "../../types/common.types";

// Define a type for the slice state
interface CryptoListSliceType {
  list: CryptoCurrencyListType;
  currentPage: number;
  searchCoin: string;
  marketCapRankSort: boolean;
}

// Define the initial state using that type
const initialState: CryptoListSliceType = {
  list: [],
  currentPage: 1,
  searchCoin: "",
  marketCapRankSort: false,
};

const cryptoListSlice = createSlice({
  name: "cryptoList",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateCryptoList: (
      state,
      action: PayloadAction<CryptoCurrencyListType>
    ) => {
      state.list = action.payload;
    },
    sortMarketCapRank: (state, action: PayloadAction<boolean>) => {
      state.marketCapRankSort = action.payload;
    },
    updatePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    coinSearch: (state, action: PayloadAction<string>) => {
      state.searchCoin = action.payload;
    },
  },
});

export const { updateCryptoList, sortMarketCapRank, updatePage, coinSearch } =
  cryptoListSlice.actions;

export default cryptoListSlice.reducer;
