// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { useUser } from "@clerk/nextjs";
// // // import { useRouter } from "next/navigation";
// // // import DashSidebar from "@/components/DashSidebar/DashSidebar";
// // // import dynamic from "next/dynamic";
// // // import { Editor } from "@tinymce/tinymce-react";

// // // export default function CreatePostPage() {
// // //   const { isSignedIn, user, isLoaded } = useUser();
// // //   const router = useRouter();
// // //   const [postTitle, setPostTitle] = useState("");
// // //   const [postContent, setPostContent] = useState("");

// // //   if (!isLoaded) {
// // //     return <div>Loading...</div>;
// // //   }

// // //   // If user is signed in and is a writer, show the create post page
// // //   if (isSignedIn && user.publicMetadata?.role === "writer") {
// // //     const handleSubmit = () => {
// // //       // Simulate post submission
// // //       console.log("Post submitted:", {
// // //         title: postTitle,
// // //         content: postContent,
// // //       });
// // //       // You could send a POST request here to your API for saving the post     &apos for ` sign
// // //     };

// // //     return (
// // //       <div className="container-fluid">
// // //         <div className="row">
// // //           <div className="col-2 p-0 m-0">
// // //             <DashSidebar />
// // //           </div>
// // //           <div className="col p-0 m-0">
// // //             <div className="create-post-page bg-light overflow-y-scroll p-4" 
// // //             style={{ height: "calc(100vh - 60px)" }}
// // //             >
// // //               <h1>Create Your Post</h1>
// // //               <div className="form-group">
// // //                 <label htmlFor="postTitle">Post Title</label>
// // //                 <input
// // //                   type="text"
// // //                   id="postTitle"
// // //                   className="form-control"
// // //                   value={postTitle}
// // //                   onChange={(e) => setPostTitle(e.target.value)}
// // //                   placeholder="Enter post title"
// // //                 />
// // //               </div>

// // //               <div className="form-group mt-4">
// // //                 <label htmlFor="postContent">Post Content</label>
// // //                 <Editor
// // //                   value={postContent}
// // //                   onEditorChange={(content, editor) => setPostContent(content)}
// // //                   apiKey="s63ksh1sisi5j59ltpmm2x60g4v6u3b2zn3rimt6jjgt41gt" // If you're using the TinyMCE cloud service (Optional)
// // //                   init={{
// // //                     height: 400,
// // //                     menubar: false,
// // //                     plugins: [
// // //                       "advlist autolink lists link image charmap print preview anchor",
// // //                       "searchreplace visualblocks code fullscreen",
// // //                       "insertdatetime media table paste code help wordcount",
// // //                     ],
// // //                     toolbar:
// // //                       "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
// // //                   }}
// // //                 />
// // //               </div>

// // //               <button className="btn btn-primary mt-4" onClick={handleSubmit}>
// // //                 Publish Post
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // If user is not a writer, show an access denied message
// // //   return (
// // //     <div className="container-fluid">
// // //       <div className="row">
// // //         <div className="col-12">
// // //           <div className="not-authorized bg-danger text-white p-5">
// // //             <h2>You don`t have access to create posts.</h2>
// // //             <p>
// // //               Only users with the Writer role & admin can create posts. Please contact
// // //               the admin for more information.
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { useUser } from "@clerk/nextjs";
// // // import { useRouter, useSearchParams } from "next/navigation";
// // // import DashSidebar from "@/components/DashSidebar/DashSidebar";
// // // import { Button, TextField, Typography, Paper } from "@mui/material";
// // // import { createEditor, Transforms, Editor, Text } from "slate";
// // // import { Slate, Editable, withReact } from "slate-react";

// // // const CreatePostPage = () => {
// // //   const { isSignedIn, user, isLoaded } = useUser();
// // //   const router = useRouter();
// // //   const searchParams = useSearchParams();
// // //   const editPostId = searchParams.get("edit");

