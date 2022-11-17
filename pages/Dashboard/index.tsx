import {NextPageWithLayout} from "../_app";
import type {ReactElement} from "react";
import Panel from "../../layout/Panel";

const Dashboard: NextPageWithLayout = () => {
  return <div>Dashboard</div>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Panel>{page}</Panel>;
};

export default Dashboard;
