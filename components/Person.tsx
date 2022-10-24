import { Atom, useAtom, WritableAtom } from "jotai";
import { Badge, ListGroup } from "react-bootstrap";

export interface IPerson {
  name: string;
}

export interface Props {
  personAtom: Atom<IPerson>;
  splitBetweenAtom: WritableAtom<Atom<IPerson>[]>;
}

export default function Person({ personAtom, splitBetweenAtom }: Props) {
  const [person] = useAtom(personAtom);
  const [splitBetween, setSplitBetween] = useAtom(splitBetweenAtom);

  const removeSelf = (_) => {
    setSplitBetween([...splitBetween.filter((x) => x != personAtom)]);
  };

  return (
    <ListGroup.Item>
      {person.name}
      <Badge
        bg="danger"
        pill
        onClick={removeSelf}
        style={{ cursor: "pointer" }}
      >
        &times;
      </Badge>
    </ListGroup.Item>
  );
}
