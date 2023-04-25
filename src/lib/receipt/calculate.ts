import { Receipt } from "./schema";

export default function calculate(receipt: Receipt) {
    const totals = new Map();
    let subtotalSum = 0;

    if (receipt === undefined) return { subtotal: 0, totalMap: totals };

    for (const receiptItem of receipt.items) {
      const price = receiptItem.price;
      const splitBetween = receiptItem.splitBetween;
      const numSplitters = splitBetween.size;
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
    const proportion = receipt.total / subtotalSum;
    for (const [person, value] of totals.entries()) {
      newTotals.set(person, value * proportion);
    }
    return { subtotal: subtotalSum, totalMap: newTotals };
}
