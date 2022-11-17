import Site from "../../layout/Site";
import type {ReactElement} from "react";
import {NextPageWithLayout} from "../_app";

const Writers: NextPageWithLayout = () => {
  return <div>Writers</div>;
};

Writers.getLayout = function getLayout(page: ReactElement) {
  return <Site>{page}</Site>;
};

export default Writers;
