import React, {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {selectUser} from "../State/Slices/CurrentUserSlice";
import {useSelector, useDispatch} from "react-redux";
import {signOut} from "../State/Slices/CurrentUserSlice";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import {Box} from "@mui/system";

const Profile = () => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();
  // console.log(currentUser);
  const settings = [
    {name: "Dashboard", href: "/Dashboard/MyBlogs", id: 1},
    {name: "Log Out", href: "", id: 2},
  ];
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
        Welcome {currentUser?.name}
      </Typography>

      <Tooltip title='Profile'>
        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
          <Avatar
            alt='user-avatar'
            sx={{objectFit: "cover"}}
            src={`${process.env.DOMAIN}${
              currentUser ? currentUser.avatar : null
            }`}>
            <img
              width={"40px"}
              height={"40px"}
              style={{
                objectFit: "cover",
              }}
              src={"/assets/images/default-avatar.png"}
              alt='fallback-avatar'
            />
          </Avatar>
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
          <Link href={setting.href} key={setting.id}>
            <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
              <Typography
                textAlign='center'
                onClick={
                  setting.name === "Log Out"
                    ? () => {
                        dispatch(signOut());
                        router.push("/");
                      }
                    : undefined
                }>
                {setting.name}
              </Typography>
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  );
};

export default Profile;
