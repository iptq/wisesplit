import { moneyFormatter } from "../lib/formatter";
import { useAllPeople } from "../lib/hooks";
import { ReceiptItem as IReceiptItem } from "../src/store/receiptItem";
import Chip from "./Chip";
import DeleteButton from "./DeleteButton";
import EditBox from "./EditBox";
import PriceEditBox from "./PriceEditBox";
import styles from "./ReceiptItem.module.scss";

export interface ReceiptItemProps {
  receiptItem: IReceiptItem;
  updateReceiptItem: (_: Partial<IReceiptItem>) => void;
  deleteReceiptItem?: () => void;
}

export default function ReceiptItem({
  receiptItem,
  updateReceiptItem,
  deleteReceiptItem,
}: ReceiptItemProps) {
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
    const defaultName = "click to edit...";
    if (splitBetween.indexOf(defaultName) !== -1) return;
    updateReceiptItem({ splitBetween: [...splitBetween, defaultName] });
  };

  const addExistingPerson = (idx: number) => () => {
    updateReceiptItem({ splitBetween: [...splitBetween, peopleNotSplit[idx]] });
  };

  const deleteSplitter = (idx: number) => () => {
    const newSplitBetween = [...splitBetween];
    newSplitBetween.splice(idx, 1);
    updateReceiptItem({ splitBetween: newSplitBetween });
  };

  return (
    <div className={styles.receiptItem}>
      <div className={styles.header}>
        <div className={styles.title}>
          <EditBox
            value={name}
            setValue={(value) => updateReceiptItem({ name: value })}
          />
        </div>
        <div className={styles.price}>
          <PriceEditBox
            value={price}
            setValue={(value) => updateReceiptItem({ price: value })}
          />
          <DeleteButton onClick={deleteReceiptItem} />
        </div>
      </div>

      <div className={styles.body}></div>
      <div className={styles.footer}>
        <span className={styles.footerText}>
          Split between <b>{splitBetween.length}</b> people (
          {moneyFormatter.format(eachCost)} each):
        </span>

        <div className={styles.chips}>
          {splitBetween.map((name, idx) => (
            <Chip
              key={name}
              text={name}
              updateText={editName(idx)}
              onDelete={deleteSplitter(idx)}
              active
            />
          ))}

          <Chip text="+" outerProps={{ onClick: newSplitBetween }} />

          {peopleNotSplit.map((name, idx) => (
            <Chip
              key={name}
              text={name}
              outerProps={{ onClick: addExistingPerson(idx) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
