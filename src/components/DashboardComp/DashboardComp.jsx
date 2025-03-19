
"use client";

import Image from "next/image";
import "./DashboardComp.scss";
import { useRouter } from "next/navigation";
import CountUp from "react-countup";
import * as timeago from "timeago.js";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useState, useEffect, useContext } from "react";
import { FaPen, FaTrash, FaEye, FaPlus, FaUsers } from "react-icons/fa";
import { FaComments, FaRegEye } from "react-icons/fa6";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

export default function DashboardComp() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const { theme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  // console.log(posts)

  const userName = user?.name || "Unknown User";
  const userRole = user?.role?.toLowerCase() || "user";
  const userImage = user?.image || "/fallback-image.jpg";

  // Fetch posts based on role
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/Dashboard");
      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Invalid response structure");

      const filteredPosts = data.filter((post) => {
        if (userRole === "admin") return true;
        if (userRole === "writer") return post.userId === user?.id;
        return false;
      });

    // setPosts(filteredPosts);
      setPosts(filteredPosts);
      if (filteredPosts.length === 0) {
        console.log("No posts available");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch total users (Admins only)
  const fetchUsers = async () => {
    if (userRole !== "admin") return;
    try {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();

      if (!data.users || !Array.isArray(data.users)) {
        throw new Error("Invalid response structure");
      }

      setTotalUsers(data.users.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const deletePost = async () => {
    if (!postIdToDelete) return;
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const response = await fetch("/api/posts/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: postIdToDelete }),
      });
      if (!response.ok) throw new Error(await response.text());
      setPostIdToDelete(null);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // useEffect(() => {
  //  if (!loading) {
  //    fetchPosts();
  //    if (userRole === "admin") {
  //      fetchUsers();
  //    }
  //  }
  // }, [loading, userRole, user?.id]);

    useEffect(() => {
    fetchPosts();
    if (userRole === "admin") {
      fetchUsers();
    }
  }, [userRole, user?.id]);

  if (userRole === "user") {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger">Access Denied</h2>
        <p className="text-muted">
          You do not have access to this dashboard. Please contact an admin for access.
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard-container container-fluid py-4 m-0">
      <header className="header d-flex justify-content-between align-items-center px-4 py-3 bg-dark text-white rounded shadow-sm">
        <div className="user-info d-flex align-items-center">
          <div className="avatar-container me-3">
            <Image
              src={userImage || "/fallback-image.jpg"}
              alt="User Avatar"
              width={50}
              height={50}
              className="rounded-circle"
            />
          </div>
          <div className={`user-details ${theme === "dark" ? "text-light" : "text-dark"}`}>
            <h5 className="m-0">{userName}</h5>
            <p className="m-0 small ">{userRole}</p>
          </div>
        </div>
        <button className="btn btn-danger" onClick={() => {
          logout();
          router.push("/sign-in");
        }}>
          Logout
        </button>
      </header>

      <div className="container mt-4">
        <div className={`row g-3 text-center ${userRole === "admin" ? "row-cols-md-4" : "row-cols-md-3"} row-cols-1`}>
          <div className="col">
            <div className={`stat-card bg-primary ${theme === "dark" ? "text-light" : "text-dark"} p-4 rounded shadow`}>
              <h5>Total Posts</h5>
              <h3>
                <HiOutlineClipboardDocumentList className="me-2" />
                <CountUp start={0} end={posts.length} duration={5} separator="," />
              </h3>
            </div>
          </div>
          <div className="col">
            <div className={`stat-card bg-warning ${theme === "dark" ? "text-light" : "text-dark"} p-4 rounded shadow`}>
              <h5>Views</h5>
              <h3>
                <FaRegEye className="me-2" />
                <CountUp start={0} end={posts.reduce((total, post) => total + (post.views || 0), 0)} duration={3} separator="," />
              </h3>
            </div>
          </div>
          <div className="col">
            <div className={`stat-card bg-info ${theme === "dark" ? "text-light" : "text-dark"} p-4 rounded shadow`}>
              <h5>Comments</h5>
              <h3>
                <FaComments className="me-2" />
                <CountUp start={0} end={posts.reduce((total, post) => total + (post.comments?.length || 0), 0)} duration={4} separator="," />
              </h3>
            </div>
          </div>
          {userRole === "admin" && (
            <div className="col">
              <div className={`stat-card bg-success ${theme === "dark" ? "text-light" : "text-dark"} p-4 rounded shadow`}>
                <h5>Total Users</h5>
                <h3>
                  <FaUsers className="me-2" />
                  <CountUp start={0} end={totalUsers} duration={5} separator="," />
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>


      <h4 className="my-4 text-center">Recent Posts</h4>

      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : (
        <div className="container mt-3">
          <div className="row g-4 justify-content-center">
            {posts.map((post) => (
              <div key={post.id} className="col-md-6 col-lg-4 d-flex">
                <div className={`post-card ${theme === "dark" ? "dark" : "light"} card border-0 shadow-lg w-100 rounded`}>
                  <Image
                    className="post-img card-img-top rounded-top"
                    src={post.img || "/fallback-image.jpg"}
                    alt={post.title}
                    height={200}
                    width={350}
                    unoptimized
                  />
                  <div className="post-body card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post?.desc ? post.desc.substring(0, 60) : ""}...</p>
                    <p className="small mb-2">By: {post.user?.name || "Unknown"}</p>

                    <div className="d-flex justify-content-between small">
                      <p>{timeago.format(post.createdAt)}</p>
                      <p>Views: {post.views || 0}</p>
                      <p>Comments: {post.comments?.length || 0}</p>
                    </div>

                    <div className="post-actions d-flex justify-content-between">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => router.push(`/dashboard/create-post?edit=${post.slug}`)}
                      >
                        <FaPen /> Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => setPostIdToDelete(post.id) || deletePost()}>
                        <FaTrash /> Delete
                      </button>
                      <button className="btn btn-secondary btn-sm">
                        <FaEye />
                        <Link className=" text-decoration-none text-white" href={`/category/${post.catSlug}/${post.slug}`}>View</Link>
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
        <button
          className="btn btn-success d-flex align-items-center mx-auto"
          onClick={() => router.push("/dashboard/create-post")}
        >
          <FaPlus className="me-2" /> Create New Post
        </button>
      </div>
    </div>
  );
}



// "use client";

// import Image from "next/image";
// import "./DashboardComp.scss";
// import { useRouter } from "next/navigation";
// import CountUp from "react-countup";
// import * as timeago from "timeago.js";
// import { ThemeContext } from "@/context/ThemeContext";
// import React, { useState, useEffect, useContext } from "react";
// import { FaPen, FaTrash, FaEye, FaPlus, FaUsers } from "react-icons/fa";
// import { FaComments, FaRegEye } from "react-icons/fa6";
// import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
// import Link from "next/link";
// import { AuthContext } from "@/context/AuthContext";

// export default function DashboardComp() {
//   const router = useRouter();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [postIdToDelete, setPostIdToDelete] = useState(null);
//   const { theme } = useContext(ThemeContext);
//   const { user, logout } = useContext(AuthContext);

//   const userName = user?.name || "Unknown User";
//   const userRole = user?.role?.toLowerCase() || "user";
//   const userImage = user?.image || "/fallback-image.jpg";

//   // Fetch posts based on role
//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/dashboard");
//       // console.log(response);
//       if (!response.ok) throw new Error("Failed to fetch posts");

//       const data = await response.json();
//       if (!Array.isArray(data)) throw new Error("Invalid response structure");

//       const filteredPosts = data.filter((post) =>
//         userRole === "admin" ? true : post.userId === user?.id
//       );

//       setPosts(filteredPosts);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch total users (Admins only)
//   const fetchUsers = async () => {
//     if (userRole !== "admin") return;
//     try {
//       const response = await fetch("/api/users");
//       if (!response.ok) throw new Error("Failed to fetch users");

//       const data = await response.json();
//       if (!data.users || !Array.isArray(data.users)) {
//         throw new Error("Invalid response structure");
//       }

//       setTotalUsers(data.users.length);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const deletePost = async (postId) => {
//     if (!postId) return;
//     if (!window.confirm("Are you sure you want to delete this post?")) return;

//     try {
//       const response = await fetch("/api/posts/delete", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ postId }),
//       });

//       if (!response.ok) throw new Error(await response.text());

//       setPostIdToDelete(null);
//       fetchPosts();
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//     if (userRole === "admin") {
//       fetchUsers();
//     }
//   }, [userRole, user?.id]);

//   if (userRole === "user") {
//     return (
//       <div className="container text-center mt-5">
//         <h2 className="text-danger">Access Denied</h2>
//         <p className="text-muted">
//           You do not have access to this dashboard. Please contact an admin for access.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-container container-fluid py-4 m-0">
//       <header className="header d-flex justify-content-between align-items-center px-4 py-3 bg-dark text-white rounded shadow-sm">
//         <div className="user-info d-flex align-items-center">
//           <div className="avatar-container me-3">
//             <Image
//               src={userImage}
//               alt="User Avatar"
//               width={50}
//               height={50}
//               className="rounded-circle"
//             />
//           </div>
//           <div className={`user-details ${theme === "dark" ? "text-light" : "text-dark"}`}>
//             <h5 className="m-0">{userName}</h5>
//             <p className="m-0 small">{userRole}</p>
//           </div>
//         </div>
//         <button className="btn btn-danger" onClick={() => logout() && router.push("/sign-in")}>
//           Logout
//         </button>
//       </header>

//       <div className="container mt-4">
//         <div className="row g-3 text-center row-cols-md-3 row-cols-1">
//           <div className="col">
//             <div className="stat-card bg-primary text-light p-4 rounded shadow">
//               <h5>Total Posts</h5>
//               <h3>
//                 <HiOutlineClipboardDocumentList className="me-2" />
//                 <CountUp start={0} end={posts.length} duration={5} separator="," />
//               </h3>
//             </div>
//           </div>
//           <div className="col">
//             <div className="stat-card bg-warning text-dark p-4 rounded shadow">
//               <h5>Views</h5>
//               <h3>
//                 <FaRegEye className="me-2" />
//                 <CountUp start={0} end={posts.reduce((total, post) => total + (post.views || 0), 0)} duration={3} separator="," />
//               </h3>
//             </div>
//           </div>
//           {userRole === "admin" && (
//             <div className="col">
//               <div className="stat-card bg-success text-light p-4 rounded shadow">
//                 <h5>Total Users</h5>
//                 <h3>
//                   <FaUsers className="me-2" />
//                   <CountUp start={0} end={totalUsers} duration={5} separator="," />
//                 </h3>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <h4 className="my-4 text-center">Recent Posts</h4>

//       {loading ? (
//         <p className="text-center">Loading posts...</p>
//       ) : (
//         <div className="container mt-3">
//           <div className="row g-4">
//             {posts.map((post) => (
//               <div key={post.id} className="col-md-6 col-lg-4">
//                 <div className="card shadow-lg rounded">
//                   <Image src={post.img || "/fallback-image.jpg"} alt={post.title} height={200} width={350} />
//                   <div className="card-body">
//                     <h5 className="card-title">{post.title}</h5>
//                     <button className="btn btn-primary btn-sm me-2" onClick={() => router.push(`/dashboard/create-post?edit=${post.slug}`)}>
//                       <FaPen /> Edit
//                     </button>
//                     <button className="btn btn-danger btn-sm" onClick={() => deletePost(post.id)}>
//                       <FaTrash /> Delete
//                     </button>
//                     <Link href={`/category/${post.catSlug}/${post.slug}`} className="btn btn-secondary btn-sm">
//                       <FaEye /> View
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// "use client";

// import Image from "next/image";
// import "./DashboardComp.scss";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import CountUp from "react-countup";
// import * as timeago from "timeago.js";
// import { ThemeContext } from "@/context/ThemeContext";
// import React, { useState, useEffect, useContext } from "react";
// import { FaPen, FaTrash, FaEye, FaPlus, FaUsers } from "react-icons/fa";
// import { FaComments, FaRegEye } from "react-icons/fa6";
// import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
// import Link from "next/link";

// export default function DashboardComp() {
//   const router = useRouter();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [postIdToDelete, setPostIdToDelete] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const { user, isLoaded, signOut } = useUser();
//   const { theme } = useContext(ThemeContext);

//   const userName = user ? `${user.firstName} ${user.lastName}` : "Unknown User";
//   const userRole = user?.publicMetadata?.role?.toLowerCase() || "user";
//   const userImage = user?.imageUrl || "/fallback-image.jpg";

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/Dashboard");
//       if (!response.ok) throw new Error("Failed to fetch posts");

//       const data = await response.json();
//       if (!Array.isArray(data)) throw new Error("Invalid response structure");

//       const filteredPosts = data.filter((post) => {
//         if (userRole === "admin") return true;
//         if (userRole === "writer") return post.userId === user?.id;
//         return false;
//       });

//       setPosts(filteredPosts);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     if (userRole !== "admin") return;
//     try {
//       const response = await fetch("/api/users");
//       if (!response.ok) throw new Error("Failed to fetch users");

//       const data = await response.json();
//       if (!data.users || !Array.isArray(data.users)) {
//         throw new Error("Invalid response structure");
//       }

//       setTotalUsers(data.users.length);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const deletePost = async () => {
//     if (!postIdToDelete) return;
//     try {
//       const response = await fetch("/api/posts/delete", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ postId: postIdToDelete }),
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage);
//       }

//       setShowModal(false);
//       setPostIdToDelete(null);
//       fetchPosts();
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   useEffect(() => {
//     if (isLoaded) {
//       fetchPosts();
//       if (userRole === "admin") {
//         fetchUsers();
//       }
//     }
//   }, [isLoaded, userRole, user?.id]);

//   if (userRole === "user") {
//     return (
//       <div className="container text-center mt-5">
//         <h2 className="text-danger">Access Denied</h2>
//         <p className="text-muted">You do not have access to this dashboard.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-container container-fluid py-4 m-0">
//       <header className="header d-flex justify-content-between align-items-center px-4 py-3 bg-dark text-white rounded shadow-sm">
//         <div className="user-info d-flex align-items-center">
//           <div className="avatar-container me-3">
//             <Image src={userImage} alt="User Avatar" width={50} height={50} className="rounded-circle" unoptimized />
//           </div>
//           <div className={`user-details ${theme === "dark" ? "text-light" : "text-dark"}`}>
//             <h5 className="m-0">{userName}</h5>
//             <p className="m-0 small">{userRole}</p>
//           </div>
//         </div>
//         <button className="btn btn-danger" onClick={() => signOut()}>Logout</button>
//       </header>

//       <h4 className="my-4 text-center">Recent Posts</h4>
//       {loading ? (
//         <p className="text-center">Loading posts...</p>
//       ) : (
//         <div className="container mt-3">
//           <div className="row g-4 justify-content-center">
//             {posts.map((post) => (
//               <div key={post.id} className="col-md-6 col-lg-4 d-flex">
//                 <div className="post-card card border-0 shadow-lg w-100 rounded">
//                   <Image className="post-img card-img-top rounded-top" src={post.img || "/fallback-image.jpg"} alt={post.title} height={200} width={350} unoptimized />
//                   <div className="post-body card-body">
//                     <h5 className="card-title">{post.title}</h5>
//                     <p className="card-text">{post?.desc ? post.desc.substring(0, 60) : ""}...</p>
//                     <div className="post-actions d-flex justify-content-between">
//                       <button className="btn btn-primary btn-sm" onClick={() => router.push(`/dashboard/create-post?edit=${post.slug}`)}><FaPen /> Edit</button>
//                       <button className="btn btn-danger btn-sm" onClick={() => { setPostIdToDelete(post.id); setShowModal(true); }}><FaTrash /> Delete</button>
//                       <button className="btn btn-secondary btn-sm">
//                         <FaEye /> <Link className="text-decoration-none text-white" href={`/category/${post.catSlug}/${post.slug}`}>View</Link>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <p>Are you sure you want to delete this post?</p>
//             <button onClick={deletePost}>Confirm</button>
//             <button onClick={() => setShowModal(false)}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
