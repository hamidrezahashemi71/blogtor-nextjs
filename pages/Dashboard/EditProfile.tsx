import {NextPageWithLayout} from "../_app";
import type {ReactElement} from "react";
import Panel from "../../layout/Panel";

const EditProfile: NextPageWithLayout = () => {
  return <div>EditProfile</div>;
};

EditProfile.getLayout = function getLayout(page: ReactElement) {
  return <Panel>{page}</Panel>;
};

export default EditProfile;
