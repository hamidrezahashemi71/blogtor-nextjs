import {getCurrentUser} from "../lib/apis";
import {useEffect, useState} from "react";
import {setCurrentUser, selectUser} from "../State/Slices/CurrentUserSlice";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {
  Container,
  styled,
  Box,
  AppBarProps as MuiAppBarProps,
  Toolbar,
  List,
  Typography,
  Divider,
} from "@mui/material";
import * as React from "react";
import Profile from "../components/Profile";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArticleIcon from "@mui/icons-material/Article";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import AttributionIcon from "@mui/icons-material/Attribution";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Loading from "../components/Loading";

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
    {
      name: "Profile",
      href: "/Dashboard/EditProfile",
      id: 1,
      icon: <AccountBoxIcon />,
    },
    {
      name: "My Blogs",
      href: "/Dashboard/MyBlogs",
      id: 1,
      icon: <ArticleIcon />,
    },
    {
      name: "Post Blog",
      href: "/Dashboard/PostBlog",
      id: 2,
      icon: <DriveFileRenameOutlineIcon />,
    },
  ];
  const lowerNavigation = [
    {name: "Home", href: "/", id: 1, icon: <HomeIcon />},
    {name: "Blogs", href: "/Blogs", id: 2, icon: <BookIcon />},
    {
      name: "Writers",
      href: "/Writers",
      id: 3,
      icon: <AttributionIcon />,
    },
    {name: "Log Out", href: "", id: 4, icon: <ExitToAppIcon />},
  ];
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const currentUser = useSelector(selectUser);
  // console.log(currentUser);
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

  if (loading) return <Loading />;
  return (
    <>
      <Box sx={{display: "flex"}}>
        <AppBar position='absolute' open={open}>
          <Toolbar
            sx={{
              display: "flex",
              // pr: "24px", // keep right padding when drawer closed
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
            disableGutters
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            {upperNavigation.map((text, index) => (
              <Link href={text.href} key={text.id}>
                <ListItem key={text.id} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{text.icon}</ListItemIcon>
                    <ListItemText primary={text.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider sx={{my: 1}} />
          <List>
            {lowerNavigation.map((text, index) => (
              <Link href={text.href} key={text.id}>
                <ListItem key={text.id} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <ListItemIcon>{text.icon}</ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary={text.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>

        <Container
          disableGutters
          maxWidth={false}
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            px: "20px",
            py: "100px",
          }}>
          <main>{children}</main>
        </Container>
      </Box>
    </>
  );
};

export default Panel;
