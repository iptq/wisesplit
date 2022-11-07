import { useAtom, atom } from "jotai";
import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import { SyntheticEvent, useState } from "react";
import { Form } from "react-bootstrap";
import NumberEditBox from "components/NumberEditBox";
import ReceiptItem from "components/ReceiptItem";
import { moneyFormatter } from "lib/formatter";
import { ParsedInputDisplay } from "lib/parseInput";
import {
  addLine,
  receiptAtom,
  receiptTotalAtom,
  totalAtom,
  unwrappedReceiptAtom,
} from "lib/state";
import { io } from "socket.io-client";
import { useRouter } from "next/router";

let socket;

const ReceiptPage: NextPage = () => {
  const router = useRouter();
  const [receipt, setReceipt] = useAtom(receiptAtom);
  const [input, setInput] = useState("");
  const [total] = useAtom(totalAtom);
  const [calculated] = useAtom(receiptTotalAtom);
  const [unwrappedReceipt] = useAtom(unwrappedReceiptAtom);

  const { id } = router.query;

  // Connect to the socket server
  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });
    };

    socketInitializer();
  }, []);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const add = async (e: SyntheticEvent) => {
    e.preventDefault();

    addLine(input, receipt, setReceipt);

    const payload = unwrappedReceipt;
    console.log("Payload", payload);
    fetch("/api/createReceipt", {
      method: "POST",
      body: JSON.stringify(payload),
    });

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

export default ReceiptPage;
