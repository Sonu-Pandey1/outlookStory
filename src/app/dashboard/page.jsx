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

export default function Dashboard() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState("dash");

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [searchParams]);

  
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const tabFromUrl = urlParams.get("tab");
  //   if (tabFromUrl) {
  //     setTab(tabFromUrl);
  //   }
  // }, []);


  return (
    <div className="d-flex flex-column flex-md-row dashboardContainer minH">
      {/* for diifrent sidebar and main dashborad use flex and flex row siderbar col-2 an remaing other dashboard componwnr are ... */}
      <div className="col-md-2 sidebarContainer">
        <DashSidebar />
      </div>

        {/* Dashboard Components */}
      {tab === "dash" && <DashboardComp />}

      {tab === "posts" && <DashPosts />}

      {tab === "comments" && <DashComments />}

      {tab === "allPosts" && <DashAllPosts />}

      {tab === "users" && <DashUsers />}

      {tab === "profile" && <DashProfile />}
      
    </div>
  );
}
