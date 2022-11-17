import {NextPageWithLayout} from "./_app";
import type {ReactElement} from "react";
import Site from "../layout/Site";

const About: NextPageWithLayout = () => {
  return <div>About</div>;
};

About.getLayout = function getLayout(page: ReactElement) {
  return <Site>{page}</Site>;
};

export default About;
