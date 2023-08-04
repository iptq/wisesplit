import { useAppDispatch, useAppSelector } from "../src/store";
import { receiptItemSlice } from "../src/store/receiptItem";
import { setTotal } from "../src/store/total";
import PriceEditBox from "./PriceEditBox";
import ReceiptTotal from "./ReceiptTotal";
import styles from "./Toolbar.module.scss";
import AddIcon from "@mui/icons-material/Add";
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

  const clearEverything = () => {
    if (confirm("Are you sure you want to delete all items?")) {
      dispatch(receiptItemSlice.actions.deleteAll());
      dispatch(setTotal(0));
    }
  };

  return (
    <div className={styles.toolbar}>
      <div className="container">
        <div className={styles.actionRow}>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={addNewItem}>
              <AddIcon className={styles.icon} /> Add
            </button>
            <button className={styles.button} onClick={clearEverything}>
              &#x21BA; Clear
            </button>
          </div>
          <PriceEditBox value={total} setValue={updateTotal} />
        </div>

        <ReceiptTotal />
      </div>
    </div>
  );
}
