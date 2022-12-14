import {useState} from "react";
import Head from "next/head";
import {getAllBlogs} from "../../lib/apis";
import {Blog, AllBlogs} from "../../lib/interfaces";
import BlogCard from "../../components/BlogCard";
import SearchBar from "../../components/SearchBar";
import {Container, Grid, Typography} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";

const Blogs = ({allBlogs}: AllBlogs) => {
  const [searchVal, setSearchVal] = useState("");
  console.log(allBlogs);

  return (
    <>
      <Head>
        <title>{process.env.TITLE} | All Blogs</title>
        <meta name='description' content='All blogs page' />
      </Head>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          px: "75px",
          py: "120px",
          bgcolor: "primary.veryLight",
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          flexWrap: "wrap",
          overflow: "hidden",
        }}>
        <SearchBar searchVal={searchVal} setSearchVal={setSearchVal} />
        <Container
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            mb: "20px",
            ml: 0,
            gap: "5px",
          }}>
          <Typography
            variant='logo'
            sx={{display: "flex", alignItems: "center"}}>
            <BookIcon />
            All
          </Typography>
          <Typography variant='title'>Blogs</Typography>
        </Container>
        {allBlogs.length ? (
          <Grid container spacing={10} width={"100%"}>
            {allBlogs
              .filter((blog) =>
                blog.title.toLowerCase().includes(searchVal.toLowerCase())
              )
              .map((blog: Blog) => (
                <Grid key={blog._id} item md={4} xs={12}>
                  <BlogCard blog={blog} />
                </Grid>
              ))}
          </Grid>
        ) : (
          <Typography>Hanooz Useri Sabte Nam Nakarde</Typography>
        )}
      </Container>
    </>
  );
};

export default Blogs;

export async function getStaticProps() {
  const allBlogs: Blog[] = await getAllBlogs();
  return {
    props: {
      allBlogs,
    },
    revalidate: 1,
  };
}
