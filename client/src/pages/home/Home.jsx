/* eslint-disable no-undef */
import React, { useContext } from "react";
import Layout from "../../components/shared/layout";
import Container from "react-bootstrap/esm/Container";
import Card from "../../components/card/card";
import Hero from "../../components/hero/Hero";
import About from "../../components/about/About";
import { dataContext } from "../../context/dataContext";
import { Helmet } from "react-helmet";

const Home = () => {
  const { data } = useContext(dataContext);
  // console.log(`Home component: ${data}`);
  return (
    <Layout>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="This is the landing page where users go to when they first enter the website."
        />
      </Helmet>
      <Container>
        <Hero />
        <h1 id="products">PRODUCTS</h1>
        <Card products={data} />
        <h1 id="about">ABOUT</h1>
        <About />
      </Container>
    </Layout>
  );
};

export default Home;
