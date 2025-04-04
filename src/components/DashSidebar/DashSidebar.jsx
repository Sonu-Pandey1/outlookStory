// // "use client";
// // import { useState, useEffect, useContext } from "react";
// // import {
// //   HiUser,
// //   HiArrowSmRight,
// //   HiDocumentText,
// //   HiOutlineUserGroup,
// //   HiChartPie,
// // } from "react-icons/hi";
// // import { MdOutlinePostAdd } from "react-icons/md";
// // import { FaRegCommentDots } from "react-icons/fa6";
// // import { HiClipboardDocumentList } from "react-icons/hi2";
// // import { SignOutButton } from "@clerk/nextjs";
// // import { useUser } from "@clerk/nextjs";
// // import Link from "next/link";
// // import "./DashSidebar.scss";
// // import { HiMenu, HiX } from "react-icons/hi"; // Add icons for toggling
// // import { useSearchParams } from "next/navigation";
// // import { ThemeContext } from "@/context/ThemeContext";

// // const DashSidebar = ({ sidebarOpen, setSidebarOpen }) => {
// //   const searchParams = useSearchParams();
// //   const [tab, setTab] = useState(""); // Active tab state
// //   const [isOpen, setIsOpen] = useState(true); // Sidebar open/close state
// //   const { user, isSignedIn, isLoading } = useUser(); // Add isLoading to check if user data is still loading
// //   console.log(tab);

// //   const { theme } = useContext(ThemeContext);

// //   useEffect(() => {
// //     const urlParams = new URLSearchParams(searchParams);
// //     console.log(urlParams);
// //     const tabFromUrl = urlParams.get("tab");
// //     if (tabFromUrl) {
// //       setTab(tabFromUrl);
// //     } else {
// //       setTab("");
// //     }
// //   }, [searchParams]);
// //   // Return null or a loading spinner while user data is being fetched
// //   if (!isSignedIn || isLoading) {
// //     return <div>Loading...</div>; // Show a loading indicator or nothing
// //   }

// //   // Now we know user is signed in and metadata is loaded
// //   // const hasRole = user?.publicMetadata?.role;
// //   // // const hasUser = user?.publicMetadata?.role == "user"
  
// //   const role = user?.publicMetadata?.role;
// //   const isAdmin = role === "admin";
// //   const isWriter = role === "writer";

// //   return (
// //     <div
// //       className={`sidebar-container ${theme === "dark" ? "bg-dark" : "bg-light"
// //         } position-fixed  `}
// //     >
// //       <div
// //         className="d-flex align-items-center justify-content-end p-2 d-block d-md-none"
// //         onClick={() => setSidebarOpen(!sidebarOpen)}
// //       >
// //         {sidebarOpen ? <HiX className="fs-3 text-danger" /> : <HiMenu />}
// //       </div>

// //       {/* Sidebar Items */}
// //       <ul className="nav flex-column">
// //         {isWriter && isAdmin && (
// //           <li className="nav-item">
// //             <Link
// //               href="/dashboard?tab=dash"
// //               className={`nav-link ${tab === "dash" || !tab ? "active" : ""}`}
// //             >
// //               <HiChartPie className="me-2" />
// //               Dashboard
// //             </Link>
// //           </li>
// //         )}

// //         {isWriter && isAdmin && (
// //           <li className="nav-item">
// //             <Link
// //               href="/dashboard?tab=posts"
// //               className={`nav-link ${tab === "posts" ? "active" : ""}`}
// //             >
// //               <HiDocumentText className="me-2" />
// //               Posts
// //             </Link>
// //           </li>
// //         )}

// //         {isWriter && isAdmin &&(
// //           <li className="nav-item">
// //             <Link
// //               href="/dashboard/create-post"
// //               className={`nav-link ${tab === "create-post" ? "active" : ""}`}
// //             >
// //               <MdOutlinePostAdd className="me-2" />
// //               Add Posts
// //             </Link>
// //           </li>
// //         )}

// //         {role && (
// //           <li className="nav-item">
// //             <Link
// //               href="/dashboard?tab=comments"
// //               className={`nav-link ${tab === "comments" ? "active" : ""}`}
// //             >
// //               <FaRegCommentDots className="me-2" />
// //               Comments
// //             </Link>
// //           </li>
// //         )}

