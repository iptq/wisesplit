import {
  ReceiptItem as IReceiptItem,
  receiptItemSelectors,
  receiptItemSlice,
} from "./store/receiptItem";
import ReceiptItem from "../stories/ReceiptItem";
import { useAppDispatch, useAppSelector } from "./store";
import styles from "./ReceiptEditor.module.scss";

export default function ReceiptEditor() {
  const dispatch = useAppDispatch();
  const receiptItems = useAppSelector((state) => receiptItemSelectors.selectAll(state));

  const updateItem = (id: string) => (update: Partial<IReceiptItem>) => {
    dispatch(receiptItemSlice.actions.updateOne({ id, changes: update }));
  };

  return (
    <div className="container">
      <div className={styles.receiptList}>
        {receiptItems.map((item) => (
          <ReceiptItem key={item.id} receiptItem={item} updateReceiptItem={updateItem(item.id)} />
        ))}
      </div>
    </div>
  );
}
