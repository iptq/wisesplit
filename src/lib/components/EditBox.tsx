import { autofocus } from "@solid-primitives/autofocus";
import classNames from "classnames";
import { createSignal, Show } from "solid-js";
import styles from "./EditBox.module.scss";

export interface Props<T> {
  valueProp: T;
  formatter?: (arg: T) => string;
  inputType?: string;
  validator?: (arg: string) => T | null;
  onBlur?: (value: T) => void;
  class?: string;
}

export default function EditBox<T>(props: Props<T>) {
  const [valueInput, setValueInput] = createSignal("");
  const [editing, setEditing] = createSignal(false);

  const startEditing = (_: any) => {
    setValueInput(String(props.valueProp));
    setEditing(true);
  };

  const finalize = (e) => {
    e.preventDefault();

    if (!props.validator) {
      props.onBlur?.(valueInput());
      setEditing(false);
      return;
    }

    const validateResult = props.validator(valueInput());
    if (validateResult !== null) {
      props.onBlur?.(validateResult);
      setEditing(false);
    }
  };

  return (
    <>
      <Show when={editing()}>
        <form onSubmit={finalize} style={{ display: "inline" }}>
          <input
            class={classNames(styles.editingBox, props.class)}
            type={props.inputType ?? "text"}
            value={valueInput()}
            onBlur={finalize}
            onInput={(e) => setValueInput(e.currentTarget.value)}
            autofocus
            ref={autofocus}
          />
        </form>
      </Show>
      <Show when={!editing()}>
        <span
          class={classNames(styles.clickableContainer, props.class)}
          onClick={startEditing}
        >
          {props.formatter
            ? props.formatter(props.valueProp)
            : String(props.valueProp)}
        </span>
      </Show>
    </>
  );
}
