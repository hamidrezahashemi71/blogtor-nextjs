import Site from "../layout/Site";
import {ReactElement, useState} from "react";
import {NextPageWithLayout} from "./_app";
import {postLoginInfo} from "../lib/apis";
import {useRouter} from "next/router";

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({
    username: "sara joon",
    password: "1111",
  });

  async function Login() {
    const data = await postLoginInfo(loginInfo.username, loginInfo.password);
    console.log(data);
    if (data.token) {
      // fetchme
      router.push("/Dashboard");
    }
    if (data.msg === "bad inputs") return console.log("ridi");
    if (data.msg === "password doesnt match")
      return console.log("ridi, pass eshteba");
    if (data.msg === "bad request: no such user exists")
      return console.log("ridi, nist");
  }

  return <button onClick={Login}>Login</button>;
};


export default Login;
