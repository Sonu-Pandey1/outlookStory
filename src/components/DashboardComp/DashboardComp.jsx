"use client";

import React from "react";
import { FaPen, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import Image from "next/image";
import "./DashboardComp.scss"

export default function DashboardComp() {
  return (
    <div className="dashboard-container overflow-y-scroll" 
       style={{ height: "calc(100vh - 60px)" }}
    >
      {/* Header with User Info */}
      <header className="header">
        <div className="user-info">
          <div className="avatar-container">
            <Image
              src="/user-avatar.jpg"
              alt="User Avatar"
              layout="intrinsic"
              width={60}
              height={60}
              className="avatar"
            />
          </div>
          <div className="user-details">
            <h5>John Doe</h5>
            <p>Admin</p>
          </div>
        </div>
        <button className="logout-button">Logout</button>
      </header>

      <div className="content-container">
        <div className="stats-row">
          {/* Stats Section */}
          <div className="stat-card bg-success">
            <h5>Total Posts</h5>
            <h3>120</h3>
          </div>
          <div className="stat-card bg-info">
            <h5>Comments</h5>
            <h3>300</h3>
          </div>
          <div className="stat-card bg-warning">
            <h5>Views</h5>
            <h3>1500</h3>
          </div>
        </div>

        {/* Recent Posts Section */}
        <h4>Recent Posts</h4>
        <div className="posts-row">
          {[...Array(3)].map((_, index) => (
            <div className="post-card" key={index}>
              <img
                className="post-img"
                src="https://via.placeholder.com/150"
                alt="Post image"
              />
              <div className="post-body">
                <h5>Post Title {index + 1}</h5>
                <p>
                  A brief summary of the blog post. This will give the reader an
                  idea of what the post is about.
                </p>
                <div className="post-actions">
                  <button className="btn-edit">
                    <FaPen /> Edit
                  </button>
                  <button className="btn-delete">
                    <FaTrash /> Delete
                  </button>
                  <button className="btn-view">
                    <FaEye /> View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create New Post Button */}
        <div className="create-post-btn-container">
          <button className="btn-create">
            <FaPlus /> Create New Post
          </button>
        </div>
      </div>
    </div>
  );
}
