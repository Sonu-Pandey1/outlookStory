// "use client";

// import { useContext, useState } from "react";
// import useSWR, { mutate } from "swr";
// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import { FaPen, FaTrash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import ClipLoader from "react-spinners/ClipLoader";
// import { ThemeContext } from "@/context/ThemeContext";

// import Image from "next/image";
// import { FaCommentDots } from "react-icons/fa6";
// import "./Comments.scss";

// const fetcher = async (url) => {
//   const res = await fetch(url);
//   if (!res.ok) throw new Error("Failed to fetch comments");
//   return res.json();
// };

// const Comments = ({ postSlug }) => {
//   const { user, isSignedIn } = useUser();
//   const { data, error, isLoading } = useSWR(
//     `/api/comments?postSlug=${postSlug}`,
//     fetcher
//   );

//   const [desc, setDesc] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [editingCommentId, setEditingCommentId] = useState(null);

//   const handlePostComment = async () => {
//     if (desc.trim() === "") return;
//     setLoading(true);

//     try {
//       const res = await fetch("/api/comments", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ desc, postSlug }),
//       });

//       if (res.ok) {
//         mutate(`/api/comments?postSlug=${postSlug}`);
//         setDesc("");
//         toast.success("Comment posted successfully!");
//       } else {
//         toast.error("Failed to post comment.");
//       }
//     } catch (err) {
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditComment = async (commentId, newDesc) => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/comments", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ commentId, desc: newDesc, postSlug }),
//       });

//       if (res.ok) {
//         mutate(`/api/comments?postSlug=${postSlug}`);
//         toast.success("Comment updated successfully.");
//         setEditingCommentId(null);
//       } else {
//         toast.error("Failed to update comment.");
//       }
//     } catch (err) {
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/comments", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ commentId }),
//       });

//       if (res.ok) {
//         mutate(`/api/comments?postSlug=${postSlug}`);
//         toast.success("Comment deleted successfully.");
//       } else {
//         toast.error("Failed to delete comment.");
//       }
//     } catch (err) {
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const { theme } = useContext(ThemeContext);

//   return (
//     <div
//       className={`container comments-container p-0 p-md-4 ${
//         theme === "dark" ? "dark" : "light"
//       }`}
//     >
//       <div className="d-flex gap-5 title align-items-center mb-4">
//         <h2 className="">Comments </h2>
//         <span className="totalComments">
//           <FaCommentDots /> {data?.length || 0}
//         </span>
//       </div>

//       {isSignedIn ? (
//         <div className="mb-4">
//           <textarea
//             className="form-control mb-2 "
//             value={desc}
//             onChange={(e) => setDesc(e.target.value)}
//             placeholder="Write a comment..."
//           ></textarea>
//           <button
//             onClick={handlePostComment}
//             disabled={loading}
//             className="btn btn-primary w-100"
//           >
//             {loading ? <ClipLoader size={20} color="#fff" /> : "Post Comment"}
//           </button>
//         </div>
//       ) : (
//         <Link href="/sign-in" className="btn btn-outline-primary w-100">
//           Log in to post a comment
//         </Link>
//       )}