// // //   const [postTitle, setPostTitle] = useState("");
// // //   const [editor] = useState(() => withReact(createEditor()));
// // //   const [postContent, setPostContent] = useState([
// // //     { type: "paragraph", children: [{ text: "rammmm" }] },
// // //   ]);
  

// // //   useEffect(() => {
// // //     const fetchPost = async () => {
// // //       if (!postId) return;
// // //       try {
// // //         const response = await fetch(`/api/posts/${postId}`);
// // //         if (!response.ok) throw new Error("Failed to fetch post");
// // //         const data = await response.json();
// // //         setEditorValue(data.content || defaultValue);
// // //       } catch (error) {
// // //         console.error(error);
// // //       }
// // //     };
    
// // //     // const fetchPost = async () => {
// // //     //   if (!editPostId) return;
  
// // //     //   try {
// // //     //     const response = await fetch(`/api/posts/${editPostId}`);
// // //     //     if (!response.ok) throw new Error("Failed to fetch post");
  
// // //     //     const data = await response.json();
// // //     //     setPostTitle(data.title || "");
// // //     //     setPostContent(data.content || [{ type: "paragraph", children: [{ text: "" }] }]);
// // //     //   } catch (error) {
// // //     //     console.error("Error fetching post details:", error);
// // //     //   }
// // //     // };
  
// // //     // fetchPost();
// // //   }, [editPostId]);
  

// // //   const handleSubmit = async () => {
// // //     const payload = {
// // //       title: postTitle,
// // //       content: postContent,
// // //       userId: user.id,
// // //     };
    
// // //     const method = editPostId ? "PUT" : "POST";
// // //     const url = editPostId ? `/api/posts/${editPostId}` : "/api/posts";

// // //     try {
// // //       const response = await fetch(url, {
// // //         method,
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(payload),
// // //       });

// // //       if (response.ok) {
// // //         router.push("/dashboard/posts");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error submitting post:", error);
// // //     }
// // //   };

// // //   if (!isLoaded) return <div>Loading...</div>;
// // //   if (!isSignedIn || user.publicMetadata?.role !== "writer") {
// // //     return (
// // //       <Typography variant="h5" color="error" align="center">
// // //         You do not have access to create or edit posts.
// // //       </Typography>
// // //     );
// // //   }

// // //   return (
// // //     <div className="flex">
// // //       <DashSidebar />
// // //       <div className="p-6 w-full">
// // //         <Paper elevation={3} className="p-6 max-w-3xl mx-auto">
// // //           <Typography variant="h4" gutterBottom>
// // //             {editPostId ? "Edit Post" : "Create a New Post"}
// // //           </Typography>
// // //           <TextField
// // //             label="Post Title"
// // //             fullWidth
// // //             value={postTitle}
// // //             onChange={(e) => setPostTitle(e.target.value)}
// // //             margin="normal"
// // //           />
// // //           <Typography variant="h6" gutterBottom>
// // //             Content
// // //           </Typography>
// // //           <Slate editor={editor} value={postContent} onChange={setPostContent}>
// // //             <Editable
// // //               className="border p-4 min-h-[200px] rounded-md"
// // //               placeholder="Write your post content here..."
// // //               renderLeaf={({ attributes, children, leaf }) => (
// // //                 <span
// // //                   {...attributes}
// // //                   style={{ fontWeight: leaf.bold ? "bold" : "normal" }}
// // //                 >
// // //                   {children}
// // //                 </span>
// // //               )}
// // //               onKeyDown={(event) => {
// // //                 if (event.ctrlKey && event.key === "b") {
// // //                   event.preventDefault();
// // //                   Transforms.setNodes(
// // //                     editor,
// // //                     { bold: true },
// // //                     { match: (n) => Text.isText(n), split: true }
// // //                   );
// // //                 }
// // //               }}
// // //             />
// // //           </Slate>
// // //           <Button
// // //             variant="contained"
// // //             color="primary"
// // //             fullWidth
// // //             className="mt-4"
// // //             onClick={handleSubmit}
// // //           >
// // //             {editPostId ? "Update Post" : "Publish Post"}
// // //           </Button>
// // //         </Paper>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CreatePostPage;

