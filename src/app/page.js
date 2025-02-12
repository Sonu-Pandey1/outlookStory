"use client";
import Image from "next/image";
import "./homePage.scss";
import Card from "../components/Card2/Card";
import Card2 from "../components/Card2/Card2";
import Link from "next/link";
import {
  TfiFacebook,
  TfiInstagram,
  TfiLinkedin,
  TfiTwitter,
  TfiYoutube,
} from "react-icons/tfi";
import { useContext, useEffect, useState } from "react";
import CategoryNav from "../components/CategoryNav2/CategoryNav";
import { useSearchParams } from "next/navigation";
import { ThemeContext } from "@/context/ThemeContext";
import LatestPopularPosts from "@/components/LatestPopularPost2/LatestPopularPosts";
import Menu from "@/components/Menu/Menu";
import InfiniteFeed from "@/components/infinitePosts";
// import InfiniteFeed from "@/components/infinitePosts";

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

// API fetch for all posts
const getPostsByCategory = async () => {
  const res = await fetch(`/api/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCategory1, setActiveCategory1] = useState("All");
  const [activeCategory2, setActiveCategory2] = useState("All");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPostsByCategory();
        setPosts(data.posts);
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const { theme } = useContext(ThemeContext);

  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  return (
    <>
      <div className="homePage">
        {/* Top Section */}
        <section className="ttt topSection">
          <div className="container-fluid px-4">
            <div className="row">
              {/* Left Column */}
              <div className="col-8 leftColumn ">
                <div>
                  {/* Left top Column */}
                  <div className="topStories ">
                    {/* Header */}
                    <div className=" top d-flex justify-content-between align-items-center my-4">
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

                    <div className=" bottom top-Stories">
                      <div className=" bigCards d-flex justify-content-between flex-wrap mb-4">
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
                    <div className="row ">
                      {aroundTheWorldData.slice(0, 3).map((item) => (
                        <div key={item.id} className="col-md-4">
                          <div className="card border-0 shadow-sm">
                            <div className="position-relative">
                              <Image
                                src={item.imgSrc}
                                alt={item.title}
                                width={350}
                                height={200}
                                className="card-img-top rounded-0"
                              />
                              <span className="position-absolute bottom-0 m-3 badge bg-info">
                                {item.category}
                              </span>
                            </div>
                            <div
                              className={`card-body  p-0 py-3 px-1 ${
                                theme === "dark" ? "dark" : "light"
                              }`}
                            >
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
                                className="card-img-top rounded-0"
                              />
                              <span className="position-absolute bottom-0 m-3 badge bg-warning">
                                {item.category}
                              </span>
                            </div>
                            <div
                              className={`card-body  p-0 py-3 px-1 ${
                                theme === "dark" ? "dark" : "light"
                              } `}
                            >
                              <h5 className="card-title text-truncate-2">
                                {item.title}
                              </h5>
                              <small className="">December 15, 2017</small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-4 my-4 ps-3 pe-3 rightColumn">
                {/* Follow Us Section */}
                <div className="followUs ">
                  <div className="mb-4 underlin d-flex justify-content-between gap-3 ">
                    <button className="btn btn-outline-primary w-50">
                      Follow Us
                    </button>
                    <span className="span ms-3 w-100"></span>
                  </div>

                  {/* Social Media Icons Section */}
                  <div className="socialContainer  p-0 rounded ">
                    <div
                      style={{ transition: "all 0.3s ease" }}
                      className={`row text-center g-0 border ${
                        theme === "dark" ? "dark" : "light"
                      }`}
                    >
                      {/* Social Icon 1 */}
                      <Link
                        href={"/"}
                        style={{ transition: "all 0.3s ease" }}
                        className={`col-4 p-3 border-end border-bottom ${
                          theme === "dark" ? "text-light" : "text-dark"
                        }`}
                      >
                        <TfiYoutube className="fs-2 text-danger" />
                        <p className="m-0 fw-bold">456</p>
                        <p className={`m-0 `}>Subscribers</p>
                      </Link>

                      {/* Social Icon 2 */}
                      <Link
                        href={"/"}
                        style={{ transition: "all 0.3s ease" }}
                        className={`col-4 p-3 border-end border-bottom ${
                          theme === "dark" ? "text-light" : "text-dark"
                        }`}
                      >
                        <TfiFacebook className="fs-2 text-primary" />
                        <p className="m-0 fw-bold">789</p>
                        <p className={`m-0 `}>Followers</p>
                      </Link>

                      {/* Social Icon 3 */}
                      <Link
                        href={"/"}
                        style={{ transition: "all 0.3s ease" }}
                        className={`col-4 p-3 border-bottom ${
                          theme === "dark" ? "text-light" : "text-dark"
                        }`}
                      >
                        <TfiTwitter className="fs-2 text-info" />
                        <p className="m-0 fw-bold">320</p>
                        <p className={`m-0 `}>Followers</p>
                      </Link>

                      {/* Social Icon 4 */}
                      <Link
                        href={"/"}
                        style={{ transition: "all 0.3s ease" }}
                        className={`col-4 p-3 border-end ${
                          theme === "dark" ? "text-light" : "text-dark"
                        }`}
                      >
                        <TfiInstagram className="fs-2 text-danger" />
                        <p className="m-0 fw-bold">540</p>
                        <p className={`m-0 `}>Followers</p>
                      </Link>

                      {/* Social Icon 5 */}
                      <Link
                        href={"/"}
                        style={{ transition: "all 0.3s ease" }}
                        className={`col-4 p-3 border-end ${
                          theme === "dark" ? "text-light" : "text-dark"
                        } `}
                      >
                        <TfiLinkedin className="fs-2 text-primary" />
                        <p className="m-0 fw-bold">300</p>
                        <p className={`m-0 `}>Connections</p>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="advertisment">
                  <div className="my-4">
                    <div className="imgContainer position-relative">
                      <Image
                        className="card-img-top"
                        width={750}
                        height={450}
                        alt="advertisment-img"
                        src="https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/345x345.jpg"
                      />
                      <div
                        className={`${theme === "dark" ? "overlay" : ""}`}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="businessSection">
                  <Menu upperMenu={true} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* middle section */}
        <section className="middleSection">
          <CategoryNav />
        </section>
        {/* bottom section */}
        <div className="bottomSection">
          {/* <LatestPopularPosts posts={posts} /> */}
          <LatestPopularPosts category={null} /> {/* Or pass a category if needed */}
         
        </div>
      </div>
    </>
  );
};

export default Home;


// menifest .js 

// export default function manifest() {
//     return {
//       name: 'Next.js App',
//       short_name: 'Next.js App',
//       description: 'Next.js App',
//       start_url: '/',
//       display: 'standalone',
//     //   background_color: '#fff',
//     //   theme_color: '#fff',
//       icons: [
//         {
//           src: '/favicon-32x32.png',
//           sizes: '32x32',
//           type: 'image/png',
//         },
//           {
//           src: '/favicon-16x16.png',
//           sizes: '16x16',
//           type: 'image/png',
//         },
//             {
//           src: '/android-chrome-192x192.png',
//           sizes: '192x192',
//           type: 'image/png',
//         },
//             {
//           src: '/android-chrome-512x512',
//           sizes: '512x512',
//           type: 'image/png',
//         },
//       ],
//     }
//   }

// next-sitemap.config.js

// module.exports = {
//     siteUrl: siteMetadata.siteUrl,
//     generateRobotsTxt: true,
//   }