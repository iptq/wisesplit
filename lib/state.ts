import { atom, PrimitiveAtom } from "jotai";
import { IReceiptItem } from "../components/ReceiptItem";
import parseInput from "./parseInput";

export const totalAtom = atom(0);
export const receiptAtom = atom<PrimitiveAtom<IReceiptItem>[]>([]);

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
      const personName = person.name;
      let accum = totals.get(personName) || 0;
      accum += eachPrice;
      totals.set(personName, accum);
    }
  }

  if (subtotalSum == 0) return totals;

  const newTotals = new Map();
  const proportion = totalValue / subtotalSum;
  for (const [person, value] of totals.entries()) {
    newTotals.set(person, value * proportion);
  }
  return newTotals;
});

export function addLine(line: string, setReceipt) {
  let parsed = parseInput(line);
  console.log(parsed);
  const price = atom(parsed.price || 0);
  const splitBetween = atom(
    [...parsed.splitBetween].map((a) => atom({ name: a }))
  );
  setReceipt((prev) => [
    ...prev,
    atom<IReceiptItem>({ name: parsed.itemName, price, splitBetween }),
  ]);
}
