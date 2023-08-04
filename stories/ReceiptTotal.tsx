import { ReceiptItem, receiptItemSelectors } from "../src/store/receiptItem";
import { useAppSelector } from "../src/store";
import styles from "./ReceiptTotal.module.scss";
import { moneyFormatter } from "../lib/formatter";

export default function ReceiptTotal() {
  const totalValue = useAppSelector((state) => state.total.value);
  const receiptItems = useAppSelector((state) =>
    receiptItemSelectors.selectAll(state),
  );

  const total = computeTotal(totalValue, receiptItems);

  return (
    <>
      <ul className={styles.list}>
        {[...total.totalMap.entries()].map(([name, amount]) => (
          <li key={name} className={styles.person}>
            {name} : {moneyFormatter.format(amount)}
          </li>
        ))}
      </ul>
    </>
  );
}

interface Total {
  subtotal: number;
  totalMap: Map<string, number>;
}

function computeTotal(totalValue: number, receiptItems: ReceiptItem[]): Total {
  const totals = new Map();
  let subtotalSum = 0;

  for (const item of receiptItems) {
    const { price, splitBetween } = item;
    const numSplitters = splitBetween.length;
    if (numSplitters == 0) continue;

    const eachPrice = price / numSplitters;
    subtotalSum += price;
    for (const person of splitBetween) {
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
}
