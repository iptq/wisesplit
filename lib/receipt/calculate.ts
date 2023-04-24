import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "lib/store";
import { Receipt, receiptSelectors } from "./slice";

export const selectCalculated = createSelector(
  (state: RootState, id: string) => receiptSelectors.selectById(state, id),
  (receipt: Receipt | undefined) => {
    const totals = new Map();
    let subtotalSum = 0;

    if (receipt === undefined) return { subtotal: 0, totalMap: totals };

    for (const receiptItem of receipt.items) {
      const price = receiptItem.price;
      const splitBetween = receiptItem.splitBetween;
      const numSplitters = splitBetween.length;
      if (numSplitters == 0) continue;

      const eachPrice = price / numSplitters;
      subtotalSum += price;
      for (const person of splitBetween) {
        // const personName = person.name;
        const personName = person;
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
);
