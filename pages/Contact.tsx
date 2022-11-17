import {NextPageWithLayout} from "./_app";
import type {ReactElement} from "react";
import Site from "../layout/Site";

const Contact: NextPageWithLayout = () => {
  return <div>Contact</div>;
};

Contact.getLayout = function getLayout(page: ReactElement) {
  return <Site>{page}</Site>;
};

export default Contact;
