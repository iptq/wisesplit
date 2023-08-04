import { useAppDispatch, useAppSelector } from "../src/store";
import { receiptItemSlice } from "../src/store/receiptItem";
import { setTotal } from "../src/store/total";
import PriceEditBox from "./PriceEditBox";
import ReceiptTotal from "./ReceiptTotal";
import styles from "./Toolbar.module.scss";
import { nanoid } from "nanoid";

export default function Toolbar() {
  const dispatch = useAppDispatch();
  const total = useAppSelector((state) => state.total.value);

  const addNewItem = () => {
    dispatch(
      receiptItemSlice.actions.createNew({
        id: nanoid(),
        createdAt: Date.now(),
        name: "...",
        price: 0,
        splitBetween: [],
      }),
    );
  };

  const updateTotal = (newTotal: number) => {
    dispatch(setTotal(newTotal));
  };

  return (
    <div className={styles.toolbar}>
      <div className="container">
        <div className={styles.actionRow}>
          <button onClick={addNewItem}>&#x2795; Add</button>
          <PriceEditBox value={total} setValue={updateTotal} />
        </div>

        <ReceiptTotal />
      </div>
    </div>
  );
}
