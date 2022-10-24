import { Atom, useAtom } from "jotai";
import EditBox from "./EditBox";
import Person, { IPerson } from "./Person";

export interface IReceiptItem {
  name: string;
  price: Atom<number>;
  splitBetween: Atom<Atom<IPerson>[]>;
}

export interface Props {
  itemAtom: Atom<IReceiptItem>;
}

function SplitBetween({ splitBetweenAtom }) {
  const [splitBetween, _] = useAtom(splitBetweenAtom);
  return splitBetween.length > 0 ? (
    <div>
      Split between ({splitBetween.length}):
      {splitBetween.map((a, i) => (
        <Person personAtom={a} key={`split-${i}`} />
      ))}
    </div>
  ) : (
    <></>
  );
}

function Price({ priceAtom }) {
  return <EditBox valueAtom={priceAtom} />;
}

export default function ReceiptItem({ itemAtom }: Props) {
  const [item, _] = useAtom(itemAtom);
  return (
    <>
      <span>
        <b>{item.name}</b>
      </span>
      (<Price priceAtom={item.price} />)
      <SplitBetween splitBetweenAtom={item.splitBetween} />
    </>
  );
}
