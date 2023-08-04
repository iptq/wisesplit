import EditBox from "./EditBox";
import styles from "./Chip.module.scss";
import classNames from "classnames";
import { HTMLAttributes, MouseEventHandler } from "react";

export interface ChipProps {
  text: string;
  updateText?: (_: string) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
  active?: boolean;

  outerProps?: HTMLAttributes<HTMLDivElement>;
}

export default function Chip({ active, text, updateText, outerProps }: ChipProps) {
  return (
    <div className={classNames(styles.chip, active && styles.active)} {...outerProps}>
      {updateText ? <EditBox value={text} setValue={updateText} /> : text}
    </div>
  );
}
