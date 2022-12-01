import {TopWriters, Writer} from "../lib/interfaces";
import WriterCard from "./WriterCard";
import {Container, Grid, Typography} from "@mui/material";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

const TopWriters = ({topWriters}: TopWriters) => {
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
          <WorkspacePremiumOutlinedIcon />
          Top
        </Typography>
        <Typography variant='title'>Writers</Typography>
      </Container>
      {topWriters.length ? (
        <Grid container spacing={5} width={"50%"}>
          {topWriters.map((writer: Writer) => (
            <Grid key={writer._id} item md={12} xs={12}>
              <WriterCard writer={writer} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>Hanooz Useri sabtenam nakarde</Typography>
      )}
    </Container>
  );
};

export default TopWriters;

