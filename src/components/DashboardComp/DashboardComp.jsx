
// // "use client";

// // import React from "react";
// // import { FaPen, FaTrash, FaEye, FaPlus } from "react-icons/fa";
// // import Image from "next/image";
// // import "./DashboardComp.scss";

// // export default function DashboardComp() {
// //   return (
// //     <div className="dashboard-container container-fluid py-4 m-0">
// //       {/* Header */}
// //       <header className="header d-flex justify-content-between align-items-center px-4 py-3">
// //         <div className="user-info d-flex align-items-center">
// //           <div className="avatar-container me-3">
// //             <Image
// //               src="/fallback-image.jpg"
// //               alt="User Avatar"
// //               width={50}
// //               height={50}
// //               className="avatar"
// //             />
// //           </div>
// //           <div className="user-details">
// //             <h5 className="m-0 text-white">John Doe</h5>
// //             <p className="m-0 text-light">Admin</p>
// //           </div>
// //         </div>
// //         <button className="logout-button btn">Logout</button>
// //       </header>

// //       {/* Stats Section */}
// //       <div className="container mt-4">
// //         <div className="row g-3 justify-content-center text-center">
// //           <div className="col-12 col-sm-6 col-md-4">
// //             <div className="stat-card bg-primary text-white p-4 rounded">
// //               <h5>Total Posts</h5>
// //               <h3>120</h3>
// //             </div>
// //           </div>
// //           <div className="col-12 col-sm-6 col-md-4">
// //             <div className="stat-card bg-info text-white p-4 rounded">
// //               <h5>Comments</h5>
// //               <h3>300</h3>
// //             </div>
// //           </div>
// //           <div className="col-12 col-sm-6 col-md-4">
// //             <div className="stat-card bg-warning text-dark p-4 rounded">
// //               <h5>Views</h5>
// //               <h3>1500</h3>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Recent Posts */}
// //       <h4 className="mt-5 text-center">Recent Posts</h4>
// //       <div className="container mt-3">
// //         <div className="row g-4 justify-content-center">
// //           {[...Array(3)].map((_, index) => (
// //             <div className="col-12 col-sm-6 col-lg-4 d-flex" key={index}>
// //               <div className="post-card card border-0 shadow-sm w-100">
// //                 <Image
// //                   className="post-img card-img-top"
// //                   src="/fallback-image.jpg"
// //                   alt="Post image"
// //                   height={200}
// //                   width={350}
// //                 />
// //                 <div className="post-body card-body">
// //                   <h5 className="card-title">Post Title {index + 1}</h5>
// //                   <p className="card-text">
// //                     A brief summary of the blog post. This will give the reader an idea of what the post is about.
// //                   </p>
// //                   <div className="post-actions d-flex justify-content-between">
// //                     <button className="btn btn-primary btn-sm">
// //                       <FaPen /> Edit
// //                     </button>
// //                     <button className="btn btn-danger btn-sm">
// //                       <FaTrash /> Delete
// //                     </button>
// //                     <button className="btn btn-secondary btn-sm">
// //                       <FaEye /> View
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Create New Post Button */}
// //       <div className="text-center mt-4">
// //         <button className="btn-create btn d-flex align-items-center mx-auto">
// //           <FaPlus className="me-2" /> Create New Post
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }



// "use client";

// import React from "react";
// import { FaPen, FaTrash, FaEye, FaPlus } from "react-icons/fa";
// import Image from "next/image";
// import "./DashboardComp.scss";

// export default function DashboardComp() {
//   return (
//     <div className="dashboard-container container-fluid py-4 m-0">
//       {/* Header */}
//       <header className="header d-flex justify-content-between align-items-center px-4 py-3">
//         <div className="user-info d-flex align-items-center">
//           <div className="avatar-container me-3">
//             <Image
//               src="/fallback-image.jpg"
//               alt="User Avatar"
//               width={50}
//               height={50}
//               className="avatar"
//             />
//           </div>
//           <div className="user-details">
//             <h5 className="m-0 text-white">John Doe</h5>
//             <p className="m-0 text-light">Admin</p>
//           </div>
//         </div>
//         <button className="logout-button btn btn-danger">Logout</button>
//       </header>

