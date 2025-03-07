


"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./EditPost.scss"; // SCSS styles
import { Button, Form, Spinner } from "react-bootstrap";
import { useAuth } from "@clerk/nextjs"

const EditPost = () => {
  const { userId } = useAuth();
  console.log(userId);
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("edit"); // Extract post ID from URL
  const [post, setPost] = useState({ title: "", desc: "", img: "", catSlug: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/posts/${postId}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/posts/${postId ? postId : ""}`, {
        method: postId ? "PUT" : "POST", // Use PUT if editing, POST if creating
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: post.title,
          desc: post.desc,
          img: post.img || null,
          catSlug: post.catSlug,
          userId: userId, // Ensure userId is passed
        }),
      });

      if (!response.ok) throw new Error(postId ? "Failed to update post" : "Failed to create post");

      console.log(postId ? "Post updated successfully" : "Post created successfully");
      router.push("/dashboard?tab=posts");
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-post-container">
      <h2 className="text-center">{postId ? "Edit Post" : "Create Post"}</h2>
      {loading ? (
        <div className="text-center"><Spinner animation="border" variant="primary" /></div>
      ) : (
        <Form onSubmit={handleSubmit} className="edit-post-form">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              placeholder="Description"
              value={post.desc}
              onChange={(e) => setPost({ ...post, desc: e.target.value })}
              rows={4}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Image URL"
              value={post.img}
              onChange={(e) => setPost({ ...post, img: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Category Slug"
              value={post.catSlug}
              onChange={(e) => setPost({ ...post, catSlug: e.target.value })}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Submitting..." : postId ? "Update Post" : "Create Post"}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default EditPost;
