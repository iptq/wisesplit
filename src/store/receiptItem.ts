import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface ReceiptItem {
  id: string;
  createdAt: number;
  name: string;
  price: number;
  splitBetween: string[];
}

const receiptItemAdapter = createEntityAdapter<ReceiptItem>({
  selectId: (receiptItem) => receiptItem.id,
  sortComparer: (a, b) => a.createdAt - b.createdAt,
});

export const receiptItemSlice = createSlice({
  name: "receiptItems",
  initialState: receiptItemAdapter.getInitialState(),
  reducers: {
    createNew: receiptItemAdapter.addOne,
    updateOne: receiptItemAdapter.updateOne,
  },
});

export const receiptItemSelectors = receiptItemAdapter.getSelectors<RootState>(
  (state) => state.receiptItem,
);
