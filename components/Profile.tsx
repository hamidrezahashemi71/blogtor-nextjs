import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import {Box} from "@mui/system";
import React, {useState} from "react";
import {selectUser} from "../State/Slices/CurrentUserSlice";
import {useSelector} from "react-redux";

const Profile = () => {
  const currentUser = useSelector(selectUser);
  console.log(currentUser);
  const settings = ["Dashboard", "Logout"];
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 0,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Typography
        sx={{
          mr: 2,
          color: "black",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "12px",
        }}>
        Welcome {currentUser?.name.toUpperCase()}
      </Typography>
      <Tooltip title='Profile'>
        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
          <Avatar
            // sx={{objectFit: ""}}
            alt='user-avatar'
            src={`${process.env.DOMAIN}${currentUser.avatar}`}
          />
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
  );
};

export default Profile;
