import { atom, Atom, useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";
import { receiptAtom } from "../lib/state";
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
  const [splitBetween, setSplitBetween] = useAtom(splitBetweenAtom);
  const [input, setInput] = useState("");
  const [editing, setEditing] = useState(false);

  const startEditing = (_) => {
    setInput("");
    setEditing(true);
  };

  const addPerson = (e) => {
    e.preventDefault();
    setSplitBetween([...splitBetween, atom({ name: input })]);
    setEditing(false);
  };

  return (
    <div>
      Split between ({splitBetween.length}):
      <ListGroup horizontal>
        {splitBetween.map((a, i) => (
          <Person
            personAtom={a}
            key={`split-${i}`}
            splitBetweenAtom={splitBetweenAtom}
          />
        ))}
        <ListGroup.Item onClick={startEditing}>
          {editing ? (
            <form onSubmit={addPerson}>
              <input
                autoFocus={true}
                type="text"
                value={input}
                onBlur={(_) => setEditing(false)}
                onInput={(e) => setInput(e.target.value)}
              />
            </form>
          ) : (
            "[+]"
          )}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

function Price({ priceAtom }) {
  return <EditBox valueAtom={priceAtom} />;
}

export default function ReceiptItem({ itemAtom }: Props) {
  const [receipt, setReceipt] = useAtom(receiptAtom);
  const [item, _] = useAtom(itemAtom);

  const removeSelf = (_) => {
    setReceipt([...receipt.filter((x) => x != itemAtom)]);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        Item price: <Price priceAtom={item.price} />
        <Badge
          bg="danger"
          pill
          onClick={removeSelf}
          style={{ cursor: "pointer" }}
        >
          &times;
        </Badge>
        <SplitBetween splitBetweenAtom={item.splitBetween} />
      </Card.Body>
    </Card>
  );
}
