import { atom, Atom, useAtom } from "jotai";
import { useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import Person, { IPerson } from "./Person";

export interface Props {
  splitBetweenAtom: Atom<Atom<IPerson>[]>;
}

export default function SplitBetween({ splitBetweenAtom }: Props) {
  const [splitBetween, setSplitBetween] = useAtom(splitBetweenAtom);
  const [input, setInput] = useState("");
  const [editing, setEditing] = useState(false);

  const startEditing = (_) => {
    setInput("");
    setEditing(true);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const person = { name: atom(input) };
    setSplitBetween([...splitBetween, atom(person)]);
    setEditing(false);
  };

  return (
    <div>
      Split between ({splitBetween.length}):
      {splitBetween.map((a, i) => (
        <Person
          personAtom={a}
          key={`split-${i}`}
          splitBetweenAtom={splitBetweenAtom}
        />
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
              onInput={(e) => setInput(e.target.value)}
            />
          </Form>
        ) : (
          "[+]"
        )}
      </Button>
    </div>
  );
}
