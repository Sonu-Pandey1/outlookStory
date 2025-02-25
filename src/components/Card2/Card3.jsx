import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import React, { useContext } from "react";
import "./Card3.scss"

export default function Card3({ item }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div className=" col-md-6 col-12 mb-3 ">
      <div className="card card3 bg-danger border-0 shadow-sm">
        <div className="position-relative">
          <Image
            src={item.imgSrc}
            alt={item.title}
            width={350}
            height={200}
            className="card-img-top rounded-0"
          />
          <span className="position-absolute bottom-0 m-3 badge bg-warning">
            {item.category}
          </span>
        </div>
         {/* Badge on Image */}
         <span className="badge bg-primary text-light position-absolute" style={{ top: "165px", left: "10px" }}>
          {item.category}
        </span>
        <div
          className={`card-body p-0 py-3 px-2 ${
            theme === "dark" ? "dark" : "light"
          }`}
        >
          <h5 className="card-title text-truncate-3">{item.title}</h5>
          <small>December 15, 2017</small>
        </div>
      </div>
    </div>
  );
}
