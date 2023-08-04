import "../styles/globals.scss";

import { Provider } from "react-redux";
import { persistedStore, store } from "./store";
import ReceiptEditor from "./ReceiptEditor";
import Toolbar from "../stories/Toolbar";
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
