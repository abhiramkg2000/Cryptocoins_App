import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { CryptoCurrencyListType } from "../../types/common.types";

// Define a type for the slice state
interface CryptoListSliceType {
  list: CryptoCurrencyListType;
  currentPage: number;
  searchCoin: string;
  sortCriteria: string;
  sortOrder: boolean;
}

// Define the initial state using that type
const initialState: CryptoListSliceType = {
  list: [],
  currentPage: 1,
  searchCoin: "",
  sortCriteria: "market_cap_rank",
  sortOrder: false,
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
    sortMarketCapRank: (state) => {
      if (state.sortOrder) {
        state.list = state.list.sort(
          (a, b) => b.market_cap_rank! - a.market_cap_rank!
        );
      } else {
        state.list = state.list.sort(
          (a, b) => a.market_cap_rank! - b.market_cap_rank!
        );
      }
    },
    sortCurrentPrice: (state) => {
      if (state.sortOrder) {
        state.list = state.list.sort(
          (a, b) => a.current_price! - b.current_price!
        );
      } else {
        state.list = state.list.sort(
          (a, b) => b.current_price! - a.current_price!
        );
      }
    },
    sortName: (state) => {
      if (state.sortOrder) {
        state.list = state.list.sort((a, b) => {
          const nameA = a.name?.toLowerCase() ?? "";
          const nameB = b.name?.toLowerCase() ?? "";
          return nameB.localeCompare(nameA);
        });
      } else {
        state.list = state.list.sort((a, b) => {
          const nameA = a.name?.toLowerCase() ?? "";
          const nameB = b.name?.toLowerCase() ?? "";
          return nameA.localeCompare(nameB);
        });
      }
    },
    updateSortCriteria: (state, action: PayloadAction<string>) => {
      state.sortCriteria = action.payload;
    },
    updateSortOrder: (state, action: PayloadAction<boolean>) => {
      state.sortOrder = action.payload;
    },
    updatePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    coinSearch: (state, action: PayloadAction<string>) => {
      state.searchCoin = action.payload;
    },
  },
});

export const {
  updateCryptoList,
  sortMarketCapRank,
  sortCurrentPrice,
  sortName,
  updateSortCriteria,
  updateSortOrder,
  updatePage,
  coinSearch,
} = cryptoListSlice.actions;

export default cryptoListSlice.reducer;
