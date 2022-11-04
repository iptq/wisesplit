import { useAtom } from "jotai";
import type { NextPage } from "next";
import { SyntheticEvent, useState } from "react";
import { Form } from "react-bootstrap";
import NumberEditBox from "../components/NumberEditBox";
import ReceiptItem from "../components/ReceiptItem";
import { moneyFormatter } from "../lib/formatter";
import { ParsedInputDisplay } from "../lib/parseInput";
import {
  addLine,
  receiptAtom,
  receiptTotalAtom,
  totalAtom,
} from "../lib/state";

const Home: NextPage = () => {
  const [receipt, setReceipt] = useAtom(receiptAtom);
  const [input, setInput] = useState("");
  const [total] = useAtom(totalAtom);
  const [calculated] = useAtom(receiptTotalAtom);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const add = (e: SyntheticEvent) => {
    e.preventDefault();
    addLine(input, receipt, setReceipt);
    setInput("");
    return false;
  };

  return (
    <main>
      <h1>Items</h1>

      <Form onSubmit={add}>
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

      {receipt.map((itemAtom, i) => {
        return <ReceiptItem itemAtom={itemAtom} key={`receiptItem-${i}`} />;
      })}

      <div>
        Receipt Total:
        <span style={total < calculated.subtotal ? { color: "red" } : {}}>
          <NumberEditBox
            valueAtom={totalAtom}
            formatter={moneyFormatter.format}
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
                  <b>{person}</b>: {formatter.format(value)}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
