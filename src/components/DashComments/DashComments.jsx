"use client";

import { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Image from "next/image";

export default function DashComments() {
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comments/get", {
          method: "GET", // assuming GET method for fetching comments
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    fetchComments();
  }, []);

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch("/api/comments/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId: commentIdToDelete }),
      });
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
        setCommentIdToDelete(""); // Reset commentIdToDelete after deletion
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Error deleting comment:", error.message);
    }
  };

  return (
    <div
      className="col bg-body-secondary overflow-y-scroll"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <h2>Comment&#39;s</h2>

      {comments.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Commenter</th>
              <th>Comment</th>
              <th>Post</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment._id}>
                <td>{comment.user?.name || "Anonymous"}</td>
                <td>{comment.text}</td>
                <td>{comment.postTitle}</td>
                <td>{new Date(comment.createdAt).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setShowModal(true);
                      setCommentIdToDelete(comment._id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No comments available!</p>
      )}

      {/* Modal Confirmation for Delete */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h3 text-warning mb-3" />
            <h4>Are you sure you want to delete this comment?</h4>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button variant="danger" onClick={handleDeleteComment}>
                Yes, I&#39;m sure
              </Button>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
