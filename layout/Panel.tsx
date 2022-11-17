import Sidebar from "../components/general/Sidebar";

const Panel = ({children}: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  );
};

export default Panel;
