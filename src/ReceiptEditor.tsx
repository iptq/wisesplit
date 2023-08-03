import { useSelector } from "react-redux";
import {
  ReceiptItem as IReceiptItem,
  receiptItemSelectors,
  receiptItemSlice,
} from "./store/receiptItem";
import ReceiptItem from "../stories/ReceiptItem";
import { useAppDispatch } from "./store";
import { nanoid } from "nanoid";
import styles from "./ReceiptEditor.module.scss";

export default function ReceiptEditor() {
  const dispatch = useAppDispatch();
  const receiptItems = useSelector((state) => receiptItemSelectors.selectAll(state));

  const addNewItem = () => {
    dispatch(
      receiptItemSlice.actions.createNew({
        id: nanoid(),
        createdAt: Date.now(),
        name: "<click to edit>",
        price: 0,
        splitBetween: [],
      }),
    );
  };

  const updateItem = (id: string) => (update: Partial<IReceiptItem>) => {
    dispatch(receiptItemSlice.actions.updateOne({ id, changes: update }));
  };

  return (
    <>
      <button onClick={addNewItem}>Add</button>
      <div className={styles.receiptList}>
        {receiptItems.map((item) => (
          <ReceiptItem key={item.id} receiptItem={item} updateReceiptItem={updateItem(item.id)} />
        ))}
      </div>
    </>
  );
}
