import {NextPageWithLayout} from "../_app";
import {useEffect, useState} from "react";
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
  // console.log(myblogs);
  return <div>MyBlogs</div>;
};


export default MyBlogs;

