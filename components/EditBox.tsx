import { PrimitiveAtom, useAtom } from "jotai";
import { SyntheticEvent, useState } from "react";
import styled from "styled-components";

export interface Props<T> {
  valueAtom: PrimitiveAtom<T>;
  formatter?: (arg: T) => string;
  inputType?: string;
  validator: (arg: string) => T | null;
}

const ClickableContainer = styled.span`
  display: inline-block;
  padding: 4px 10px;
  margin: 4px;
  border: 1px solid #eee;
  border-radius: 5px;

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
`;

export default function EditBox<T>({
  valueAtom,
  formatter,
  inputType,
  validator,
}: Props<T>) {
  const [value, setValue] = useAtom(valueAtom);
  const [valueInput, setValueInput] = useState("");
  const [editing, setEditing] = useState(false);

  const startEditing = (_: any) => {
    setValueInput(String(value));
    setEditing(true);
  };

  const finalize = (e: SyntheticEvent) => {
    e.preventDefault();
    const validateResult = validator(valueInput);
    if (validateResult !== null) {
      setValue(validateResult);
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <form onSubmit={finalize} style={{ display: "inline" }}>
        <EditingBox
          autoFocus={true}
          type={inputType ?? "text"}
          step="0.01"
          value={valueInput}
          onBlur={finalize}
          onInput={(e) => setValueInput(e.currentTarget.value)}
        />
      </form>
    );
  } else {
    return (
      <ClickableContainer onClick={startEditing}>
        {formatter ? formatter(value) : String(value)}
      </ClickableContainer>
    );
  }
}
