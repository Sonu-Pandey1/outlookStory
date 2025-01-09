import Image from "next/image";
import React from "react";
import "./Card2.css";

function Card2() {
  return (
    <div className="cardContainer">
      <div
        className="card d-flex align-items-center shadow-sm mb-4 border-0  flex-row"
        style={{ width: "100%", height: "100px" }}
      >
        {/* Image */}
        <div
          className="image-container"
          style={{ flex: "0 0 120px", height: "100%" }}
        >
          <Image
            className="card-img"
            width={150}
            height={150}
            alt="card-img"
            src="https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        {/* Card Body */}
        <div className="card-body p-0 ps-3" style={{ flex: "1" }}>
          {/* Title with two-line truncation */}
          <h5 className="card-title text-truncate-2">
            Economists See Few Monetary Policy Changes With Powell Leading Fed
          </h5>
          <small className="text-muted">December 15, 2017</small>
        </div>
      </div>
    </div>
  );
}

export default Card2;
