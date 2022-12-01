import {NextPageWithLayout} from "./_app";
import {Container} from "@mui/system";
import {Button, Grid, TextField, Typography} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const Contact: NextPageWithLayout = () => {
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
          display: "flex",
          alignItems: "center",
          gap: "7px",
          justifyContent: "center",
          mb: "56px",
        }}>
        <Typography
          variant='logo'
          sx={{display: "flex", alignItems: "center", gap: "2px"}}>
          Contact
        </Typography>
        <Typography variant='bigTitles'>Us</Typography>
      </Container>
      <Grid
        container
        spacing={10}
        sx={{
          display: "flex",
          alignItems: "center",
          px: "80px",
          justifyContent: "center",
        }}>
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}>
          <Container disableGutters sx={{display: "flex", gap: "24px"}}>
            <TextField
              variant='outlined'
              placeholder='Name'
              sx={{
                width: "200%",
                "&:focus": {
                  border: "1px solid primary.dark",
                },
              }}
            />
            <TextField
              variant='outlined'
              placeholder='Email'
              sx={{
                width: "200%",
                "&:focus": {
                  border: "1px solid primary.dark",
                },
              }}
            />
          </Container>
          <TextField
            variant='outlined'
            placeholder='Subject'
            sx={{
              width: "100%",
              "&:focus": {
                border: "1px solid primary.dark",
              },
            }}
          />
          <TextareaAutosize
            minRows={10}
            placeholder='Your Message'
            style={{width: "100%", backgroundColor: "transparent"}}
          />
          <Button variant='normalButtons'>Send Message</Button>
        </Grid>

        <Grid
          item
          md={6}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "start",
            width: "50%",
          }}>
          <Typography variant='fadeText' sx={{mb: "40px"}}>
            Dynamically underwhelm integrated outsourcing via timely models.
            Rapidiously reconceptualize visionary imperatives without
          </Typography>
          <Typography variant='fadeText' sx={{mb: "8px"}}>
            blog.notebook@gmail.com
          </Typography>
          <Typography variant='fadeText' sx={{mb: "8px"}}>
            +886554 654654
          </Typography>
          <Typography variant='fadeText' sx={{mb: "8px"}}>
            9567 Turner Trace Apt. BC C3G8A4
          </Typography>
          <Typography variant='fadeText' sx={{mb: "32px"}}>
            9567 Turner Trace Apt. BC C3G8A4
          </Typography>
          <Typography variant='mainText' sx={{mb: "8px"}}>
            Follow on:
          </Typography>
          <Container
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "20px",
            }}>
            <TwitterIcon sx={{color: "primary.dark"}} />
            <FacebookIcon sx={{color: "primary.dark"}} />
            <InstagramIcon sx={{color: "primary.dark"}} />
            <TelegramIcon sx={{color: "primary.dark"}} />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;  
