import React from "react";
import "./Section1.css";
import banner from "./../../../Assets/images/banner.png";

const Section1 = () => {
  return (
    <div className="bannerimg">
      <a href="">
        <img src={banner} alt="" />
      </a>
    </div>
  );
};

export default Section1;
