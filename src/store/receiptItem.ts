import { RootState } from ".";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

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
    deleteOne: receiptItemAdapter.removeOne,
    deleteAll: receiptItemAdapter.removeAll,
  },
});

export const receiptItemSelectors = receiptItemAdapter.getSelectors<RootState>(
  (state) => state.receiptItem,
);
