import { useAtom, atom } from "jotai";
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
} from "../lib/state";

const Home: NextPage = () => {
  const [receipt, setReceipt] = useAtom(receiptAtom);
  const [input, setInput] = useState("");
  const [total] = useAtom(totalAtom);
  const [calculated] = useAtom(receiptTotalAtom);
  const isAddCalled = useRef(false);

  const [receiptJson] = useAtom(
    atom((get) => {
      const receiptJson: any[] = [];
      for (const itemAtom of receipt) {
        const receiptItemFromAtom = get(itemAtom);
        const splitBetweenArray = get(receiptItemFromAtom.splitBetween).map(
          (personAtom) => ({
            name: get(get(personAtom).name),
          })
        );
        const receiptItemParsed = {
          name: get(receiptItemFromAtom.name),
          price: get(receiptItemFromAtom.price),
          splitBetween: splitBetweenArray,
        };
        receiptJson.push(receiptItemParsed);
      }

      return receiptJson;
    })
  );

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
  console.log("ASDFASDF", receiptJSONString);

  useEffect(() => {
    const updateDb = async () => {
      const response = await fetch("/api/createReceipt", {
        method: "POST",
        body: JSON.stringify({ receipts: receiptJson }),
      });
      console.log(receiptJSONString);
    };

    if (isAddCalled.current) {
      updateDb();
    }
  }, [receiptJSONString]);

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

      <div>
        Receipt Total:
        <span style={total < calculated.subtotal ? { color: "red" } : {}}>
          <NumberEditBox
            valueAtom={totalAtom}
            formatter={moneyFormatter.format}
          />
        </span>
      </div>

      {receipt.map((itemAtom, i) => {
        return <ReceiptItem itemAtom={itemAtom} key={`receiptItem-${i}`} />;
      })}

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
