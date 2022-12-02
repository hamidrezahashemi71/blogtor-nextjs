import {ReactElement, useEffect, useState} from "react";
import Panel from "../../../layout/Panel";
import {editBlog, deleteBlog, getSingleBlog} from "../../../lib/apis";
import {useRouter} from "next/router";
import {BlogInfo} from "../../../lib/interfaces";
import {toast} from "react-toastify";
import Loading from "../../../components/Loading";

const EditBlog = () => {
  const router = useRouter();
  const blogId = router?.query?._id;
  const [bloginfo, setBloginfo] = useState<BlogInfo | null>(null);

  useEffect(() => {
    fetchBlog();
  }, [blogId]);

  async function fetchBlog() {
    const data = await getSingleBlog(blogId);
    if (!data.msg)
      setBloginfo({
        _id: blogId,
        title: data.title,
        content: data.content,
        imgUrl: data.imgurl,
      });
  }

  const editBlogFunc = async () => {
    const editBlogData = await editBlog(
      bloginfo?._id,
      bloginfo?.title,
      bloginfo?.content,
      bloginfo?.imgUrl
    );
    if (editBlogData.msg === "ok") {
      router.push("/Dashboard/MyBlogs");
      toast.success("Blog Edited Successfully!", {theme: "dark"});
    }
    if (editBlogData.msg === "bad request: bad inputs")
      toast.error("Please fill all fields!", {theme: "dark"});
    if (editBlogData.msg === "unathorized")
      toast.error("Something went wrong! Try again", {theme: "dark"});
  };

  const deleteBlogFunc = async () => {
    const deleteBlogData = await deleteBlog(blogId);
    if (deleteBlogData.msg) {
      router.push("/Dashboard/MyBlogs");
      toast.success("Blog Deleted Successfully!", {theme: "dark"});
    }
  };

  // console.log("Our Data", bloginfo);
  if (!bloginfo) return <Loading />;
  return (
    <div>
      <input
        type='text'
        value={bloginfo._id}
        onChange={(e) => setBloginfo({...bloginfo, _id: e.target.value})}
      />
      <input
        type='text'
        value={bloginfo.title}
        onChange={(e) => setBloginfo({...bloginfo, title: e.target.value})}
      />
      <input
        type='text'
        value={bloginfo.content}
        onChange={(e) => setBloginfo({...bloginfo, content: e.target.value})}
      />
      <input
        type='text'
        value={bloginfo.imgUrl}
        onChange={(e) => setBloginfo({...bloginfo, imgUrl: e.target.value})}
      />
      <button onClick={editBlogFunc}>Edit Blog</button>
      <button onClick={deleteBlogFunc}>Delete Blog</button>
    </div>
  );
};

EditBlog.getLayout = function getLayout(page: ReactElement) {
  return <Panel>{page}</Panel>;
};

export default EditBlog;
