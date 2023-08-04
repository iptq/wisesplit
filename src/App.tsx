import Toolbar from "../stories/Toolbar";
import "../styles/globals.scss";
import ReceiptEditor from "./ReceiptEditor";
import { persistedStore, store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <Toolbar />
        <ReceiptEditor />
      </PersistGate>
    </Provider>
  );
}
