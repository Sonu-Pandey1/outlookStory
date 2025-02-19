"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import DashSidebar from "@/components/DashSidebar/DashSidebar";
import dynamic from "next/dynamic";
import { Editor } from "@tinymce/tinymce-react";

export default function CreatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // If user is signed in and is a writer, show the create post page
  if (isSignedIn && user.publicMetadata?.role === "writer") {
    const handleSubmit = () => {
      // Simulate post submission
      console.log("Post submitted:", {
        title: postTitle,
        content: postContent,
      });
      // You could send a POST request here to your API for saving the post     &apos for ` sign
    };

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 p-0 m-0">
            <DashSidebar />
          </div>
          <div className="col p-0 m-0">
            <div className="create-post-page bg-light p-4">
              <h1>Create Your Post</h1>
              <div className="form-group">
                <label htmlFor="postTitle">Post Title</label>
                <input
                  type="text"
                  id="postTitle"
                  className="form-control"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Enter post title"
                />
              </div>

              <div className="form-group mt-4">
                <label htmlFor="postContent">Post Content</label>
                <Editor
                  value={postContent}
                  onEditorChange={(content, editor) => setPostContent(content)}
                  apiKey="s63ksh1sisi5j59ltpmm2x60g4v6u3b2zn3rimt6jjgt41gt" // If you're using the TinyMCE cloud service (Optional)
                  init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                  }}
                />
              </div>

              <button className="btn btn-primary mt-4" onClick={handleSubmit}>
                Publish Post
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is not a writer, show an access denied message
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="not-authorized bg-danger text-white p-5">
            <h2>You don`t have access to create posts.</h2>
            <p>
              Only users with the Writer role can create posts. Please contact
              the admin for more information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
