import { Atom, useAtom } from "jotai";
import { useState } from "react";
import styled from "styled-components";

export interface CanBeConvertedToString {
  toString(): string;
}

export interface Props<T extends CanBeConvertedToString> {
  valueAtom: Atom<T>;
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

export default function EditBox<T extends CanBeConvertedToString>({
  valueAtom,
  formatter,
  inputType,
  validator,
}: Props<T>) {
  const [value, setValue] = useAtom(valueAtom);
  const [valueInput, setValueInput] = useState("");
  const [editing, setEditing] = useState(false);

  const startEditing = (_: any) => {
    setValueInput(value.toString());
    setEditing(true);
  };

  const finalize = (e: Event) => {
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
          onInput={(e) => setValueInput(e.target.value)}
        />
      </form>
    );
  } else {
    return (
      <ClickableContainer onClick={startEditing}>
        {formatter ? formatter(value) : value.toString()}
      </ClickableContainer>
    );
  }
}
