
"use client";

import { useEffect, useState } from "react";
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
  TextField,
  Box,
} from "@mui/material";

const DashComments = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    fetchComments();
  }, [isLoaded, isSignedIn]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/comments");
      const data = await response.json();

      if (user?.publicMetadata?.role === "admin") {
        setComments(data);
      } else {
        setComments(data.filter((comment) => comment.userId === user.id));
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      const response = await fetch("/api/comments", {
        method: "DELETE",
        body: JSON.stringify({ commentId: id }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setComments(comments.filter((comment) => comment.id !== id));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentText(comment.desc);
  };

  const handleSaveEdit = async (id, postSlug) => {
    setLoading(true);
    try {
      const response = await fetch("/api/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId: id, desc: editedCommentText, postSlug }),
      });
      if (response.ok) {
        setComments(
          comments.map((comment) =>
            comment.id === id ? { ...comment, desc: editedCommentText, updatedAt: new Date().toISOString() } : comment
          )
        );
        setEditingCommentId(null);
      } else {
        console.error("Failed to update comment.");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
    setLoading(false);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentText("");
  };

  return (
    <Box sx={{ maxWidth: "100%", overflowX: "auto", padding: 2 }}>
      <h2>Latest Comments</h2>
      {loading && <p>Loading...</p>}
      <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Post</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <img
                      src={comment.user?.image || "/default-avatar.png"}
                      alt={comment.user?.name || "Unknown"}
                      width="30"
                      height="30"
                      style={{ borderRadius: "50%", marginRight: "10px" }}
                    />
                    {comment.user?.name || "Unknown"}
                  </Box>
                </TableCell>
                <TableCell>
                  {editingCommentId === comment.id ? (
                    <TextField
                      fullWidth
                      value={editedCommentText}
                      onChange={(e) => setEditedCommentText(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Box sx={{ wordBreak: "break-word" }}>{comment.desc}</Box>
                  )}
                </TableCell>
                <TableCell>{comment.postSlug}</TableCell>
                <TableCell>{new Date(comment.updatedAt || comment.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  {editingCommentId === comment.id ? (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleSaveEdit(comment.id, comment.postSlug)}
                        sx={{ marginRight: 1 }}
                      >
                        Save
                      </Button>
                      <Button variant="contained" color="warning" size="small" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(comment)}
                        sx={{ marginRight: 1 }}
                      >
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(comment.id)}>
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[6, 10, 25, 50, 100]}
        component="div"
        count={comments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
      />
    </Box>
  );
};

export default DashComments;
