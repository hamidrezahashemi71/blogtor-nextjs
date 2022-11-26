import {getCurrentUser} from "../lib/apis";
import {useEffect, useState} from "react";
import {setCurrentUser, selectUser} from "../State/Slices/CurrentUserSlice";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {Container} from "@mui/material";
import * as React from "react";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Profile from "../components/Profile";
import Copyright from "../components/Copyright";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({theme, open}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Panel = ({children}: React.PropsWithChildren<{}>) => {
  const upperNavigation = [
    {name: "Profile", href: "/Dashboard/EditProfile", id: 1},
    {name: "My Blogs", href: "/Dashboard/MyBlogs", id: 1},
    {name: "Post Blog", href: "/Dashboard/PostBlog", id: 2},
  ];
  const lowerNavigation = [
    {name: "Home", href: "/", id: 1},
    {name: "Blogs", href: "/Blogs", id: 2},
    {name: "Writers", href: "/Writers", id: 3},
    {name: "Log Out", href: "", id: 4},
  ];
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const currentUser = useSelector(selectUser);
  console.log(currentUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    const data = await getCurrentUser();
    if (data._id) dispatch(setCurrentUser(data));
    if (data.msg === "Unauthorized") router.push("/Login");
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <h1>Loading ...</h1>;
  return (
    <>
      <Box sx={{display: "flex"}}>
        <AppBar position='absolute' open={open}>
          <Toolbar
            sx={{
              display: "flex",
              pr: "24px", // keep right padding when drawer closed
            }}>
            <IconButton
              edge='start'
              aria-label='open drawer'
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && {display: "none"}),
              }}>
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='primary.dark'
              noWrap
              sx={{
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: "0.3rem",
                color: "primary.dark",
                textDecoration: "none",
              }}>
              Dashboard
            </Typography>
            <Profile />
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            {upperNavigation.map((text, index) => (
              <Link href={text.href}>
                <ListItem key={text.id} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider sx={{my: 1}} />
          <List>
            {lowerNavigation.map((text, index) => (
              <Link href={text.href}>
                <ListItem key={text.id} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
        <Toolbar />
        <Container
          maxWidth='lg'
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}>
          <main>{children}</main>
          <Copyright sx={{pb: 4}} />
        </Container>
      </Box>
    </>
  );
};

export default Panel;
