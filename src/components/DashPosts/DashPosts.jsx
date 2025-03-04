
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

// const DashPosts = () => {
//   const { isSignedIn, user, isLoaded } = useUser();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(6);
//   const [showModal, setShowModal] = useState(false);
//   const [postIdToDelete, setPostIdToDelete] = useState(null);
//   console.log("Rendered Posts:", posts);
//   console.log(user)

//   useEffect(() => {
//     if (!isLoaded || !isSignedIn) return;
//     fetchPosts();
//   }, [isLoaded, isSignedIn]);

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/posts/all"); // Fetch all posts from new API
//       const data = await response.json();
  
//       console.log("Fetched Data:", data);
  
//       if (!data || !Array.isArray(data.posts)) {
//         throw new Error("Invalid response structure");
//       }
  
//       const filteredPosts = data.posts.filter((post) => {
//         console.log("Checking post:", post);
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
  

//   const handleDelete = async () => {
//     setShowModal(false);
//     try {
//       const response = await fetch(`/api/posts/${postIdToDelete}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.ok) {
//         setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postIdToDelete));
//       }
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

//   console.log("Rendered Posts:", posts);

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
//                   <TableCell>Comments</TableCell>
//                   {(user?.publicMetadata?.role === "admin" || user?.publicMetadata?.role === "writer") && (
//                     <TableCell>Actions</TableCell>
//                   )}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {(posts || []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => (
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
//                     <TableCell>{post.commentsCount || 0}</TableCell>
//                     {(user?.publicMetadata?.role === "admin" || post.userId === user.id) && (
//                       <TableCell>
//                         <Button variant="contained" color="primary" href={`/dashboard/edit-post/${post.id}`}>
//                           Edit
//                         </Button>
//                         <Button
//                           variant="contained"
//                           color="secondary"
//                           onClick={() => {
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
//         </>
//       )}

//       <Modal open={showModal} onClose={() => setShowModal(false)}>
//         <Paper style={{ padding: 20, margin: "auto", maxWidth: 400, textAlign: "center" }}>
//           <Typography variant="h6">Are you sure you want to delete this post?</Typography>
//           <Button variant="contained" color="error" onClick={handleDelete} style={{ margin: "10px" }}>
//             Yes, Delete
//           </Button>
//           <Button variant="contained" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//         </Paper>
//       </Modal>
//     </div>
//   );
// };

// export default DashPosts;


"use client";

import { useState, useEffect } from "react";
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

const DashPosts = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const router = useRouter();
  console.log(postIdToDelete)

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    fetchPosts();
  }, [isLoaded, isSignedIn]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/posts/all"); // Fetch all posts from new API
      const data = await response.json();

      if (!data || !Array.isArray(data.posts)) {
        throw new Error("Invalid response structure");
      }

      const filteredPosts = data.posts.filter((post) => {
        if (user?.publicMetadata?.role === "admin") return true;
        if (user?.publicMetadata?.role === "writer") return post.userId === user.id;
        return false;
      });

      setPosts(filteredPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };
//? this is ok but issues is params 
  // const handleDelete = async () => {
  //   if (!postIdToDelete) {
  //     console.error("No post ID to delete.");
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch(`/api/posts/${postIdToDelete}`, {
  //       method: "DELETE",
  //       body: JSON.stringify({ postId: postIdToDelete }),
  //       headers: { "Content-Type": "application/json" },
  //     });
  
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Failed to delete post");
  //     }
  
  //     console.log("✅ Post deleted successfully:", postIdToDelete);
  
  //     setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postIdToDelete));
  //     setShowModal(false);
  //     setPostIdToDelete(null);
  //   } catch (error) {
  //     console.error("Error deleting post:", error);
  //   }
  // };
  
  const handleDelete = async () => {
    if (!postIdToDelete) {
      console.error("No post ID to delete.");
      return;
    }
  
    try {
      const response = await fetch(`/api/posts/delete`, { // Change to generic endpoint
        method: "DELETE",
        body: JSON.stringify({ postId: postIdToDelete }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete post");
      }
  
      console.log("✅ Post deleted successfully:", postIdToDelete);
  
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postIdToDelete));
      setShowModal(false);
      setPostIdToDelete(null);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (user?.publicMetadata?.role === "user") {
    return <Typography variant="h5">You do not have access to this page.</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">Manage Posts</Typography>

      {loading ? (
        <CircularProgress />
      ) : posts.length === 0 ? (
        <Typography>No posts available.</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Views</TableCell>
                  <TableCell>Comments</TableCell>
                  {(user?.publicMetadata?.role === "admin" || user?.publicMetadata?.role === "writer") && (
                    <TableCell>Actions</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {(posts || []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <Image
                        src={post.image || "/default-post.jpg"}
                        alt={post.title || "No Title"}
                        width={50}
                        height={50}
                        style={{ borderRadius: "5px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Link href={`/post/${post.slug}`}>{post.title}</Link>
                    </TableCell>
                    <TableCell>{post.authorName || "Unknown"}</TableCell>
                    <TableCell>{new Date(post.updatedAt || post.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{post.views || 0}</TableCell>
                    <TableCell>{post.commentsCount || 0}</TableCell>
                    {(user?.publicMetadata?.role === "admin" || post.userId === user.id) && (
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => router.push(`/dashboard/create-post?edit=${post.id}`)}
                        >
                          Edit
                        </Button>
                        <Button
  variant="contained"
  color="secondary"
  onClick={() => {
    console.log("Setting postIdToDelete:", post.id); // ✅ Debugging line
    setShowModal(true);
    setPostIdToDelete(post.id); // ✅ Assign correct post ID
  }}
>
  Delete
</Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[6, 10, 25, 50, 100]}
            component="div"
            count={posts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Paper style={{ padding: 20, margin: "auto", maxWidth: 400, textAlign: "center" }}>
          <Typography variant="h6">Are you sure you want to delete this post?</Typography>
          <Button variant="contained" color="error" onClick={handleDelete} style={{ margin: "10px" }}>
            Yes, Delete
          </Button>
          <Button variant="contained" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Paper>
      </Modal>
    </div>
  );
};

export default DashPosts;
