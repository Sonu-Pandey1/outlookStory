

import Image from "next/image";
import React, { useContext } from "react";
import "./Card.scss";
import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";

function Card({ item }) {
  const { theme } = useContext(ThemeContext);

  return (
    <Link className=" text-decoration-none" href={`/category/${item.catSlug}/${item.slug}`}>
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
              alt={item.title}
              src={item.img}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>

          {/* Badge on Image */}
          <span className="badge bg-primary text-light position-absolute" style={{ top: "170px", left: "10px" }}>
            {item.catSlug}
          </span>

          {/* Card Body */}
          <div className={`card-body text-left `}>
            {/* Title with two-line truncation */}
            <h5 className="card-title text-truncate-2">
              {item.title}
            </h5>
            <small className="">
              {new Date(item.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </small>

            {/* Optional description */}
            <p className="description text-truncate-2">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    </Link>

    //href={`/category/${post.catSlug}/${post.slug}`}
  );
}

export default Card;
