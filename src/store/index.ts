import { configureStore } from "@reduxjs/toolkit";
import { receiptItemSlice } from "./receiptItem";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    receiptItem: receiptItemSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
