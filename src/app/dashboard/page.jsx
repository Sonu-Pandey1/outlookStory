"use client";

import { useEffect, useState } from "react";
import DashSidebar from "../../components/DashSidebar/DashSidebar";
import DashProfile from "../../components/DashProfile/DashProfile";
import { useSearchParams } from "next/navigation";
import DashPosts from "../../components/DashPosts/DashPosts";
import DashUsers from "../../components/DashUsers/DashUsers";
import DashboardComp from "../../components/DashboardComp/DashboardComp";
import "./Dashboard.scss";
import DashComments from "@/components/DashComments/DashComments";
import DashAllPosts from "@/components/DashAllPosts/DashAllPosts";
import { useUser } from "@clerk/nextjs";
import NotFoundPage from "../not-found.js";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState("dash");
  const { user, isSignedIn, isLoading } = useUser(); // Add isLoading to check if user data is still loading

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [searchParams]);

  // Return null or a loading spinner while user data is being fetched
  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator or nothing
  }

  if (!isSignedIn) {
    return <div>Please sign in to access the dashboard</div>; // Handle case where user is not signed in
  }

 

  // Check if the route doesn't exist or if the tab is invalid
  if (
    !["dash", "posts", "comments", "allPosts", "addPost", "users", "profile"].includes(tab)
  ) {
    return <NotFoundPage />;
  }

   // If the user is not an admin and tries to access admin-only routes, return 404
   if (
    user?.publicMetadata?.role !== "admin" &&
    (tab === "allPosts" || tab === "users")
  ) {
    return <NotFoundPage />;
  }

  // Now we know user is signed in and metadata is loaded
  const hasRole = user?.publicMetadata?.role;

  return (
    <div className="d-flex flex-column flex-md-row dashboardContainer minH">
      {/* Sidebar */}
      <div className="col-md-2 sidebarContainer">
        <DashSidebar />
      </div>

      {/* Dashboard Components */}
      {hasRole && tab === "dash" && <DashboardComp />}
      {hasRole && tab === "posts" && <DashPosts />}
      {hasRole && tab === "comments" && <DashComments />}

      {user?.publicMetadata?.role === "admin" && tab === "allPosts" && (
        <DashAllPosts />
      )}
      {user?.publicMetadata?.role === "admin" && tab === "users" && (
        <DashUsers />
      )}
      {hasRole && tab === "profile" && <DashProfile />}
    </div>
  );
}
