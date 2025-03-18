

// "use client";

// import { useState, useEffect, useContext } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import "./EditPost.scss";
// import { Button, Form, Spinner, Container, Row, Col } from "react-bootstrap";
// import { ThemeContext } from "@/context/ThemeContext";
// import { AuthContext } from "@/context/AuthContext"; // Replace with your authentication context

// const EditPost = () => {
//   const { user } = useContext(AuthContext); // Assuming you have user info here
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const postId = searchParams.get("edit"); // Extract post ID from URL
//   const [post, setPost] = useState({ title: "", desc: "", img: "", catSlug: "" });
//   const [loading, setLoading] = useState(false);
//   const [role, setRole] = useState(null);
//   const { theme } = useContext(ThemeContext);

//   useEffect(() => {
//     if (user) {
//       setRole(user.role); // Assuming role is stored in the user object
//     }
//   }, [user]);

//   useEffect(() => {
//     if (!postId) return;
//     const fetchPost = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`/api/posts/${postId}`);
//         if (!response.ok) throw new Error("Failed to fetch post");
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/posts/${postId ? postId : ""}`, {
//         method: postId ? "PUT" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: post.title,
//           desc: post.desc,
//           img: post.img || null,
//           catSlug: post.catSlug,
//           userId: user?.id, // Ensure user ID is correctly passed
//         }),
//       });
//       if (!response.ok) throw new Error(postId ? "Failed to update post" : "Failed to create post");
//       router.push("/dashboard?tab=posts");
//     } catch (error) {
//       console.error("Error submitting post:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="createPageContainer d-flex justify-content-center align-items-center min-vh-100">
//       <Row className="w-100">
//         <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
//           <div className={`edit-post-container p-4 rounded shadow ${theme === "dark" ? "dark" : "light"}`}>
//             <h2 className="text-center mb-4">{postId ? "Edit Post" : "Create Post"}</h2>
//             {loading ? (
//               <div className="text-center">
//                 <Spinner animation="border" variant="primary" />
//               </div>
//             ) : (
//               <Form onSubmit={handleSubmit} className="edit-post-form">
//                 <Form.Group className="mb-3">
//                   <Form.Control
//                     type="text"
//                     className={`form-control ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
//                     placeholder="Title"
//                     value={post.title}
//                     onChange={(e) => setPost({ ...post, title: e.target.value })}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Control
//                     as="textarea"
//                     rows={4}
//                     className={`form-control ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
//                     placeholder="Description"
//                     value={post.desc}
//                     onChange={(e) => setPost({ ...post, desc: e.target.value })}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Control
//                     type="text"
//                     className={`form-control ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
//                     placeholder="Image URL"
//                     value={post.img}
//                     onChange={(e) => setPost({ ...post, img: e.target.value })}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Control
//                     type="text"
//                     className={`form-control ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
//                     placeholder="Category Slug"
//                     value={post.catSlug}
//                     onChange={(e) => setPost({ ...post, catSlug: e.target.value })}
//                   />
//                 </Form.Group>
//                 <Button type="submit" variant="primary" className="w-100" disabled={loading}>
//                   {loading ? "Submitting..." : postId ? "Update Post" : "Create Post"}
//                 </Button>
//               </Form>
//             )}
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default EditPost;


"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./EditPost.scss";
import { Button, Form, Spinner, Container, Row, Col, Alert } from "react-bootstrap";
import { ThemeContext } from "@/context/ThemeContext";
import { AuthContext } from "@/context/AuthContext";

