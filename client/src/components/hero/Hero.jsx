import "./hero.styles.scss";
import ModelOne from "../../images/model_1.JPG";
import ModelTwo from "../../images/model_2.JPG";
import ModelThree from "../../images/model_3.jpg";
import { useEffect, useState } from "react";

const Hero = () => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-img-container">
        {windowSize[0] > 991 && (
          <>
            <div className="hero-img-sub-container">
              <img src={ModelOne} alt="two_guys_posing_on_bridge" />
            </div>
            <div className="hero-img-sub-container">
              <img src={ModelTwo} alt="two_guys_posing_on_bridge" />
            </div>
            <div className="hero-img-sub-container">
              <img src={ModelThree} alt="two_guys_posing_on_bridge" />
            </div>
          </>
        )}
        {windowSize[0] < 991 && (
          <img src={ModelThree} alt="two_guys_posing_on_bridge" />
        )}
      </div>
    </div>
  );
};

export default Hero;
