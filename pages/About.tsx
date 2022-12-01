import {NextPageWithLayout} from "./_app";
import {Container, Typography} from "@mui/material";

const About: NextPageWithLayout = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        bgcolor: "primary.veryLight",
        width: "100%",
        height: "100vh",
        py: "80px",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <Container
        disableGutters
        sx={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          gap: "7px",
          justifyContent: "center",
        }}>
        <Typography
          variant='logo'
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            width: "70%",
          }}>
          Blogtor is a place
        </Typography>
        <Typography variant='bigTitles'>
          Where you can write and find your perfect blogs
        </Typography>
      </Container>
      <Typography
        variant='fadeText'
        sx={{
          width: {md: "35%", xs: "80%"},
          textAlign: "center",
          mt: "32px",
          mb: "24px",
        }}>
        Dynamically underwhelm integrated outsourcing via timely models.
        Rapidiously reconceptualize visionary imperatives without 24/365
        catalysts for change. Completely streamline functionalized models and
        out-of-the-box functionalities. Authoritatively target proactive vortals
        vis-a-vis exceptional results. Compellingly brand emerging sources and
        compelling materials. Globally iterate parallel content
      </Typography>
      <Typography variant='title'>
        The best ideas can change who we are.
      </Typography>
      <Typography
        variant='fadeText'
        sx={{
          width: {md: "35%", xs: "80%"},
          textAlign: "center",
          mt: "16px",
          mb: "24px",
        }}>
        Dynamically underwhelm integrated outsourcing via timely models.
        Rapidiously reconceptualize visionary imperatives without 24/365
        catalysts for
      </Typography>
    </Container>
  );
};


export default About;
