"use client";

import { useEffect, useState } from "react";
import DashSidebar from "../../components/DashSidebar/DashSidebar";
import DashProfile from "../../components/DashProfile/DashProfile";
import { useSearchParams } from "next/navigation";
import DashPosts from "../../components/DashPosts/DashPosts";
import DashUsers from "../../components/DashUsers/DashUsers";
import DashboardComp from "../../components/DashboardComp/DashboardComp";
export default function Dashboard() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [searchParams]);
  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      <div className="col-md-3">
        {/* Sidebar */}
        <DashSidebar />
      </div>

      {/* profile... */}
      {tab === "profile" && <DashProfile />}

      {tab === "posts" && <DashPosts />}

      {tab === "users" && <DashUsers />}

      {tab === "dash" && <DashboardComp />}
    </div>
  );
}