// // // "use client";

// // // import { useEffect, useState, useRef } from "react";
// // // import { useUser } from "@clerk/nextjs";
// // // import { useRouter, useSearchParams } from "next/navigation";
// // // import DashSidebar from "@/components/DashSidebar/DashSidebar";
// // // import { Button, TextField, Typography, Paper } from "@mui/material";
// // // const CreatePostPage = () => {
// // //   const { isSignedIn, user, isLoaded } = useUser();
// // //   const router = useRouter();
// // //   const searchParams = useSearchParams();
// // //   const editPostId = searchParams.get("edit");

// // //   const [postTitle, setPostTitle] = useState("");
// // //   const contentRef = useRef(null);

// // //   useEffect(() => {
// // //     const fetchPost = async () => {
// // //       if (!editPostId) return;
// // //       try {
// // //         const response = await fetch(`/api/posts/${editPostId}`);
// // //         if (!response.ok) throw new Error("Failed to fetch post");

// // //         const data = await response.json();
// // //         console.log(data);
// // //         setPostTitle(data.title || "");
// // //         if (contentRef.current) {
// // //           contentRef.current.innerHTML = data.content || "";
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching post details:", error);
// // //       }
// // //     };

// // //     fetchPost();
// // //   }, [editPostId]);

// // //   const handleSubmit = async () => {
// // //     const payload = {
// // //       title: postTitle,
// // //       content: contentRef.current?.innerHTML || "",
// // //       userId: user.id,
// // //     };

// // //     const method = editPostId ? "PUT" : "POST";
// // //     const url = editPostId ? `/api/posts/${editPostId}` : "/api/posts";

// // //     try {
// // //       console.log(url)
// // //       const response = await fetch("/api/posts", {
// // //         method : "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(payload),
// // //       });

// // //       if (response.ok) {
// // //         router.push("/dashboard/posts");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error submitting post:", error);
// // //     }
// // //   };

// // //   if (!isLoaded) return <div>Loading...</div>;
// // //   if (!isSignedIn || user.publicMetadata?.role !== "writer") {
// // //     return (
// // //       <Typography variant="h5" color="error" align="center">
// // //         You do not have access to create or edit posts.
// // //       </Typography>
// // //     );
// // //   }

// // //   return (
// // //     <div className="flex">
// // //       <DashSidebar />
// // //       <div className="p-6 w-full">
// // //         <Paper elevation={3} className="p-6 max-w-3xl mx-auto">
// // //           <Typography variant="h4" gutterBottom>
// // //             {editPostId ? "Edit Post" : "Create a New Post"}
// // //           </Typography>
// // //           <TextField
// // //             label="Post Title"
// // //             fullWidth
// // //             value={postTitle}
// // //             onChange={(e) => setPostTitle(e.target.value)}
// // //             margin="normal"
// // //           />
// // //           <Typography variant="h6" gutterBottom>
// // //             Content
// // //           </Typography>
// // //           <div
// // //             ref={contentRef}
// // //             className="border p-4 min-h-[200px] rounded-md"
// // //             contentEditable
// // //             suppressContentEditableWarning
// // //             placeholder="Write your post content here..."
// // //           />
// // //           <Button
// // //             variant="contained"
// // //             color="primary"
// // //             fullWidth
// // //             className="mt-4"
// // //             onClick={handleSubmit}
// // //           >
// // //             {editPostId ? "Update Post" : "Publish Post"}
// // //           </Button>
// // //         </Paper>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CreatePostPage;

// // "use client";

// // import { useEffect, useState, useRef } from "react";
// // import { useUser } from "@clerk/nextjs";
// // import { useRouter, useSearchParams } from "next/navigation";
// // import DashSidebar from "@/components/DashSidebar/DashSidebar";
// // import { Button, TextField, Typography, Paper } from "@mui/material";

