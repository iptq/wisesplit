import { Person, ReceiptItem } from "./schema";

export default function parseInput(line: string): ReceiptItem {
  const words = line.split(" ");

  let price = 0.0;

  const splitBetween = new Set<Person>();
  const final = [];
  for (let word of words) {
    if (word.startsWith("$") && word.length > 1) {
      price = parseFloat(word.slice(1));
      continue;
    }

    if (word.startsWith("@") && word.length > 1) {
      splitBetween.add({ name: word.slice(1) });
      continue;
    }

    final.push(word);
  }

  const name = final.join(" ");
  return { name, price, splitBetween };
}
