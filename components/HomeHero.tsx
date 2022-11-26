import {Container, Typography, Button} from "@mui/material";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import Link from "next/link";

const HomeHero = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        bgcolor: "primary.light",
        height: "50%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "100px",
      }}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          justifyContent: "center",
          mb: "32px",
        }}>
        <Typography
          variant='logo'
          sx={{display: "flex", alignItems: "center", gap: "2px"}}>
          <DriveFileRenameOutlineOutlinedIcon />
          Write On
        </Typography>
        <Typography variant='title'>Blogtor</Typography>
      </Container>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}>
        <Typography variant='title' sx={{mb: "20px"}}>
          Writing on Blogtor is very simple
        </Typography>
        <Typography variant='mainText'>
          Register by one click and go to your dashboard and start posting your
          blogs!
        </Typography>
        <Typography variant='title' sx={{mt: "20px"}}>
          Rate and Comment on other blogs
        </Typography>
        <Typography variant='mainText'>
          You can read, rate and comment on other writers blogs.
        </Typography>
        <Link href={"/Register"}>
          <Button variant='outlineButtons' sx={{mt: "20px", width: "145px"}}>
            Join Now
          </Button>
        </Link>
      </Container>
    </Container>
  );
};

export default HomeHero;
