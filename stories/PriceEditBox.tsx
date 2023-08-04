import { moneyFormatter } from "../lib/formatter";
import EditBox, { EditBoxProps } from "./EditBox";

export interface PriceEditBoxProps extends Omit<EditBoxProps, "value" | "setValue"> {
  value: number;
  setValue?: (_: number) => void;
}

export default function PriceEditBox({ value, setValue, ...props }: PriceEditBoxProps) {
  const format = (s: string) => moneyFormatter.format(parseFloat(s));
  const setValueString = (s: string) => setValue?.(parseFloat(s));

  return <EditBox value={value.toString()} setValue={setValueString} format={format} {...props} />;
}
