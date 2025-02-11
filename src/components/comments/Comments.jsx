// "use client";

// import Link from "next/link";
// import styles from "./comments.module.css";
// import Image from "next/image";
// import useSWR from "swr";
// import { useSession } from "next-auth/react";
// import { useState } from "react";

// const fetcher = async (url) => {
//   const res = await fetch(url);

//   const data = await res.json();

//   if (!res.ok) {
//     const error = new Error(data.message);
//     throw error;
//   }

//   return data;
// };

// const Comments = ({ postSlug }) => {
//   const { status } = useSession();

//   const { data, mutate, isLoading } = useSWR(
//     `http://localhost:3000/api/comments?postSlug=${postSlug}`,
//     fetcher
//   );

//   const [desc, setDesc] = useState("");

//   const handleSubmit = async () => {
//     await fetch("/api/comments", {
//       method: "POST",
//       body: JSON.stringify({ desc, postSlug }),
//     });
//     mutate();
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Comments</h1>
//       {status === "authenticated" ? (
//         <div className={styles.write}>
//           <textarea
//             placeholder="write a comment..."
//             className={styles.input}
//             onChange={(e) => setDesc(e.target.value)}
//           />
//           <button className={styles.button} onClick={handleSubmit}>
//             Send
//           </button>
//         </div>
//       ) : (
//         <Link href="/login">Login to write a comment</Link>
//       )}
//       <div className={styles.comments}>
//         {isLoading
//           ? "loading"
//           : data?.map((item) => (
//               <div className={styles.comment} key={item._id}>
//                 <div className={styles.user}>
//                   {item?.user?.image && (
//                     <Image
//                       src={item.user.image}
//                       alt=""
//                       width={50}
//                       height={50}
//                       className={styles.image}
//                     />
//                   )}
//                   <div className={styles.userInfo}>
//                     <span className={styles.username}>{item.user.name}</span>
//                     <span className={styles.date}>{item.createdAt}</span>
//                   </div>
//                 </div>
//                 <p className={styles.desc}>{item.desc}</p>
//               </div>
//             ))}
//       </div>
//     </div>
//   );
// };

// export default Comments;

// "use client";

// import Link from "next/link";
// import styles from "./comments.scss";
// import Image from "next/image";
// import useSWR from "swr";
// import { useSession } from "next-auth/react";
// import { useState } from "react";
// import { FaRegComment } from "react-icons/fa6";

// const fetcher = async (url) => {
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data);

//   if (!res.ok) {
//     const error = new Error(data.message || "An error occurred");
//     throw error;
//   }

//   return data;
// };

// const Comments = ({ postSlug }) => {
//   const { status } = useSession();

//   const { data, mutate, error, isLoading } = useSWR(
//     `http://localhost:3000/api/comments?postSlug=${postSlug}`,
//     fetcher
//   );

//   const [desc, setDesc] = useState("");
//   const [loadingComment, setLoadingComment] = useState(false);

//   const handleSubmit = async () => {
//     if (desc.trim() === "") return; // Prevent submitting empty comments

//     setLoadingComment(true);

//     try {
//       const res = await fetch("/api/comments", {
//         method: "POST",
//         body: JSON.stringify({ desc, postSlug }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.ok) throw new Error("Failed to post comment");

//       mutate(); // Refresh comments
//       setDesc(""); // Clear text area after submitting
//     } catch (err) {
//       console.error("Error submitting comment:", err);
//     } finally {
//       setLoadingComment(false);
//     }
//   };

//   return (
//     <div className="commentsContainer">
//       <div className="container">
//         <div className="titleWrapper d-flex align-items-center gap-4 pb-3">
//           <h1 className="title mb-0 pb-2">Comments </h1>{" "}
//           <span className="comments m-0">
//             {" "}
//             <FaRegComment className="commentsIcon" />{" "}
//             {Array.isArray(data) && data.length > 0 && data.length} Comments
//           </span>
//         </div>

//         {status === "authenticated" ? (
//           <div className="write">
//             <textarea
//               placeholder="Write a comment..."
//               className="input"
//               value={desc}
//               onChange={(e) => setDesc(e.target.value)}
//             />
//             <button
//               className="button"
//               onClick={handleSubmit}
//               disabled={loadingComment}
//             >
//               {loadingComment ? "Sending..." : "Send"}
//             </button>
//           </div>
//         ) : (
//           <Link href="/login">Login to write a comment</Link>
//         )}

//         <div className="comments">
//           {isLoading ? (
//             "Loading comments..."
//           ) : error ? (
//             <p>Failed to load comments. Please try again later.</p>
//           ) : (
//             Array.isArray(data) &&
//             data.length > 0 &&
//             data.map((item, index) => (
//               <div className="comment" key={index}>
//                 <div className="user ">
//                   {item?.user?.image && (
//                     <Image
//                       src={item.user.image}
//                       alt="User avatar"
//                       width={50}
//                       height={50}
//                       className="image"
//                     />
//                   )}
//                   <div className="userInfo">
//                     <span className="username">{item.user.name}</span>
//                     <span className="date">{item.createdAt.slice(0, 10)}</span>
//                   </div>
//                 </div>
//                 <p className="desc ps-5 ms-4">{item.desc}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Comments;


"use client";

import Link from "next/link";
import styles from "./comments.scss";
import Image from "next/image";
import useSWR from "swr";
import { useState } from "react";
import { FaRegComment } from "react-icons/fa6";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "An error occurred while fetching comments");
  }

  return data;
};

const Comments = ({ postSlug }) => {
  // const { status } = useSession();
  
  const { data, mutate, error, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");
  const [loadingComment, setLoadingComment] = useState(false);

  const handleSubmit = async () => {
    if (desc.trim() === "") return;

    setLoadingComment(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ desc, postSlug }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to post comment");

      mutate(); // Refresh comments
      setDesc(""); // Clear text area
    } catch (err) {
      console.error("Error submitting comment:", err);
    } finally {
      setLoadingComment(false);
    }
  };
  let status = true
  return (
    <div className="commentsContainer">
      <div className="container">
        {/* Header */}
        <div className="titleWrapper d-flex align-items-center gap-4 pb-3">
          <h1 className="title mb-0 pb-2">Comments</h1>
          <span className="comments m-0">
            <FaRegComment className="commentsIcon" />
            {Array.isArray(data) && data.length > 0 ? ` ${data.length} Comments` : " No Comments Yet"}
          </span>
        </div>

        {/* Comment Input */}
        {status === "authenticated" ? (
          <div className="write">
            <textarea
              placeholder="Write a comment..."
              className="input"
              value={desc}
              rows={1}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button
              className="button"
              onClick={handleSubmit}
              disabled={loadingComment}
            >
              {loadingComment ? "Sending..." : "Send"}
            </button>
          </div>
        ) : (
          <Link href="/login">Login to write a comment</Link>
        )}

        {/* Comment List */}
        <div className="comments">
          {isLoading ? (
            <p>Loading comments...</p>
          ) : error ? (
            <p>Failed to load comments. Please try again later.</p>
          ) : Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <div className="comment" key={index}>
                <div className="user">
                  {item?.user?.image && (
                    <Image
                      src={item.user.image}
                      alt="User avatar"
                      width={50}
                      height={50}
                      className="image"
                    />
                  )}
                  <div className="userInfo">
                    <span className="username">{item.user.name}</span>
                    <span className="date">{item.createdAt.slice(0, 10)}</span>
                  </div>
                </div>
                <p className="desc ps-5 ms-4">{item.desc}</p>
              </div>
            ))
          ) : (
            <div className="no-comments">
              <p>No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
