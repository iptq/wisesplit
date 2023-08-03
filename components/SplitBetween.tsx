import { atom, PrimitiveAtom, useAtom } from "jotai";
import { SyntheticEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Person, { IPerson } from "./Person";

export interface Props {
  splitBetweenAtom: PrimitiveAtom<PrimitiveAtom<IPerson>[]>;
}

export default function SplitBetween({ splitBetweenAtom }: Props) {
  const [splitBetween, setSplitBetween] = useAtom(splitBetweenAtom);
  const [input, setInput] = useState("");
  const [editing, setEditing] = useState(false);

  const startEditing = (_: any) => {
    setInput("");
    setEditing(true);
  };

  const addPerson = (e: SyntheticEvent) => {
    e.preventDefault();
    const person: IPerson = { name: atom(input) };
    setSplitBetween([...splitBetween, atom(person)]);
    setEditing(false);
  };

  return (
    <div>
      Split between ({splitBetween.length}):
      {splitBetween.map((a, i) => (
        <Person personAtom={a} key={`split-${i}`} splitBetweenAtom={splitBetweenAtom} />
      ))}
      <Button onClick={startEditing} variant="default">
        {editing ? (
          <Form onSubmit={addPerson}>
            <Form.Control
              autoFocus={true}
              type="text"
              value={input}
              placeholder="Add person to split with..."
              onBlur={(_) => setEditing(false)}
              onInput={(e) => setInput(e.currentTarget.value)}
            />
          </Form>
        ) : (
          "[+]"
        )}
      </Button>
    </div>
  );
}
