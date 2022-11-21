import '../styles/globals.css'
import type { AppProps } from 'next/app'
import type {ReactElement, ReactNode} from "react";
import type {NextPage} from "next";
import {store} from "../State/Store";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({Component, pageProps}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
      <ToastContainer />
    </Provider>
  );
}