//       {/* Stats Section */}
//       <div className="container mt-4">
//         <div className="row g-3 justify-content-center text-center">
//           <div className="col-12 col-sm-6 col-md-4">
//             <div className="stat-card bg-primary text-white p-4 rounded">
//               <h5>Total Posts</h5>
//               <h3>120</h3>
//             </div>
//           </div>
//           <div className="col-12 col-sm-6 col-md-4">
//             <div className="stat-card bg-info text-white p-4 rounded">
//               <h5>Comments</h5>
//               <h3>300</h3>
//             </div>
//           </div>
//           <div className="col-12 col-sm-6 col-md-4">
//             <div className="stat-card bg-warning text-dark p-4 rounded">
//               <h5>Views</h5>
//               <h3>1500</h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Posts */}
//       <h4 className="mt-5 text-center">Recent Posts</h4>
//       <div className="container mt-3">
//         <div className="row g-4 justify-content-center">
//           {[...Array(3)].map((_, index) => (
//             <React.Fragment key={index}>
//               <div className="col-12 col-sm-6 col-lg-4 d-flex">
//                 <div className="post-card card border-0 shadow-sm w-100">
//                   <Image
//                     className="post-img card-img-top"
//                     src="/fallback-image.jpg"
//                     alt={`Post image ${index + 1}`}
//                     height={200}
//                     width={350}
//                   />
//                   <div className="post-body card-body">
//                     <h5 className="card-title">Post Title {index + 1}</h5>
//                     <p className="card-text">
//                       A brief summary of the blog post. This will give the reader an idea of what the post is about.
//                     </p>
//                     <div className="post-actions d-flex justify-content-between">
//                       <button className="btn btn-primary btn-sm me-1">
//                         <FaPen /> Edit
//                       </button>
//                       <button className="btn btn-danger btn-sm me-1">
//                         <FaTrash /> Delete
//                       </button>
//                       <button className="btn btn-secondary btn-sm">
//                         <FaEye /> View
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </React.Fragment>
//           ))}
//         </div>
//       </div>

//       {/* Create New Post Button */}
//       <div className="text-center mt-4">
//         <button className="btn-create btn btn-success d-flex align-items-center mx-auto">
//           <FaPlus className="me-2" /> Create New Post
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import { FaPen, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import "./DashboardComp.scss";

export default function DashboardComp() {
  const { userId, signOut } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
console.log(posts)


  // Fetch posts
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

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
        <button className="logout-button btn btn-danger" onClick={() => signOut()}>
          Logout
        </button>
      </header>

      {/* Stats Section */}
      <div className="container mt-4">
        <div className="row g-3 justify-content-center text-center">
          <div className="col-12 col-sm-6 col-md-4">
            <div className="stat-card bg-primary text-white p-4 rounded">
              <h5>Total Posts</h5>
              <h3>{posts.length}</h3>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="stat-card bg-info text-white p-4 rounded">
              <h5>Comments</h5>
              <h3>{posts.reduce((total, post) => total + post.comments.length, 0)}</h3>
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

      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : (
        <div className="container mt-3">
          <div className="row g-4 justify-content-center">
            {posts.map((post) => (
              <div key={post.id} className="col-12 col-sm-6 col-lg-4 d-flex">
                <div className="post-card card border-0 shadow-sm w-100">
                  <Image
                    className="post-img card-img-top"
                    src={post.img || "/fallback-image.jpg"}
                    alt={post.title}
                    height={200}
                    width={350}
                  />
                  <div className="post-body card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.desc.substring(0, 100)}...</p>

                    <p className="small text-muted">By: {post.user?.name || "Unknown"}</p>
                    <p className="small text-muted">Comments: {post.comments.length}</p>

                    <div className="post-actions d-flex justify-content-between">
                      <button
                        className="btn btn-primary btn-sm me-1"
                        onClick={() => router.push(`/dashboard/create-post?edit=${post.id}`)}
                      >
                        <FaPen /> Edit
                      </button>
                      <button className="btn btn-danger btn-sm me-1">
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
      )}

      {/* Create New Post Button */}
      <div className="text-center mt-4">
        <button className="btn-create btn btn-success d-flex align-items-center mx-auto" onClick={() => router.push("/dashboard/create-post")}>
          <FaPlus className="me-2" /> Create New Post
        </button>
      </div>
    </div>
  );
}
