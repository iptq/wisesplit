import { autofocus } from "@solid-primitives/autofocus";
import { batch, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import EditBox from "../components/EditBox";
import calculate from "./calculate";
import parseInput from "./parseInput";
import { emptyReceipt, Receipt } from "./schema";

import styles from "./Form.module.scss";
import ParsedInputDisplay from "./ParsedInputDisplay";
import ReceiptItem from "./Item";

export interface Props {
  id: string;
}

export default function ReceiptForm(props: Props) {
  const [getInput, setInput] = createSignal("");
  const [receipt, setReceipt] = createStore<Receipt>(emptyReceipt(props.id));

  const calculated = calculate(receipt);
  const getParsedInput = () => parseInput(getInput());

  const onFormSubmit = (e) => {
    e.preventDefault();

    batch(() => {
      setReceipt("items", receipt.items.length, getParsedInput());
      setInput("");
    });
  };

  return (
    <main class={styles.main}>
      <h1>
        Items for{" "}
        <EditBox
          valueProp={receipt.name}
          onBlur={(name) => setReceipt("name", name)}
        />
      </h1>
      <form onSubmit={onFormSubmit}>
        <input
          autofocus
          ref={autofocus}
          type="text"
          value={getInput()}
          placeholder="Add item..."
          class={styles.addItemBox}
          onInput={(e) => setInput(e.currentTarget.value)}
        />

        <ParsedInputDisplay getParsedInput={getParsedInput} />
      </form>
      <ul>
        {receipt?.items?.map((item) => (
          <li>
            {JSON.stringify(item)} <ReceiptItem item={item} />
          </li>
        ))}
      </ul>
      <div>
        Receipt total:
        <span></span>
      </div>
      <hr />
      {JSON.stringify(calculated)}
      id is {props.id}
    </main>
  );
}
