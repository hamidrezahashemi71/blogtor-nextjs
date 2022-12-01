import {getSingleWriter, getAllWriters, getBlogsByWriter} from "../../lib/apis";
import {
  SingleWriterProps,
  SingleWriter,
  SingleBlog,
} from "../../lib/interfaces";
import {Container, Avatar, Grid, Typography} from "@mui/material";
import moment from "moment";
import BlogCard from "../../components/BlogCard";

const SingleWriterPage = ({singleWriter, blogsByWriter}: SingleWriterProps) => {
  console.log("BLOGS BY USER", blogsByWriter);
  // console.log("singleWriter", singleWriter);
  const joinedDate = moment(singleWriter.createdAt).format(
    "dddd, MMMM Do YYYY"
  );

  // if (!singleWriter._id) return <h1>No such user found!</h1>;
  return (
    <>
      <Grid
        container
        spacing={5}
        sx={{
          mt: "0px",
          px: "60px",
          py: "40px",
          bgcolor: "primary.veryLight",
        }}>
        <Grid item md={4} xs={4}>
          <Avatar
            alt='user-avatar'
            sx={{objectFit: "cover"}}
            src={`${process.env.DOMAIN}${singleWriter.avatar}`}>
            <img
              style={{
                objectFit: "cover",
              }}
              src={"/assets/images/default-avatar.png"}
              alt='fallback-avatar'
            />
          </Avatar>
        </Grid>
        <Grid item md={6} xs={12}>
          <Container
            disableGutters
            maxWidth={false}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}>
            <Typography variant='bigTitles' sx={{mt: "10px"}}>
              Hi, I'm {singleWriter.name}
            </Typography>
            <Typography variant='title' sx={{textAlign: "start"}}>
              I am a member of Blogtor under the username of{" "}
              {singleWriter.username}
            </Typography>
            <Typography variant='mainText' sx={{mt: "20px"}}>
              My average score is {singleWriter.averageScore} and I've written{" "}
              {singleWriter.blogs?.length} blogs on Blogtor so far!
            </Typography>
            <Typography variant='mainText' sx={{mt: "10px"}}>
              I joined Blogtor on {joinedDate}
            </Typography>
            <Typography variant='mainText' sx={{mt: "10px"}}>
              Biography: {singleWriter.bio}
            </Typography>
          </Container>
        </Grid>
      </Grid>
      <Container
        disableGutters
        maxWidth={false}
        sx={{display: "flex", flexDirection: "column", width: "100%"}}>
        <Container
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            mt: "100px",
            ml: 0,
            gap: "5px",
            px: "40px",
          }}>
          <Typography
            variant='logo'
            sx={{display: "flex", alignItems: "center"}}>
            Read
          </Typography>
          <Typography variant='title'>{singleWriter.name}'s Blogs</Typography>
        </Container>
        <Grid container spacing={5} sx={{px: "40px", mt: "20px"}}>
          {blogsByWriter.length ? (
            <Grid item md={6} xs={12} sx={{display: "flex", gap: "20px"}}>
              {blogsByWriter.map((blog: SingleBlog) => (
                <BlogCard blog={blog} />
              ))}
            </Grid>
          ) : (
            <Typography variant='fadeText'>
              This user has no blogs yet!
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default SingleWriterPage;

export async function getStaticPaths() {
  const writers = await getAllWriters();
  const paths = writers.map((writer: any) => ({
    params: {_id: writer._id},
  })); 

  return {paths, fallback: "blocking"};
}

export async function getStaticProps({params}: any) {
  const singleWriter: SingleWriter = await getSingleWriter(params._id);
  if (singleWriter.msg) return {notFound: true};
  const blogsByWriter = await getBlogsByWriter(params._id);
  return {
    props: {
      singleWriter,
      blogsByWriter,
    },
    revalidate: 1,
  };
}
