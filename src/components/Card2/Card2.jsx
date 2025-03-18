import Image from "next/image";
import React, { useContext } from "react";
import "./Card2.scss";
import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";

function Card2({ item }) {
  // console.log(item)
  const { theme } = useContext(ThemeContext);
  return (
    <Link className=" text-decoration-none" href={`/category/${item.catSlug}/${item.slug}`}>
      <div className="cardContainer">
        <div
          className="card d-flex align-items-center shadow-sm mb-4 border-0  flex-row flex-wrap"
          style={{ width: "100%", height: "100px" }}
        >
          {/* Image */}
          <div className="image-container" style={{ flex: "0 0 120px", height: "100%" }}>
            <Image
              className="card-img rounded-0"
              width={150}
              height={150}
              alt={item.title}
              src={item.img}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>

          {/* Card Body */}
          <div className={`card-body ps-sm-3`} style={{ flex: "1" }}>

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

          </div>
        </div>
      </div>
    </Link>


  );
}

export default Card2;
