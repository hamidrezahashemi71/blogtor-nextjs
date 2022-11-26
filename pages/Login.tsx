import {useState, useEffect} from "react";
import {NextPageWithLayout} from "./_app";
import {postLoginInfo} from "../lib/apis";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {selectUser} from "../State/Slices/CurrentUserSlice";

const Login: NextPageWithLayout = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: "sara joon",
    password: "1111",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    currentUser ? router.push("/Dashboard") : setLoading(false);
  }, []);

  async function Login() {
    const data = await postLoginInfo(loginInfo.username, loginInfo.password);
    console.log(data);
    if (data.token) {
      // fetchme
      router.push("/Dashboard");
      toast.success("Khosh umadi jigar!");
    }
    if (data.msg === "bad inputs") return console.log("ridi");
    if (data.msg === "password doesnt match")
      return console.log("ridi, pass eshteba");
    if (data.msg === "bad request: no such user exists")
      return console.log("ridi, nist");
  }

  if (loading) return <h1>Loading...</h1>;
  return <button onClick={Login}>Login</button>;
};

export default Login;
