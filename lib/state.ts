import { Dispatch, SetStateAction } from "react";
import { Receipt } from "../components/ReceiptItem";
import parseInput from "./parseInput";

export function addLine(
  line: string,
  receipt: Receipt,
  setReceipt: Dispatch<SetStateAction<Receipt>>
) {
  let parsed = parseInput(line);

  const newReceiptItem = {
    name: parsed.itemName,
    price: parsed.price || 0,
    splitBetween: [...parsed.splitBetween].map((name) => ({name})),
  }

  setReceipt([...receipt, newReceiptItem]);
  return newReceiptItem;
}
