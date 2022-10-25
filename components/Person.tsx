import { PrimitiveAtom, useAtom } from "jotai";
import { Badge } from "react-bootstrap";
import EditBox from "./EditBox";

export interface IPerson {
  name: PrimitiveAtom<string>;
}

export interface Props {
  personAtom: PrimitiveAtom<IPerson>;
  splitBetweenAtom: PrimitiveAtom<PrimitiveAtom<IPerson>[]>;
}

export default function Person({ personAtom, splitBetweenAtom }: Props) {
  const [person] = useAtom(personAtom);
  const [splitBetween, setSplitBetween] = useAtom(splitBetweenAtom);

  const removeSelf = (_: any) => {
    setSplitBetween([...splitBetween.filter((x) => x != personAtom)]);
  };

  return (
    <>
      <EditBox valueAtom={person.name} validator={(s) => s} />

      <Badge
        bg="danger"
        pill
        onClick={removeSelf}
        style={{ cursor: "pointer" }}
      >
        &times;
      </Badge>
    </>
  );
}