// // const CreatePostPage = () => {
// //   const { isSignedIn, user, isLoaded } = useUser();
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const editPostId = searchParams.get("edit");

// //   const [postTitle, setPostTitle] = useState("");
// //   const contentRef = useRef(null);

// //   useEffect(() => {
// //     const fetchPost = async () => {
// //       if (!editPostId) return;
// //       try {
// //         const response = await fetch(`/api/posts/${editPostId}`);
// //         if (!response.ok) throw new Error("Failed to fetch post");

// //         const data = await response.json();
// //         setPostTitle(data.title || "");
// //         if (contentRef.current) {
// //           contentRef.current.innerHTML = data.content || "";
// //         }
// //       } catch (error) {
// //         console.error("Error fetching post details:", error);
// //       }
// //     };

// //     fetchPost();
// //   }, [editPostId]);

// //   // const handleSubmit = async () => {
// //   //   const payload = {
// //   //     title: postTitle,
// //   //     content: contentRef.current?.innerHTML || "",
// //   //     userId: user.id,
// //   //   };

// //   //   const method = editPostId ? "PUT" : "POST";
// //   //   const url = editPostId ? `/api/posts/${editPostId}` : "/api/posts";

// //   //   try {
// //   //     console.log(1)
// //   //     const response = await fetch(url, {
// //   //       method,
// //   //       headers: { "Content-Type": "application/json" },
// //   //       body: JSON.stringify(payload),
// //   //     });
// //   //     console.log(response)

// //   //     if (response.ok) {
// //   //       router.push("/dashboard/posts");
// //   //     } else {
// //   //       console.error("Failed to submit post:", await response.text());
// //   //     }
// //   //   } catch (error) {
// //   //     console.error("Error submitting post:", error);
// //   //   }
// //   // };
// //   const handleSubmit = async () => {
// //     const payload = {
// //       title: postTitle,
// //       desc: "Short description here", // ✅ Add a description
// //       content: contentRef.current?.innerHTML || "",
// //       userId: user?.id,
// //       catSlug: "general", // ✅ Temporary category (Replace with user input)
// //     };
  
// //     console.log("📤 Sending Payload:", payload);
  
// //     if (!payload.title || !payload.content || !payload.userId || !payload.catSlug || !payload.desc) {
// //       console.error("❌ Missing required fields:", payload);
// //       return;
// //     }
  
// //     const method = editPostId ? "PUT" : "POST";
// //     const url = editPostId ? `/api/posts/${editPostId}` : "/api/posts/all";
  
// //     try {
// //       const response = await fetch(url, {
// //         method,
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });
  
// //       console.log("🔄 Server Response:", response);
  
// //       if (response.ok) {
// //         router.push("/dashboard/posts");
// //       } else {
// //         console.error("❌ Failed to submit post:", await response.json());
// //       }
// //     } catch (error) {
// //       console.error("🔥 Error submitting post:", error);
// //     }
// //   };
  
// //   if (!isLoaded) return <div>Loading...</div>;
// //   if (!isSignedIn || user.publicMetadata?.role !== "writer") {
// //     return (
// //       <Typography variant="h5" color="error" align="center">
// //         You do not have access to create or edit posts.
// //       </Typography>
// //     );
// //   }

// //   return (
// //     <div className="flex">
// //       {/* <DashSidebar /> */}
// //       <div className="p-6 w-full">
// //         <Paper elevation={3} className="p-6 max-w-3xl mx-auto">
// //           <Typography variant="h4" gutterBottom>
// //             {editPostId ? "Edit Post" : "Create a New Post"}
// //           </Typography>
// //           <TextField
// //             label="Post Title"
// //             fullWidth
// //             value={postTitle}
// //             onChange={(e) => setPostTitle(e.target.value)}
// //             margin="normal"
// //           />
// //           <Typography variant="h6" gutterBottom>
// //             Content
// //           </Typography>
// //           <div
// //             ref={contentRef}
// //             className="border p-4 min-h-[200px] rounded-md"
// //             contentEditable
// //             suppressContentEditableWarning
// //           />
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             fullWidth
// //             className="mt-4"
// //             onClick={handleSubmit}
// //           >
// //             {editPostId ? "Update Post" : "Publish Post"}
// //           </Button>
// //         </Paper>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreatePostPage;

// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useUser } from "@clerk/nextjs";
// import { useRouter, useSearchParams } from "next/navigation";
// import DashSidebar from "@/components/DashSidebar/DashSidebar";
// import { Button, TextField, Typography, Paper } from "@mui/material";

// const CreatePostPage = () => {
//   const { isSignedIn, user, isLoaded } = useUser();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const editPostId = searchParams.get("edit");

//   const [postTitle, setPostTitle] = useState("");
//   const [postDesc, setPostDesc] = useState("");
//   const [postCatSlug, setPostCatSlug] = useState(""); // Add category slug
//   const contentRef = useRef(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       if (!editPostId) return;
//       try {
//         const response = await fetch(`/api/posts/${editPostId}`);
//         if (!response.ok) throw new Error("Failed to fetch post");

//         const data = await response.json();
//         setPostTitle(data.title || "");
//         setPostDesc(data.desc || "");
//         setPostCatSlug(data.catSlug || "");
//         if (contentRef.current) {
//           contentRef.current.innerHTML = data.content || "";
//         }
//       } catch (error) {
//         console.error("Error fetching post details:", error);
//       }
//     };

//     fetchPost();
//   }, [editPostId]);

//   const handleSubmit = async () => {
//     const payload = {
//       title: postTitle,
//       desc: postDesc,
//       content: contentRef.current?.innerHTML || "",
//       catSlug: postCatSlug, // Ensure category is provided
//       userId: user?.id,
//     };

//     console.log("📤 Sending Payload:", payload);

//     if (!payload.title || !payload.content || !payload.userId || !payload.desc || !payload.catSlug) {
//       console.error("❌ Validation Error: Missing Fields");
//       return;
//     }

//     const method = editPostId ? "PUT" : "POST";
//     const url = editPostId ? `/api/posts/${editPostId}` : "/api/posts";

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       console.log("🔄 Server Response:", response);

//       if (response.ok) {
//         router.push("/dashboard/posts");
//       } else {
//         const errorData = await response.json();
//         console.error("🔥 Error submitting post:", errorData);
//       }
//     } catch (error) {
//       console.error("🔥 Error submitting post:", error);
//     }
//   };

//   if (!isLoaded) return <div>Loading...</div>;
//   if (!isSignedIn || user.publicMetadata?.role !== "writer") {
//     return (
//       <Typography variant="h5" color="error" align="center">
//         You do not have access to create or edit posts.
//       </Typography>
//     );
//   }

//   return (
//     <div className="flex">
//       {/* <DashSidebar /> */}
//       <div className="p-6 w-full">
//         <Paper elevation={3} className="p-6 max-w-3xl mx-auto">
//           <Typography variant="h4" gutterBottom>
//             {editPostId ? "Edit Post" : "Create a New Post"}
//           </Typography>
//           <TextField
//             label="Post Title"
//             fullWidth
//             value={postTitle}
//             onChange={(e) => setPostTitle(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             label="Post Description"
//             fullWidth
//             value={postDesc}
//             onChange={(e) => setPostDesc(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             label="Category Slug"
//             fullWidth
//             value={postCatSlug}
//             onChange={(e) => setPostCatSlug(e.target.value)}
//             margin="normal"
//           />
//           <Typography variant="h6" gutterBottom>
//             Content
//           </Typography>
//           <div
//             ref={contentRef}
//             className="border p-4 min-h-[200px] rounded-md"
//             contentEditable
//             suppressContentEditableWarning
//             placeholder="Write your post content here..."
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             className="mt-4"
//             onClick={handleSubmit}
//           >
//             {editPostId ? "Update Post" : "Publish Post"}
//           </Button>
//         </Paper>
//       </div>
//     </div>
//   );
// };

