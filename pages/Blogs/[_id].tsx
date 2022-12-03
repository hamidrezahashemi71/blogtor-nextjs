import {useState} from "react";
import {getAllBlogs, getSingleBlog, postRate} from "../../lib/apis";
import {SingleBlog, SingleBlogObj} from "../../lib/interfaces";
import {toast} from "react-toastify";
import Comments from "../../components/Comments";
import Rate from "../../components/Rate";
import {Avatar, Container, Grid, Typography} from "@mui/material";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import moment from "moment";
import Link from "next/link";

const SingleBlogPage = ({singleBlog}: SingleBlogObj) => {
  const [rate, setRate] = useState(0);
  const creationDate = moment(singleBlog.createdAt).format(
    "dddd, MMMM Do YYYY"
  );
  const updateDate = moment(singleBlog.updatedAt).format("dddd, MMMM Do YYYY");
  console.log("SINGLE BLOG", singleBlog);

  const submitRate = async () => {
    const data = await postRate(singleBlog._id, rate);
    if (data.msg === "ok") toast.success("Your rating added!", {theme: "dark"});
    if (data.msg === "bad request: bad input")
      toast.error("You already rated this blog!", {theme: "dark"});
    if (data.msg === "bad request: no such blog exists")
      toast.error("This Blog has been deleted!", {theme: "dark"});
    if (data.msg === "unathorized")
      toast.error("You should login in order to rate!", {theme: "dark"});
  };

  return (
    <>
      <Grid
        container
        spacing={10}
        sx={{
          mt: "0px",
          px: "60px",
          py: "40px",
          bgcolor: "primary.veryLight",
        }}>
        <Grid
          item
          md={9}
          xs={12}
          sx={{display: "flex", flexDirection: "column", alignItems: "start"}}>
          <Typography variant='bigTitles' sx={{mb: "16px"}}>
            {singleBlog.title}
          </Typography>
          <Rating name='read-only' value={singleBlog.averageScore} readOnly />
          <Typography variant='fadeText'>
            {singleBlog.averageScore.toFixed(2)} from {singleBlog.rateCount}{" "}
            votes
          </Typography>
          <Container
            disableGutters
            maxWidth={false}
            sx={{
              mt: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
            <Link href={`/Writers/${singleBlog?.creator?._id}`}>
              <Avatar
                alt='user-avatar'
                sx={{width: "18px", height: "18px", objectFit: "cover"}}
                src={`${process.env.DOMAIN}${singleBlog?.creator?.avatar}`}>
                <img
                  width={"18px"}
                  height={"18px"}
                  style={{
                    objectFit: "cover",
                  }}
                  src={"/assets/images/default-avatar.png"}
                  alt='fallback-avatar'
                />
              </Avatar>
            </Link>
            <Typography variant='fadeText'>
              {singleBlog?.creator?.name}
            </Typography>
            <Divider orientation='vertical' flexItem />
            <Typography variant='fadeText'>{creationDate}</Typography>
            <Divider orientation='vertical' flexItem />
          </Container>
          <img
            src={`${singleBlog.imgurl}`}
            alt=''
            style={{
              marginTop: "35px",
              marginBottom: "40px",
              width: "100%",
              borderRadius: "5px",
            }}
          />
          <Typography
            variant='fadeText'
            sx={{textAlign: "justify", mb: "40px"}}
            dangerouslySetInnerHTML={{__html: singleBlog.content}}></Typography>
          <Typography variant='fadeText'>
            This blog was last updated at:{" "}
            <Typography variant='mainText'>{updateDate}</Typography>
          </Typography>
        </Grid>
        <Grid item md={3} xs={12}></Grid>
      </Grid>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          px: {md: "120px", xs: "15px"},
          py: "40px",
          bgcolor: "primary.light",
        }}>
        <Rate rate={rate} singleBlog={singleBlog} setRate={setRate} />
        <Comments blogId={singleBlog._id} submitRate={submitRate} />
      </Container>
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
  if (singleBlog.msg) return {notFound: true};
  return {
    props: {
      singleBlog,
    },
    revalidate: 1,
  };
}


