import React from "react";
import "./about.styles.scss";
import scenery_1 from "../../images/scenery_1.jpeg";

const About = () => {
  return (
    <div className="about-container">
      <div>
        <p>
          Welcome to MunchiezCo, the ultimate destination where your love for
          food meets fashion! Originated in the heart of New York City, our
          brand is a celebration of delicious flavors and impeccable style.
        </p>
        <p>
          At MunchiezCo, we believe that fashion is a feast for the eyes, just
          like food is for the soul. Our story begins with a passion for
          creating not just t-shirts, but wearable expressions of the joy and
          love found in every bite. Rooted in the diverse culinary landscape of
          New York, our shirts are a tribute to the city's diverse palate.
        </p>
        <p>
          Indulge in the comfort and style of our meticulously crafted t-shirts.
          Immerse yourself in the love affair between fashion and food with our
          classic black and pristine white shirts – the perfect canvas for your
          culinary expressions.
        </p>
      </div>
      <div className="about-image-container">
        <img src={scenery_1} alt="" className="about-image" />
      </div>
    </div>
  );
};

export default About;
