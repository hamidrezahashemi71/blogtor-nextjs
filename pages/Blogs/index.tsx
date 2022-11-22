import Site from "../../layout/Site";
import type {ReactElement} from "react";
import {getAllBlogs} from "../../lib/apis";
import {Blog, AllBlogs} from "../../lib/interfaces";

const Blogs = ({allBlogs}: AllBlogs) => {
  console.log(allBlogs);
  return <div>Blogs</div>;
};

export default Blogs;

export async function getStaticProps() {
  const allBlogs: Blog[] = await getAllBlogs();
  return {
    props: {
      allBlogs,
    },
  };
}