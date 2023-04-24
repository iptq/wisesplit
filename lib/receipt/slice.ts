import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import parseInput from "lib/parseInput";
import { RootState } from "lib/store";
import { z } from "zod";

export const receiptItemSchema = z.object({
  name: z.string(),
  price: z.number(),
  splitBetween: z.string().array(),
});

export const receiptSchema = z.object({
  id: z.string(),
  items: receiptItemSchema.array(),
  total: z.number(),
});

export type Receipt = z.infer<typeof receiptSchema>;
export type ReceiptItem = z.infer<typeof receiptItemSchema>;

export const emptyReceipt = (id: string): Receipt => ({
  id,
  items: [],
  total: 0.0,
});

interface AddItem {
  id: string;
  line: string;
}

const receiptAdapter = createEntityAdapter<Receipt>({
  selectId: (receipt) => receipt.id,

  // sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const receiptSlice = createSlice({
  name: "counter",

  initialState: receiptAdapter.getInitialState(),

  reducers: {
    createReceipt: receiptAdapter.addOne,

    loadReceipt: (state, action: PayloadAction<Receipt>) => {
      receiptAdapter.upsertOne(state, {
        ...action.payload,
      });
    },

    addItem: (state, action: PayloadAction<AddItem>) => {
      let parsed = parseInput(action.payload.line);
      const id = action.payload.id;

      let prev = state.entities[id] ;
      if (prev === undefined || prev === null) {
        receiptAdapter.addOne(state, emptyReceipt(id));
        return;
      }

      const newItem: ReceiptItem = {
        name: parsed.itemName,
        price: parsed.price || 0,
        splitBetween: [...parsed.splitBetween],
      };

      console.log("Adding", prev, action);

      receiptAdapter.updateOne(state, {
        id: id,
        changes: { items: [...prev.items, newItem] },
      });
    },
  },
});

export const receiptSelectors = receiptAdapter.getSelectors<RootState>(
  (state) => state.receipts
);

export const { createReceipt, loadReceipt, addItem } = receiptSlice.actions;
export default receiptSlice.reducer;
