import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { GrShareOption } from "react-icons/gr";
import "./LatestPopularPosts.scss"

const latestPoastData = [
  // Data for Entertainment
  {
    id: 1,
    category: "Entertainment",
    title:
      "Instagram Is Testing Photo Albums, Because Nothing Is Sacred Anymore",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
  },
  {
    id: 2,
    category: "Entertainment",
    title: "Netflix Introduces a Cheaper Subscription Plan With Ads",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-20-350x250.jpg",
  },
  {
    id: 3,
    category: "Entertainment",
    title: "Marvel Studios Unveils New Superhero Movies for 2024",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-4-350x250.jpg",
  },

  // Data for Business
  {
    id: 4,
    category: "Business",
    title: "Global Markets Hit by New Economic Challenges in 2023",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg",
  },
  {
    id: 5,
    category: "Business",
    title: "Top CEOs Announce Bold Plans for 2025",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
  },
  {
    id: 6,
    category: "Business",
    title: "Cryptocurrency Adoption Grows Despite Market Volatility",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg",
  },

  // Data for Sports
  {
    id: 7,
    category: "Sports",
    title: "Olympic Games to Introduce New Sports Categories",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
  },
  {
    id: 8,
    category: "Sports",
    title: "World Cup Final Sets New Viewership Record",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg",
  },
  {
    id: 9,
    category: "Sports",
    title: "Tennis Legends Play Charity Match for Global Peace",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
  },

  // Data for World
  {
    id: 10,
    category: "World",
    title: "Chinese ‘Rooftopper’ Films His Own Death During Skyscraper Stunt",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg",
  },
  {
    id: 11,
    category: "World",
    title: "New Sustainable Cities Emerging Across the Globe",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
  },
  {
    id: 12,
    category: "World",
    title: "Global Leaders Gather to Discuss Climate Change Solutions",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg",
  },
];

const popularPostData = [
  {
    id: 1,
    category: "Business",
    title:
      "Top CEOs Announce Bold Plans for 2025 And Top CEOs Announce Bold Plans for 2022",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
  },
  {
    id: 2,
    category: "Business",
    title: "Cryptocurrency Adoption Grows Despite Market Volatility",
  },

  // Data for Sports
  {
    id: 3,
    category: "Sports",
    title: "Olympic Games to Introduce New Sports Categories",
  },
  {
    id: 4,
    category: "Sports",
    title: "World Cup Final Sets New Viewership Record",
  },
  {
    id: 5,
    category: "Sports",
    title: "Tennis Legends Play Charity Match for Global Peace",
  },

  // Data for World
  {
    id: 6,
    category: "World",
    title: "Chinese ‘Rooftopper’ Films His Own Death During Skyscraper Stunt",
  },
  {
    id: 7,
    category: "World",
    title: "New Sustainable Cities Emerging Across the Globe",
  },
];

const aroundTheWorldData = [
  // Data for Entertainment
  {
    id: 1,
    category: "Entertainment",
    title:
      "Instagram Is Testing Photo Albums, Because Nothing Is Sacred Anymore",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
  },
  {
    id: 2,
    category: "Entertainment",
    title: "Netflix Introduces a Cheaper Subscription Plan With Ads",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-20-350x250.jpg",
  },
  {
    id: 3,
    category: "Entertainment",
    title: "Marvel Studios Unveils New Superhero Movies for 2024",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-4-350x250.jpg",
  },

  // Data for Business
  {
    id: 4,
    category: "Business",
    title: "Global Markets Hit by New Economic Challenges in 2023",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg",
  },
  {
    id: 5,
    category: "Business",
    title: "Top CEOs Announce Bold Plans for 2025",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
  },
  {
    id: 6,
    category: "Business",
    title: "Cryptocurrency Adoption Grows Despite Market Volatility",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg",
  },

  // Data for Sports
  {
    id: 7,
    category: "Sports",
    title: "Olympic Games to Introduce New Sports Categories",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
  },
  {
    id: 8,
    category: "Sports",
    title: "World Cup Final Sets New Viewership Record",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg",
  },
  {
    id: 9,
    category: "Sports",
    title: "Tennis Legends Play Charity Match for Global Peace",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
  },

  // Data for World
  {
    id: 10,
    category: "World",
    title: "Chinese ‘Rooftopper’ Films His Own Death During Skyscraper Stunt",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg",
  },
  {
    id: 11,
    category: "World",
    title: "New Sustainable Cities Emerging Across the Globe",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
  },
  {
    id: 12,
    category: "World",
    title: "Global Leaders Gather to Discuss Climate Change Solutions",
    imgSrc:
      "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg",
  },
];

