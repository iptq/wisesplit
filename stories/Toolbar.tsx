import { nanoid } from "nanoid";
import ReceiptTotal from "./ReceiptTotal";
import { useAppDispatch } from "../src/store";
import { receiptItemSlice } from "../src/store/receiptItem";
import styles from "./Toolbar.module.scss";

export default function Toolbar() {
  const dispatch = useAppDispatch();

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
  return (
    <div className={styles.toolbar}>
      <div className={styles.actionRow}>
        <button onClick={addNewItem}>Add</button>
      </div>

      <ReceiptTotal />
    </div>
  );
}
