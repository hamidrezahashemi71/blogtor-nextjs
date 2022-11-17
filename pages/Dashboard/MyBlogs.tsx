import {NextPageWithLayout} from "../_app";
import type {ReactElement} from "react";
import Panel from "../../layout/Panel";

const MyBlogs: NextPageWithLayout = () => {
  return <div>MyBlogs</div>;
};

MyBlogs.getLayout = function getLayout(page: ReactElement) {
  return <Panel>{page}</Panel>;
};

export default MyBlogs;