// //         {isAdmin && (
// //           <li className="nav-item">
// //             <Link
// //               href="/dashboard?tab=users"
// //               className={`nav-link ${tab === "users" ? "active" : ""}`}
// //             >
// //               <HiOutlineUserGroup className="me-2" />
// //               Users
// //             </Link>
// //           </li>
// //         )}

// //         {role && (
// //           <li className="nav-item">
// //             <Link
// //               href="/dashboard?tab=profile"
// //               className={`nav-link ${tab === "profile" ? "active" : ""}`}
// //             >
// //               <HiUser className="me-2" />
// //               Profile
// //             </Link>
// //           </li>
// //         )}

// //         {/* Sign Out Button */}
// //         <li className="nav-item mt-auto">
// //           <div className="nav-link cursor-pointer">
// //             <HiArrowSmRight className="me-2" />
// //             <SignOutButton className="btn btn-danger btn-sm" />
// //           </div>
// //         </li>
// //       </ul>
// //     </div>
// //   );
// // };

// // export default DashSidebar;



// "use client";
// import { useState, useEffect, useContext } from "react";
// import {
//   HiUser,
//   HiArrowSmRight,
//   HiDocumentText,
//   HiOutlineUserGroup,
//   HiChartPie,
// } from "react-icons/hi";
// import { MdOutlinePostAdd } from "react-icons/md";
// import { FaRegCommentDots } from "react-icons/fa6";
// import { HiMenu, HiX } from "react-icons/hi";
// import { SignOutButton, useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import "./DashSidebar.scss";
// import { useSearchParams } from "next/navigation";
// import { ThemeContext } from "@/context/ThemeContext";

// const DashSidebar = ({ sidebarOpen, setSidebarOpen }) => {
//   const searchParams = useSearchParams();
//   const [tab, setTab] = useState("");
//   const { theme } = useContext(ThemeContext);
//     const { user, } = useContext(AuthContext);
  
//     const userName = user?.name || "Unknown User";
//     const userRole = user?.role?.toLowerCase() || "user";
//     const userImage = user?.image || "/fallback-image.jpg";

//   useEffect(() => {
//     const tabFromUrl = searchParams.get("tab");
//     setTab(tabFromUrl || "");
//   }, [searchParams]);

//   // for sidebar close remain to appply
//   // useEffect(() => {
//   //   const handleClickOutside = (event) => {
//   //     const sidebar = document.querySelector(".sidebar-container");
//   //     if (sidebar && !sidebar.contains(event.target) && !event.target.closest(".d-md-none")) {
//   //       setSidebarOpen(false);
//   //     }
//   //   };
  
//   //   document.addEventListener("click", handleClickOutside);
//   //   return () => {
//   //     document.removeEventListener("click", handleClickOutside);
//   //   };
//   // }, [setSidebarOpen]);
  

//   if (!isSignedIn || isLoading) {
//     return <div>Loading...</div>;
//   }

//   const role = user?.role;
//   const isAdmin = role === "admin";
//   const isWriter = role === "writer";

//   return (
//     <div className={`sidebar-container ${theme === "dark" ? "bg-dark" : "bg-light"} position-fixed`}>
//       <div
//         className="d-flex align-items-center justify-content-end p-2 d-block d-md-none"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {sidebarOpen ? <HiX className="fs-3 text-danger" /> : <HiMenu />}
//       </div>

//       <ul className="nav flex-column">
//         {(isWriter || isAdmin) && (
//           <li className="nav-item">
//             <Link href="/dashboard?tab=dash" className={`nav-link ${tab === "dash" || !tab ? "active" : ""}`}>
//               <HiChartPie className="me-2" />
//               Dashboard
//             </Link>
//           </li>
//         )}

//         {(isWriter || isAdmin) && (
//           <li className="nav-item">
//             <Link href="/dashboard?tab=posts" className={`nav-link ${tab === "posts" ? "active" : ""}`}>
//               <HiDocumentText className="me-2" />
//               Posts
//             </Link>
//           </li>
//         )}

//         {(isWriter || isAdmin) && (
//           <li className="nav-item">
//             <Link href="/dashboard/create-post" className={`nav-link ${tab === "create-post" ? "active" : ""}`}>
//               <MdOutlinePostAdd className="me-2" />
//               Add Posts
//             </Link>
//           </li>
//         )}