export default function LatestPopularPosts({ categoryC }) {
  // console.log(categoryC)
  // State for managing the share counter
  const [shareCount, setShareCount] = useState(1345);

  // Function to handle the share action
  const handleShare = () => {
    if (navigator.share) {
      // Use the Web Share API (for mobile or modern browsers)
      navigator
        .share({
          title: popularPostData[0].title,
          text: "Check out this post!",
          url: window.location.href,
        })
        .then(() => {
          console.log("Share successful");
          // Increase the share count on success
          setShareCount(shareCount + 1);
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback: Copy the URL to clipboard for browsers that don't support the Web Share API
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          console.log("Link copied to clipboard");
          // Increase the share count on copy
          setShareCount(shareCount + 1);
        })
        .catch((error) => console.error("Failed to copy the link:", error));
    }
  };

  return (
    <div className="latestPopularPosts">
      <section>
        <div className="container-fluid px-4 bg-light pb-4 pt-2">
          <div className="row">
            {/* Left Column - Latest Posts */}
            <div className="col-md-8 latestPostsContainer">
              {categoryC ? (
                <h2 className="pb-3">{categoryC}</h2>
              ) : (
                <button className="mb-4 btn btn-outline-warning">
                  Latest Posts
                </button>
              )}
              <div className="row g-3 latestPosts">
                {latestPoastData.map((item) => (
                  <div key={item.id} className="col-md-12">
                    <div className="card border-0 shadow-sm h-100 d-flex  flex-row">
                      <div className="position-relative">
                        <div className="image-container">
                          <Image
                            src={item.imgSrc}
                            alt={item.title}
                            width={350}
                            height={200}
                            className="card-img-top rounded"
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </div>
                        <span className="position-absolute top-0 m-2 text-black badge bg-info">
                          {item.category}
                        </span>
                      </div>
                      <div className="card-body p-0 ps-4">
                        <h6 className="card-title text-truncate-2">
                          {item.title}
                        </h6>
                        <span className="text-muted small text-dark ">
                          BY <span className="fs-6 text-primary">john doe</span>{" "}
                          <small className="text-muted ps-3">
                            December 15, 2017
                          </small>
                        </span>

                        {/* Optional description */}
                        <p className="description text-truncate-2">
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Et magni in cupiditate voluptates repellendus
                          expedita assumenda explicabo porro!
                        </p>
                        <button className="btn btn-sm btn-outline-success">
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Popular Posts */}

            <div className="col-md-4 popularPostContainer">
              <div className="popularPosts">
                {categoryC ? (
                  ""
                ) : (
                  <button className="mb-4 btn btn-outline-primary">
                    Popular Posts
                  </button>
                )}
                <div className="row g-3 popularPosts">
                  {/* Render the first post separately with an image */}
                  {popularPostData[0] && (
                    <div key={popularPostData[0].id} className="col-12 mb-4">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body p-0">
                          <div className="row p-0">
                            <div className="col-12 p-0">
                              {/* Image */}
                              <Image
                                src={popularPostData[0].imgSrc}
                                alt="Post Image"
                                className="img-fluid"
                                height={500}
                                width={500}
                              />

                              {/* Title and ID */}
                              <div className="d-flex pph6 justify-content-between align-items-center p-3">
                                {/* Title with truncation to prevent overflow */}
                                <h6
                                  className="card-title text-truncate-2 mb-0 ps-2"
                                  style={{ maxWidth: "80%" }}
                                >
                                  {popularPostData[0].title}
                                </h6>
                                {/* ID */}
                                <div className="text-muted pptn text-emphasis rounded-pill p-2 ">
                                  <div className="fs-3">
                                    0{popularPostData[0].id}
                                  </div>
                                </div>
                              </div>

                              {/* Share Section */}
                              <div className="share px-4 pb-3 d-flex justify-content-start align-items-center">
                                {/* Share Icon Button */}
                                <button
                                  className=" d-flex align-items-center me-3"
                                  onClick={handleShare}
                                >
                                  <GrShareOption className="fs-5 me-2" />
                                  {/* Share Counter */}
                                  <div className="share-count text-muted">
                                    <span>{shareCount} shares</span>
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Render the remaining posts in the original format */}
                  {popularPostData.slice(1).map((item, index) => (
                    <div key={item.id} className="col-12">
                      <div className="card pp border-0 shadow-sm h-100">
                        <div className="card-body p-3">
                          <div className="row justify-content-between">
                            <div className="col-2">
                              <div className="trendNo rounded-pill">
                                <div className="">0{item.id}</div>
                              </div>
                            </div>
                            <div className="col-10">
                              <h6 className="card-title text-truncate-2">
                                {item.title}
                              </h6>
                              <div className="share d-flex justify-content-start align-items-center">
                                {/* Share Icon Button */}
                                <button
                                  className=" d-flex align-items-center me-3"
                                  onClick={handleShare}
                                >
                                  <GrShareOption className="fs-5 me-2 icon" />
                                  {/* Share Counter */}
                                  <div className="share-count text-muted">
                                    <span>{shareCount} shares</span>
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="advertisment">
                <div className="my-4">
                  <Image
                    className="card-img-top"
                    width={750}
                    height={450}
                    alt="advertisment-img"
                    src="https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/300x250-gadget.png"
                    // style={{
                    //   objectFit: "cover",
                    //   width: "100%",
                    //   height: "250px",
                    // }}
                  />
                </div>
              </div>

              <div className="categoriesWrapper">
                <div className="">
                  <button className="btn btn-outline-primary mb-4">
                    Categories
                  </button>
                </div>
                <div className="categories sahdow px-3">
                  <div>
                    <ul className="p-0">
                      <li className="d-flex justify-content-between py-2 ">
                        <Link className="c_link" href={"/business"}>
                          BUSINESS
                        </Link>
                        <p>(10)</p>
                      </li>
                      <li className="d-flex justify-content-between  py-2">
                        <Link className="c_link" href={"/fashion"}>
                          FASHION
                        </Link>
                        <p>(19)</p>
                      </li>
                      <li className="d-flex justify-content-between py-2">
                        <Link className="c_link" href={"/food"}>
                          FOOD
                        </Link>
                        <p>(20)</p>
                      </li>
                      <li className="d-flex justify-content-between py-2">
                        <Link className="c_link" href={"/health"}>
                          HEALTH
                        </Link>
                        <p>(03)</p>
                      </li>
                      <li className="d-flex justify-content-between py-2">
                        <Link className="c_link" href={"/lifestyle"}>
                          LIFESTYLE
                        </Link>
                        <p>(12)</p>
                      </li>
                      <li className="d-flex justify-content-between py-2">
                        <Link className="c_link" href={"/sports"}>
                          SPORTS
                        </Link>
                        <p>(15)</p>
                      </li>
                      <li className="d-flex justify-content-between py-2">
                        <Link className="c_link" href={"/travel"}>
                          TRAVEL
                        </Link>
                        <p>(17)</p>
                      </li>
                      <li className="d-flex justify-content-between py-2">
                        <Link className="c_link" href={"/world"}>
                          WORLD
                        </Link>
                        <p>(30)</p>
                      </li>
                      <li className="d-flex justify-content-between py-2">
                        <Link className="c_link" href={"/entertainment"}>
                          ENTERTAINMENT
                        </Link>
                        <p>(20)</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="recommendedWrapeer">
                <div className="">
                  <button className="btn btn-outline-primary mb-4">
                    Recommended
                  </button>
                </div>
                <div className="row recommended">
                  {aroundTheWorldData.slice(0, 4).map((item) => (
                    <div key={item.id} className="col-md-6">
                      <div className="card border-0 shadow-sm">
                        <div className="position-relative">
                          <Image
                            src={item.imgSrc}
                            alt={item.title}
                            width={350}
                            height={200}
                            className="card-img-top rounded"
                          />
                          <span className="position-absolute bottom-0 m-2 badge bg-warning">
                            {item.category}
                          </span>
                        </div>
                        <div className="card-body p-0 py-2 px-1">
                          <h5 className="card-title text-truncate-2 ">
                            {item.title}
                          </h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
