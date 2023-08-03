import { atom, PrimitiveAtom } from "jotai";
import { SetAtom } from "jotai/core/atom";
import { IPerson } from "../components/Person";
import { IReceiptItem, Receipt } from "../components/ReceiptItem";
import { parseAtomToJSON } from "./parseAtomToJSON";
import parseInput from "./parseInput";

export const totalAtom = atom(0);
export const receiptAtom = atom<PrimitiveAtom<IReceiptItem>[]>([]);

export const receiptAtomToJSON = atom((get) => {
  const receiptJSON: any[] = [];
  const receipt = get(receiptAtom);

  for (const itemAtom of receipt) {
    receiptJSON.push(parseAtomToJSON(itemAtom, get));
  }

  return receiptJSON;
});

export const receiptTotalAtom = atom((get) => {
  const totalValue = get(totalAtom);
  const receipt = get(receiptAtom);

  const totals = new Map();
  let subtotalSum = 0;
  for (const itemAtom of receipt) {
    const item = get(itemAtom);
    const price = get(item.price);
    const splitBetween = get(item.splitBetween);
    const numSplitters = splitBetween.length;
    if (numSplitters == 0) continue;

    const eachPrice = price / numSplitters;
    subtotalSum += price;
    for (const personAtom of splitBetween) {
      const person = get(personAtom);
      const personName = get(person.name);
      let accum = totals.get(personName) || 0;
      accum += eachPrice;
      totals.set(personName, accum);
    }
  }

  if (subtotalSum == 0) return { subtotal: subtotalSum, totalMap: totals };

  const newTotals = new Map();
  const proportion = totalValue / subtotalSum;
  for (const [person, value] of totals.entries()) {
    newTotals.set(person, value * proportion);
  }
  return { subtotal: subtotalSum, totalMap: newTotals };
});

export function addLine(line: string, receipt: Receipt, setReceipt: SetAtom<Receipt, void>) {
  let parsed = parseInput(line);

  const name: PrimitiveAtom<string> = atom(parsed.itemName);
  const price: PrimitiveAtom<number> = atom(parsed.price || 0);
  const splitBetween: PrimitiveAtom<PrimitiveAtom<IPerson>[]> = atom<PrimitiveAtom<IPerson>[]>(
    [...parsed.splitBetween].map((a) => atom<IPerson>({ name: atom(a) })),
  );

  const newReceiptItem = atom({
    name,
    price,
    splitBetween,
  });
  setReceipt([...receipt, newReceiptItem]);
}
