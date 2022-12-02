import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import {NextPageWithLayout} from "./_app";
import {LoginInfo} from "../lib/interfaces";
import {getCurrentUser, postLoginInfo} from "../lib/apis";
import {useSelector, useDispatch} from "react-redux";
import {selectUser, setCurrentUser} from "../State/Slices/CurrentUserSlice";
import {toast} from "react-toastify";
import Copyright from "../components/Copyright";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Loading from "../components/Loading";

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const [loading, setLoading] = useState(true);

  const [loginInfo, setLoginInfo] = useState<LoginInfo | any>({
    username: {
      value: "",
      error: false,
      errorMessage: "You must enter username",
    },
    password: {
      vlaue: "",
      error: false,
      errorMessage: "You must enter your password",
    },
  });

  useEffect(() => {
    currentUser ? router.push("/Dashboard/MyBlogs") : setLoading(false);
  }, []);

  async function Login() {
    const {username, password} = loginInfo;
    if (!username.value || !password.value) {
      const formFields = Object.keys(loginInfo);
      let newLoginInfo = {...loginInfo};

      for (let index = 0; index < formFields.length; index++) {
        const currentField = formFields[index];
        newLoginInfo = {
          ...newLoginInfo,
          [currentField]: {
            ...newLoginInfo[currentField],
            error: newLoginInfo[currentField]["value"] ? false : true,
          },
        };
      }
      return setLoginInfo(newLoginInfo);
    }

    const data = await postLoginInfo(
      loginInfo.username.value,
      loginInfo.password.value
    );
    if (data.msg === "password doesnt match")
      return toast.error("Wrong Password! Try 1111", {theme: "dark"});
    if (data.msg === "bad request: no such user exists")
      return toast.error("This username doesn't exist!", {theme: "dark"});
    const currentUser = await getCurrentUser();
    dispatch(setCurrentUser(currentUser));
    router.push("/Dashboard/MyBlogs");
    toast.success(`Welcome ${currentUser.name}`);
  }

  if (loading) return <Loading />;
  // console.log("USERNAME", loginInfo.username, "PASSWORD", loginInfo.password);
  return (
    <Container maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{m: 1, bgcolor: "primary.dark"}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <Box sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='username'
                required
                fullWidth
                id='username'
                label='User Name'
                autoFocus
                error={loginInfo.username.error}
                helperText={
                  loginInfo.username.error && loginInfo.username.errorMessage
                }
                onChange={(e) => {
                  const {name, value} = e.target;
                  setLoginInfo({
                    ...loginInfo,
                    [name]: {
                      ...loginInfo[name],
                      value,
                      error: false,
                    },
                  });
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type={"password"}
                id='password'
                label='Password'
                name='password'
                autoComplete=''
                error={loginInfo.password.error}
                helperText={
                  loginInfo.password.error && loginInfo.password.errorMessage
                }
                onChange={(e) => {
                  const {name, value} = e.target;
                  setLoginInfo({
                    ...loginInfo,
                    [name]: {
                      ...loginInfo[name],
                      value,
                      error: false,
                    },
                  });
                }}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            onClick={Login}
            variant='outlineButtons'
            sx={{mt: 3, mb: 2}}>
            Login
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Typography variant='fadeText'>
                Not a member?
                <Link href='/Register' variant='body2'>
                  <Typography variant='fadeText'> Register</Typography>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{mt: 5}} />
    </Container>
  );
};

export default Login;
