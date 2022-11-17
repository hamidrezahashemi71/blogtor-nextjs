import Site from "../layout/Site";
import type {ReactElement} from "react";
import {NextPageWithLayout} from "./_app";

const Login: NextPageWithLayout = () => {
  return <div>Login</div>;
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <Site>{page}</Site>;
};

export default Login;
