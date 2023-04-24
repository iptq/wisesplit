import EditBox from "components/EditBox";
import NumberEditBox from "components/NumberEditBox";
import SplitBetween from "components/SplitBetween";
import { moneyFormatter } from "lib/formatter";
import { Badge, Card } from "react-bootstrap";
import { ReceiptItem as IReceiptItem } from "./slice";
/*
export type Receipt = IReceiptItem[];

export interface IReceiptItem {
  name: string;
  price: number;
  splitBetween: IPerson[];
}
 */

export interface Props {
  item: IReceiptItem;
}

export default function ReceiptItem({ item }: Props) {
  const removeSelf = (_: any) => {
    // setReceipt([...receipt.filter((x) => x != curItem)]);
  };

  const setReceiptName = (value: string) => {
    // curItem.name = value;
    // setReceipt([...receipt]);
  };

  const setReceiptPrice = (value: number) => {
    // curItem.price = value;
    // setReceipt([...receipt]);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <h3>
            <EditBox
              valueProp={item.name}
              validator={(s) => s}
              onBlur={setReceiptName}
            />
          </h3>
          <span>
            <NumberEditBox
              valueNumber={item.price}
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
          item={item}
          receipt={receipt}
          setReceipt={setReceipt as any}
        />
      </Card.Body>
    </Card>
  );
}
