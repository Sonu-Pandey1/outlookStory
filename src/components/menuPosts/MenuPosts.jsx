"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./menuPosts.scss";
import { FaEye } from "react-icons/fa6";

const getMenuPosts = async () => {
  const res = await fetch(`/api/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

const MenuPosts = ({ withImage, upperMenu, upperMenuTop }) => {
  const [posts, setPosts] = useState([]);
  const [posts1, setPosts1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(posts, "lal");
  // console.log(posts1, "lal");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getMenuPosts();
        setPosts(data.posts);
        setPosts1(data.user);
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="menuPostsContainer">
      <div className="items">
        {upperMenuTop &&
          posts.slice(0, 1).map((post, index) => (
            <Link
              href={`/category/${post.catSlug}/${post.slug}`}
              key={post.id}
              className="itemT text-decoration-none"
            >
              {withImage && post.img && (
                <div className="imageContainerT">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    className="large"
                  />
                  <div className="overlay">
                    <span className={`category ${post.category}`}>
                      {post.category}
                    </span>
                    <h3 className="postTitle">{post.title}</h3>
                    <div className="d-flex gap-4">
                      <span className="datee shadow-lg">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <span className="viewss">
                        {" "}
                        <FaEye className="viewsIcon" /> {post.views}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          ))}
        {posts.slice(upperMenuTop ? 1 : 0, 5).map((post, index) => (
          <Link
            href={`/category/${post.catSlug}/${post.slug}`}
            key={post.id}
            className="item text-decoration-none"
          >
            {withImage && post.img && (
              <div className="imageContainer">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className={`${upperMenu ? "img " : "image"} ${
                    upperMenuTop && index === 0 ? "large" : ""
                  }`}
                />
              </div>
            )}

            {!withImage && (
              <div className="">
                <div className="trendNo rounded-pill">
                  <div>0{index}</div>
                </div>
              </div>
            )}
            <div className="textContainer">
              <span className={`category ${post.category}`}>
                {post.category}
              </span>
              <h3 className="postTitle text-truncate-2">{post.title}</h3>
              <div className="detail d-flex gap-3">
                {/* <span className="username">{post.user.name}</span> */}
                <span className="date">
                  {" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className="views">
                  {" "}
                  <FaEye className="viewsIcon" /> {post.views}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuPosts;
