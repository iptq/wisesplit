import type { NextPage } from "next";
import { useEffect } from "react";
import { SyntheticEvent, useState } from "react";
import { Form } from "react-bootstrap";
import NumberEditBox from "components/NumberEditBox";
import ReceiptItem from "components/ReceiptItem";
import { moneyFormatter } from "lib/formatter";
import { ParsedInputDisplay } from "lib/parseInput";
import { addLine } from "lib/state";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/router";
import { Receipt } from "components/ReceiptItem";
import { getCalculated } from "lib/getCalculated";

let socket: Socket;

const ReceiptPage: NextPage = () => {
  const router = useRouter();
  const [receipt, setReceipt] = useState<Receipt>([]);
  const [input, setInput] = useState("");
  const [total, setTotal] = useState(0);
  const calculated = getCalculated(total, receipt);

  const { id } = router.query;

  // Connect to the socket server
  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiptId: id }),
      });
      socket = io();

      socket.on("connect", () => {
        console.log("client connected");
      });

      socket.on("update-input", (msg) => {
        console.log("client", msg);
      });
    };

    if (id) {
      socketInitializer();
    }
  }, [id]);

  const receiptChanged = JSON.stringify(receipt);

  useEffect(() => {
    console.log("changed");
    console.log("CURRENT STATE", receipt);
  }, [receiptChanged]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const add = async (e: SyntheticEvent) => {
    e.preventDefault();

    const payload = addLine(input, receipt, setReceipt);

    console.log("Payload", payload);
    // fetch("/api/udpateReceipt", {
    //   method: "POST",
    //   body: JSON.stringify(payload),
    // });

    // socket.emit("add-input", "from client");

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

      {receipt.map((curItem, i) => {
        return (
          <ReceiptItem
            curItem={curItem}
            receipt={receipt}
            setReceipt={setReceipt}
            key={`receiptItem-${i}`}
          />
        );
      })}

      <div>
        Receipt Total:
        <span style={total < calculated.subtotal ? { color: "red" } : {}}>
          <NumberEditBox
            valueNumber={total}
            formatter={moneyFormatter.format}
            onBlur={setTotal}
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
