import {Container} from "@mui/system";
import Typography from "@mui/material/Typography";
import Link from "next/link";
const moment = require("moment");

const WriterCard = ({writer}: any) => {
  console.log(writer);
  const joinedDate = moment(writer.createdAt).format("dddd, MMMM Do YYYY");
  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        justifyContent: "start",
        width: "360px",
        gap: "24px",
      }}>
      <Link href={`/Writers/${writer._id}`}>
        <img
          width={"80px"}
          height={"80px"}
          style={{
            borderRadius: "100%",
            objectFit: "cover",
            marginBottom: "24px",
          }}
          src={`${process.env.DOMAIN}${writer.avatar}`}
          alt=''
          onError={(event) => {
            event.target.onerror = null;
            event.target.src = "/assets/images/default-avatar.png";
          }}
        />
      </Link>
      <Container
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          gap: "8px",
          width: "100%",
        }}>
        <Typography variant='title'>{writer.name}</Typography>
        <Typography variant='fadeText'>
          {writer.bio
            ? `${writer.bio.slice(0, 10)}...`
            : "This writer has not add a bio yet!"}
        </Typography>
        <Typography variant='fadeText'>Joined: {joinedDate}</Typography>
        <Typography variant='fadeText'>Rate: {writer.averageScore}</Typography>
      </Container>
    </Container>
  );
};

export default WriterCard;