//       {isLoading ? (
//         <p>Loading comments...</p>
//       ) : error ? (
//         <p className="text-danger">Failed to load comments.</p>
//       ) : (
//         <div className="comments-list">
//           {data && data.length > 0 ? (
//             data.map((comment) => (
//               <div key={comment.id} className="commentCard card mb-3 p-3">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div className="d-flex align-items-center">
//                     <Image
//                       src={comment.user?.image || "/default-avatar.png"}
//                       alt="User Avatar"
//                       className="rounded-circle me-2"
//                       width="40"
//                       height="40"
//                     />
//                     <div>
//                       <span className="fw-bold ">
//                         {comment.user?.name || "Anonymous"}
//                       </span>
//                       <br />
//                       <small className="commentDate">
//                         {new Date(comment.createdAt).toLocaleString()}
//                       </small>
//                     </div>
//                   </div>
//                   {isSignedIn && (
//                     <div className="d-flex gap-2">
//                       <button
//                         onClick={() => setEditingCommentId(comment.id)}
//                         className="btn btn-sm btn-warning"
//                       >
//                         <FaPen />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteComment(comment.id)}
//                         className="btn btn-sm btn-danger"
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {editingCommentId === comment.id ? (
//                   <div className="mt-2">
//                     <textarea
//                       className="form-control"
//                       defaultValue={comment.desc}
//                       onChange={(e) => setDesc(e.target.value)}
//                     ></textarea>
//                     <button
//                       onClick={() => handleEditComment(comment.id, desc)}
//                       disabled={loading}
//                       className="btn btn-success mt-2 w-100"
//                     >
//                       {loading ? <ClipLoader size={20} color="#fff" /> : "Save"}
//                     </button>
//                   </div>
//                 ) : (
//                   <p className="mt-2">{comment.desc}</p>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-muted">No comments yet.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Comments;



"use client";

import { useContext, useState } from "react";
import useSWR, { mutate } from "swr";
import Link from "next/link";
import { FaPen, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { ThemeContext } from "@/context/ThemeContext";
import { AuthContext } from "@/context/AuthContext"; // ✅ Use your auth context
import Image from "next/image";
import "./Comments.scss"
import { FaCommentDots } from "react-icons/fa6";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
};

const Comments = ({ postSlug }) => {
  const { user, login } = useContext(AuthContext); // ✅ Use AuthContext
  const { data, error, isLoading } = useSWR(
    `/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);

  const handlePostComment = async () => {
    if (desc.trim() === "") return;
    setLoading(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ desc, postSlug }),
        credentials: "include", // ✅ Ensure cookies are sent
      });

      if (res.ok) {
        mutate(`/api/comments?postSlug=${postSlug}`);
        setDesc(""); // ✅ Reset form immediately
        toast.success("Comment posted successfully!");
      } else {
        toast.error("Failed to post comment.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditComment = async (commentId, newDesc) => {
    setLoading(true);
    try {
      const res = await fetch("/api/comments", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId, desc: newDesc, postSlug }),
        credentials: "include",
      });

      if (res.ok) {
        mutate(`/api/comments?postSlug=${postSlug}`);
        toast.success("Comment updated successfully.");
        setEditingCommentId(null);
      } else {
        toast.error("Failed to update comment.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setLoading(true);
    try {
      const res = await fetch("/api/comments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
        credentials: "include",
      });

      if (res.ok) {
        mutate(`/api/comments?postSlug=${postSlug}`);
        toast.success("Comment deleted successfully.");
      } else {
        toast.error("Failed to delete comment.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`container comments-container p-0 p-md-4 ${
        theme === "dark" ? "dark" : "light"
      }`}
    >
      <div className="d-flex gap-5 title align-items-center mb-4">
        <h2 className="">Comments </h2>
        <span className="totalComments">
          <FaCommentDots /> {data?.length || 0}
        </span>
      </div>

      {user ? ( // ✅ Check authentication with your AuthContext
        <div className="mb-4">
          <textarea
            className="form-control mb-2 "
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Write a comment..."
          ></textarea>
          <button
            onClick={handlePostComment}
            disabled={loading}
            className="btn btn-primary w-100"
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : "Post Comment"}
          </button>
        </div>
      ) : (
        <Link href="/sign-in" className="btn btn-outline-primary w-100">
          Log in to post a comment
        </Link>
      )}

      {isLoading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p className="text-danger">Failed to load comments.</p>
      ) : (
        <div className="comments-list">
          {data && data.length > 0 ? (
            data.map((comment) => (
              <div key={comment.id} className="commentCard card mb-3 p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <Image
                      src={comment.user?.image || "/default-avatar.png"}
                      alt="User Avatar"
                      className="rounded-circle me-2"
                      width="40"
                      height="40"
                    />
                    <div>
                      <span className="fw-bold ">
                        {comment.user?.name || "Anonymous"}
                      </span>
                      <br />
                      <small className="commentDate">
                        {new Date(comment.createdAt).toLocaleString()}
                      </small>
                    </div>
                  </div>
                  {user && user.id === comment.userId && ( // ✅ Only allow editing/deleting if user owns comment
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => setEditingCommentId(comment.id)}
                        className="btn btn-sm btn-warning"
                      >
                        <FaPen />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="btn btn-sm btn-danger"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>

                {editingCommentId === comment.id ? (
                  <div className="mt-2">
                    <textarea
                      className="form-control"
                      defaultValue={comment.desc}
                      onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                    <button
                      onClick={() => handleEditComment(comment.id, desc)}
                      disabled={loading}
                      className="btn btn-success mt-2 w-100"
                    >
                      {loading ? <ClipLoader size={20} color="#fff" /> : "Save"}
                    </button>
                  </div>
                ) : (
                  <p className="mt-2">{comment.desc}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
