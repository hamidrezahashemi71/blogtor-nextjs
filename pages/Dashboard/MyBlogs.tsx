import {NextPageWithLayout} from "../_app";
import {ReactElement, useEffect, useState} from "react";
import Panel from "../../layout/Panel";
import {getMyBlogs} from "../../lib/apis";

const MyBlogs: NextPageWithLayout = () => {
  const [myblogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBlogs = async () => {
    const data = await getMyBlogs();
    setMyBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (!myblogs.length) return <h1>felen post nazashte</h1>;
  return <div>MyBlogs</div>;
};

MyBlogs.getLayout = function getLayout(page: ReactElement) {
  return <Panel>{page}</Panel>;
};

export default MyBlogs;

