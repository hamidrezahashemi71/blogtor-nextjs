import {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {useSelector} from "react-redux";
import {selectUser} from "../State/Slices/CurrentUserSlice";

function ResponsiveAppBar() {
  const pages = ["Blogs", "Writers", "About", "Contact"];
  const settings = ["Dashboard", "Logout"];
  const currentUser = useSelector(selectUser);
  console.log(currentUser);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center' color='primary.dark'>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  fontWeight: 700,
                  my: 2,
                  bgcolor: "primary",
                  display: "block",
                  color: "#333333",
                  ":hover": {
                    bgcolor: "primary.light",
                    color: "primary.dark",
                  },
                }}>
                {page}
              </Button>
            ))}
          </Box>
          <Container>
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                ml: "10rem",
                display: {xs: "none", md: "flex"},
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: "0.3rem",
                color: "primary.dark",
                textDecoration: "none",
              }}>
              BLOGTOR
            </Typography>
          </Container>
          <Container>
            <Typography
              variant='h5'
              noWrap
              component='a'
              href=''
              sx={{
                mr: 2,
                display: {xs: "flex", md: "none"},
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: "0.3rem",
                color: "primary.dark",
                textDecoration: "none",
              }}>
              BLOGTOR
            </Typography>
          </Container>
          {currentUser ? (
            <Box sx={{flexGrow: 0}}>
              <Tooltip title='Profile'>
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                  <Avatar alt='user-avatar' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{mt: "45px"}}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{flexGrow: 1, display: {xs: "flex", md: "flex"}}}>
              <Button
                sx={{
                  fontWeight: 500,
                  my: 2,
                  bgcolor: "primary",
                  display: "block",
                  color: "#333333",
                  ":hover": {
                    bgcolor: "primary.light",
                    color: "primary.dark",
                  },
                }}>
                Login
              </Button>
              <Button
                sx={{
                  fontWeight: 500,
                  my: 2,
                  bgcolor: "primary",
                  display: "block",
                  color: "#333333",
                  ":hover": {
                    bgcolor: "primary.light",
                    color: "primary.dark",
                  },
                }}>
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
