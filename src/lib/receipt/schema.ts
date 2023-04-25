import { z } from "zod";

export const personSchema = z.object({
  name: z.string(),
});

export const receiptItemSchema = z.object({
  name: z.string(),
  price: z.number(),
  splitBetween: z.set(personSchema),
});

export const receiptSchema = z.object({
  id: z.string(),
  name: z.string(),
  items: receiptItemSchema.array(),
  total: z.number(),
});

export type Receipt = z.infer<typeof receiptSchema>;
export type ReceiptItem = z.infer<typeof receiptItemSchema>;
export type Person = z.infer<typeof personSchema>;

export const emptyReceipt = (id: string): Receipt => ({
  id,
  name: "Receipt",
  items: [],
  total: 0.0,
});
