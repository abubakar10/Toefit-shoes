import React from "react";
import "./Section2.css";
import menshoe from "./../../../Assets/images/menmainshoes.png";
import womenshoe from "./../../../Assets/images/womenmainshoes.png";
import kidsshoe from "./../../../Assets/images/kidsmainshoes.png";
import saleshoe from "./../../../Assets/images/salemainpic.png";

const Section2 = () => {
  return (
    <div className="section2">
      <h2>Shop By Collections</h2>
      <div className="categories">
        <div className="men">
          <a href="/men">
            <img src={menshoe} alt="" />
            <div className="menbtn">
               <button>MEN</button>
            </div>
          </a>
          {/* <button className="menbtn">MEN</button> */}
        </div>
        <div className="women">
          <a href="/ladies">
            <img src={womenshoe} alt="" />
            <div className="womenbtn">
            <button>WOMEN</button>
            </div>
          </a>
        </div>
        <div className="kids">
          <a href="/kids">
            <img src={kidsshoe} alt="" />
            <div className="kidsbtn">
                <button >KIDS</button>
            </div>
            
          </a>
        </div>
        <div className="sale">
          <a href="/sale">
            <img src={saleshoe} alt="" />
            <div className="salebtn">
               <button >SALE</button>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Section2;
