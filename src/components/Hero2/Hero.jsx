import Image from "next/image";
import React, { useContext, useEffect } from "react";
import "./Hero.scss";
import { ThemeContext } from "@/context/ThemeContext";

function Hero({ data }) {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  if (!data || data.length < 4) {
    return <div>Insufficient data available for this section.</div>;
  }

  return (
    <>
      <div className="HeroContainer ">
        <div className="container-fluid">
          <div className={`row px-2 ${theme === "dark" ? "dark" : "light"}`}>
            {/* Left Column - Featured Article */}
            <div className="col-12 col-lg-6 py-3 ">
              <div className="card border-0 rounded shadow-sm overflow-hidden w-100">
                <Image
                  src={data[0].image}
                  alt={data[0].title}
                  className="card-img-top hero-image"
                  width={500}
                  height={250}
                  style={{ objectFit: "cover", height: "100%" }}
                />
                <div className="card-img-overlay d-flex flex-column justify-content-end p-2">
                  <span
                    className={`badge bg-${getBadgeColor(
                      data[0].category
                    )} mb-2`}
                  >
                    {data[0].category}
                  </span>
                  <h5 className="card-title text-white fw-bold">
                    {data[0].title}
                  </h5>
                </div>
              </div>
            </div>

            {/* Right Column - Smaller Articles */}
            <div className="col-12 col-lg-6 py-3">
              <div className="row g-2">
                {data.slice(1, 3).map((article, index) => (
                  <div key={index} className="col-6">
                    <div className="card border-0 shadow-sm overflow-hidden h-100">
                      <Image
                        src={article.image}
                        alt={article.title}
                        className="card-img-top"
                        width={250}
                        height={150}
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
                        <h6 className="card-title text-white">
                          {article.title}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Full-Width Article //todo -- NEED TO FIX THIS CARD NOTHING ELSE  */}
              <div className="row mt-2 llll ">
                <div className="col-12">
                  <div className="card border-0 shadow-sm overflow-hidden w-100 h-100">
                    <Image
                      src={data[3].image}
                      alt={data[3].title}
                      className="card-img-top"
                      width={950}
                      height={220}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-end p-2">
                      <span
                        className={`badge bg-${getBadgeColor(
                          data[3].category
                        )} mb-2`}
                      >
                        {data[3].category}
                      </span>
                      <h6 className="card-title text-white">{data[3].title}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
      return "primary";
  }
};

export default Hero;
