
// "use client";

// import Image from "next/image";
// import "./DashboardComp.scss";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import { FaPen, FaTrash, FaEye, FaPlus } from "react-icons/fa";

// export default function DashboardComp() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { isSignedIn, user, isLoaded, signOut } = useUser();
//   const router = useRouter();

//   // User details
//   const userName = user?.fullName || "Unknown User";
//   const userRole = user?.publicMetadata?.role || "User";
//   const userImage = user?.imageUrl || "/fallback-image.jpg";

//   // Fetch posts
//   useEffect(() => {
//     fetch("/api/posts")
//       .then((res) => res.json())
//       .then((data) => {
//         setPosts(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching posts:", err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="dashboard-container container-fluid py-4 m-0">
//       {/* Header */}
//       <header className="header d-flex justify-content-between align-items-center px-4 py-3">
//         <div className="user-info d-flex align-items-center">
//           <div className="avatar-container me-3">
//             <Image
//               src={userImage}
//               alt="User Avatar"
//               width={50}
//               height={50}
//               className="avatar"
//               unoptimized
//             />
//           </div>
//           <div className="user-details">
//             <h5 className="m-0 text-white">{userName}</h5>
//             <p className="m-0 text-light">{userRole}</p>
//           </div>
//         </div>
//         <button className="logout-button btn btn-danger" onClick={() => signOut()}>
//           Logout
//         </button>
//       </header>

//       {/* Stats Section */}
//       <div className="container mt-4">
//         <div className="row g-3 justify-content-center text-center">
//           <div className="col-12 col-sm-6 col-md-4">
//             <div className="stat-card bg-primary text-white p-4 rounded">
//               <h5>Total Posts</h5>
//               <h3>{posts.length}</h3>
//             </div>
//           </div>
//           <div className="col-12 col-sm-6 col-md-4">
//             <div className="stat-card bg-info text-white p-4 rounded">
//               <h5>Comments</h5>
//               <h3>{posts.reduce((total, post) => total + (post.comments?.length || 0), 0)}</h3>
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

//       {loading ? (
//         <p className="text-center">Loading posts...</p>
//       ) : (
//         <div className="container mt-3">
//           <div className="row g-4 justify-content-center">
//             {posts.map((post) => (
//               <div key={post.id} className="col-12 col-sm-6 col-lg-4 d-flex">
//                 <div className="post-card card border-0 shadow-sm w-100">
//                   <Image
//                     className="post-img card-img-top"
//                     src={post.img || "/fallback-image.jpg"}
//                     alt={post.title}
//                     height={200}
//                     width={350}
//                     unoptimized
//                   />
//                   <div className="post-body card-body">
//                     <h5 className="card-title">{post.title}</h5>
//                     <p className="card-text">{post.desc?.substring(0, 100)}...</p>

//                     <p className="small text-muted">By: {post.user?.name || "Unknown"}</p>
//                     <p className="small text-muted">Comments: {post.comments?.length || 0}</p>

//                     <div className="post-actions d-flex justify-content-between">
//                       <button
//                         className="btn btn-primary btn-sm me-1"
//                         onClick={() => router.push(`/dashboard/create-post?edit=${post.id}`)}
//                       >
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
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Create New Post Button */}
//       <div className="text-center mt-4">
//         <button className="btn-create btn btn-success d-flex align-items-center mx-auto" onClick={() => router.push("/dashboard/create-post")}>
//           <FaPlus className="me-2" /> Create New Post
//         </button>
//       </div>
//     </div>
//   );
// }


// "use client";

// import Image from "next/image";
// import "./DashboardComp.scss";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import { FaPen, FaTrash, FaEye, FaPlus } from "react-icons/fa";

// export default function DashboardComp() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { isSignedIn, user, isLoaded, signOut } = useUser();
//   const router = useRouter();

//   // User details
//   const userName = user?.fullName || "Unknown User";
//   const userRole = user?.publicMetadata?.role || "User";
//   const userImage = user?.imageUrl || "/fallback-image.jpg";

//   // Fetch posts based on role
//   useEffect(() => {
//     if (!isLoaded) return;
    
//     const endpoint = userRole === "Admin" ? "/api/posts" : `/api/posts?userId=${user.id}`;
    
//     fetch(endpoint)
//       .then((res) => res.json())
//       .then((data) => {
//         setPosts(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching posts:", err);
//         setLoading(false);
//       });
//   }, [isLoaded, userRole, user?.id]);

//   return (
//     <div className="dashboard-container container-fluid py-4 m-0">
//       {/* Header */}
//       <header className="header d-flex justify-content-between align-items-center px-4 py-3">
//         <div className="user-info d-flex align-items-center">
//           <div className="avatar-container me-3">
//             <Image
//               src={userImage}
//               alt="User Avatar"
//               width={50}
//               height={50}
//               className="avatar"
//               unoptimized
//             />
//           </div>
//           <div className="user-details">
//             <h5 className="m-0 text-white">{userName}</h5>
//             <p className="m-0 text-light">{userRole}</p>
//           </div>
//         </div>
//         <button className="logout-button btn btn-danger" onClick={() => signOut()}>
//           Logout
//         </button>
//       </header>

