import Site from "../../layout/Site";
import {ReactElement, useState} from "react";
import {getAllBlogs, getSingleBlog, postRate} from "../../lib/apis";
import {SingleBlog, SingleBlogObj} from "../../lib/interfaces";
import {toast} from "react-toastify";
import Comments from "../../components/Comments";

const SingleBlogPage = ({singleBlog}: SingleBlogObj) => {
  const [rate, setRate] = useState(4);
  console.log(singleBlog);

  const submitRate = async () => {
    const data = await postRate(singleBlog._id, rate);
    if (data.msg === "ok") toast.success("Siktir", {theme: "dark"});
    if (data.msg === "bad request: bad input")
      toast.error("ridiii", {theme: "dark"});
    if (data.msg === "bad request: no such blog exists")
      toast.error("ridiii2", {theme: "dark"});
    if (data.msg === "unathorized") toast.error("login kon", {theme: "dark"});
  };
  return (
    <>
      <button onClick={submitRate}>Rate</button>
      <Comments blogId={singleBlog._id} />
    </>
  );
};


export default SingleBlogPage;

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  const paths = blogs.map((blog: any) => ({
    params: {
      _id: blog._id,
    },
  }));
  return {paths, fallback: "blocking"};
}

export async function getStaticProps({params}: any) {
  const singleBlog: SingleBlog = await getSingleBlog(params._id);
  return {
    props: {
      singleBlog,
    },
    revalidate: 1,
  };
}