//         {role && (
//           <li className="nav-item">
//             <Link href="/dashboard?tab=comments" className={`nav-link ${tab === "comments" ? "active" : ""}`}>
//               <FaRegCommentDots className="me-2" />
//               Comments
//             </Link>
//           </li>
//         )}

//         {isAdmin && (
//           <li className="nav-item">
//             <Link href="/dashboard?tab=users" className={`nav-link ${tab === "users" ? "active" : ""}`}>
//               <HiOutlineUserGroup className="me-2" />
//               Users
//             </Link>
//           </li>
//         )}

//         {role && (
//           <li className="nav-item">
//             <Link href="/dashboard?tab=profile" className={`nav-link ${tab === "profile" ? "active" : ""}`}>
//               <HiUser className="me-2" />
//               Profile
//             </Link>
//           </li>
//         )}

//         <li className="nav-item mt-auto">
//           <div className="nav-link cursor-pointer">
//             <HiArrowSmRight className="me-2" />
//             <div>
//               <SignOutButton className="btn btn-danger btn-sm" />
//             </div>
//           </div>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default DashSidebar;
"use client";
import { useState, useEffect, useContext } from "react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiChartPie,
  HiMenu,
  HiX,
} from "react-icons/hi";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa6";
import Link from "next/link";
import "./DashSidebar.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { ThemeContext } from "@/context/ThemeContext";
import { AuthContext } from "@/context/AuthContext";

const DashSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState("");
  const { theme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
    const router = useRouter();
  

  const userRole = user?.role?.toLowerCase() || "user";
  const isAdmin = userRole === "admin";
  const isWriter = userRole === "writer";

  useEffect(() => {
    setTab(searchParams.get("tab") || "");
  }, [searchParams]);

  // Close sidebar when clicking outside (for mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarOpen &&
        !event.target.closest(".sidebar-container") &&
        !event.target.closest(".menu-toggle")
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <div
      className={`sidebar-container ${theme === "dark" ? "bg-dark" : "bg-light"} position-fixed`}
    >
      <div
        className="d-flex align-items-center justify-content-end p-2 d-block d-md-none menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <HiX className="fs-3 text-danger" /> : <HiMenu />}
      </div>

      <ul className="nav flex-column">
        {(isWriter || isAdmin) && (
          <li className="nav-item">
            <Link href="/dashboard?tab=dash" className={`nav-link ${tab === "dash" || !tab ? "active" : ""}`}>
              <HiChartPie className="me-2" />
              Dashboard
            </Link>
          </li>
        )}

        {(isWriter || isAdmin) && (
          <li className="nav-item">
            <Link href="/dashboard?tab=posts" className={`nav-link ${tab === "posts" ? "active" : ""}`}>
              <HiDocumentText className="me-2" />
              Posts
            </Link>
          </li>
        )}

        {(isWriter || isAdmin) && (
          <li className="nav-item">
            <Link href="/dashboard/create-post" className={`nav-link ${tab === "create-post" ? "active" : ""}`}>
              <MdOutlinePostAdd className="me-2" />
              Add Posts
            </Link>
          </li>
        )}

        <li className="nav-item">
          <Link href="/dashboard?tab=comments" className={`nav-link ${tab === "comments" ? "active" : ""}`}>
            <FaRegCommentDots className="me-2" />
            Comments
          </Link>
        </li>

        {isAdmin && (
          <li className="nav-item">
            <Link href="/dashboard?tab=users" className={`nav-link ${tab === "users" ? "active" : ""}`}>
              <HiOutlineUserGroup className="me-2" />
              Users
            </Link>
          </li>
        )}

        <li className="nav-item">
          <Link href="/dashboard?tab=profile" className={`nav-link ${tab === "profile" ? "active" : ""}`}>
            <HiUser className="me-2" />
            Profile
          </Link>
        </li>

        <li className="nav-item mt-auto">
          <button className="nav-link btn btn-danger btn-sm w-100 d-flex align-items-center"  onClick={() => {
                  logout();
                  router.push("/sign-in");
                }}>
            <HiArrowSmRight className="me-2" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DashSidebar;
