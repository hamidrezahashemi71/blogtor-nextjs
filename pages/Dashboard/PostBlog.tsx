import {NextPageWithLayout} from "../_app";
import {ReactElement, useState} from "react";
import Panel from "../../layout/Panel";
import {postBlog} from "../../lib/apis";
import {useRouter} from "next/router";
import {Button, Container} from "@mui/material";

const PostBlog: NextPageWithLayout = () => {
  const router = useRouter();
  const [blogInfo, setBlogInfo] = useState({
    title: "Blog1",
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
    tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
    quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
    sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
    recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
    minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
    quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
    fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
    consequuntur! Commodi minima excepturi repudiandae velit hic maxime
    doloremque. Quaerat provident commodi consectetur veniam similique ad 
    earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
    fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
    suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
    modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
    totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
    quasi aliquam eligendi, placeat qui corporis!`,
    imgurl:
      "https://www.joblo.com/wp-content/uploads/2015/08/wiw-lebowski-facebook-1280x720.jpg",
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

  return (
    <Container>
      <Button
        color='secondary'
        // sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
        onClick={post}>
        Post Blog
      </Button>
    </Container>
  );
};

PostBlog.getLayout = function getLayout(page: ReactElement) {
  return <Panel>{page}</Panel>;
};

export default PostBlog;

