import { SyntheticEvent, useCallback, useEffect, useState } from "react";

export interface EditBoxProps {
  value: string;
  setValue?: (_: string) => void;
  inputType?: string;
  validator?: (arg: string) => string | null;
  inputClassName?: string;
  textClassName?: string;
  format?: (_: string) => string;
}

export default function EditBox({
  inputClassName,
  textClassName,
  value,
  setValue,
  inputType,
  validator,
  format,
}: EditBoxProps) {
  const [innerValue, setInnerValue] = useState(value);
  const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);

  const inputRef = useCallback((el: HTMLInputElement | null) => {
    setInputEl(el);
    el?.select?.();
  }, []);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => {
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
      <form
        onSubmit={finalize}
        style={{ display: "inline" }}
        data-testid="editBox-form"
      >
        <input
          className={inputClassName}
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
      <span
        className={textClassName}
        onClick={startEditing}
        style={{ textDecoration: "underline", textDecorationStyle: "dotted" }}
        data-testid="editBox-view"
      >
        {format ? format(value) : value}
      </span>
    );
  }
}
