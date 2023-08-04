import EditBox from "./EditBox";
import styles from "./ReceiptItem.module.scss";
import { ReceiptItem as IReceiptItem } from "../src/store/receiptItem";
import Chip from "./Chip";
import { useSelector } from "react-redux";
import PriceEditBox from "./PriceEditBox";
import { useAllPeople } from "../lib/hooks";
import { moneyFormatter } from "../lib/formatter";

export interface ReceiptItemProps {
  receiptItem: IReceiptItem;
  updateReceiptItem: (_: Partial<IReceiptItem>) => void;
}

export default function ReceiptItem({ receiptItem, updateReceiptItem }: ReceiptItemProps) {
  const { name, price, splitBetween } = receiptItem;
  const allPeople = useAllPeople();
  const splitBetweenSet = new Set(splitBetween);
  const peopleNotSplitSet = new Set(
    [...allPeople].filter((person) => !splitBetweenSet.has(person)),
  );
  // TODO: Some kind of smart ordering?
  const peopleNotSplit = [...peopleNotSplitSet];
  const eachCost = splitBetween.length > 0 ? price / splitBetween.length : 0;

  const editName = (idx: number) => (name: string) => {
    const newSplitBetween = [...splitBetween];
    newSplitBetween[idx] = name;
    updateReceiptItem({ splitBetween: newSplitBetween });
  };

  const newSplitBetween = () => {
    updateReceiptItem({ splitBetween: [...splitBetween, "<click to edit>"] });
  };

  const addExistingPerson = (idx: number) => () => {
    updateReceiptItem({ splitBetween: [...splitBetween, peopleNotSplit[idx]] });
  };

  return (
    <div className={styles.receiptItem}>
      <div className={styles.header}>
        <div className={styles.title}>
          <EditBox value={name} setValue={(value) => updateReceiptItem({ name: value })} />
        </div>
        <div className={styles.price}>
          <PriceEditBox value={price} setValue={(value) => updateReceiptItem({ price: value })} />
        </div>
      </div>

      <div className={styles.body}></div>
      <div className={styles.footer}>
        <span className={styles.footerText}>
          Split between <b>{splitBetween.length}</b> people ({moneyFormatter.format(eachCost)}{" "}
          each):
        </span>

        <div className={styles.chips}>
          {splitBetween.map((name, idx) => (
            <Chip key={name} text={name} updateText={editName(idx)} active />
          ))}

          <Chip text="+" outerProps={{ onClick: newSplitBetween }} />

          {peopleNotSplit.map((name, idx) => (
            <Chip key={name} text={name} outerProps={{ onClick: addExistingPerson(idx) }} />
          ))}
        </div>
      </div>
    </div>
  );
}
