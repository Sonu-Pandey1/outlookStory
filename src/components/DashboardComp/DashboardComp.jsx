// "use client";

// import React from "react";
// import { FaPen, FaTrash, FaEye, FaPlus } from "react-icons/fa";
// import Image from "next/image";
// import "./DashboardComp.scss"

// export default function DashboardComp() {
//   return (
//     <div className="dashboard-container overflow-y-scroll" 
//        style={{ height: "calc(100vh - 60px)" }}
//     >
//       {/* Header with User Info */}
//       <header className="header">
//         <div className="user-info">
//           <div className="avatar-container">
//             <Image
//               src="/user-avatar.jpg"
//               alt="User Avatar"
//               layout="intrinsic"
//               width={60}
//               height={60}
//               className="avatar"
//             />
//           </div>
//           <div className="user-details">
//             <h5>John Doe</h5>
//             <p>Admin</p>
//           </div>
//         </div>
//         <button className="logout-button">Logout</button>
//       </header>

//       <div className="content-container">
//         <div className="stats-row">
//           {/* Stats Section */}
//           <div className="stat-card bg-success">
//             <h5>Total Posts</h5>
//             <h3>120</h3>
//           </div>
//           <div className="stat-card bg-info">
//             <h5>Comments</h5>
//             <h3>300</h3>
//           </div>
//           <div className="stat-card bg-warning">
//             <h5>Views</h5>
//             <h3>1500</h3>
//           </div>
//         </div>

//         {/* Recent Posts Section */}
//         <h4>Recent Posts</h4>
//         <div className="posts-row">
//           {[...Array(3)].map((_, index) => (
//             <div className="post-card" key={index}>
//               <Image
//                 className="post-img"
//                 src="https://via.placeholder.com/150"
//                 alt="Post image"
//                 height={200}
//                 width={200}
//               />
//               <div className="post-body">
//                 <h5>Post Title {index + 1}</h5>
//                 <p>
//                   A brief summary of the blog post. This will give the reader an
//                   idea of what the post is about.
//                 </p>
//                 <div className="post-actions">
//                   <button className="btn-edit">
//                     <FaPen /> Edit
//                   </button>
//                   <button className="btn-delete">
//                     <FaTrash /> Delete
//                   </button>
//                   <button className="btn-view">
//                     <FaEye /> View
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Create New Post Button */}
//         <div className="create-post-btn-container">
//           <button className="btn-create">
//             <FaPlus /> Create New Post
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import React from "react";
// import { FaPen, FaTrash, FaEye, FaPlus } from "react-icons/fa";
// import Image from "next/image";

// export default function DashboardComp() {
//   return (
//     <div className="overflow-auto" style={{ height: "calc(100vh - 60px)" }}>
//       {/* Header with User Info */}
//       <header className="d-flex justify-content-between align-items-center p-3 shadow-sm">
//         <div className="d-flex align-items-center">
//           <div className="me-3">
//             <Image
//               src="/fallback-image.jpg"
//               alt="User Avatar"
//               width={60}
//               height={60}
//               className="rounded-circle"
//             />
//           </div>
//           <div>
//             <h5 className="mb-0">John Doe</h5>
//             <small>Admin</small>
//           </div>
//         </div>
//         <button className="btn btn-outline-light">Logout</button>
//       </header>

//       <div className="container mt-4">
//         {/* Stats Section */}
//         <div className="row text-center mb-4">
//           <div className="col-12 col-md-4 mb-3 mb-md-0">
//             <div className="card bg-success text-white shadow-sm">
//               <div className="card-body">
//                 <h5 className="card-title">Total Posts</h5>
//                 <h3 className="card-text">120</h3>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-md-4 mb-3 mb-md-0">
//             <div className="card bg-info text-white shadow-sm">
//               <div className="card-body">
//                 <h5 className="card-title">Comments</h5>
//                 <h3 className="card-text">300</h3>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-md-4">
//             <div className="card bg-warning text-white shadow-sm">
//               <div className="card-body">
//                 <h5 className="card-title">Views</h5>
//                 <h3 className="card-text">1500</h3>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Recent Posts Section */}
//         <h4 className="mb-3">Recent Posts</h4>
//         <div className="row">
//           {[...Array(3)].map((_, index) => (
//             <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
//               <div className="card h-100 shadow-sm">
//                 <Image
//                    src="/fallback-image.jpg"
//                   alt="Post image"
//                   width={350}
//                   height={200}
//                   className="card-img-top"
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">Post Title {index + 1}</h5>
//                   <p className="card-text">
//                     A brief summary of the blog post. This gives the reader an idea of the content.
//                   </p>
//                 </div>
//                 <div className="card-footer d-flex justify-content-between">
//                   <button className="btn btn-sm btn-primary">
//                     <FaPen /> Edit
//                   </button>
//                   <button className="btn btn-sm btn-danger">
//                     <FaTrash /> Delete
//                   </button>
//                   <button className="btn btn-sm btn-secondary">
//                     <FaEye /> View
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Create New Post Button */}
//         <div className="text-center my-4">
//           <button className="btn btn-success">
//             <FaPlus className="me-2" /> Create New Post
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";
import { FaPen, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DashboardComp.scss";

export default function DashboardComp() {
  return (
    <div className="dashboard-container container-fluid py-4 m-0">
      {/* Header */}
      <header className="header d-flex justify-content-between align-items-center px-4 py-3">
        <div className="user-info d-flex align-items-center">
          <div className="avatar-container me-3">
            <Image
              src="/fallback-image.jpg"
              alt="User Avatar"
              width={50}
              height={50}
              className="avatar"
            />
          </div>
          <div className="user-details">
            <h5 className="m-0 text-white">John Doe</h5>
            <p className="m-0 text-light">Admin</p>
          </div>
        </div>
        <button className="logout-button btn">Logout</button>
      </header>

      {/* Stats Section */}
      <div className="container mt-4">
        <div className="row g-3 justify-content-center text-center">
          <div className="col-12 col-sm-6 col-md-4">
            <div className="stat-card bg-primary text-white p-4 rounded">
              <h5>Total Posts</h5>
              <h3>120</h3>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="stat-card bg-info text-white p-4 rounded">
              <h5>Comments</h5>
              <h3>300</h3>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="stat-card bg-warning text-dark p-4 rounded">
              <h5>Views</h5>
              <h3>1500</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <h4 className="mt-5 text-center">Recent Posts</h4>
      <div className="container mt-3">
        <div className="row g-4 justify-content-center">
          {[...Array(3)].map((_, index) => (
            <div className="col-12 col-sm-6 col-lg-4 d-flex" key={index}>
              <div className="post-card card border-0 shadow-sm w-100">
                <Image
                  className="post-img card-img-top"
                  src="/fallback-image.jpg"
                  alt="Post image"
                  height={200}
                  width={350}
                />
                <div className="post-body card-body">
                  <h5 className="card-title">Post Title {index + 1}</h5>
                  <p className="card-text">
                    A brief summary of the blog post. This will give the reader an idea of what the post is about.
                  </p>
                  <div className="post-actions d-flex justify-content-between">
                    <button className="btn btn-primary btn-sm">
                      <FaPen /> Edit
                    </button>
                    <button className="btn btn-danger btn-sm">
                      <FaTrash /> Delete
                    </button>
                    <button className="btn btn-secondary btn-sm">
                      <FaEye /> View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create New Post Button */}
      <div className="text-center mt-4">
        <button className="btn-create btn d-flex align-items-center mx-auto">
          <FaPlus className="me-2" /> Create New Post
        </button>
      </div>
    </div>
  );
}
