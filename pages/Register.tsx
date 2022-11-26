import Site from "../layout/Site";
import {ReactElement, useState, useEffect} from "react";
import {NextPageWithLayout} from "./_app";
import {getCurrentUser, postRegisterInfo} from "../lib/apis";
import {useRouter} from "next/router";
import * as React from "react";
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
import {toast} from "react-toastify";
import Copyright from "../components/Copyright";
import {setCurrentUser, selectUser} from "../State/Slices/CurrentUserSlice";
import {useDispatch, useSelector} from "react-redux";

const Register: NextPageWithLayout = () => {
  const [regInfo, setRegInfo] = useState({
    username: "",
    name: "",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    currentUser ? router.push("/Dashboard") : setLoading(false);
  }, []);

  async function Register() {
    const regData = await postRegisterInfo(regInfo.username, regInfo.name);
    console.log(regData);
    if (regData.msg === "this username already exists in the database")
      return toast.error("This username already exists!");
    if (regData.msg === "bad input") return toast.error("Fill All Fields!");
    const currentUser = await getCurrentUser();
    dispatch(setCurrentUser(currentUser));
    router.push("/Dashboard");
  }

  if (loading) return <h1>Loading...</h1>;
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
                onChange={(e) => setRegInfo({...regInfo, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='username'
                label='User Name'
                name='username'
                autoComplete='false'
                onChange={(e) =>
                  setRegInfo({...regInfo, username: e.target.value})
                }
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

Register.getLayout = function getLayout(page: ReactElement) {
  return <Site>{page}</Site>;
};

export default Register;

