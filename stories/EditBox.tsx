import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import styles from "./EditBox.module.scss";

export interface Props {
  value: string;
  setValue?: (_: string) => void;
  inputType?: string;
  validator?: (arg: string) => string;
}

export default function EditBox({ value, setValue, inputType, validator }: Props) {
  const [innerValue, setInnerValue] = useState(value);
  const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);
  const inputRef = useCallback(
    (el: HTMLInputElement | null) => {
      setInputEl(el);
      el?.select?.();
    },
    [inputEl],
  );

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const [isEditing, setIsEditing] = useState(false);

  const startEditing = (_: any) => {
    setInnerValue(String(value));
    setIsEditing(true);
    inputEl?.select?.();
  };

  const finalize = (e: SyntheticEvent) => {
    e.preventDefault();
    if (validator) {
      const validateResult = validator(innerValue);
      if (!validateResult) return;
    }

    setValue?.(innerValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form onSubmit={finalize} style={{ display: "inline" }} data-testid="editBox-form">
        <input
          className={styles.editingBox}
          autoFocus={true}
          type={inputType ?? "text"}
          value={innerValue}
          onBlur={finalize}
          onInput={(e) => setInnerValue(e.currentTarget.value)}
          ref={inputRef}
          data-testid="editBox-edit"
        />
      </form>
    );
  } else {
    return (
      <span className={styles.clickableContainer} onClick={startEditing} data-testid="editBox-view">
        {value}
      </span>
    );
  }
}
