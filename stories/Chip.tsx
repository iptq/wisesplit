import EditBox from "./EditBox";
import styles from "./Chip.module.scss";
import classNames from "classnames";
import { HTMLAttributes, MouseEventHandler } from "react";
import DeleteButton from "./DeleteButton";

export interface ChipProps {
  text: string;
  updateText?: (_: string) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onDelete?: () => void;
  active?: boolean;

  outerProps?: HTMLAttributes<HTMLDivElement>;
}

export default function Chip({ active, text, updateText, outerProps, onDelete }: ChipProps) {
  return (
    <div
      className={classNames(styles.chip, onDelete && styles.hasDelete, active && styles.active)}
      {...outerProps}
    >
      {updateText ? <EditBox value={text} setValue={updateText} /> : text}
      {onDelete && <DeleteButton className={styles.deleteButton} onClick={onDelete} />}
    </div>
  );
}
