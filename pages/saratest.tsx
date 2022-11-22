import {getCurrentUser} from "../lib/apis";
import {useEffect} from "react";

const saratest = () => {
  useEffect(() => {
    fetchMe();
  }, []);

  async function fetchMe() {
    const data = await getCurrentUser();
    console.log(data);
  }

  return <div>saratest</div>;
};

export default saratest;
