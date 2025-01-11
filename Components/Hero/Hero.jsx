import Image from "next/image";
import React from "react";
import "./Hero.css";
import { articles } from "../../utils/DemoData";

function Hero() {
  return (
    <div className="heroContainer">
      <div className="container-fluid  bg-light">
        {/* Main Row: Featured Section */}
        <div className="row g-3 heroWrapper m-0 ">
          {/* Left: Featured Article */}
          <div className="col-md-6">
            <div className="card border-0 lth shadow-sm overflow-hidden">
              <Image
                src={articles[0].image}
                alt={articles[0].title}
                className="card-img-top"
                width={600}
                height={450}
                style={{ objectFit: "cover", height: "100%" }}
              />
              <div className="card-img-overlay d-flex flex-column justify-content-end p-3">
                <span className="badge bg-danger mb-2">
                  {articles[0].category}
                </span>
                <h4 className="card-title text-white fw-bold">
                  {articles[0].title}
                </h4>
              </div>
            </div>
          </div>

          {/* Right: Smaller Articles Section */}
          <div className="col-md-6">
            <div className="row g-3">
              {/* Top Row: Two Smaller Articles */}
              {articles.slice(1, 3).map((article, index) => (
                <div key={index} className="col-6">
                  <div className="card border-0  shadow-sm overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      className="card-img-top"
                      width={300}
                      height={200}
                      style={{ objectFit: "cover", height: "100%" }}
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-end p-2">
                      <span
                        className={`badge bg-${getBadgeColor(
                          article.category
                        )} mb-1`}
                      >
                        {article.category}
                      </span>
                      <h6 className="card-title text-white">{article.title}</h6>
                    </div>
                  </div>
                </div>
              ))}
              {/* Bottom Row: Full-Width Article */}
              <div className="col-12">
                <div className="card border-0 bth shadow-sm overflow-hidden">
                  <Image
                    src={articles[3].image}
                    alt={articles[3].title}
                    className="card-img-top"
                    width={600}
                    height={250}
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                  <div className="card-img-overlay d-flex flex-column justify-content-end p-3">
                    <span
                      className={`badge bg-${getBadgeColor(
                        articles[3].category
                      )} mb-2`}
                    >
                      {articles[3].category}
                    </span>
                    <h5 className="card-title text-white">
                      {articles[3].title}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Utility function to determine badge color
const getBadgeColor = (category) => {
  switch (category.toLowerCase()) {
    case "fashion":
      return "danger";
    case "world":
      return "primary";
    case "travel":
      return "warning";
    case "entertainment":
      return "info";
    default:
      return "secondary";
  }
};

export default Hero;
