import { ConfigureStoreOptions, configureStore } from "@reduxjs/toolkit";
import { receiptItemSlice } from "./receiptItem";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { totalSlice } from "./total";

export const storeOptions = {
  reducer: {
    receiptItem: receiptItemSlice.reducer,
    total: totalSlice.reducer,
  },
};

export const store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
