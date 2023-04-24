import { PrimitiveAtom, useAtom } from "jotai";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import styled from "styled-components";

import styles from "./EditBox.module.scss";

export interface Props<T> {
  valueProp: T;
  formatter?: (arg: T) => string;
  inputType?: string;
  validator: (arg: string) => T | null;
  onBlur?: (value: T) => void;
}

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
        <input
          className={styles.editingBox}
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
      <span className={styles.clickableContainer} onClick={startEditing}>
        {formatter ? formatter(valueProp) : String(valueProp)}
      </span>
    );
  }
}
