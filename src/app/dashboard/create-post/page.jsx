import { useUser } from "@clerk/nextjs";
import React from "react";

export default function CreatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn && user.publicMetadata.isAdmin) {
    return <div>you are a admin</div>;
  }
  else{
    <h1>you are a writer</h1>
  }
}
