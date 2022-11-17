import {NextPageWithLayout} from "../_app";
import type {ReactElement} from "react";
import Panel from "../../layout/Panel";

const EditBlog: NextPageWithLayout = () => {
  return <div>EditBlog</div>;
};

EditBlog.getLayout = function getLayout(page: ReactElement) {
  return <Panel>{page}</Panel>;
};

export default EditBlog;
