import { atom, PrimitiveAtom, useAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import type { NextPage } from "next";
import { useState } from "react";
import EditBox from "../components/EditBox";
import ReceiptItem, { IReceiptItem } from "../components/ReceiptItem";
import Totals from "../components/Totals";
import parseInput, { ParsedInputDisplay } from "../lib/parseInput";

const totalAtom = atom(0);
const receiptAtom = atom<PrimitiveAtom<IReceiptItem>[]>([]);

const receiptTotalAtom = atom((get) => {
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

const Home: NextPage = () => {
  const [receipt, setReceipt] = useAtom(receiptAtom);
  const [total] = useAtom(receiptTotalAtom);
  const [input, setInput] = useState("");

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const add = (e) => {
    e.preventDefault();
    let parsed = parseInput(input);
    console.log(parsed);
    const price = atom(parsed.price || 0);
    const splitBetween = atom(
      [...parsed.splitBetween].map((a) => atom({ name: a }))
    );
    setReceipt((prev) => [
      ...prev,
      atom<IReceiptItem>({ name: parsed.itemName, price, splitBetween }),
    ]);
    setInput("");
    return false;
  };

  return (
    <main>
      <h2>Items</h2>

      <form onSubmit={add}>
        <ParsedInputDisplay input={input} />

        <input
          autoFocus={true}
          type="text"
          placeholder="Add item..."
          onInput={(e) => setInput(e.target.value)}
          value={input}
          style={{ padding: "8px", fontSize: "1.5em" }}
        />
      </form>

      <div>
        Receipt Total:
        <EditBox valueAtom={totalAtom} />
      </div>

      <ul>
        {receipt.map((itemAtom, i) => {
          return (
            <li key={`receiptItem-${i}`}>
              <ReceiptItem itemAtom={itemAtom} />
            </li>
          );
        })}
      </ul>

      <div>
        Total breakdown:
        <ul>
          {[...total.entries()].map(([person, value], i) => (
            <li key={`breakdown-${i}`}>
              <b>{person}</b>: {formatter.format(value)}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Home;
