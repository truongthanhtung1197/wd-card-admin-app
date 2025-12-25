import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "..";

const initialState = {
  hasFormChanged: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setHasFormChanged: (state, action: PayloadAction<boolean>) => {
      state.hasFormChanged = action.payload;
    },
  },
});

export const CommonSelector = {
  selectHasFormChanged: (state: RootState) => state.common.hasFormChanged,
};

export const CommonActions = commonSlice.actions;
export const CommonReducer = commonSlice.reducer;
