import { Provider } from "react-redux";
import { store } from "./store";
import ReceiptEditor from "./ReceiptEditor";
import Toolbar from "../stories/Toolbar";

export default function App() {
  return (
    <Provider store={store}>
      <Toolbar />
      <ReceiptEditor />
    </Provider>
  );
}
