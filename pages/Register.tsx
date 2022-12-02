import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import {NextPageWithLayout} from "./_app";
import {getCurrentUser, postRegisterInfo} from "../lib/apis";
import {RegInfo} from "../lib/interfaces";
import {setCurrentUser, selectUser} from "../State/Slices/CurrentUserSlice";
import {useDispatch, useSelector} from "react-redux";
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

const Register: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const [loading, setLoading] = useState(true);

  const [regInfo, setRegInfo] = useState<RegInfo | any>({
    name: {
      value: "",
      error: false,
      errorMessage: "You must enter a name",
    },
    username: {
      value: "",
      error: false,
      errorMessage: "You must enter a name",
    },
  });

  useEffect(() => {
    currentUser ? router.push("/Dashboard/MyBlogs") : setLoading(false);
  }, []);

  async function Register() {
    const {name, username} = regInfo;
    if (!name.value || !username.value) {
      const formFields = Object.keys(regInfo);
      let newRegInfo = {...regInfo};

      for (let index = 0; index < formFields.length; index++) {
        const currentField = formFields[index];
        newRegInfo = {
          ...newRegInfo,
          [currentField]: {
            ...newRegInfo[currentField],
            error: newRegInfo[currentField]["value"] ? false : true,
          },
        };
      }
      return setRegInfo(newRegInfo);
    }

    const regData = await postRegisterInfo(
      regInfo.username.value,
      regInfo.name.value
    );

    if (regData.msg === "this username already exists in the database")
      return toast.error("This username already exists!");
    const currentUser = await getCurrentUser();
    dispatch(setCurrentUser(currentUser));
    router.push("/Dashboard/MyBlogs");
  }

  if (loading) return <Loading />;
  // console.log("NAME", regInfo.name, "USERNAME", regInfo.username);
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
          Sign up
        </Typography>
        <Box sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='name'
                required
                fullWidth
                id='name'
                label='Name'
                autoFocus
                error={regInfo.name.error}
                helperText={regInfo.name.error && regInfo.name.errorMessage}
                onChange={(e) => {
                  const {name, value} = e.target;
                  setRegInfo({
                    ...regInfo,
                    [name]: {
                      ...regInfo[name],
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
                id='username'
                label='User Name'
                name='username'
                autoComplete=''
                error={regInfo.username.error}
                helperText={
                  regInfo.username.error && regInfo.username.errorMessage
                }
                onChange={(e) => {
                  const {name, value} = e.target;
                  setRegInfo({
                    ...regInfo,
                    [name]: {
                      ...regInfo[name],
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
            onClick={Register}
            variant='outlineButtons'
            sx={{mt: 3, mb: 2}}>
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Typography variant='fadeText'>
                Already have an account?
                <Link href='/Login' variant='body2'>
                  <Typography variant='fadeText'> Sign in</Typography>
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

export default Register;
