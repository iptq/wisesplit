import EditBox from "./EditBox";
import styles from "./ReceiptItem.module.scss";
import { ReceiptItem as IReceiptItem } from "../src/store/receiptItem";
import Chip from "./Chip";
import { useSelector } from "react-redux";

export interface ReceiptItemProps {
  receiptItem: IReceiptItem;
  updateReceiptItem: (_: Partial<IReceiptItem>) => void;
}

export default function ReceiptItem({ receiptItem, updateReceiptItem }: ReceiptItemProps) {
  const { name, price, splitBetween } = receiptItem;

  const x = useSelector((state) => state);
  console.log("state", x);

  const editName = (idx: number) => (name: string) => {
    const newSplitBetween = [...splitBetween];
    newSplitBetween[idx] = name;
    updateReceiptItem({ splitBetween: newSplitBetween });
  };

  const newSplitBetween = () => {
    updateReceiptItem({ splitBetween: [...splitBetween, "<click to edit>"] });
  };

  return (
    <div className={styles.receiptItem}>
      <div className={styles.header}>
        <div className={styles.title}>
          <EditBox value={name} setValue={(value) => updateReceiptItem({ name: value })} />
        </div>
        <div className={styles.price}>
          <EditBox value={price} setValue={(value) => updateReceiptItem({ price: value })} />
        </div>
      </div>

      <div className={styles.body}></div>
      <div className={styles.footer}>
        <span className={styles.footerText}>Split between ({splitBetween.length}):</span>

        <div className={styles.chips}>
          {splitBetween.map((name, idx) => (
            <Chip key={name} text={name} updateText={editName(idx)} active />
          ))}

          <Chip text="+" outerProps={{ onClick: newSplitBetween }} />
        </div>
      </div>
    </div>
  );
}
