import React from "react";
import "./footer.styles.scss";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <hr />
      Copyright &copy; {year} | Made with ❤️ by MunchiezCo. All Rights Reserved.{" "}
    </footer>
  );
};

export default Footer;
