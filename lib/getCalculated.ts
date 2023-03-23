import { IReceiptItem } from "components/ReceiptItem";

export const getCalculated = (total: number, receipt: IReceiptItem[]) => {
  const totalValue = total;
  const totals = new Map();
  let subtotalSum = 0;
  for (const receiptItem of receipt) {
    const price = receiptItem.price;
    const splitBetween = receiptItem.splitBetween;
    const numSplitters = splitBetween.length;
    if (numSplitters == 0) continue;

    const eachPrice = price / numSplitters;
    subtotalSum += price;
    for (const person of splitBetween) {
      const personName = person.name;
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
};
