import Site from "../../layout/Site";
import type {ReactElement} from "react";
import {NextPageWithLayout} from "../_app";

const Blogs: NextPageWithLayout = () => {
  return <div>Blogs</div>;
};

Blogs.getLayout = function getLayout(page: ReactElement) {
  return <Site>{page}</Site>;
};

export default Blogs;
