"use client";

// import { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import { HiOutlineExclamationCircle } from "react-icons/hi";
// import { Button, Modal, Table } from "react-bootstrap";

// export default function DashPosts() {
//   const { user } = useUser();
//   console.log("user", user);

//   const [userPosts, setUserPosts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [postIdToDelete, setPostIdToDelete] = useState("");
    
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await fetch("/api/post/get", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: user?.publicMetadata?.userMongoId,
//           }),
//         });
//         const data = await res.json();
//         console.log(data);

//         if (res.ok) {
//           setUserPosts(data.posts);
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     if (user?.publicMetadata?.isAdmin) {
//       fetchPosts();
//     }
//   }, [user?.publicMetadata?.isAdmin, user?.publicMetadata?.userMongoId]);

//   const handleDeletePost = async () => {
//     setShowModal(false);
//     try {
//       const res = await fetch("/api/post/delete", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           postId: postIdToDelete,
//           userId: user?.publicMetadata?.userMongoId,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         const newPosts = userPosts.filter(
//           (post) => post._id !== postIdToDelete
//         );
//         setUserPosts(newPosts);
//         setPostIdToDelete(""); // Reset postIdToDelete after deletion
//       } else {
//         console.log(data.message);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   if (!user?.publicMetadata?.isAdmin) {
//     return (
//       <div className="d-flex flex-column justify-content-center align-items-center py-5">
//         <h1 className="h4">You are not an admin!</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-auto px-3 py-4 bg-danger col">
//       {user?.publicMetadata?.isAdmin && userPosts.length > 0 ? (
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Date updated</th>
//               <th>Post image</th>
//               <th>Post title</th>
//               <th>Category</th>
//               <th>Delete</th>
//               <th>Edit</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userPosts.map((post) => (
//               <tr key={post._id}>
//                 <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
//                 <td>
//                   <Link href={`/post/${post.slug}`}>
//                     <img
//                       src={post.image}
//                       alt={post.title}
//                       className="w-20 h-10 object-cover bg-gray-500"
//                     />
//                   </Link>
//                 </td>
//                 <td>
//                   <Link className="text-dark" href={`/post/${post.slug}`}>
//                     {post.title}
//                   </Link>
//                 </td>
//                 <td>{post.category}</td>
//                 <td>
//                   <Button
//                     variant="danger"
//                     onClick={() => {
//                       setShowModal(true);
//                       setPostIdToDelete(post._id);
//                     }}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//                 <td>
//                   <Link
//                     className="btn btn-warning"
//                     href={`/dashboard/update-post/${post._id}`}
//                   >
//                     Edit
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <p>You have no posts yet!</p>
//       )}

//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton />
//         <Modal.Body>
//           <div className="text-center">
//             <HiOutlineExclamationCircle className="h3 text-warning mb-3" />
//             <h4>Are you sure you want to delete this post?</h4>
//             <div className="d-flex justify-content-center gap-3 mt-4">
//               <Button variant="danger" onClick={handleDeletePost}>
//                 Yes, I`m sure
//               </Button>
//               <Button variant="secondary" onClick={() => setShowModal(false)}>
//                 No, cancel
//               </Button>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

import React from "react";

export default function DashPosts() {
  return <div className=" bg-danger-subtle col">DashPosts</div>;
}
   