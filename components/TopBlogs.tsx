import {Container, Grid, Typography} from "@mui/material";
import AppShortcutOutlinedIcon from "@mui/icons-material/AppShortcutOutlined";
import BlogCard from "../components/BlogCard";
import {TopBlogs, Blog} from "../lib/interfaces";

const TopBlogs = ({topBlogs}: TopBlogs) => {
  console.log(topBlogs);
  return (
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
      <Container
        disableGutters
        sx={{
          display: "flex",
          alignItems: "center",
          mb: "20px",
          ml: 0,
          gap: "5px",
        }}>
        <Typography variant='logo' sx={{display: "flex", alignItems: "center"}}>
          <AppShortcutOutlinedIcon />
          Top
        </Typography>
        <Typography variant='title'>Blogs</Typography>
      </Container>
      {topBlogs.length ? (
        <Grid container spacing={10} width={"100%"}>
          {topBlogs.map((blog: Blog) => (
            <Grid key={blog._id} item md={4} xs={12}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>Hanooz Blogi Neveshte nashode</Typography>
      )}
    </Container>
  );
};

export default TopBlogs;
