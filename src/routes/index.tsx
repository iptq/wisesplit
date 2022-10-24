import { createStore } from "solid-js/store";
import { batch, createComputed, createSignal, For } from "solid-js";
import { Title } from "solid-start";

export default function Home() {
  const [state, setState] = createStore({
    itemEdit: "",
    items: [],
    finalTotal: 0,

    get totals() {
      const totals = new Map();

      let subtotalSum = 0;
      for (let item of state.items) {
        const price = item.price;
        const numPeople = item.people.length;
        if (numPeople == 0) continue;

        const eachPrice = price / numPeople;
        subtotalSum += price;
        for (let person of item.people) {
          const personName = person.name.toString();
          let accum = totals.get(personName) || 0;
          accum += eachPrice;
          totals.set(personName, accum);
        }
      }

      if (subtotalSum == 0) return totals;

      const proportion = state.finalTotal / subtotalSum;
      console.log("Subtotal sum", subtotalSum, proportion);
      const newTotals = new Map();
      for (let person of totals.keys()) {
        const value = totals.get(person);
        newTotals.set(person, value * proportion);
      }

      return newTotals;
    },
  });

  const [totals, setTotals] = createSignal(new Map());

  const addItem = (e) => {
    e.preventDefault();
    batch(() => {
      setState("items", [
        ...state.items,
        { name: state.itemEdit, price: 0, personEdit: "", people: [] },
      ]);
      setState("itemEdit", "");
    });
    return false;
  };

  const itemAddPerson = (e, i) => {
    e.preventDefault();
    batch(() => {
      setState("items", i, "people", [
        ...state.items[i].people,
        { name: state.items[i].personEdit },
      ]);
      setState("items", i, "personEdit", "");
    });
    return false;
  };

  const trySetNum = (target, v) => {
    try {
      let n = parseFloat(v);
      console.log([...target, n]);
      setState.apply(null, [...target, n]);
    } catch (e) {
      return;
    }
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <main>
      <Title>Hello World</Title>

      <h2>Items</h2>

      <details>
        <summary>Details for nerds</summary>
        <pre>{JSON.stringify(state)}</pre>
      </details>

      <p>
        Final total: {formatter.format(state.finalTotal)}
        <input
          type="text"
          onInput={(e) => trySetNum(["finalTotal"], e.target.value)}
          value={state.finalTotal}
        />
      </p>

      <ul style={{ "text-align": "left" }}>
        <For each={state.items}>
          {(item, i) => (
            <li>
              {item.name} ({formatter.format(item.price)})
              <input
                type="text"
                onInput={(e) =>
                  trySetNum(["items", i(), "price"], e.target.value)
                }
                value={item.price}
              />
              <ul>
                <For each={item.people}>
                  {(person, j) => <li>{person.name}</li>}
                </For>
                <li>
                  <form onSubmit={(e) => itemAddPerson(e, i())}>
                    <input
                      type="text"
                      placeholder="Add person to split..."
                      onInput={(e) =>
                        setState("items", i(), "personEdit", e.target.value)
                      }
                      value={item.personEdit}
                    />
                  </form>
                </li>
              </ul>
            </li>
          )}
        </For>

        <li>
          <form onSubmit={addItem}>
            <input
              type="text"
              placeholder="Add item..."
              onInput={(e) => setState("itemEdit", e.target.value)}
              value={state.itemEdit}
            />
          </form>
        </li>
      </ul>

      <ul>
        <For each={Array.from(state.totals)}>
          {([person, amount], i) => (
            <li>
              {person} : {formatter.format(amount)}
            </li>
          )}
        </For>
      </ul>
    </main>
  );
}
