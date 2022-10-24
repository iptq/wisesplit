import { Atom, useAtom } from "jotai";
import { useState } from "react";

export interface Props {
  valueAtom: Atom<number>;
}

export default function EditBox({ valueAtom }: Props) {
  const [value, setValue] = useAtom(valueAtom);
  const [valueInput, setValueInput] = useState("");
  const [editing, setEditing] = useState(false);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const startEditing = (_: any) => {
    setValueInput(value.toString());
    setEditing(true);
  };

  const finalize = (e: Event) => {
    e.preventDefault();
    try {
      const n = parseFloat(valueInput);
      setValue(n);
      setEditing(false);
    } catch (e) {
      // TODO: Handle
    }
  };

  if (editing) {
    return (
      <form onSubmit={finalize} style={{ display: "inline" }}>
        <input
          autoFocus={true}
          type="number"
          step="0.01"
          value={valueInput}
          onBlur={finalize}
          onInput={(e) => setValueInput(e.target.value)}
        />
      </form>
    );
  } else {
    return <span onClick={startEditing}>{formatter.format(value)}</span>;
  }
}
