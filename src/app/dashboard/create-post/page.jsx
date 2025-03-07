

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useAuth } from "@clerk/nextjs";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Image from "next/image";

// export default function CreatePostPage() {
//   const { userId } = useAuth();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const edit = searchParams.get("edit");

//   const [post, setPost] = useState({
//     title: "",
//     slug: "",
//     desc: "",
//     img: "/food.png",
//     catSlug: "events",
//   });

//   useEffect(() => {
//     if (edit) {
//       fetch(`/api/posts/${edit}`)
//         .then((res) => res.json())
//         .then((data) => setPost(data))
//         .catch((err) => console.error("Error fetching post:", err));
//     }
//   }, [edit]);

//   const handleChange = (e) => {
//     setPost({ ...post, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPost({ ...post, img: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const method = edit ? "PUT" : "POST";
//     const url = edit ? `/api/posts/${edit}` : `/api/posts/create`;

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...post,
//           userId,
//           slug: post.slug || post.title.toLowerCase().replace(/\s+/g, "-"),
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         router.push("/dashboard");
//       } else {
//         console.error("Error:", data.message);
//       }
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>{edit ? "Edit" : "Create"} Post</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Title</label>
//           <input type="text" className="form-control" name="title" value={post.title} onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Slug (Auto-generated)</label>
//           <input type="text" className="form-control" name="slug" value={post.slug} disabled />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea className="form-control" name="desc" value={post.desc} onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Category</label>
//           <input type="text" className="form-control" name="catSlug" value={post.catSlug} onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Image</label>
//           <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
//           {post.img && <img src={post.img} alt="Preview" className="img-thumbnail mt-2" style={{ maxWidth: "150px" }} />}
//         </div>

//         <button type="submit" className="btn btn-primary">{edit ? "Update" : "Create"} Post</button>
//       </form>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// const EditPost = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const postId = searchParams.get("edit"); // Extract post ID from URL
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!postId) return;

//     const fetchPost = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`/api/posts/${postId}`);
//         const data = await response.json();
//         setPost(data);
//       } catch (error) {
//         console.error("Error fetching post:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [postId]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(`/api/posts/${postId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: post.title,
//           desc: post.desc,
//           img: post.img,
//           catSlug: post.catSlug,
//         }),
//       });

//       if (!response.ok) throw new Error("Failed to update post");

//       console.log("Post updated successfully");
//       router.push("/dashboard?tab=posts");
//     } catch (error) {
//       console.error("Error updating post:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Edit Post</h2>
//       {loading ? <p>Loading...</p> : (
//         <form onSubmit={handleUpdate}>
//           <input type="text" value={post?.title || ""} onChange={(e) => setPost({ ...post, title: e.target.value })} />
//           <textarea value={post?.desc || ""} onChange={(e) => setPost({ ...post, desc: e.target.value })} />
//           <input type="text" value={post?.img || ""} onChange={(e) => setPost({ ...post, img: e.target.value })} />
//           <input type="text" value={post?.catSlug || ""} onChange={(e) => setPost({ ...post, catSlug: e.target.value })} />
//           <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Post"}</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default EditPost;



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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const response = await fetch(`/api/posts/${postId || ""}`, {
  //       method: postId ? "PUT" : "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(post),
  //     });

  //     if (!response.ok) throw new Error(postId ? "Failed to update post" : "Failed to create post");

  //     console.log(postId ? "Post updated successfully" : "Post created successfully");
  //     router.push("/dashboard?tab=posts");
  //   } catch (error) {
  //     console.error("Error submitting post:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  
  //   try {
  //     const response = await fetch(`/api/posts`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         title: post.title,
  //         desc: post.desc,
  //         img: post.img || null,  // Allow null images
  //         catSlug: post.catSlug,
  //         userId: ,  // Replace with actual logged-in user ID
  //       }),
  //     });
  
  //     if (!response.ok) throw new Error("Failed to create post");
  
  //     console.log("Post created successfully");
  //     router.push("/dashboard?tab=posts");
  //   } catch (error) {
  //     console.error("Error submitting post:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
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
