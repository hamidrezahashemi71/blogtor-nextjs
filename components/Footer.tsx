import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  const pageNavigation = [
    {name: "Home", href: "/", id: 1},
    {name: "Blogs", href: "/Blogs", id: 2},
    {name: "Writers", href: "/Writers", id: 3},
    {name: "About", href: "/About", id: 4},
    {name: "Contact", href: "/Contact", id: 5},
  ];
  const loginNavigation = [
    {name: "Login", href: "/Login", id: 1},
    {name: "Register", href: "/Register", id: 2},
  ];

  return (
    <Box
      sx={{
        width: "100vw",
        height: "435px",
        bgcolor: "primary.main",
        mt: "100px",
      }}>
      <Grid container spacing={10} px={"10%"} sx={{bgcolor: "primary.main"}}>
        <Grid item md={4} xs={9}>
          <Paper
            elevation={0}
            variant='footerPaper'
            sx={{bgcolor: "primary.main"}}>
            <Typography variant='logo'>BLOGTOR</Typography>
            <Typography variant='mainText'>
              Did you come here for something in particular or just general
              Riker
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={1} xs={3}>
          <Paper
            elevation={0}
            variant='footerPaper'
            sx={{bgcolor: "primary.main"}}>
            <Typography variant='title'>Pages</Typography>
            <Typography variant='mainText'>
              <Container
                disableGutters
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  gap: "16px",
                }}>
                {pageNavigation.map((item) => (
                  <Link href={item.href} key={item.id}>
                    {item.name}
                  </Link>
                ))}
              </Container>
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={2} xs={3}>
          <Paper
            elevation={0}
            variant='footerPaper'
            sx={{bgcolor: "primary.main"}}>
            <Typography variant='title'>Sign In</Typography>
            <Typography variant='mainText'>
              <Container
                disableGutters
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  gap: "16px",
                }}>
                {loginNavigation.map((item) => (
                  <Link href={item.href} key={item.id}>
                    {item.name}
                  </Link>
                ))}
              </Container>
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={5} xs={9}>
          <Paper
            elevation={0}
            variant='footerPaper'
            sx={{bgcolor: "primary.main"}}>
            <Typography variant='title'>Keep in touch</Typography>
            <Container disableGutters sx={{display: "flex"}}>
              <TextField id='filled-basic' label='Filled' variant='filled' />
              <Button variant='normalButtons'>Subscribe</Button>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
