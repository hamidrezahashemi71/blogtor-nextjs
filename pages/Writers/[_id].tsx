import Site from "../../layout/Site";
import type {ReactElement} from "react";
import {NextPageWithLayout} from "../_app";

const SingleWriter: NextPageWithLayout = () => {
  return <div>SingleWriter</div>;
};

SingleWriter.getLayout = function getLayout(page: ReactElement) {
  return <Site>{page}</Site>;
};

export default SingleWriter;
