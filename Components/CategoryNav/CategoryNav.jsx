"use client"
import React, { useState } from "react";
import Image from "next/image";
import "./Category.css";

const categoriesData = [
  {
    category: "Entertainment",
    articles: [
      {
        id: 1,
        tag: "Fashion",
        title: "Fashion Girls! These Are the 17 Chic Flats Everyone Will Want in 2018",
        imgSrc:
          "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
      },
      {
        id: 2,
        tag: "Travel",
        title: "Barack Obama and Family Visit Balinese Paddy Fields During Vacation",
        imgSrc:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-20-350x250.jpg",
      },
      {
        id: 3,
        tag: "Entertainment",
        title: "Hannah Donker Talks Being The Weeknd’s Love Interest in ‘Secrets’",
        imgSrc:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-4-350x250.jpg",
      },
      {
        id: 4,
        tag: "Business",
        title:
          "Betterment Moves Beyond Robo-Advising with Human Financial Planners",
          imgSrc: "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-1-750x536.jpg",
      },
    ],
  },
  {
    category: "Technology",
    articles: [
      {
        id: 1,
        tag: "AI",
        title: "AI Revolution: How Artificial Intelligence is Changing Everything",
        imgSrc:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
      },
      {
        id: 2,
        tag: "Gadgets",
        title: "Top 5 Must-Have Gadgets for 2024",
        imgSrc: "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
      },
      {
        id: 3,
        tag: "Innovation",
        title: "The Future of Technology: Bold Predictions for the Next Decade",
        imgSrc:
        "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-20-350x250.jpg",
      },
      {
        id: 4,
        tag: "Startups",
        title: "Top Tech Startups to Watch Out for in 2024",
        imgSrc: "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/jnews-demo-3-750x536.jpg",
      },
    ],
  },
];

const CategoryNav = () => {
  const [activeCategory, setActiveCategory] = useState("Entertainment");

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const activeArticles = categoriesData.find(
    (cat) => cat.category === activeCategory
  )?.articles;

  return (
    <div className="bg-light pt-5 pb-3 container-fluid px-4">
        <div className="categoryNav bg-dark p-4 rounded">
      {/* Category Tabs */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-primary fw-bold">{activeCategory}</h4>
        <div className="d-flex gap-3">
          {categoriesData.map((cat) => (
            <button
              key={cat.category}
              className={`btn ${
                activeCategory === cat.category
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => handleCategoryChange(cat.category)}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="row">
        {activeArticles?.map((article) => (
          <div key={article.id} className="col-md-3 mb-4">
            <div className="card border-0 shadow-sm">
              <Image
                src={article.imgSrc}
                alt={article.title}
                width={350}
                height={200}
                className="card-img-top rounded"
              />
              <div className="card-body bg-light p-3">
                <span className="badge bg-primary">{article.tag}</span>
                <h6 className="card-title mt-2 text-truncate-2">
                  {article.title}
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default CategoryNav;
