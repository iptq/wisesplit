import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { Button, Form } from "react-bootstrap";
import Person, { IPerson } from "./Person";
import { IReceiptItem, Receipt } from "./ReceiptItem";

export interface Props {
  curItem: IReceiptItem;
  receipt: Receipt;
  setReceipt: Dispatch<SetStateAction<Receipt>>;
}

export default function SplitBetween({ curItem, setReceipt, receipt }: Props) {
  const { splitBetween } = curItem;
  const [input, setInput] = useState("");
  const [editing, setEditing] = useState(false);

  const startEditing: MouseEventHandler = () => {
    setInput("");
    setEditing(true);
  };

  const addPerson = (e: SyntheticEvent) => {
    e.preventDefault();
    const person: IPerson = { name: input };
    curItem.splitBetween = [...splitBetween, person];
    setReceipt([...receipt]);
    setEditing(false);
  };

  const updatePersonName = (person: IPerson, name: string) => {
    person.name = name;
    const newSplitBetween = [...splitBetween];
    curItem.splitBetween = newSplitBetween;
    setReceipt([...receipt]);
  };

  const removePerson = (person: IPerson) => {
    const newSplitBetween = [...splitBetween.filter((x) => x != person)];
    curItem.splitBetween = newSplitBetween;
    setReceipt([...receipt]);
  };

  return (
    <div>
      Split between ({splitBetween.length}):
      {splitBetween.map((a, i) => (
        <Person
          person={a}
          key={`split-${i}`}
          removePerson={removePerson}
          updatePersonName={updatePersonName}
        />
      ))}
      {editing ? (
        <Form onSubmit={addPerson}>
          <Form.Control
            autoFocus={true}
            type="text"
            value={input}
            placeholder="Add person to split with..."
            onBlur={() => setEditing(false)}
            onInput={(e) => setInput(e.currentTarget.value)}
          />
        </Form>
      ) : (
        <Button onClick={startEditing} variant="default">
          [+]
        </Button>
      )}
    </div>
  );
}
