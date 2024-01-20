import React from "react";
import "./notfound.styles.scss";
import Layout from "../../components/shared/layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="notfound-container">
        <h1>404</h1>
        <h1>Page Not Found</h1>
      </div>
    </Layout>
  );
};

export default NotFound;