//       {/* Stats Section */}
//       <div className="container mt-4">
//         <div className="row g-3 justify-content-center text-center">
//           <div className="col-12 col-sm-6 col-md-4">
//             <div className="stat-card bg-primary text-white p-4 rounded">
//               <h5>Total Posts</h5>
//               <h3>{posts.length}</h3>
//             </div>
//           </div>
//           <div className="col-12 col-sm-6 col-md-4">
//             <div className="stat-card bg-info text-white p-4 rounded">
//               <h5>Comments</h5>
//               <h3>{posts.reduce((total, post) => total + (post.comments?.length || 0), 0)}</h3>
//             </div>
//           </div>
//           <div className="col-12 col-sm-6 col-md-4">
//             <div className="stat-card bg-warning text-dark p-4 rounded">
//               <h5>Views</h5>
//               <h3>{posts.reduce((total, post) => total + (post.views || 0), 0)}</h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Posts */}
//       <h4 className="mt-5 text-center">Recent Posts</h4>

//       {loading ? (
//         <p className="text-center">Loading posts...</p>
//       ) : (
//         <div className="container mt-3">
//           <div className="row g-4 justify-content-center">
//             {posts.map((post) => (
//               <div key={post.id} className="col-12 col-sm-6 col-lg-4 d-flex">
//                 <div className="post-card card border-0 shadow-sm w-100">
//                   <Image
//                     className="post-img card-img-top"
//                     src={post.img || "/fallback-image.jpg"}
//                     alt={post.title}
//                     height={200}
//                     width={350}
//                     unoptimized
//                   />
//                   <div className="post-body card-body">
//                     <h5 className="card-title">{post.title}</h5>
//                     <p className="card-text">{post.desc?.substring(0, 100)}...</p>
//                     <p className="small text-muted">By: {post.user?.name || "Unknown"}</p>
//                     <p className="small text-muted">Comments: {post.comments?.length || 0} | Views: {post.views || 0}</p>
//                     <div className="post-actions d-flex justify-content-between">
//                       <button
//                         className="btn btn-primary btn-sm me-1"
//                         onClick={() => router.push(`/dashboard/create-post?edit=${post.id}`)}
//                       >
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
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Create New Post Button */}
//       <div className="text-center mt-4">
//         <button className="btn-create btn btn-success d-flex align-items-center mx-auto" onClick={() => router.push("/dashboard/create-post")}>
//           <FaPlus className="me-2" /> Create New Post
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";

// import Image from "next/image";
// import "./DashboardComp.scss";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import { FaPen, FaTrash, FaEye, FaPlus } from "react-icons/fa";

// export default function DashboardComp() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user, isLoaded, signOut } = useUser();
//   const router = useRouter();

//   // User details
//   const userName = user ? `${user.firstName} ${user.lastName}` : "Unknown User";
//   const userRole = user?.publicMetadata?.role?.toLowerCase() || "user";
//   const userImage = user?.imageUrl || "/fallback-image.jpg";

//   // Fetch posts based on role
//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/posts");
//       if (!response.ok) throw new Error("Failed to fetch posts");
      
//       const data = await response.json();
//       if (!Array.isArray(data)) throw new Error("Invalid response structure");

//       const filteredPosts = data.filter((post) => {
//         if (userRole === "admin") return true;
//         if (userRole === "writer") {
//           return post.userId === user?.id || post.comments.some(comment => comment.userId === user?.id);
//         }
//         return false;
//       });

//       setPosts(filteredPosts);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isLoaded) {
//       fetchPosts();
//     }
//   }, [isLoaded, userRole, user?.id]);

//   if (userRole === "user") {
//     return (
//       <div className="container text-center mt-5">
//         <h2 className="text-danger">Access Denied</h2>
//         <p className="text-muted">You do not have access to this dashboard. Please contact an admin for access.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-container container-fluid py-4 m-0">
//       <header className="header d-flex justify-content-between align-items-center px-4 py-3">
//         <div className="user-info d-flex align-items-center">
//           <div className="avatar-container me-3">
//             <Image
//               src={userImage}
//               alt="User Avatar"
//               width={50}
//               height={50}
//               className="avatar"
//               unoptimized
//             />
//           </div>
//           <div className="user-details">
//             <h5 className="m-0 text-white">{userName}</h5>
//             <p className="m-0 text-light">{userRole}</p>
//           </div>
//         </div>
//         <button className="logout-button btn btn-danger" onClick={() => signOut()}>Logout</button>
//       </header>