const EditPost = () => {
  const { user } = useContext(AuthContext); // Ensure user is available
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("edit"); // Extract post ID from URL

  const [post, setPost] = useState({ title: "", desc: "", img: "", catSlug: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) throw new Error("Failed to fetch post");

        const data = await response.json();
        setPost(data);
      } catch (error) {
        setError("Could not load post. Please try again.");
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to create or edit posts.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/posts/${postId ? postId : ""}`, {
        method: postId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: post.title.trim(),
          desc: post.desc.trim(),
          img: post.img.trim() || null,
          catSlug: post.catSlug.trim(),
          userId: user.id, // Ensure correct user ID is passed
        }),
      });

      if (!response.ok) throw new Error(postId ? "Failed to update post" : "Failed to create post");

      router.push("/dashboard?tab=posts");
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Error submitting post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="edit-post-container d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <div className={`p-4 rounded shadow-lg ${theme === "dark" ? "dark-theme" : "light-theme"}`}>
            <h2 className="text-center mb-4">{postId ? "Edit Post" : "Create Post"}</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <Form onSubmit={handleSubmit} className="edit-post-form">
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    className={`form-control ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
                    placeholder="Enter post title"
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    className={`form-control ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
                    placeholder="Enter post description"
                    value={post.desc}
                    onChange={(e) => setPost({ ...post, desc: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="url"
                    className={`form-control ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
                    placeholder="Enter image URL"
                    value={post.img}
                    onChange={(e) => setPost({ ...post, img: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category Slug</Form.Label>
                  <Form.Control
                    type="text"
                    className={`form-control ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
                    placeholder="Enter category slug"
                    value={post.catSlug}
                    onChange={(e) => setPost({ ...post, catSlug: e.target.value })}
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                  {loading ? "Submitting..." : postId ? "Update Post" : "Create Post"}
                </Button>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditPost;


// ///* all working above last ok next is using cloudnary

// "use client";

// import { useState, useEffect, useContext } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import "./EditPost.scss";
// import { Button, Form, Spinner, Container, Row, Col } from "react-bootstrap";
// import { ThemeContext } from "@/context/ThemeContext";
// import { AuthContext } from "@/context/AuthContext"; // Replace with your authentication context

// const EditPost = () => {
//   const { user } = useContext(AuthContext); // Assuming you have user info here
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const postId = searchParams.get("edit"); // Extract post ID from URL
//   const [post, setPost] = useState({ title: "", desc: "", img: "", catSlug: "" });
//   const [loading, setLoading] = useState(false);
//   const [role, setRole] = useState(null);
//   const { theme } = useContext(ThemeContext);

//   useEffect(() => {
//     if (user) {
//       setRole(user.role); // Assuming role is stored in the user object
//     }
//   }, [user]);

//   useEffect(() => {
//     if (!postId) return;
//     const fetchPost = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`/api/posts/${postId}`);
//         if (!response.ok) throw new Error("Failed to fetch post");
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

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET); // Use env variable

//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();
//       if (data.secure_url) {
//         setPost((prev) => ({ ...prev, img: data.secure_url })); // Save the uploaded image URL
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/posts/${postId ? postId : ""}`, {
//         method: postId ? "PUT" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: post.title,
//           desc: post.desc,
//           img: post.img || null,
//           catSlug: post.catSlug,
//           userId: user?.id, // Ensure user ID is correctly passed
//         }),
//       });
//       if (!response.ok) throw new Error(postId ? "Failed to update post" : "Failed to create post");
//       router.push("/dashboard?tab=posts");
//     } catch (error) {
//       console.error("Error submitting post:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="createPageContainer d-flex justify-content-center align-items-center min-vh-100">
//       <Row className="w-100">
//         <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
//           <div className={`edit-post-container p-4 rounded shadow ${theme === "dark" ? "dark" : "light"}`}>
//             <h2 className="text-center mb-4">{postId ? "Edit Post" : "Create Post"}</h2>
//             {loading ? (
//               <div className="text-center">
//                 <Spinner animation="border" variant="primary" />
//               </div>
//             ) : (
//               <Form onSubmit={handleSubmit} className="edit-post-form">
//                 <Form.Group className="mb-3">
//                   <Form.Control
//                     type="text"
//                     className={`form-control ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
//                     placeholder="Title"
//                     value={post.title}
//                     onChange={(e) => setPost({ ...post, title: e.target.value })}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Control
//                     as="textarea"
//                     rows={4}
//                     className={`form-control ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
//                     placeholder="Description"
//                     value={post.desc}
//                     onChange={(e) => setPost({ ...post, desc: e.target.value })}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Control
//                     type="text"
//                     className={`form-control ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
//                     placeholder="Image URL (or upload below)"
//                     value={post.img}
//                     onChange={(e) => setPost({ ...post, img: e.target.value })}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Upload Image</Form.Label>
//                   <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
//                 </Form.Group>

//                 {post.img && (
//                   <div className="mt-3">
//                     <p>Preview:</p>
//                     <img src={post.img} alt="Preview" style={{ maxWidth: "100%", borderRadius: "8px" }} />
//                   </div>
//                 )}

//                 <Form.Group className="mb-3">
//                   <Form.Control
//                     type="text"
//                     className={`form-control ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
//                     placeholder="Category Slug"
//                     value={post.catSlug}
//                     onChange={(e) => setPost({ ...post, catSlug: e.target.value })}
//                   />
//                 </Form.Group>
//                 <Button type="submit" variant="primary" className="w-100" disabled={loading}>
//                   {loading ? "Submitting..." : postId ? "Update Post" : "Create Post"}
//                 </Button>
//               </Form>
//             )}
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default EditPost;
