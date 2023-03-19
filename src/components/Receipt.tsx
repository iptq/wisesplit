import { createSignal, For, Show } from "solid-js";

type IReceiptItem = ParsedInput;

export default function Receipt() {
  const [getReceiptItems, setReceiptItems] = createSignal([] as IReceiptItem[]);
  const [getEditBoxText, setEditBoxText] = createSignal("");
  const [getActualTotal, setActualTotal] = createSignal(0);

  const receiptTotal = () =>
    getReceiptItems()
      .map((it) => it.price ?? 0)
      .reduce((x, a) => x + a, 0);

  const receiptSplits = () => {
    const totalValue = getActualTotal();
    const receiptItems = getReceiptItems();
    const totals = new Map();

    let subtotalSum = 0;
    for (const item of receiptItems) {
      if (item.price === undefined) continue;
      const numSplitters = item.splitBetween.size;
      if (numSplitters === 0) continue;

      const eachPrice = item.price / numSplitters;
      subtotalSum += item.price;

      for (const person of item.splitBetween) {
        let accum = totals.get(person) || 0;
        accum += eachPrice;
        totals.set(person, accum);
      }
    }

    if (subtotalSum == 0) return { subtotal: subtotalSum, totalMap: totals };

    const newTotals = new Map();
    const proportion = totalValue / subtotalSum;
    for (const [person, value] of totals.entries()) {
      newTotals.set(person, value * proportion);
    }

    return { subtotal: subtotalSum, totalMap: newTotals };
  };

  const addItem = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const parsedInput = parseInput(getEditBoxText());
    setEditBoxText("");

    setReceiptItems([...getReceiptItems(), parsedInput]);
    return false;
  };

  let splits = receiptSplits();

  return (
    <div>
      <form onSubmit={addItem}>
        <input
          type="text"
          value={getEditBoxText()}
          onChange={(e) => setEditBoxText(e.target.value)}
        />
      </form>
      <ol>
        <For each={getReceiptItems()}>
          {(receiptItem, i) => (
            <li>
              {receiptItem.itemName}
              <Show when={receiptItem.price}>(${receiptItem.price})</Show>
            </li>
          )}
        </For>
      </ol>
      Total: {receiptTotal()}
      <br />
      Actual total:{" "}
      <input
        type="text"
        value={getActualTotal()}
        onChange={(e) => setActualTotal(parseInt(e.target.value))}
      />
      <br />
      Splits ({receiptSplits().totalMap.size}):
      <ol>
        <For each={[...receiptSplits().totalMap.entries()]}>
          {([person, amount], i) => (
            <li>
              {person} : {amount}
            </li>
          )}
        </For>
      </ol>
    </div>
  );
}

export interface ParsedInput {
  itemName: string;
  price?: number;
  splitBetween: Set<string>;
}

export function parseInput(line: string): ParsedInput {
  const words = line.split(" ");

  let price = undefined;
  const splitBetween = new Set<string>();
  const final = [];
  for (let word of words) {
    if (word.startsWith("$") && word.length > 1) {
      price = parseFloat(word.slice(1));
      continue;
    }

    if (word.startsWith("@") && word.length > 1) {
      splitBetween.add(word.slice(1));
      continue;
    }

    final.push(word);
  }

  const itemName = final.join(" ");
  return { itemName, price, splitBetween };
}
