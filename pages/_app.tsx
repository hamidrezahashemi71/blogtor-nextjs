import '../styles/globals.css'
import type { AppProps } from 'next/app'
import type {ReactElement, ReactNode} from "react";
import type {NextPage} from "next";
import {store} from "../State/Store";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ThemeProvider} from "@mui/material/styles";
import {mainTheme} from "../styles/theme/mainTheme";
import StateProvider from "../layout/StateProvider";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({Component, pageProps}: AppPropsWithLayout) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <StateProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </StateProvider>
      </ThemeProvider>
    </Provider>
  );
}
