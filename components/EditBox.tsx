import { PrimitiveAtom, useAtom } from "jotai";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import styled from "styled-components";

export interface Props<T> {
  valueProp: T;
  formatter?: (arg: T) => string;
  inputType?: string;
  validator: (arg: string) => T | null;
  onBlur?: (value: T) => void;
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
  valueProp,
  formatter,
  inputType,
  validator,
  onBlur,
}: Props<T>) {
  const [valueInput, setValueInput] = useState("");
  const [editing, setEditing] = useState(false);

  const startEditing = (_: any) => {
    setValueInput(String(valueProp));
    setEditing(true);
  };

  const finalize = (e: SyntheticEvent) => {
    e.preventDefault();
    const validateResult = validator(valueInput);
    if (validateResult !== null) {
      onBlur?.(validateResult);
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
        {formatter ? formatter(valueProp) : String(valueProp)}
      </ClickableContainer>
    );
  }
}