//       <div className="container mt-4">
//         <div className="row g-3 justify-content-center text-center">
//           <div className="col-12 col-sm-6 col-md-4">
//             <div className="stat-card bg-primary text-white p-4 rounded">
//               <h5>Total Posts</h5>
//               <h3>{posts.length}</h3>
//             </div>
//           </div>
//           <div className="col-12 col-sm-6 col-md-4">
//             <div className="stat-card bg-info text-white p-4 rounded">
//               <h5>Comments</h5>
//               <h3>{posts.reduce((total, post) => total + (post.comments?.length || 0), 0)}</h3>
//             </div>
//           </div>
//           <div className="col-12 col-sm-6 col-md-4">
//             <div className="stat-card bg-warning text-dark p-4 rounded">
//               <h5>Views</h5>
//               <h3>{posts.reduce((total, post) => total + (post.views || 0), 0)}</h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       <h4 className="mt-5 text-center">Recent Posts</h4>

//       {loading ? (
//         <p className="text-center">Loading posts...</p>
//       ) : (
//         <div className="container mt-3">
//           <div className="row g-4 justify-content-center">
//             {posts.map((post) => (
//               <div key={post.id} className="col-12 col-sm-6 col-lg-4 d-flex">
//                 <div className="post-card card border-0 shadow-sm w-100">
//                   <Image
//                     className="post-img card-img-top"
//                     src={post.img || "/fallback-image.jpg"}
//                     alt={post.title}
//                     height={200}
//                     width={350}
//                     unoptimized
//                   />
//                   <div className="post-body card-body">
//                     <h5 className="card-title">{post.title}</h5>
//                     <p className="card-text">{post?.desc ? post.desc.substring(0, 100) : ""}...</p>
//                     <p className="small text-muted">By: {post.user?.name || "Unknown"}</p>
//                     <p className="small text-muted">Comments: {post.comments?.length || 0} | Views: {post.views || 0}</p>
//                     <div className="post-actions d-flex justify-content-between">
//                       <button className="btn btn-primary btn-sm me-1" onClick={() => router.push(`/dashboard/create-post?edit=${post.id}`)}>
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
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="text-center mt-4">
//         <button className="btn-create btn btn-success d-flex align-items-center mx-auto" onClick={() => router.push("/dashboard/create-post")}> 
//           <FaPlus className="me-2" /> Create New Post
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import "./DashboardComp.scss";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaPen, FaTrash, FaEye, FaPlus } from "react-icons/fa";

export default function DashboardComp() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded, signOut } = useUser();
  const router = useRouter();

  // User details
  const userName = user ? `${user.firstName} ${user.lastName}` : "Unknown User";
  const userRole = user?.publicMetadata?.role?.toLowerCase() || "user";
  const userImage = user?.imageUrl || "/fallback-image.jpg";

  // Fetch posts based on role
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/posts");
      if (!response.ok) throw new Error("Failed to fetch posts");
      
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Invalid response structure");

      const filteredPosts = data.filter((post) => {
        if (userRole === "admin") return true;
        if (userRole === "writer") {
          return post.userId === user?.id;
        }
        return false;
      });

      setPosts(filteredPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      fetchPosts();
    }
  }, [isLoaded, userRole, user?.id]);

  if (userRole === "user") {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger">Access Denied</h2>
        <p className="text-muted">You do not have access to this dashboard. Please contact an admin for access.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container container-fluid py-4 m-0">
      <header className="header d-flex justify-content-between align-items-center px-4 py-3">
        <div className="user-info d-flex align-items-center">
          <div className="avatar-container me-3">
            <Image
              src={userImage}
              alt="User Avatar"
              width={50}
              height={50}
              className="avatar"
              unoptimized
            />
          </div>
          <div className="user-details">
            <h5 className="m-0 text-white">{userName}</h5>
            <p className="m-0 text-light">{userRole}</p>
          </div>
        </div>
        <button className="logout-button btn btn-danger" onClick={() => signOut()}>Logout</button>
      </header>

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
              <h3>{posts.reduce((total, post) => total + (post.comments?.length || 0), 0)}</h3>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="stat-card bg-warning text-dark p-4 rounded">
              <h5>Views</h5>
              <h3>{posts.reduce((total, post) => total + (post.views || 0), 0)}</h3>
            </div>
          </div>
        </div>
      </div>

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
                    unoptimized
                  />
                  <div className="post-body card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post?.desc ? post.desc.substring(0, 100) : ""}...</p>
                    <p className="small text-muted">By: {post.user?.name || "Unknown"}</p>
                    <p className="small text-muted">Comments: {post.comments?.length || 0} | Views: {post.views || 0}</p>
                    <div className="post-actions d-flex justify-content-between">
                      <button className="btn btn-primary btn-sm me-1" onClick={() => router.push(`/dashboard/create-post?edit=${post.id}`)}>
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

      <div className="text-center mt-4">
        <button className="btn-create btn btn-success d-flex align-items-center mx-auto" onClick={() => router.push("/dashboard/create-post")}> 
          <FaPlus className="me-2" /> Create New Post
        </button>
      </div>
    </div>
  );
}
