"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FaRegComment } from "react-icons/fa";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "./comments.scss";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
};

const Comments = ({ postSlug }) => {
  const { user, isSignedIn } = useUser();
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
      });

      if (res.ok) {
        const newComment = await res.json();
        mutate(
          `/api/comments?postSlug=${postSlug}`,
          [...data, newComment],
          false //
        );
        setDesc("");
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
        body: JSON.stringify({
          commentId,
          desc: newDesc,
          postSlug,
        }),
      });

      if (res.ok) {
        const updatedComment = await res.json();
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

  return (
    <div className="commentsContainer">
      <h2 className="title">Comments</h2>

      {isSignedIn ? (
        <div className="write">
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Write a comment..."
            className="input"
          ></textarea>
          <button
            onClick={handlePostComment}
            disabled={loading}
            className="button"
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : "Post Comment"}
          </button>
        </div>
      ) : (
        <Link href="/sign-in">Log in to post a comment</Link>
      )}

      {isLoading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p>Failed to load comments.</p>
      ) : (
        <div className="comments">
          {data && data.length > 0 ? (
            data.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <div className="user">
                    {comment.user ? (
                      <>
                        <img
                          src={comment.user.image || "/default-avatar.png"}
                          alt="User Avatar"
                          className="image"
                        />
                        <div className="userInfo">
                          <span className="username">{comment.user.name}</span>
                          <span className="date">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </>
                    ) : (
                      <span>Anonymous</span>
                    )}
                  </div>
                  {isSignedIn && (
                    <>
                      <button
                        onClick={() => setEditingCommentId(comment.id)}
                        className="button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="button"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>

                {editingCommentId === comment.id ? (
                  <div className="edit-comment">
                    <textarea
                      defaultValue={comment.desc}
                      onChange={(e) => setDesc(e.target.value)}
                      placeholder="Edit your comment..."
                    ></textarea>
                    <button
                      onClick={() => handleEditComment(comment.id, desc)}
                      disabled={loading}
                      className="button"
                    >
                      {loading ? <ClipLoader size={20} color="#fff" /> : "Save"}
                    </button>
                  </div>
                ) : (
                  <p className="desc">{comment.desc}</p>
                )}
              </div>
            ))
          ) : (
            <p className="no-comments">No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
