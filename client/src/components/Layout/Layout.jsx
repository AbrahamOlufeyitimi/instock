import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="two-color-bg">
        <main className="main">{children}</main>
      </div>

      <Footer />
    </>
  );
};
export default Layout;
