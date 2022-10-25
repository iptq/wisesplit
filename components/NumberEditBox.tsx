import { PrimitiveAtom } from "jotai";
import EditBox from "./EditBox";

export interface Props {
  valueAtom: PrimitiveAtom<number>;
  formatter?: (arg: number) => string;
}

export default function NumberEditBox({ valueAtom, formatter }: Props) {
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
      valueAtom={valueAtom}
      inputType="number"
      formatter={formatter ?? ((n) => n.toString())}
      validator={validator}
    />
  );
}
