import { atom, Atom, useAtom } from "jotai";
import { useState } from "react";
import { ListGroup } from "react-bootstrap";
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
