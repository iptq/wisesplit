import { Atom } from "jotai";
import EditBox from "./EditBox";

export interface Props {
  valueAtom: Atom<number>;
  formatter?: (arg: number) => string;
}

export default function NumberEditBox({ valueAtom, formatter }: Props) {
  const validator = (arg: string) => {
    try {
      const n = parseFloat(arg);
      if (isNaN(n) || !isFinite(n)) return;
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
