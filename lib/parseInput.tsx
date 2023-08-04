export interface ParsedInput {
  itemName: string;
  price?: number;
  splitBetween: Set<string>;
}

export interface Props {
  input: string;
}

export function ParsedInputDisplay({ input }: Props) {
  const parsed = parseInput(input);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div style={{ fontSize: ".8em" }}>
      <div>
        <b>{parsed.itemName}</b>

        {parsed.price !== undefined && <>({formatter.format(parsed.price)})</>}
      </div>

      {parsed.splitBetween.size > 0 && (
        <>
          Split between:
          <ul>
            {[...parsed.splitBetween].map((personName) => (
              <li key={personName}>{personName}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function parseInput(line: string): ParsedInput {
  const words = line.split(" ");

  let price = undefined;
  const splitBetween = new Set<string>();
  const final = [];
  for (const word of words) {
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
