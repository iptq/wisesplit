import { Atom, useAtom, WritableAtom } from "jotai";
import { Badge, ListGroup } from "react-bootstrap";
import EditBox from "./EditBox";

export interface IPerson {
  name: Atom<string>;
}

export interface Props {
  personAtom: Atom<IPerson>;
  splitBetweenAtom: Atom<Atom<IPerson>[]>;
}

export default function Person({ personAtom, splitBetweenAtom }: Props) {
  const [person] = useAtom(personAtom);
  const [splitBetween, setSplitBetween] = useAtom(splitBetweenAtom);

  const removeSelf = (_) => {
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
