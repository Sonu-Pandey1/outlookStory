import Image from "next/image";
import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "./Hero.scss";
import { ThemeContext } from "@/context/ThemeContext";

function Hero({ data }) {
  const {theme} = useContext(ThemeContext);
// console.log(theme)
useEffect(() => {
  console.log(theme); // Will log only when 'theme' changes
}, [theme]); // Dependency array ensures log happens only on theme change

  if (!data || data.length < 4) {
    return <div>Insufficient data available for this section.</div>;
  }

  return (
    <div className="heroContainer">
      <div className={`container-fluid ${theme == "dark"?"dark":"light"}`}>
        {/* Main Row: Featured Section */}
        <div className="row py-3 px-3 heroWrapper ">
          {/* Left: Featured Article */}
          <div className="col-md-6">
            <div className="card border-0 rounded lth shadow-sm overflow-hidden">
              <Image
                src={data[0].image}
                alt={`Image for ${data[0].title}`}
                className="card-img-top hero-image"
                width={600}
                height={450}
                style={{ objectFit: "cover", height: "100%" }}
              />
              <div className={`${theme == "dark"?"card-img-overlay ll":"card-img-overlay"} d-flex flex-column justify-content-end p-3`}>
                <span className={`badge bg-${getBadgeColor(data[0].category)} mb-2`}>
                  {data[0].category}
                </span>
                <h4 className="card-title text-white fw-bold">{data[0].title}</h4>
              </div>
            </div>
          </div>

          {/* Right: Smaller Articles Section */}
          <div className="col-md-6">
            <div className="row g-3">
              {data.slice(1, 3).map((article, index) => (
                <div key={index} className="col-6">
                  <div className="card rounded border-0 shadow-sm overflow-hidden">
                    <Image
                      src={article.image}
                      alt={`Image for ${article.title}`}
                      className="card-img-top"
                      width={300}
                      height={200}
                      style={{ objectFit: "cover", height: "100%" }}
                    />
                    <div className={`${theme == "dark"?"card-img-overlay ll":"card-img-overlay"} d-flex flex-column justify-content-end p-2`}>
                      <span className={`badge bg-${getBadgeColor(article.category)} mb-1`}>
                        {article.category}
                      </span>
                      <h6 className="card-title text-white">{article.title}</h6>
                    </div>
                  </div>
                </div>
              ))}
              {/* Bottom Row: Full-Width Article */}
              <div className="col-12">
                <div className="card rounded border-0 bth shadow-sm overflow-hidden">
                  <Image
                    src={data[3].image}
                    alt={`Image for ${data[3].title}`}
                    className="card-img-top"
                    width={600}
                    height={250}
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                  <div className={`${theme == "dark"?"card-img-overlay ll":"card-img-overlay"} d-flex flex-column justify-content-end p-3`}>
                    <span className={`badge bg-${getBadgeColor(data[3].category)} mb-2`}>
                      {data[3].category}
                    </span>
                    <h5 className="card-title text-white">{data[3].title}</h5>
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
    case "story":
      return "light";
    case "videos":
      return "danger";
    case "events":
      return "success";
    case "business":
      return "info";
    case "cityconnect":
      return "warning";
    default:
      return "primary"; // Fallback color
  }
};

export default Hero;
