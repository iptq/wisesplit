import { SetStateAction } from "jotai";
import { Dispatch } from "react";
import EditBox from "./EditBox";

export interface Props {
  valueNumber: number;
  formatter?: (arg: number) => string;
  onBlur?: (value: number) => void;
}

export default function NumberEditBox({
  valueNumber,
  formatter,
  onBlur,
}: Props) {
  const validator = (arg: string): number | null => {
    try {
      const n = parseFloat(arg);
      if (isNaN(n) || !isFinite(n)) return null;
      return n;
    } catch (e) {
      return null;
    }
  };

  return (
    <EditBox
      valueProp={valueNumber}
      inputType="number"
      formatter={formatter ?? ((n) => n.toString())}
      validator={validator}
      onBlur={onBlur}
    />
  );
}
