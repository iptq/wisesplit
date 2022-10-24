import { atom, useAtom } from "jotai";
import type { NextPage } from "next";
import { useState } from "react";
import { Form } from "react-bootstrap";
import EditBox from "../components/EditBox";
import ReceiptItem, { IReceiptItem } from "../components/ReceiptItem";
import parseInput, { ParsedInputDisplay } from "../lib/parseInput";
import {
  addLine,
  receiptAtom,
  receiptTotalAtom,
  totalAtom,
} from "../lib/state";

const Home: NextPage = () => {
  const [receipt, setReceipt] = useAtom(receiptAtom);
  const [total] = useAtom(receiptTotalAtom);
  const [input, setInput] = useState("");

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const add = (e) => {
    e.preventDefault();
    addLine(input, setReceipt);
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
          onInput={(e) => setInput(e.target.value)}
          value={input}
          style={{ padding: "8px", fontSize: "1.5em" }}
        />
      </Form>

      <div>
        Receipt Total:
        <EditBox valueAtom={totalAtom} />
      </div>

      {receipt.map((itemAtom, i) => {
        return <ReceiptItem itemAtom={itemAtom} key={`receiptItem-${i}`} />;
      })}

      {total.size > 0 && (
        <>
          <h3>Weighted Breakdown</h3>

          <div>
            <ul>
              {[...total.entries()].map(([person, value], i) => (
                <li key={`breakdown-${i}`}>
                  <b>{person}</b>: {formatter.format(value)}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <small>
        <a href="https://github.com/iptq/wisesplit/">[source]</a>
        &middot;
        <a href="https://www.gnu.org/licenses/agpl-3.0.txt">[license]</a>
      </small>
    </main>
  );
};

export default Home;