// export default CreatePostPage;

// app/create-post/page.js

// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useAuth } from '@clerk/nextjs';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function CreatePostPage() {
//   const { userId } = useAuth();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const edit = searchParams.get('edit');

//   const [post, setPost] = useState({ title: '', desc: '', img: '/food.png', catSlug: 'events' });

//   useEffect(() => {
//     if (edit) {
//       fetch(`/api/posts/${edit}`)
//         .then((res) => res.json())
//         .then((data) => setPost(data));
//     }
//   }, [edit]);

//   const handleChange = (e) => {
//     setPost({ ...post, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const method = edit ? 'PUT' : 'POST';
//     await fetch(`/api/posts/all${edit ? `/${edit}` : ''}`, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ ...post, userId }),
//     });
//     router.push('/dashboard');
//   };

//   return (
//     <div className="container mt-5">
//       <h2>{edit ? 'Edit' : 'Create'} Post</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Title</label>
//           <input type="text" className="form-control" name="title" value={post.title} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea className="form-control" name="desc" value={post.desc} onChange={handleChange} required />
//         </div>
//         <button type="submit" className="btn btn-primary">{edit ? 'Update' : 'Create'} Post</button>
//       </form>
//     </div>
//   );
// }


// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useAuth } from '@clerk/nextjs';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// export default function CreatePostPage() {
//   const { userId } = useAuth();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const edit = searchParams.get('edit');

//   const [post, setPost] = useState({
//     title: '',
//     slug: '',
//     desc: '',
//     img: '/food.png',
//     views: 0, // Default views to 0
//     catSlug: 'events',
//   });

//   useEffect(() => {
//     if (edit) {
//       fetch(`/api/posts/${edit}`)
//         .then((res) => res.json())
//         .then((data) => setPost(data));
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
//     const method = edit ? 'PUT' : 'POST';

//     await fetch(`/api/posts/all${edit ? `/${edit}` : ''}`, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         ...post,
//         userId,
//         slug: post.title.toLowerCase().replace(/\s+/g, '-'), // Auto-generate slug
//       }),
//     });

//     router.push('/dashboard');
//   };

//   return (
//     <div className="container mt-5">
//       <h2>{edit ? 'Edit' : 'Create'} Post</h2>
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
//           {post.img && <img src={post.img} alt="Preview" className="img-thumbnail mt-2" style={{ maxWidth: '150px' }} />}
//         </div>

//         <button type="submit" className="btn btn-primary">{edit ? 'Update' : 'Create'} Post</button>
//       </form>
//     </div>
//   );
// }


'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreatePostPage() {
  const { userId } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const edit = searchParams.get('edit');

  const [post, setPost] = useState({
    title: '',
    slug: '',
    desc: '',
    img: '/food.png',
    views: 0, // Default views to 0
    catSlug: 'events',
  });

  useEffect(() => {
    if (edit) {
      fetch(`/api/posts/${edit}`)
        .then((res) => res.json())
        .then((data) => setPost(data));
    }
  }, [edit]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPost({ ...post, img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = edit ? 'PUT' : 'POST';

    await fetch(`/api/posts/all${edit ? `/${edit}` : ''}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...post,
        userId,
        slug: post.title.toLowerCase().replace(/\s+/g, '-'), // Auto-generate slug
      }),
    });

    router.push('/dashboard');
  };

  return (
    <div className="container mt-5">
      <h2>{edit ? 'Edit' : 'Create'} Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" name="title" value={post.title} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Slug (Auto-generated)</label>
          <input type="text" className="form-control" name="slug" value={post.slug} disabled />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="desc" value={post.desc} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input type="text" className="form-control" name="catSlug" value={post.catSlug} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
          {post.img && <img src={post.img} alt="Preview" className="img-thumbnail mt-2" style={{ maxWidth: '150px' }} />}
        </div>

        <button type="submit" className="btn btn-primary">{edit ? 'Update' : 'Create'} Post</button>
      </form>
    </div>
  );
}
