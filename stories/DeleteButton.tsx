import { HTMLAttributes } from "react";
import styles from "./DeleteButton.module.scss";
import classNames from "classnames";

export default function DeleteButton({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classNames(className, styles.deleteButton)} {...props}>
      &times;
    </button>
  );
}
