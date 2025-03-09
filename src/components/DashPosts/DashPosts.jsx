
// "use client";

// import { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import {
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Modal,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const DashPosts = () => {
//   const { isSignedIn, user, isLoaded } = useUser();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(6);
//   const [showModal, setShowModal] = useState(false);
//   const [postIdToDelete, setPostIdToDelete] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoaded || !isSignedIn) return;
//     fetchPosts();
//   }, [isLoaded, isSignedIn,]);

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/posts/all");
//       const data = await response.json();

//       if (!data || !Array.isArray(data.posts)) {
//         throw new Error("Invalid response structure");
//       }

//       const filteredPosts = data.posts.filter((post) => {
//         if (user?.publicMetadata?.role === "admin") return true;
//         if (user?.publicMetadata?.role === "writer") return post.userId === user.id;
//         return false;
//       });

//       setPosts(filteredPosts);

//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deletePost = async (postId) => {
//     console.log("Deleting post with ID:", postId); // Check if correct ID is logged

//     if (!postId) {
//       console.error("No post ID provided");
//       return;
//     }

//     try {
//       const response = await fetch("/api/posts/delete", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ postId }), // Make sure the correct ID is being sent
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(`Failed to delete post: ${errorMessage}`);
//       }

//       console.log("Post deleted successfully");
//       setShowModal(false); // Close modal after deletion
//       fetchPosts(); // Refresh the list
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   const handleChangePage = (_, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };


//   if (user?.publicMetadata?.role === "user") {
//     return <Typography variant="h5">You do not have access to this page.</Typography>;
//   }

//   return (
//     <div>
//       <Typography variant="h4">Manage Posts</Typography>

//       {loading ? (
//         <CircularProgress />
//       ) : posts.length === 0 ? (
//         <Typography>No posts available.</Typography>
//       ) : (
//         <>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Image</TableCell>
//                   <TableCell>Title</TableCell>
//                   <TableCell>Author</TableCell>
//                   <TableCell>Date</TableCell>
//                   <TableCell>Views</TableCell>
//                   {(user?.publicMetadata?.role === "admin" || user?.publicMetadata?.role === "writer") && (
//                     <TableCell>Actions</TableCell>
//                   )}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => (
//                   <TableRow key={post.id}>
//                     <TableCell>
//                       <Image
//                         src={post.image || "/default-post.jpg"}
//                         alt={post.title || "No Title"}
//                         width={50}
//                         height={50}
//                         style={{ borderRadius: "5px" }}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Link href={`/post/${post.slug}`}>{post.title}</Link>
//                     </TableCell>
//                     <TableCell>{post.authorName || "Unknown"}</TableCell>
//                     <TableCell>{new Date(post.updatedAt || post.createdAt).toLocaleString()}</TableCell>
//                     <TableCell>{post.views || 0}</TableCell>
//                     {(user?.publicMetadata?.role === "admin" || post.userId === user.id) && (
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           onClick={() => router.push(`/dashboard/create-post?edit=${post.id}`)}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           variant="contained"
//                           color="secondary"
//                           onClick={() => {
//                             // console.log("Setting postIdToDelete:", post.id); 
//                             setShowModal(true);
//                             setPostIdToDelete(post.id);
//                           }}
//                         >
//                           Delete
//                         </Button>
//                       </TableCell>
//                     )}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <TablePagination
//             rowsPerPageOptions={[6, 10, 25, 50, 100]}
//             component="div"
//             count={posts.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//           <Modal open={showModal} onClose={() => setShowModal(false)}>
//             <Paper style={{ padding: 20, margin: "auto", maxWidth: 400, textAlign: "center" }}>
//               <Typography variant="h6">Are you sure you want to delete this post?</Typography>
//               <Button variant="contained" color="error" style={{ margin: "10px" }} onClick={() => deletePost(postIdToDelete)}>Yes, Delete</Button>
//               <Button variant="contained" onClick={() => setShowModal(false)}>
//                 Cancel
//               </Button>
//             </Paper>
//           </Modal>
//         </>
//       )}
//     </div>
//   );
// };

// export default DashPosts;


"use client";

import { useState, useEffect, useContext } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Modal,
  Typography,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import "./DashPosts.scss"
import { ThemeContext } from "@/context/ThemeContext";

const DashPosts = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const router = useRouter();
  console.log(posts)

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchPosts();
    }
  }, [isLoaded, isSignedIn]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/posts/all");
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();

      if (!data?.posts || !Array.isArray(data.posts)) {
        throw new Error("Invalid response structure");
      }

      const filteredPosts = data.posts.filter((post) =>
        user?.publicMetadata?.role === "admin" || post.userId === user?.id
      );

      setPosts(filteredPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async () => {
    if (!postIdToDelete) return;
    try {
      const response = await fetch("/api/posts/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: postIdToDelete }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      setShowModal(false);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (user?.publicMetadata?.role?.toLowerCase() === "user") {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger">Access Denied</h2>
        <p className="text-muted">You do not have access to this dashboard. Please contact an admin for access.</p>
      </div>
    );
  }

  return (
    <div className="DashPostsContainer container">
      <Typography variant="h4" className="text-center my-4">Manage Posts</Typography>

      {loading ? (
        <Loader />
      ) : posts.length === 0 ? (
        <Typography className="text-center my-2" >No posts available.</Typography>
      ) : (
        <>
          <TableContainer className={`mainTable ${theme === "dark" ? "dark" : "light"}`} component={Paper}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell className="forDarkColor">Thumbnail</TableCell>
                  <TableCell className="forDarkColor">Title</TableCell>
                  <TableCell className="forDarkColor">Category</TableCell>
                  <TableCell className="forDarkColor">Author</TableCell>
                  <TableCell className="forDarkColor">Date</TableCell>
                  <TableCell className="forDarkColor">Views</TableCell>
                  <TableCell className="forDarkColor">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <Image
                        src={post.image || "/fallback-image.jpg"}
                        alt={post.title || "No Title"}
                        width={50}
                        height={50}
                        style={{ borderRadius: "5px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Link href={`/category/${post.catSlug}/${post.slug}`}>{post.title}</Link>
                    </TableCell>
                    <TableCell className="forDarkColor">{post.catSlug || "Unknown"}</TableCell>
                    <TableCell className="forDarkColor">{post.authorName || "Unknown"}</TableCell>
                    <TableCell className="forDarkColor">{new Date(post.updatedAt || post.createdAt).toLocaleString()}</TableCell>
                    <TableCell className="forDarkColor">{post.views || 0}</TableCell>
                    <TableCell className="">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => router.push(`/dashboard/create-post?edit=${post.slug}`)}
                      >
                        Edit
                      </Button>

                      <Button
                        sx={{ ml: 2 }}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post.id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            className={`${theme === "dark" ? "text-light" : "text-dark"}`}
            rowsPerPageOptions={[4, 10, 25, 50, 100]}
            component="div"
            count={posts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <Modal open={showModal} onClose={() => setShowModal(false)}>
            <Paper style={{ padding: 20, margin: "auto", maxWidth: 400, textAlign: "center" }}>
              <Typography variant="h6">Are you sure you want to delete this post?</Typography>
              <Button
                variant="contained"
                color="error"
                style={{ margin: "10px" }}
                onClick={deletePost}
              >
                Yes, Delete
              </Button>
              <Button variant="contained" onClick={() => setShowModal(false)}>Cancel</Button>
            </Paper>
          </Modal>
        </>
      )}
    </div>
  );
};

export default DashPosts;