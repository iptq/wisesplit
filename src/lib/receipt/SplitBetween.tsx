import { createSignal } from "solid-js";

export default function SplitBetween(props) {
  const [input, setInput] = createSignal("");
  const [editing, setEditing] = createSignal(false);

  const splitBetween = props.item.splitBetween || [];

  const startEditing = () => {
    // setInput("");
    // setEditing(true);
  };

  const addPerson = (e) => {
    e.preventDefault();
    // const person: IPerson = { name: input };
    // curItem.splitBetween = [...splitBetween, person];
    // setReceipt([...receipt]);
    // setEditing(false);
  };

  const updatePersonName = (person, name: string) => {
    // person.name = name;
    // const newSplitBetween = [...splitBetween];
    // curItem.splitBetween = newSplitBetween;
    // setReceipt([...receipt]);
  };

  const removePerson = (person) => {
    // const newSplitBetween = [...splitBetween.filter((x) => x != person)];
    // curItem.splitBetween = newSplitBetween;
    // setReceipt([...receipt]);
  };

  return (
    <div>
      Split between ({splitBetween.length}):
      {splitBetween.map((a) => (
        <>
          hellosu
          <div
          //   person={a}
          //   removePerson={removePerson}
          //   updatePersonName={updatePersonName}
          />
        </>
      ))}
      {editing() ? (
        <form onSubmit={addPerson}>
          <input
            type="text"
            value={input()}
            placeholder="Add person to split with..."
            onBlur={() => setEditing(false)}
            onInput={(e) => setInput(e.currentTarget.value)}
          />
        </form>
      ) : (
        <button onClick={startEditing}>[+]</button>
      )}
    </div>
  );
}
