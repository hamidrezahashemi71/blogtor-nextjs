import {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Profile from "./Profile";
import Link from "next/link";
import {useRouter} from "next/router";

function ResponsiveAppBar({loggedIn}: any) {
  const router = useRouter();
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

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth={false} disableGutters>
        <Toolbar disableGutters>
          <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              sx={{color: "primary.dark"}}>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {xs: "block", md: "none"},
              }}>
              {pageNavigation.map((item) => (
                <Link href={item.href} key={item.id}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign='center' color='primary.dark'>
                      {item.name}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
            {pageNavigation.map((item) => (
              <Link href={item.href} key={item.id}>
                <Button
                  variant='navButtons'
                  onClick={handleCloseNavMenu}
                  sx={{
                    color: `${
                      router.pathname === item.href ? "black" : "#00AAA1"
                    } `,
                  }}>
                  {item.name}
                </Button>
              </Link>
            ))}
          </Box>
          <Container>
            <Typography
              variant='logo'
              noWrap
              sx={{display: {xs: "none", md: "flex"}, ml: "10rem"}}>
              <Link href='/' passHref>
                BLOGTOR
              </Link>
            </Typography>
          </Container>
          <Container>
            <Typography
              variant='logo'
              sx={{
                display: {xs: "flex", md: "none"},
                // mr: 2,
              }}>
              BLOGTOR
            </Typography>
          </Container>
          {loggedIn ? (
            <Profile />
          ) : (
            <Box sx={{flexGrow: 1, display: {xs: "flex", md: "flex"}}}>
              {loginNavigation.map((item) => (
                <Link href={item.href} key={item.id}>
                  <Button
                    variant='navButtons'
                    sx={{
                      color: `${
                        router.pathname === item.href ? "black" : "#00AAA1"
                      } `,
                    }}>
                    {item.name}
                  </Button>
                </Link>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
