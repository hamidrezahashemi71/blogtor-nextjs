import {Typography} from "@mui/material";
import {Container} from "@mui/system";
import Link from "next/link";
const moment = require("moment");
import Divider from "@mui/material/Divider";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";

const BlogCard = ({blog}: any) => {
  // console.log(blog);
  const creationDate = moment(blog.createdAt).format("dddd, MMMM Do YYYY");
  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        width: "100%",
      }}>
      <Typography variant='title' sx={{fontSize: "27px", mb: "24px"}}>
        {blog.title}
      </Typography>
      <img
        width={"100%"}
        height={230}
        style={{borderRadius: "7px", objectFit: "cover", marginBottom: "24px"}}
        src={`${blog.imgurl}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/assets/images/default-blog.png";
        }}
        alt=''
      />
      <Container
        disableGutters
        sx={{display: "flex", alignItems: "center", gap: "7px"}}>
        <Typography variant='fadeText'>{creationDate}</Typography>
        <Divider orientation='vertical' flexItem />
        <DateRangeOutlinedIcon sx={{color: "primary.fadeText", fontSize: 12}} />
        <Divider orientation='vertical' flexItem />
        <Typography variant='fadeText'>
          {blog.averageScore} from {blog.rateCount} votes!
        </Typography>
      </Container>
      <Container disableGutters>
        <Typography variant='mainText' sx={{lineHeight: "22px"}}>
          {blog.content.slice(0, 80)}...
        </Typography>
      </Container>
      <Link href={`/Blogs/${blog._id}`}>
        <Typography
          variant='mainText'
          sx={{
            lineHeight: "22px",
            "&:hover": {
              bgcolor: "white",
              borderRadius: "7px",
            },
          }}>
          Read More ...
        </Typography>
      </Link>
    </Container>
  );
};

export default BlogCard;
