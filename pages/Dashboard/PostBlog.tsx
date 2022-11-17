import {NextPageWithLayout} from "../_app";
import type {ReactElement} from "react";
import Panel from "../../layout/Panel";

const PostBlog: NextPageWithLayout = () => {
  return <div>PostBlog</div>;
};

PostBlog.getLayout = function getLayout(page: ReactElement) {
  return <Panel>{page}</Panel>;
};

export default PostBlog;
