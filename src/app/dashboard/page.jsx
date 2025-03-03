

"use client";

import { useContext, useEffect, useState } from "react";
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
import { HiMenu, HiX } from "react-icons/hi";
import { ThemeContext } from "@/context/ThemeContext";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState("dash");
  const { user, isSignedIn, isLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [searchParams]);

  if (isLoading) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please sign in to access the dashboard</div>;
  if (!["dash", "posts", "comments", "allPosts", "addPost", "users", "profile"].includes(tab)) {
    return <NotFoundPage />;
  }
  if (user?.publicMetadata?.role !== "admin" && (tab === "allPosts" || tab === "users")) {
    return <NotFoundPage />;
  }

  const hasRole = user?.publicMetadata?.role;

  return (
    <div className="container-fluid  p-0">
      <div className="row g-0">

        {/* Sidebar - Collapses on small screens */}
        <div className={`col-12 col-md-3 col-lg-2 ${sidebarOpen ? "d-block" : "d-none d-md-block"}`}>
          <DashSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-9 col-lg-10">

          <div className={`d-md-none ps-4 pt-0 fs-3 ms-2 ${theme == "dark" ? "text-white" : "text-dark"} `} onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <HiX /> : <HiMenu />} {/* Toggle icon */}
          </div>

          {hasRole && tab === "dash" && <DashboardComp />}
          {hasRole && tab === "posts" && <DashPosts />}
          {hasRole && tab === "comments" && <DashComments />}
          {user?.publicMetadata?.role === "admin" && tab === "allPosts" && <DashAllPosts />}
          {user?.publicMetadata?.role === "admin" && tab === "users" && <DashUsers />}
          {hasRole && tab === "profile" && <DashProfile />}
        </div>
      </div>
    </div>
  );
}
