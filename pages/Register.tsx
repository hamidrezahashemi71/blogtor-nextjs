import Site from "../layout/Site";
import type {ReactElement} from "react";
import {NextPageWithLayout} from "./_app";

const Register: NextPageWithLayout = () => {
  return <div>Register</div>;
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <Site>{page}</Site>;
};

export default Register;
