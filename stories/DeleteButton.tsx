import styles from "./DeleteButton.module.scss";
import classNames from "classnames";
import { HTMLAttributes } from "react";

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
