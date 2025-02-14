"use client";

import { useState, useEffect } from "react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiChartPie,
} from "react-icons/hi";
import { SignOutButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const DashSidebar = () => {
  const [tab, setTab] = useState("");
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const tabFromUrl = new URLSearchParams(window.location.search).get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, []);

  if (!isSignedIn) {
    return null;
  }

  return (
    <div
      className="d-flex flex-column bg-dark border-end minH"
      style={{ width: "100% " }}
    >
      <div className="p-3">
        {/* Sidebar Items */}
        <ul className="nav flex-column">
          {user?.publicMetadata?.isAdmin && (
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

          <li className="nav-item">
            <Link
              href="/dashboard?tab=profile"
              className={`nav-link ${tab === "profile" ? "active" : ""}`}
            >
              <HiUser className="me-2" />
              {user?.publicMetadata?.isAdmin ? "Admin" : "User"} Profile
            </Link>
          </li>

          {user?.publicMetadata?.isAdmin && (
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

          {user?.publicMetadata?.isAdmin && (
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

          {/* Sign Out Button */}
          <li className="nav-item mt-auto">
            <div className="nav-link cursor-pointer">
              <HiArrowSmRight className="me-2" />
              <SignOutButton />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashSidebar;
