import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "lib/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
