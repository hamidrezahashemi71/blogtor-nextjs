import Sidebar from "../components/Sidebar";
import {getCurrentUser} from "../lib/apis";
import {useEffect, useState} from "react";
import {setCurrentUser, selectUser} from "../State/Slices/CurrentUserSlice";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";

const Panel = ({children}: React.PropsWithChildren<{}>) => {
  const currentUser = useSelector(selectUser);
  console.log(currentUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    const data = await getCurrentUser();
    // console.log(data);
    if (data._id) dispatch(setCurrentUser(data));
    if (data.msg === "Unauthorized") router.push("/Login");
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <h1>Loading ...</h1>;
  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  );
};

export default Panel;
