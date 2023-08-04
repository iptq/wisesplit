import { useAppSelector } from "../src/store";
import { receiptItemSelectors, receiptItemSlice } from "../src/store/receiptItem";

export function useAllPeople(): Set<string> {
  const receiptItems = useAppSelector((state) => receiptItemSelectors.selectAll(state));

  return new Set(receiptItems.flatMap((item) => item.splitBetween));
}
