// "use client";

// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { FaUserCircle } from "react-icons/fa";
// import { MdLogout, MdDashboard, MdSettings } from "react-icons/md";
// import { useContext } from "react";
// import { AuthContext } from "@/context/AuthContext";
// import "./ProfileMenu.scss";

// const ProfileMenu = () => {
//   const { user, logout } = useContext(AuthContext);
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef(null);

//   const handleClickOutside = (event) => {
//     if (menuRef.current && !menuRef.current.contains(event.target)) {
//       setOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="profile-menu-container" ref={menuRef}>
//       <button
//         className="profile-toggle btn btn-light rounded-circle"
//         onClick={() => setOpen(!open)}
//       >
//         {user?.imageUrl ? (
//           <Image
//             src={user.imageUrl}
//             alt="Profile"
//             width={40}
//             height={40}
//             className="rounded-circle"
//           />
//         ) : (
//           <FaUserCircle size={40} />
//         )}
//       </button>
//       {open && (
//         <div className="profile-dropdown shadow-sm bg-white rounded">
//           <div className="profile-info p-3 border-bottom">
//             <Image
//               src={user?.imageUrl || "/fallback-image.jpg"}
//               alt="User Avatar"
//               width={50}
//               height={50}
//               className="rounded-circle border"
//             />
//             <div className="ms-2">
//               <p className="mb-0 fw-bold">{user?.firstName} {user?.lastName}</p>
//               <small className="text-muted">{user?.email}</small>
//             </div>
//           </div>
//           <ul className="list-unstyled m-0 p-2">
//             <li>
//               <Link href="/dashboard" className="dropdown-item d-flex align-items-center">
//                 <MdDashboard className="me-2" /> Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link href="/dashboard?tab=profile" className="dropdown-item d-flex align-items-center">
//                 <MdSettings className="me-2" /> Settings
//               </Link>
//             </li>
//             <li>
//               <button onClick={logout} className="dropdown-item text-danger d-flex align-items-center">
//                 <MdLogout className="me-2" /> Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileMenu;

import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { BsPersonFillGear } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import "./ProfileMenu.scss";
import { useRouter } from "next/navigation";

const ProfileMenu = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  const userImage = user?.imageUrl || "/fallback-image.jpg";
  const userName = user ?.name || "Guest User";
  const userRole = user?.role || "User";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="profile-menu-container" ref={menuRef}>
      <button className="profile-btn" onClick={() => setIsOpen(!isOpen)}>
        <Image src={userImage} alt="Profile" width={45} height={45} className="rounded-circle" />
      </button>

      {isOpen && (
        <div className="profile-dropdown shadow d-none d-md-block">
          <div className="profile-header">
            <Image src={userImage || "/fallback-image.jpg"} alt="Profile" width={55} height={55} className="rounded-circle" />
            <div>
              <h5 className="mb-1">{userName}</h5>
              <p className="fs-6">{userRole}</p>
            </div>
          </div>
          <ul className="profile-menu">
            <li>
              <Link href="/dashboard?tab=profile" className="dropdown-item">
                <FiUser className="icon" /> My Profile
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="dropdown-item">
                <BsPersonFillGear className="icon" /> Dashboard
              </Link>
            </li>
            <li>
              <Link href="/dashboard?tab=settings" className="dropdown-item">
                <FiSettings className="icon" /> Settings
              </Link>
            </li>
            <li>
              <button
                className="dropdown-item logout-btn"
                onClick={() => {
                  logout();
                  router.push("/sign-in");
                }}
              >
                <FiLogOut className="icon" /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
