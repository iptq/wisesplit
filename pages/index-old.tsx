import type { NextPage } from "next";
import EditBox from "../components/EditBox";

const Home: NextPage = () => {
  return (
    <main>
      <h2>Items</h2>

      <details>
        <summary>Details for nerds</summary>
        <pre>{JSON.stringify(state)}</pre>
      </details>

      <p>
        Final total: {formatter.format(state.finalTotal)}
        <EditBox value={state.finalTotal} />
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
};

export default Home;
