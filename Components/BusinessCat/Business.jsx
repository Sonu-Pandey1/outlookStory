import React from "react";
import "./Business.css";
import Image from "next/image";

export default function Business() {

    // Dummy data for small cards
  const smallCardsData = [
    {
      id: 1,
      title: "Economists See Few Monetary Policy Changes With Powell Leading Fed",
      date: "December 15, 2017",
      imgSrc: "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
    },
    {
      id: 2,
      title: "Tech Giants Continue to Dominate the Market",
      date: "January 5, 2021",
      imgSrc: "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-20-350x250.jpg",
    },
    {
      id: 3,
      title: "Stock Market Predictions for the Upcoming Year",
      date: "March 11, 2022",
      imgSrc: "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-4-350x250.jpg",
    },
    {
      id: 4,
      title: "The Rise of Renewable Energy Investment",
      date: "April 20, 2020",
      imgSrc: "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg",
    },
    {
      id: 5,
      title: "Economic Trends Shaping the Future",
      date: "May 15, 2019",
      imgSrc: "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-2-750x536.jpg",
    },
  ];

  return (
    <>
      <div className="businessContainer">
        <div>
          <button className="btn btn-outline-primary">Business</button>
        </div>
        <div className="cardForBusiness">
          <div className="card my-4 border-0" style={{ width: "100%" }}>
            <Image
              className="card-img-top"
              width={750}
              height={450}
              alt="card-img"
              src="https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-20-350x250.jpg"
              // style={{ objectFit: "cover", width: "100%", height: "250px" }}
            />
            <div className="card-body p-0 py-2 position-absolute text-white p-3">
              {/* Title with two-line truncation */}
              <h5 className="card-title text-truncate-2 ">
                Economists See Few Monetary Policy Changes With Powell Leading
                Fed fwenjn jn wdwe wed wed
              </h5>
              <small className=" text-white">December 15, 2017</small>
            </div>
          </div>
        </div>
        {/* Small Cards Section */}
      <div className="smallCardForBusiness">
        {smallCardsData.map((card) => (
          <div
            key={card.id}
            className="card d-flex align-items-center shadow-sm mb-4 border-0 flex-row"
            style={{ width: "100%", height: "100px" }}
          >
            {/* Image */}
            <div
              className="image-container"
              style={{ flex: "0 0 100px", height: "100%" }}
            >
              <Image
                className="card-img rounded"
                width={150}
                height={150}
                alt="card-img"
                src={card.imgSrc}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>

            {/* Card Body */}
            <div className="card-body p-0 ps-3" style={{ flex: "1" }}>
              {/* Title with two-line truncation */}
              <h5 className="card-title text-truncate-2">{card.title}</h5>
              <small className="text-muted">{card.date}</small>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
