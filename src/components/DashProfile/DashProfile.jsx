// "use client";

// import { ThemeContext } from "@/context/ThemeContext";
// import { UserProfile } from "@clerk/nextjs";
// import { dark, light } from "@clerk/themes";
// import { useContext } from "react";

// export default function DashProfile() {
//   const { theme } = useContext(ThemeContext);

//   console.log(theme);
//   return (
//     <div
//       className=" d-flex justify-content-center col overflow-y-scroll "
//       style={{ height: "calc(100vh - 60px)" }}
//     >
//       <UserProfile 
//         appearance={{
//           baseTheme: theme === "dark" ? dark : light,
//         }}
//         routing="hash"
//       />
//     </div>
//   );
// }

"use client";

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { AuthContext } from "@/context/AuthContext"; // ✅ Use your custom auth
import Image from "next/image";

export default function DashProfile() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext); // ✅ Get user from AuthContext

  if (!user) {
    return (
      <div className="text-center mt-5">
        <h2 className="text-danger">Unauthorized</h2>
        <p className="text-muted">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center col overflow-y-scroll"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <div className={`profile-container ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
        <Image
          src={user.image || "/fallback-image.png"} // ✅ Show user image
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-circle mb-3"
        />
        <h3>{user.name || "Unknown User"}</h3>
        <p>Email: {user.email || "Not available"}</p>
        <p>Role: {user.role || "User"}</p>
      </div>
    </div>
  );
}
