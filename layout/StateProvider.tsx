import {getCurrentUser} from "../lib/apis";
import {useEffect, useState} from "react";
import Site from "./Site";
import Panel from "./Panel";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "../State/Slices/CurrentUserSlice";
import {useRouter} from "next/router";

const StateProvider = ({children}: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMe();
  }, []);

  async function fetchMe() {
    const currentUser = await getCurrentUser();
    dispatch(setCurrentUser(currentUser));
    setLoading(false);
  }

  if (router.asPath.includes("Dashboard"))
    return (
      <Panel>
        <main>{children}</main>
      </Panel>
    );

  if (loading) return <h1>Loading...</h1>;
  return (
    <Site>
      <main>{children}</main>
    </Site>
  );
};

export default StateProvider;
