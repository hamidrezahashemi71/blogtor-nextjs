import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import {Typography} from "@mui/material";

const Rate = ({singleBlog, rate, setRate}: any) => {
  return (
    <Box
      sx={{
        "& > legend": {mt: 2},
      }}>
      <Typography component='legend'>Rate this blog</Typography>
      <Rating
        name='simple-controlled'
        value={rate}
        onChange={(e) => {
          // console.log("RATING EVENT", e);
          setRate(e.target.value);
        }}
      />
    </Box>
  );
};

export default Rate;
