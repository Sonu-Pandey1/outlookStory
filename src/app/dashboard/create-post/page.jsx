"use client";

import { useUser } from "@clerk/nextjs";

export default function CreatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn && user.publicMetadata.isAdmin) {
    return <div>You are an admin</div>;
  } else {
    return (
      <div className="create-post-page bg-danger mt- pt-5">
        <h1>You are not authroised to view this page </h1>
      </div>
    );
  }
}
