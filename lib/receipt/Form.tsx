import { ParsedInputDisplay } from "lib/parseInput";
import { Form } from "react-bootstrap";

import ReceiptItem from "./Item";
import NumberEditBox from "components/NumberEditBox";
import { store, useAppDispatch } from "lib/store";
import { addItem, emptyReceipt, receiptSelectors } from "./slice";
import { FormEvent, useState } from "react";
import { selectCalculated } from "./calculate";
import { moneyFormatter } from "lib/formatter";

interface IReceiptFormProps {
  id: string;
}

export default function ReceiptForm({ id, onChange }: IReceiptFormProps) {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");

  const receipt =
    receiptSelectors.selectById(store.getState(), id) || emptyReceipt(id);

  console.log("Receipt", receipt);

  const calculated = selectCalculated(store.getState(), id);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addItem({ id, line: input }));
    console.log("Dispatched WTF");
  };

  return (
    <main>
      <h1>Items</h1>

      <Form onSubmit={onFormSubmit}>
        <ParsedInputDisplay input={input} />

        <Form.Control
          autoFocus={true}
          type="text"
          placeholder="Add item..."
          onInput={(e) => setInput(e.currentTarget.value)}
          value={input}
          style={{ padding: "8px 16px", fontSize: "1.5em" }}
        />
      </Form>

      {receipt.items.map((item, i) => {
        return <ReceiptItem item={item} key={`receiptItem-${i}`} />;
      })}

      <div>
        Receipt Total:
        <span
          style={receipt.total < calculated.subtotal ? { color: "red" } : {}}
        >
          <NumberEditBox
            valueNumber={receipt.total}
            formatter={moneyFormatter.format}
            // onBlur={setTotal}
          />
        </span>
      </div>

      <hr />

      {calculated.totalMap.size > 0 && (
        <>
          <h3>Weighted Breakdown</h3>

          <div>
            <ul>
              {[...calculated.totalMap.entries()].map(([person, value], i) => (
                <li key={`breakdown-${i}`}>
                  <b>{person}</b>: {moneyFormatter.format(value)}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </main>
  );
}
