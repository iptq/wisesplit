import { Provider } from "react-redux";
import { store } from "./store";
import ReceiptEditor from "./ReceiptEditor";
import ReceiptTotal from "./ReceiptTotal";

export default function App() {
  return (
    <Provider store={store}>
      <ReceiptEditor />
      <ReceiptTotal />
    </Provider>
  );
}
