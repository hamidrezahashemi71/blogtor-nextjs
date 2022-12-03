import {NextPageWithLayout} from "../_app";
import {useEffect, useState} from "react";
import {getMyBlogs} from "../../lib/apis";
import {Container} from "@mui/system";
import {Blog} from "../../lib/interfaces";
import BlogCard from "../../components/BlogCard";
import {Grid, Typography, Button} from "@mui/material";
import Loading from "../../components/Loading";
import Link from "next/link";

const MyBlogs: NextPageWithLayout = () => {
  const [myblogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBlogs = async () => {
    const data = await getMyBlogs();
    setMyBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  if (loading) return <Loading />;
  // console.log(myblogs);
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        width: "100%",
        // height: "100%",
        display: "flex",
        justifyContent: "start",
        p: {md: "50px", xs: "10px"},
        mt: "100px",
      }}>
      {myblogs.length ? (
        <Grid container spacing={5}>
          {myblogs.map((blog: Blog) => (
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                gap: "5px",
              }}>
              <BlogCard blog={blog} />
              <Container
                disableGutters
                sx={{display: "flex", alignItems: "center", gap: "5px"}}>
                <Link href={`/Dashboard/EditBlog/${blog._id}`}>
                  <Button variant='editButton'>Edit</Button>
                </Link>
              </Container>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant='fadeText'>
          I have no blogs written yet ....
        </Typography>
      )}
    </Container>
  );
};


export default MyBlogs;

