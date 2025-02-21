"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";

export default function DashAllPosts() {
  const { user, isSignedIn, isLoading } = useUser();
  console.log(user);
  // Return null or a loading spinner while user data is being fetched
  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator or nothing
  }

  if (!isSignedIn) {
    return <div>Please sign in to access the dashboard</div>; // Handle case where user is not signed in
  }

  // Corrected role check
  if (user.publicMetadata.role !== "admin") {
    return <div>You don`t have permission to access this route.</div>; // Handle case where user is not an admin
  }

  return (
    <div
      className="col bg-secondary overflow-y-scroll"
      style={{ height: "calc(100vh - 60px)" }}
    >
      DashAllPosts
    </div>
  );
}
