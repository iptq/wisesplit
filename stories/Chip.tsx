import styles from "./Chip.module.scss";
import DeleteButton from "./DeleteButton";
import EditBox from "./EditBox";
import classNames from "classnames";
import { HTMLAttributes, MouseEventHandler } from "react";

export interface ChipProps {
  text: string;
  updateText?: (_: string) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onDelete?: () => void;
  active?: boolean;

  outerProps?: HTMLAttributes<HTMLDivElement>;
}

export default function Chip({
  active,
  text,
  updateText,
  outerProps,
  onDelete,
}: ChipProps) {
  return (
    <div
      className={classNames(
        styles.chip,
        onDelete && styles.hasDelete,
        active && styles.active,
      )}
      {...outerProps}
    >
      {updateText ? (
        <EditBox
          value={text}
          setValue={updateText}
          inputClassName={styles.editBox}
        />
      ) : (
        text
      )}
      {onDelete && (
        <DeleteButton className={styles.deleteButton} onClick={onDelete} />
      )}
    </div>
  );
}
