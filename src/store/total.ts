import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TotalState {
  value: number;
}

export const totalSlice = createSlice({
  name: "total",
  initialState: { value: 0 },
  reducers: {
    setTotal(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
  },
});

export const { setTotal } = totalSlice.actions;
