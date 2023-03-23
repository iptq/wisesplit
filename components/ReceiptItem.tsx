import { Dispatch, SetStateAction } from "react";
import { Badge, Card } from "react-bootstrap";
import { moneyFormatter } from "../lib/formatter";
import EditBox from "./EditBox";
import NumberEditBox from "./NumberEditBox";
import { IPerson } from "./Person";
import SplitBetween from "./SplitBetween";

export type Receipt = IReceiptItem[];

export interface IReceiptItem {
  name: string;
  price: number;
  splitBetween: IPerson[];
}

export interface Props {
  curItem: IReceiptItem;
  receipt: Receipt;
  setReceipt: Dispatch<SetStateAction<Receipt>>;
}

export default function ReceiptItem({ curItem, receipt, setReceipt }: Props) {
  const removeSelf = (_: any) => {
    setReceipt([...receipt.filter((x) => x != curItem)]);
  };

  const setReceiptName = (value: string) => {
    curItem.name = value;
    setReceipt([...receipt]);
  };

  const setReceiptPrice = (value: number) => {
    curItem.price = value;
    setReceipt([...receipt]);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <h3>
            <EditBox
              valueProp={curItem.name}
              validator={(s) => s}
              onBlur={setReceiptName}
            />
          </h3>
          <span>
            <NumberEditBox
              valueNumber={curItem.price}
              formatter={moneyFormatter.format}
              onBlur={setReceiptPrice}
            />
            <Badge
              bg="danger"
              pill
              onClick={removeSelf}
              style={{ cursor: "pointer" }}
            >
              &times;
            </Badge>
          </span>
        </Card.Title>
      </Card.Header>

      <Card.Body>
        <SplitBetween
          curItem={curItem}
          receipt={receipt}
          setReceipt={setReceipt as any}
        />
      </Card.Body>
    </Card>
  );
}
