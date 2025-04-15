import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface TopNavigationSliceType {
  value: string;
}

// Define the initial state using that type
const initialState: TopNavigationSliceType = {
  value: "all",
};

const topNavigationSlice = createSlice({
  name: "topNavigation",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateTopNavigation: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updateTopNavigation } = topNavigationSlice.actions;

export default topNavigationSlice.reducer;
