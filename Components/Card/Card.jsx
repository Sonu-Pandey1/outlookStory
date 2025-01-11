import Image from "next/image";
import React from "react";
import "./Card.css";

function Card() {
  return (
    <div className="cardContainer card1">
      <div className="card shadow-sm mb-4 border-0 rounded-4" style={{ width: "26rem", position: "relative" }}>
        {/* Image */}
        <Image
          className="card-img-top"
          width={750}
          height={450}
          alt="card-img"
          src="https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg"
          style={{ objectFit: "cover", width: "100%", height: "250px" }}
        />

        {/* Badge on Image */}
        <span className="badge bg-primary text-light position-absolute" style={{ top: "210px", left: "10px" }}>
          Business
        </span>

        {/* Card Body */}
        <div className="card-body p-0 py-2">
          {/* Title with two-line truncation */}
          <h5 className="card-title text-truncate-2">
            Economists See Few Monetary Policy Changes With Powell Leading Fed fwenjn jn wdwe wed wed
          </h5>
          <small className="text-muted">December 15, 2017</small>

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
