import {NextPageWithLayout} from "../_app";
import {ReactElement, useState} from "react";
import Panel from "../../layout/Panel";
import {postBlog} from "../../lib/apis";
import {useRouter} from "next/router";

const PostBlog: NextPageWithLayout = () => {
  const router = useRouter();
  const [blogInfo, setBlogInfo] = useState({
    title: "sss",
    content: "aaa",
    imgurl: "ddd",
  });

  async function post() {
    const data = await postBlog(
      blogInfo.title,
      blogInfo.content,
      blogInfo.imgurl
    );
    if (data._id) {
      router.push(`/Blogs/${data._id}`);
      return alert("successgully posted");
    }
    if (data.msg === "bad request: bad inputs") return alert("ridi");
    if (data.msg === "Unathorized") return alert("badam ridi");
  }

  return <button onClick={post}>Post Blog</button>;
};

PostBlog.getLayout = function getLayout(page: ReactElement) {
  return <Panel>{page}</Panel>;
};

export default PostBlog;

