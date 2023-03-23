import { PrimitiveAtom, useAtom } from "jotai";
import { Badge } from "react-bootstrap";
import EditBox from "./EditBox";

export interface IPerson {
  name: string;
}

export interface Props {
  person: IPerson;
  removePerson: (person: IPerson) => void;
  updatePersonName: (person: IPerson, name: string) => void;
}

export default function Person({
  person,
  removePerson,
  updatePersonName,
}: Props) {
  const updatePersonNameOnBlur = (name: string) =>
    updatePersonName(person, name);

  return (
    <>
      <EditBox
        valueProp={person.name}
        validator={(s) => s}
        onBlur={updatePersonNameOnBlur}
      />

      <Badge
        bg="danger"
        pill
        onClick={() => removePerson(person)}
        style={{ cursor: "pointer" }}
      >
        &times;
      </Badge>
    </>
  );
}
