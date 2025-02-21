"use client";
import { useState, useEffect } from "react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiChartPie,
} from "react-icons/hi";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa6";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { SignOutButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import "./DashSidebar.scss";
import { HiMenu, HiX } from "react-icons/hi"; // Add icons for toggling
import { useSearchParams } from "next/navigation";

const DashSidebar = () => {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState(""); // Active tab state
  const [isOpen, setIsOpen] = useState(true); // Sidebar open/close state
  const { user, isSignedIn, isLoading } = useUser(); // Add isLoading to check if user data is still loading
  console.log(tab);

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    console.log(urlParams);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab("");
    }
  }, [searchParams]);
  // Return null or a loading spinner while user data is being fetched
  if (!isSignedIn || isLoading) {
    return <div>Loading...</div>; // Show a loading indicator or nothing
  }

  // Now we know user is signed in and metadata is loaded
  const hasRole = user?.publicMetadata?.role;

  return (
    <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <HiX /> : <HiMenu />} {/* Toggle icon */}
      </div>
      {/* Sidebar Items */}
      <ul className="nav flex-column">
        {hasRole && (
          <li className="nav-item">
            <Link
              href="/dashboard?tab=dash"
              className={`nav-link ${tab === "dash" || !tab ? "active" : ""}`}
            >
              <HiChartPie className="me-2" />
              Dashboard
            </Link>
          </li>
        )}

        {hasRole && (
          <li className="nav-item">
            <Link
              href="/dashboard?tab=posts"
              className={`nav-link ${tab === "posts" ? "active" : ""}`}
            >
              <HiDocumentText className="me-2" />
              Posts
            </Link>
          </li>
        )}

        {hasRole && (
          <li className="nav-item">
            <Link
              href="/dashboard/create-post"
              className={`nav-link ${tab === "create-post" ? "active" : ""}` }
            >
              <MdOutlinePostAdd className="me-2" />
              Add Posts
            </Link>
          </li>
        )}

        {hasRole && (
          <li className="nav-item">
            <Link
              href="/dashboard?tab=comments"
              className={`nav-link ${tab === "comments" ? "active" : ""}`}
            >
              <FaRegCommentDots className="me-2" />
              Comments
            </Link>
          </li>
        )}

        {user?.publicMetadata?.role === "admin" && (
          <li className="nav-item">
            <Link
              href="/dashboard?tab=allPosts"
              className={`nav-link ${tab === "allPosts" ? "active" : ""}`}
            >
              <HiClipboardDocumentList className="me-2" />
              All Posts
            </Link>
          </li>
        )}

        {user?.publicMetadata?.role === "admin" && (
          <li className="nav-item">
            <Link
              href="/dashboard?tab=users"
              className={`nav-link ${tab === "users" ? "active" : ""}`}
            >
              <HiOutlineUserGroup className="me-2" />
              Users
            </Link>
          </li>
        )}

        {hasRole && (
          <li className="nav-item">
            <Link
              href="/dashboard?tab=profile"
              className={`nav-link ${tab === "profile" ? "active" : ""}`}
            >
              <HiUser className="me-2" />
              Profile
            </Link>
          </li>
        )}

        {/* Sign Out Button */}
        <li className="nav-item mt-auto">
          <div className="nav-link cursor-pointer">
            <HiArrowSmRight className="me-2" />
            <SignOutButton className="btn btn-danger btn-sm" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DashSidebar;
