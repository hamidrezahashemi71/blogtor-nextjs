import Navbar from "../components/general/Navbar";
import Footer from "../components/general/Footer";

const Site = ({children}: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Site;
