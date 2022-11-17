import Site from "../../layout/Site";
import type {ReactElement} from "react";
import {NextPageWithLayout} from "../_app";

const SingleBlog: NextPageWithLayout = () => {
  return <div>SingleBlog</div>;
};

SingleBlog.getLayout = function getLayout(page: ReactElement) {
  return <Site>{page}</Site>;
};

export default SingleBlog;
