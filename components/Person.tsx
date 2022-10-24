import { Atom, useAtom } from "jotai";

export interface IPerson {
  name: string;
}

export interface Props {
  personAtom: Atom<IPerson>;
}

export default function Person({ personAtom }: Props) {
  const [person, _] = useAtom(personAtom);
  return <span style={{ marginInline: "5px" }}>{person.name}</span>;
}
