import EditBox from "../components/EditBox";
import { moneyFormatter } from "../formatter";
import SplitBetween from "./SplitBetween";
/*
export type Receipt = IReceiptItem[];

export interface IReceiptItem {
  name: string;
  price: number;
  splitBetween: IPerson[];
}
 */

export interface Props {}

export default function ReceiptItem(props) {
  const item = () => props.item;

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
    <div>
      <h3>
        <EditBox
          valueProp={item().name}
          validator={(s) => s}
          onBlur={setReceiptName}
        />
      </h3>
      <span>
        <EditBox
          valueNumber={item().price}
          formatter={moneyFormatter.format}
          onBlur={setReceiptPrice}
        />
      </span>

      <div>
        <SplitBetween item={item} />
      </div>
    </div>
  );
}
