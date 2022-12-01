import {useState} from "react";
import Head from "next/head";
import {getAllWriters} from "../../lib/apis";
import {Writer, AllWriters} from "../../lib/interfaces";
import WriterCard from "../../components/WriterCard";
import SearchBar from "../../components/SearchBar";
import {Container, Grid, Typography} from "@mui/material";
import AttributionIcon from "@mui/icons-material/Attribution";

const Writers = ({allWriters}: AllWriters) => {
  const [searchVal, setSearchVal] = useState("");
  // console.log(allWriters);
  return (
    <>
      <Head>
        <title>{process.env.TITLE} | All Writers</title>
        <meta name='description' content='All writers page' />
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
            <AttributionIcon />
            All
          </Typography>
          <Typography variant='title'>Writers</Typography>
        </Container>
        {allWriters.length ? (
          <Grid container spacing={10} width={"100%"}>
            {allWriters
              .filter((writer) =>
                writer.name.toLowerCase().includes(searchVal.toLowerCase())
              )
              .map((writer: Writer) => (
                <Grid key={writer._id} item md={4} xs={12}>
                  <WriterCard writer={writer} />
                </Grid>
              ))}
          </Grid>
        ) : (
          <Typography>No Users yet!</Typography>
        )}
      </Container>
    </>
  );
};

export default Writers;

export async function getStaticProps() {
  const allWriters: Writer[] = await getAllWriters();
  return {
    props: {
      allWriters,
    },
    revalidate: 1,
  };
}
