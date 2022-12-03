import {useEffect, useState, useRef} from "react";
import {editBlog, deleteBlog, getSingleBlog} from "../../../lib/apis";
import {useRouter} from "next/router";
import {BlogInfo} from "../../../lib/interfaces";
import {toast} from "react-toastify";
import Loading from "../../../components/Loading";

import {Button, TextField} from "@mui/material";
import TextEditor from "../../../components/TextEditor";
import ModalBox from "../../../components/Modal";

const EditBlog = () => {
  const router = useRouter();
  const blogId = router?.query?._id;
  const [bloginfo, setBloginfo] = useState<BlogInfo | null>(null);
  const [deleteconfirm, setDeleteconfirm] = useState(false);
  const editorRef = useRef(null);
  const handleClose = () => setDeleteconfirm(false);

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
      // bloginfo?.content,
      editorRef?.current?.getContent(),
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

  console.log("Our Data", bloginfo);
  if (!bloginfo) return <Loading />;
  return (
    <>
      <TextField
        placeholder='Edit your blog title!'
        value={bloginfo.title ? bloginfo.title : "No title!"}
        sx={{mb: "20px", width: "100%"}}
        onChange={(e) => setBloginfo({...bloginfo, title: e.target.value})}
      />
      <TextField
        placeholder='Change your blog image url!'
        value={bloginfo.imgUrl ? bloginfo.imgUrl : "No images!"}
        sx={{mb: "20px", width: "100%"}}
        onChange={(e) => setBloginfo({...bloginfo, imgUrl: e.target.value})}
      />
      <TextEditor initialValue={bloginfo.content} editorRef={editorRef} />
      <Button variant='editButton' onClick={editBlogFunc} sx={{mt: "20px"}}>
        Submit
      </Button>
      <Button
        variant='deleteButton'
        onClick={() => setDeleteconfirm(true)}
        sx={{mt: "20px"}}>
        Delete
      </Button>
      {deleteconfirm ? (
        <ModalBox
          type='delete'
          deleteBlogFunc={deleteBlogFunc}
          deleteconfirm={deleteconfirm}
          handleClose={handleClose}
        />
      ) : null}
    </>
  );
};

export default EditBlog;
