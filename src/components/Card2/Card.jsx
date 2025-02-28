

import Image from "next/image";
import React, { useContext } from "react";
import "./Card.scss";
import { ThemeContext } from "@/context/ThemeContext";

function Card() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="cardContainer card1">
      <div
        className="card shadow-sm mb-4 border-0 rounded-4"
        style={{ width: "100%", position: "relative" }}
      >
        {/* Image */}
        <div className={`imgWrapper ${theme === "dark" ? "card-img-overlayy ll" : "card-img-overlayy"}`}>
          <Image
            className="card-img-top rounded-0"
            width={1000}
            height={1000}
            alt="card-img"
            src="https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>

        {/* Badge on Image */}
        <span className="badge bg-primary text-light position-absolute" style={{ top: "170px", left: "10px" }}>
          Business
        </span>

        {/* Card Body */}
        <div className={`card-body `}>
          {/* Title with two-line truncation */}
          <h5 className="card-title text-truncate-2">
            Economists See Few Monetary Policy Changes With Powell Leading Fed
          </h5>
          <small>December 15, 2017</small>

          {/* Optional description */}
          <p className="description text-truncate-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et magni in cupiditate voluptates repellendus expedita assumenda explicabo porro!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
