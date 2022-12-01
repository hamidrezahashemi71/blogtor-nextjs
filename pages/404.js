import Link from "next/link";
import {Container, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NotFound = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // mt: "170px",
        bgcolor: "primary.light",
      }}>
      <Typography variant='fourOfour'>404</Typography>
      <Typography variant='title'>
        The page you are looking for does not exist!
      </Typography>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}>
        <Link href={"/"}>
          <Typography
            variant='bigTitles'
            sx={{color: "primary.dark", mt: "40px"}}>
            Back to homepage
            <ArrowBackIcon color='primary.dark' />
          </Typography>
        </Link>
      </Container>
    </Container>
  );
};

export default NotFound;
