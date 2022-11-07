import { useAtom } from "jotai";
import type { NextPage } from "next";
import { useEffect, useRef } from "react";
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
  receiptAtomToJSON,
} from "../lib/state";

const Home: NextPage = () => {
  const [receipt, setReceipt] = useAtom(receiptAtom);
  const [input, setInput] = useState("");
  const [total] = useAtom(totalAtom);
  const [calculated] = useAtom(receiptTotalAtom);
  const [receiptJson] = useAtom(receiptAtomToJSON);

  const isAddCalled = useRef(false);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const add = async (e: SyntheticEvent) => {
    e.preventDefault();
    isAddCalled.current = true;

    addLine(input, receipt, setReceipt);
    setInput("");
    return false;
  };

  const receiptJSONString = JSON.stringify(receiptJson);

  useEffect(() => {
    const updateDb = async () => {
      const response = await fetch("/api/updateReceipt", {
        method: "POST",
        body: JSON.stringify({ receipts: receiptJson }),
      });
    };

    if (isAddCalled.current) {
      updateDb();
    }
  }, [receiptJSONString, receiptJson]);

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
