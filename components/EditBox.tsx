import { Atom, useAtom } from "jotai";
import { useState } from "react";
import styled from "styled-components";

export interface Props {
  valueAtom: Atom<number>;
}

const ClickableContainer = styled.span`
  display: inline-block;
  padding: 4px 10px;
  margin: 4px;
  border: 1px solid #eee;
  border-radius: 5px;
  width: 120px;

  &:hover {
    background-color: #eee;
  }
`;

const EditingBox = styled.input`
  display: inline-block;
  padding: 4px 10px;
  margin: 4px;
  border: 1px solid #eee;
  border-radius: 5px;
  width: 120px;
`;

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
      if (isNaN(n) || !isFinite(n)) return;
      setValue(n);
      setEditing(false);
    } catch (e) {
      // TODO: Handle
    }
  };

  if (editing) {
    return (
      <form onSubmit={finalize} style={{ display: "inline" }}>
        <EditingBox
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
    return (
      <ClickableContainer onClick={startEditing}>
        {formatter.format(value)}
      </ClickableContainer>
    );
  }
}
