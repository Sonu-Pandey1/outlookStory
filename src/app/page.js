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
import { BsThreeDotsVertical } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import CategoryNav from "../components/CategoryNav2/CategoryNav";
import { ThemeContext } from "@/context/ThemeContext";
import LatestPopularPosts from "@/components/LatestPopularPost2/LatestPopularPosts";
import Menu from "@/components/Menu/Menu";
import Card3 from "@/components/Card2/Card3";




const Home = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { theme } = useContext(ThemeContext);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid categories format");

        setCategories(["All", ...data.map((category) => category.title)]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch posts based on selected category
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        let url = "/api/posts";
        if (selectedCategory !== "All") url += `?category=${selectedCategory}`;

        const res = await fetch(url);
        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory]);


  return (
    <>
      <div className="homePage">
        {/* Top Section */}
        <section className="ttt topSection">
          <div className="container-fluid px-4">
            <div className="row">
              {/* Left Column */}
              <div className=" col-12 col-md-8 col-lg-7 col-xxl-8  leftColumn">
                <div>
                  {/* Left top Column */}
                  <div className="topStories">
                    {/* Header */}
                    <div className="top d-flex justify-content-between align-items-center py-3 ">
                      <button className="btn btn-outline-primary">
                        Top Stories
                      </button>

                    </div>

                    <div className="bottom top-Stories row ">
                      <div className="bigCards  col-12 ">
                        <div className="row">
                          {loading ? (
                            <p>Loading...</p>
                          ) : error ? (
                            <p>{error}</p>
                          ) : posts.length === 0 ? (
                            <p>No posts available in this category.</p>
                          ) : (
                            posts.slice(0, 1).map((post) => <Card key={post.id} item={post} />)
                          )}
                        </div>
                      </div>

                      <div className="smallCards d-flex flex-wrap gap-0 gap-sm-3 col-12">
                        <div className="d-flex gap-0 gap-sm-3 w-100 flex-sm-column flex-sm-row">
                          <div className="row">
                            {loading ? (
                              <p>Loading...</p>
                            ) : error ? (
                              <p>{error}</p>
                            ) : posts.length === 0 ? (
                              <p>No posts available in this category.</p>
                            ) : (
                              posts.slice(0, 2).map((post) => (
                                <div key={post.id} className="col-12 col-sm-6">
                                  <Card2 item={post} />
                                </div>
                              ))
                            )}
                          </div>

                          {/* <Card2 />
                          <Card2 /> */}
                        </div>
                        <div className="d-flex gap-0 gap-sm-3 w-100  flex-sm-column flex-sm-row">
                          <div className="row">
                            {loading ? (
                              <p>Loading...</p>
                            ) : error ? (
                              <p>{error}</p>
                            ) : posts.length === 0 ? (
                              <p>No posts available in this category.</p>
                            ) : (
                              posts.slice(3, 5).map((post) => (
                                <div key={post.id} className="col-12 col-sm-6">
                                  <Card2 item={post} />
                                </div>
                              ))
                            )}
                          </div>

                          {/* <Card2 />
                          <Card2 /> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Left middle column */}
                  <div className="aroundTheWorld mt-4">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <button className="btn btn-outline-primary">
                        Around the World
                      </button>
                      {/* 1 */}
                      <div className="d-flex justify-content-between align-items-center">
                        {/* Small Screen (3-dot Dropdown) */}
                        <div className="d-md-none position-relative">
                          <div className="d-flex align-items-center">
                            <span
                              className="px-3 py-1 rounded"
                              style={{
                                background: "#007bff",
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              {selectedCategory}
                            </span>
                            <BsThreeDotsVertical
                              size={24}
                              onClick={() => setDropdownOpen(!dropdownOpen)}
                              style={{ cursor: "pointer", marginLeft: "8px" }}
                            />
                          </div>

                          {dropdownOpen && (
                            <ul
                              className="dropdown-menu show position-absolute ssss"
                              style={{ right: 0, minWidth: "120px" }}
                            >
                              {categories.slice(0, 3).map((category) => (
                                <span
                                  key={category}
                                  className={`px-3 py-1 rounded sss`}
                                  onClick={() => setSelectedCategory(category)}
                                  style={{
                                    cursor: "pointer",
                                    background: selectedCategory === category ? "#007bff" : "transparent",
                                    color: selectedCategory === category ? "white" : "black",
                                    fontWeight: selectedCategory === category ? "bold" : "normal",
                                    borderRadius: "5px",
                                    transition: "background 0.2s ease-in-out",
                                  }}
                                >
                                  {category}
                                </span>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* Medium & Larger Screens (Inline Tabs) */}
                        <div className="d-none d-md-flex gap-2 flex-wrap">
                          {categories.slice(0, 3).map((category) => (
                            <span
                              key={category}
                              className={`px-3 py-1 rounded sss`}
                              onClick={() => setSelectedCategory(category)}
                              style={{
                                cursor: "pointer",
                                background: selectedCategory === category ? "#007bff" : "transparent",
                                color: selectedCategory === category ? "white" : "black",
                                fontWeight: selectedCategory === category ? "bold" : "normal",
                                borderRadius: "5px",
                                transition: "background 0.2s ease-in-out",
                              }}
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Section */}
                    {/* Post Card Section */}
                    <div className="row">
                      {loading ? (
                        <p>Loading...</p>
                      ) : error ? (
                        <p>{error}</p>
                      ) : posts.length === 0 ? (
                        <p>No posts available in this category.</p>
                      ) : (
                        posts.slice(0, 6).map((post) => <Card3 key={post.id} item={post} />)
                      )}
                    </div>

                  </div>

                  <div className="advertisment">
                    <Image
                      className=""
                      width={850}
                      height={750}
                      // fill
                      alt="img"
                      src="https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/728x90_health.png"
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>

                  {/* Left bottom column */}
                  <div className="lifeStyle mt-4">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <button className="btn btn-outline-primary">
                        Lifestyle
                      </button>
                      {/* 2 */}
                      <div className="d-flex justify-content-between align-items-center">
                        {/* Small Screen (3-dot Dropdown) */}
                        <div className="d-md-none position-relative">
                          <div className="d-flex align-items-center">
                            <span
                              className="px-3 py-1 rounded"
                              style={{
                                background: "#007bff",
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              {selectedCategory}
                            </span>
                            <BsThreeDotsVertical
                              size={24}
                              onClick={() => setDropdownOpen(!dropdownOpen)}
                              style={{ cursor: "pointer", marginLeft: "8px" }}
                            />
                          </div>

                          {dropdownOpen && (
                            <ul
                              className="dropdown-menu show position-absolute ssss"
                              style={{ right: 0, minWidth: "120px" }}
                            >
                              {categories.map((category) => (
                                <span
                                  key={category}
                                  className={`px-3 py-1 rounded sss`}
                                  onClick={() => setSelectedCategory(category)}
                                  style={{
                                    cursor: "pointer",
                                    background: selectedCategory === category ? "#007bff" : "transparent",
                                    color: selectedCategory === category ? "white" : "black",
                                    fontWeight: selectedCategory === category ? "bold" : "normal",
                                    borderRadius: "5px",
                                    transition: "background 0.2s ease-in-out",
                                  }}
                                >
                                  {category}
                                </span>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* Medium & Larger Screens (Inline Tabs) */}
                        <div className="d-none d-md-flex gap-2 flex-wrap">
                          {categories.map((category) => (
                            <span
                              key={category}
                              className={`px-3 py-1 rounded sss`}
                              onClick={() => setSelectedCategory(category)}
                              style={{
                                cursor: "pointer",
                                background: selectedCategory === category ? "#007bff" : "transparent",
                                color: selectedCategory === category ? "white" : "black",
                                fontWeight: selectedCategory === category ? "bold" : "normal",
                                borderRadius: "5px",
                                transition: "background 0.2s ease-in-out",
                              }}
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {loading ? (
                        <p>Loading...</p>
                      ) : error ? (
                        <p>{error}</p>
                      ) : posts.length === 0 ? (
                        <p>No posts available in this category.</p>
                      ) : (
                        posts.slice(0, 4).map((post) => <Card3 key={post.id} item={post} />)
                      )}
                    </div>

                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-12 col-md-4 col-lg-5 col-xxl-4 my-4 ps-3 pe-3 rightColumn">
                {/* Follow Us Section */}
                <div className="followUs">
                  <div className="mb-4  d-flex justify-content-between gap-3">
                    <button className="btn btn-outline-primary w-75 ">
                      Follow Us
                    </button>
                    <span className="span ms-3 w-100"></span>
                  </div>

                  {/* Social Media Icons Section */}
                  <div className="socialContainer p-0 rounded">
                    <div
                      style={{ transition: "all 0.3s ease" }}
                      className={`row text-center g-0 border ${theme === "dark" ? "dark" : "light"
                        }`}
                    >
                      {/* Social Icon 1 */}
                      <Link
                        href={"/"}
                        style={{ transition: "all 0.3s ease" }}
                        className={`col-4 p-3 border-end border-bottom text-decoration-none ${theme === "dark" ? "text-light" : "text-dark"
                          }`}
                      >
                        <TfiYoutube className="fs-2 text-danger" />
                        <p className="m-0 fw-bold">456</p>
                        <p className="m-0">Subscribers</p>
                      </Link>

                      {/* Social Icon 2 */}
                      <Link
                        href={"/"}
                        style={{ transition: "all 0.3s ease" }}
                        className={`col-4 p-3 border-end border-bottom text-decoration-none ${theme === "dark" ? "text-light" : "text-dark"
                          }`}
                      >
                        <TfiFacebook className="fs-2 text-primary" />
                        <p className="m-0 fw-bold">789</p>
                        <p className="m-0">Followers</p>
                      </Link>

                      {/* Social Icon 3 */}
                      <Link
                        href={"/"}
                        style={{ transition: "all 0.3s ease" }}
                        className={`col-4 p-3 border-bottom text-decoration-none ${theme === "dark" ? "text-light" : "text-dark"
                          }`}
                      >
                        <TfiTwitter className="fs-2 text-info" />
                        <p className="m-0 fw-bold">320</p>
                        <p className="m-0">Followers</p>
                      </Link>

                      {/* Social Icon 4 */}
                      <Link
                        href={"/"}
                        style={{ transition: "all 0.3s ease" }}
                        className={`col-4 p-3 border-end text-decoration-none ${theme === "dark" ? "text-light" : "text-dark"
                          }`}
                      >
                        <TfiInstagram className="fs-2 text-danger" />
                        <p className="m-0 fw-bold">540</p>
                        <p className="m-0">Followers</p>
                      </Link>

                      {/* Social Icon 5 */}
                      <Link
                        href={"/"}
                        style={{ transition: "all 0.3s ease" }}
                        className={`col-4 p-3 border-end text-decoration-none ${theme === "dark" ? "text-light" : "text-dark"
                          }`}
                      >
                        <TfiLinkedin className="fs-2 text-primary" />
                        <p className="m-0 fw-bold">300</p>
                        <p className="m-0">Connections</p>
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

        {/* Middle Section */}
        <section className="middleSection">
          <CategoryNav />
        </section>

        {/* Bottom Section */}
        <div className="bottomSection">
          <LatestPopularPosts category={null} />
        </div>
      </div>
    </>
  );
};

export default Home;


