import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
