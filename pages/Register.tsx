import Site from "../layout/Site";
import {ReactElement, useState} from "react";
import {NextPageWithLayout} from "./_app";
import {postRegisterInfo} from "../lib/apis";
import {RegisterInfo} from "../lib/interfaces";
import {useRouter} from "next/router";

const Register: NextPageWithLayout = () => {
  const [regInfo, setRegInfo] = useState({
    username: "sara joon",
    name: "sara",
  });

  const router = useRouter();

  async function Register() {
    const data = await postRegisterInfo(regInfo.username, regInfo.name);
    console.log(data);
    if (data.token) {
      // fetchUser();
      router.push("/Login");
    }
    if (data.msg === "this username already exists in the database")
      return alert("boooooo");
    if (data.msg === "bad input") return alert("booooooz");
  }

  return <button onClick={Register}>Sing Up</button>;
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <Site>{page}</Site>;
};

export default Register;

