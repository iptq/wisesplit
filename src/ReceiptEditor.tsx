import ReceiptItem from "../stories/ReceiptItem";
import styles from "./ReceiptEditor.module.scss";
import { useAppDispatch, useAppSelector } from "./store";
import {
  ReceiptItem as IReceiptItem,
  receiptItemSelectors,
  receiptItemSlice,
} from "./store/receiptItem";

export default function ReceiptEditor() {
  const dispatch = useAppDispatch();
  const receiptItems = useAppSelector((state) =>
    receiptItemSelectors.selectAll(state),
  );

  const updateItem = (id: string) => (update: Partial<IReceiptItem>) => {
    dispatch(receiptItemSlice.actions.updateOne({ id, changes: update }));
  };

  const deleteItem = (id: string) => () => {
    dispatch(receiptItemSlice.actions.deleteOne(id));
  };

  return (
    <div className="container">
      <div className={styles.receiptList}>
        {receiptItems.map((item) => (
          <ReceiptItem
            key={item.id}
            receiptItem={item}
            updateReceiptItem={updateItem(item.id)}
            deleteReceiptItem={deleteItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
