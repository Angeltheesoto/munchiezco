import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";

const Layout = ({ children }) => {
  return (
    <div id="top">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
