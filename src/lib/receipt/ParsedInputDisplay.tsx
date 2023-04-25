import { moneyFormatter } from "../formatter";
import styles from "./ParsedInputDisplay.module.scss";

export default function ParsedInputDisplay(props) {
  const receiptItem = () => props.getParsedInput();

  return (
    <div class={styles.display}>
      <div>
        <b>{receiptItem().name}</b>

        {receiptItem().price !== undefined && (
          <>({moneyFormatter.format(receiptItem().price)})</>
        )}
      </div>

      {receiptItem().splitBetween.size > 0 && (
        <>
          Split between:
          <ul>
            {[...receiptItem().splitBetween].map((person) => (
              <li>{person.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
