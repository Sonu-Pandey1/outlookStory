"use client";

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
// console.log(posts)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getMenuPosts();
        setPosts(data.posts || []);
        // setPosts1(data.user);
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
        {/* First Item - Special Case */}
        {upperMenuTop &&
          posts.slice(0, 1).map((post, index) => (
            <Link
              href={`/category/${post.catSlug}/${post.slug}`}
              key={post.id || index}
              className="itemT text-decoration-none"
            >
              {withImage && post.img && (
                <div className="imageContainerT">
                  <Image
                    src={"/fallback-image.png"}
                    alt={post.title || "Post image"}
                    fill
                    className="large"
                  />
                 <div className="textContainer overlay">
              <span
                className={`category ${post.catSlug || "default-category"}`}
              >
                {post.catSlug || "Uncategorized"}
              </span>
              <h3 className="postTitle text-truncate-2 py-1">{post.title}</h3>
              <div className="detail d-flex gap-3">
                <span className="date">
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
                <span className="views">
                  <FaEye className="viewsIcon" /> {post.views || 0}
                </span>
              </div>
            </div>
                </div>
              )}
            </Link>
          ))}
        {/* Other Posts */}
        {posts.slice(upperMenuTop ? 1 : 0, 5).map((post, index) => (
          <Link
            href={`/category/${post.catSlug}/${post.slug}`}
            key={post.id || index}
            className="item text-decoration-none " //todo -- padding issues in container need to reolve 
          >
    
            {withImage && (
              <div className="imageContainer">
                <Image
                  src={post.img || "/fallback-image.jpg"}
                  alt={post.title || "Post image"}
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
              <span
                className={`category ${post.catSlug || "default-category"}`}
              >
                {post.catSlug || "Uncategorized"}
              </span>
              <h3 className="postTitle text-truncate-2 py-1">{post.title}</h3>
              <div className="detail d-flex gap-3">
                <span className="date">
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
                <span className="views">
                  <FaEye className="viewsIcon" /> {post.views || 0}
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
