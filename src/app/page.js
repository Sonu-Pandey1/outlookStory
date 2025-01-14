"use client";
import Image from "next/image";
import "./page.css";
import Hero from "../../Components/Hero/Hero";
import Card from "../../Components/Card/Card";
import Card2 from "../../Components/Card/Card2";
import Link from "next/link";
import {
  TfiFacebook,
  TfiInstagram,
  TfiLinkedin,
  TfiTwitter,
  TfiYoutube,
} from "react-icons/tfi";
import { GrShareOption } from "react-icons/gr";
import Business from "../../Components/BusinessCat/Business";
import { useState } from "react";
import CategoryNav from "../../Components/CategoryNav/CategoryNav";
import LatestPopularPosts from "../../Components/LatestPopularPost/LatestPopularPosts";

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

const Home = () => {
  // State for managing the share counter
  const [shareCount, setShareCount] = useState(1345);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(latestPoastData.length / postsPerPage);

  // Get posts for the current page
  const currentPosts = latestPoastData.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Handler for changing pages
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCategory1, setActiveCategory1] = useState("All");
  const [activeCategory2, setActiveCategory2] = useState("All");
  console.log(activeCategory);
  console.log(activeCategory1);
  console.log(activeCategory2);

  // Filter data based on active category
  const filteredData =
    activeCategory === "All"
      ? aroundTheWorldData
      : aroundTheWorldData.filter((item) => item.category === activeCategory);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  // Filter data based on active category1
  const filteredData1 =
    activeCategory === "All"
      ? aroundTheWorldData
      : aroundTheWorldData.filter((item) => item.category === activeCategory);

  const handleCategoryChange1 = (category) => {
    setActiveCategory1(category);
  };
  // Filter data based on active category1
  const filteredData2 =
    activeCategory === "All"
      ? aroundTheWorldData
      : aroundTheWorldData.filter((item) => item.category === activeCategory);

  const handleCategoryChange2 = (category) => {
    setActiveCategory2(category);
  };

  return (
    <>
      <div className="homePage bg-info-subtle">
        {/* Hero Section */}
       

        {/* Top Section */}
        <section>
          <div className="container-fluid px-4 bg-light">
            <div className="row">
              {/* Left Column */}
              <div className="col-8 leftColumn ">
                <div>
                  {/* Left top Column */}
                  <div className="topStories">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center my-4">
                      <button className="btn btn-outline-primary">
                        Top Stories
                      </button>
                      <div className="d-flex gap-2">
                        {[
                          "All",
                          "World",
                          "Business",
                          "Fashion",
                          "Entertainment",
                        ].map((category) => (
                          <span
                            key={category}
                            className={`tabLink ${
                              activeCategory1 === category ? "active" : ""
                            }`}
                            onClick={() => handleCategoryChange1(category)}
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="top-Stories">
                      <div className="d-flex justify-content-between flex-wrap mb-4">
                        <Card />
                        <Card />
                      </div>

                      <div className="smallCards d-flex flex-wrap gap-3">
                        <div className="d-flex gap-3 w-100">
                          <Card2 />
                          <Card2 />
                        </div>
                        <div className="d-flex gap-3 w-100">
                          <Card2 />
                          <Card2 />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* left middle column */}
                  <div className="aroundTheWorld mt-4">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <button className="btn btn-outline-primary">
                        Around the World
                      </button>
                      <div className="d-flex gap-2">
                        {["All", "Business", "Sports", "World"].map(
                          (category) => (
                            <span
                              key={category}
                              className={`tabLink ${
                                activeCategory === category ? "active" : ""
                              }`}
                              onClick={() => handleCategoryChange(category)}
                            >
                              {category}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Card Section */}
                    <div className="row transition-container">
                      {aroundTheWorldData.slice(0, 3).map((item) => (
                        <div key={item.id} className="col-md-4">
                          <div className="card border-0 shadow-sm">
                            <div className="position-relative">
                              <Image
                                src={item.imgSrc}
                                alt={item.title}
                                width={350}
                                height={200}
                                className="card-img-top rounded"
                              />
                              <span className="position-absolute bottom-0 m-3 badge bg-info">
                                {item.category}
                              </span>
                            </div>
                            <div className="card-body p-0 py-3 px-1">
                              <h5 className="card-title text-truncate-2">
                                {item.title}
                              </h5>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Navigation Controls */}
                    <div className="d-flex justify-content-center align-items-center mb-4 mt-1">
                      <button className="btn btn-outline-secondary me-2">
                        {"<"}
                      </button>
                      <button className="btn btn-outline-secondary">
                        {">"}
                      </button>
                    </div>
                  </div>
                  <div className="advertisment">
                    <Image
                      className=""
                      width={850}
                      height={750}
                      alt="img"
                      src="https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/728x90_health.png"
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100px",
                      }}
                    />
                  </div>
                  {/* left bottom column */}
                  <div className="lifeStyle mt-4">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <button className="btn btn-outline-primary">
                        Lifestyle
                      </button>
                      <div className="d-flex gap-2">
                        {["All", "Fashion", "Food", "Health", "Travel"].map(
                          (category) => (
                            <span
                              key={category}
                              className={`tabLink ${
                                activeCategory2 === category ? "active" : ""
                              }`}
                              onClick={() => handleCategoryChange2(category)}
                            >
                              {category}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Card Section */}
                    <div className="row transition-container">
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
                              <span className="position-absolute bottom-0 m-3 badge bg-warning">
                                {item.category}
                              </span>
                            </div>
                            <div className="card-body p-0 py-3 px-1">
                              <h5 className="card-title text-truncate-2">
                                {item.title}
                              </h5>
                              <small className="text-muted">
                                December 15, 2017
                              </small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-4 my-4 ps-3 pe-3 rightColumn ">
                {/* Follow Us Section */}
                <div className="followUs">
                  <div className="mb-4">
                    <button className="btn btn-outline-primary">
                      Follow Us
                    </button>
                  </div>

                  {/* Social Media Icons Section */}
                  <div className="socialContainer p-0 bg-light rounded">
                    <div className="row text-center g-0 border">
                      {/* Social Icon 1 */}
                      <Link
                        href={"/"}
                        className="col-4 p-3 border-end border-bottom"
                      >
                        <TfiYoutube className="fs-2 text-danger" />
                        <p className="m-0 fw-bold">456</p>
                        <p className="m-0 text-muted">Subscribers</p>
                      </Link>

                      {/* Social Icon 2 */}
                      <Link
                        href={"/"}
                        className="col-4 p-3 border-end border-bottom"
                      >
                        <TfiFacebook className="fs-2 text-primary" />
                        <p className="m-0 fw-bold">789</p>
                        <p className="m-0 text-muted">Followers</p>
                      </Link>

                      {/* Social Icon 3 */}
                      <Link href={"/"} className="col-4 p-3 border-bottom">
                        <TfiTwitter className="fs-2 text-info" />
                        <p className="m-0 fw-bold">320</p>
                        <p className="m-0 text-muted">Followers</p>
                      </Link>

                      {/* Social Icon 4 */}
                      <Link href={"/"} className="col-4 p-3 border-end">
                        <TfiInstagram className="fs-2 text-danger" />
                        <p className="m-0 fw-bold">540</p>
                        <p className="m-0 text-muted">Followers</p>
                      </Link>

                      {/* Social Icon 5 */}
                      <Link href={"/"} className="col-4 p-3 border-end">
                        <TfiLinkedin className="fs-2 text-primary" />
                        <p className="m-0 fw-bold">300</p>
                        <p className="m-0 text-muted">Connections</p>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="advertisment">
                  <div className="my-4">
                    <Image
                      className="card-img-top"
                      width={750}
                      height={450}
                      alt="advertisment-img"
                      src="https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/345x345.jpg"
                      // style={{
                      //   objectFit: "cover",
                      //   width: "100%",
                      //   height: "250px",
                      // }}
                    />
                  </div>
                </div>

                <div className="businessSection">
                  <Business />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* middle section */}
        <section>
          <CategoryNav />
        </section>
        {/* bottom section */}
        <LatestPopularPosts/>
      </div>
    </>
  );
};

export default Home;
