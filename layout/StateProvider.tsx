import {getCurrentUser} from "../lib/apis";
import {useEffect, useState} from "react";
import Site from "./Site";
import Panel from "./Panel";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, setCurrentUser} from "../State/Slices/CurrentUserSlice";
import {useRouter} from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const StateProvider = ({children}: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const thisUser = useSelector(selectUser);

  useEffect(() => {
    fetchMe();
  }, []);

  async function fetchMe() {
    const currentUser = await getCurrentUser();
    // console.log(currentUser);
    dispatch(setCurrentUser(currentUser));
    setLoading(false);
  }

  if (loading) return <Loading />;
  if (router.asPath.includes("Dashboard"))
    return (
      <Panel>
        <main>{children}</main>
      </Panel>
    );
  return (
    <>
      <Navbar loggedIn={!!thisUser} />
      <main style={{minHeight: "100vh"}}>{children}</main>
      <Footer />
    </>
  );
};

export default StateProvider;
