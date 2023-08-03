import { PrimitiveAtom, useAtom } from "jotai";
import { Badge, Card } from "react-bootstrap";
import { moneyFormatter } from "../lib/formatter";
import { receiptAtom } from "../lib/state";
import EditBox from "../stories/EditBox";
import NumberEditBox from "./NumberEditBox";
import { IPerson } from "./Person";
import SplitBetween from "./SplitBetween";

export type Receipt = PrimitiveAtom<IReceiptItem>[];

export interface IReceiptItem {
  name: PrimitiveAtom<string>;
  price: PrimitiveAtom<number>;
  splitBetween: PrimitiveAtom<PrimitiveAtom<IPerson>[]>;
}

export interface Props {
  itemAtom: PrimitiveAtom<IReceiptItem>;
}

export default function ReceiptItem({ itemAtom }: Props) {
  const [receipt, setReceipt] = useAtom(receiptAtom);
  const [item, _] = useAtom(itemAtom);

  const removeSelf = (_: any) => {
    setReceipt([...receipt.filter((x) => x != itemAtom)]);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <h3>
            <EditBox valueAtom={item.name} validator={(s) => s} />
          </h3>
          <span>
            <NumberEditBox valueAtom={item.price} formatter={moneyFormatter.format} />
            <Badge bg="danger" pill onClick={removeSelf} style={{ cursor: "pointer" }}>
              &times;
            </Badge>
          </span>
        </Card.Title>
      </Card.Header>

      <Card.Body>
        <SplitBetween splitBetweenAtom={item.splitBetween} />
      </Card.Body>
    </Card>
  );
}
