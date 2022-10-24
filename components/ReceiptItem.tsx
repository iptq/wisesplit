import { Atom, useAtom } from "jotai";
import { Badge, Card } from "react-bootstrap";
import { receiptAtom } from "../lib/state";
import EditBox from "./EditBox";
import { IPerson } from "./Person";
import SplitBetween from "./SplitBetween";

export interface IReceiptItem {
  name: string;
  price: Atom<number>;
  splitBetween: Atom<Atom<IPerson>[]>;
}

function Price({ priceAtom }) {
  return <EditBox valueAtom={priceAtom} />;
}

export interface Props {
  itemAtom: Atom<IReceiptItem>;
}

export default function ReceiptItem({ itemAtom }: Props) {
  const [receipt, setReceipt] = useAtom(receiptAtom);
  const [item, _] = useAtom(itemAtom);

  const removeSelf = (_) => {
    setReceipt([...receipt.filter((x) => x != itemAtom)]);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <h3>{item.name}</h3>
          <span>
            <Price priceAtom={item.price} />
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
        <SplitBetween splitBetweenAtom={item.splitBetween} />
      </Card.Body>
    </Card>
  );
}
