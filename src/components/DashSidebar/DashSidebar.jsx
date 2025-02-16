// "use client";

// import { useState, useEffect } from "react";
// import {
//   HiUser,
//   HiArrowSmRight,
//   HiDocumentText,
//   HiOutlineUserGroup,
//   HiChartPie,
// } from "react-icons/hi";
// import { MdOutlinePostAdd } from "react-icons/md";
// import { FaRegCommentDots } from "react-icons/fa6";
// import { HiClipboardDocumentList } from "react-icons/hi2";
// import { SignOutButton } from "@clerk/nextjs";
// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";

// const DashSidebar = () => {
//   const [tab, setTab] = useState("");
//   const { user, isSignedIn } = useUser();
//   console.log(user);
//   // console.log(user.publicMetadata.role);
//   //user?.publicMetadata?.isAdmin

//   useEffect(() => {
//     const tabFromUrl = new URLSearchParams(window.location.search).get("tab");
//     if (tabFromUrl) {
//       setTab(tabFromUrl);
//     }
//   }, []);

//   if (!isSignedIn) {
//     return null;
//   }

//   return (
//     <div
//       className="d-flex flex-column bg-dark border-end minH"
//       style={{ width: "100% " }}
//     >
//       <div className="p-3">
//         {/* Sidebar Items */}
//         <ul className="nav flex-column">
//           {user?.publicMetadata?.role && (
//           <li className="nav-item">
//             <Link
//               href="/dashboard?tab=dash"
//               className={`nav-link ${tab === "dash" || !tab ? "active" : ""}`}
//             >
//               <HiChartPie className="me-2" />
//               Dashboard
//             </Link>
//           </li>
//           )}

//           {user?.publicMetadata?.role && (
//           <li className="nav-item">
//             <Link
//               href="/dashboard?tab=posts"
//               className={`nav-link ${tab === "posts" ? "active" : ""}`}
//             >
//               <HiDocumentText className="me-2" />
//               Posts
//             </Link>
//           </li>
//           )}

//           {user?.publicMetadata?.role && (
//           <li className="nav-item">
//             <Link
//               href="/dashboard?tab=addPost"
//               className={`nav-link ${tab === "addPosts" ? "active" : ""}`}
//             >
//               <MdOutlinePostAdd className="me-2" />
//               Add Posts
//             </Link>
//           </li>
//           )}

//           {user?.publicMetadata?.role && (
//           <li className="nav-item">
//             <Link
//               href="/dashboard?tab=comments"
//               className={`nav-link ${tab === "comments" ? "active" : ""}`}
//             >
//               <FaRegCommentDots className="me-2" />
//               Comments
//             </Link>
//           </li>
//           )}

//           {user?.publicMetadata?.role == "admin" && (
//           <li className="nav-item">
//             <Link
//               href="/dashboard?tab=allPosts"
//               className={`nav-link ${tab === "allPosts" ? "active" : ""}`}
//             >
//               <HiClipboardDocumentList className="me-2" />
//               All Posts
//             </Link>
//           </li>
//           )}

//           {user?.publicMetadata?.role == "admin" &&  (
//           <li className="nav-item">
//             <Link
//               href="/dashboard?tab=users"
//               className={`nav-link ${tab === "users" ? "active" : ""}`}
//             >
//               <HiOutlineUserGroup className="me-2" />
//               Users
//             </Link>
//           </li>
//           )}

//           {user?.publicMetadata?.role &&  (
//           <li className="nav-item">
//             <Link
//               href="/dashboard?tab=profile"
//               className={`nav-link ${tab === "profile" ? "active" : ""}`}
//             >
//               <HiUser className="me-2" />
//               Profile
//             </Link>
//           </li>
//           )}

//           {/* Sign Out Button */}
//           <li className="nav-item mt-auto">
//             <div className="nav-link cursor-pointer">
//               <HiArrowSmRight className="me-2" />
//               <SignOutButton className="btn btn-danger btn-sm" />
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default DashSidebar;

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

const DashSidebar = () => {
  const [tab, setTab] = useState("");
  const { user, isSignedIn, isLoading } = useUser(); // Add isLoading to check if user data is still loading
  // console.log(user);
  // console.log(user.publicMetadata.role);

  useEffect(() => {
    const tabFromUrl = new URLSearchParams(window.location.search).get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, []);

  // Return null or a loading spinner while user data is being fetched
  if (!isSignedIn || isLoading) {
    return <div>Loading...</div>; // Show a loading indicator or nothing
  }

  // Now we know user is signed in and metadata is loaded
  const hasRole = user?.publicMetadata?.role;

  return (
    <div
      className="d-flex flex-column bg-dark border-end minH"
      style={{ width: "100%" }}
    >
      <div className="p-3">
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
                className={`nav-link ${tab === "addPosts" ? "active" : ""}`}
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
    </div>
  );
};

export default DashSidebar;
