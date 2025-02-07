"use client";

import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (!isLoaded) return; // ✅ Ensure Clerk is fully loaded before checking

    console.log("🔹 User Loaded:", isLoaded);
    console.log("🔹 User Signed In:", isSignedIn);
    console.log("🔹 User Data:", user);

    if (isSignedIn && user) {
      const userRole = user.publicMetadata?.role;
      setRole(userRole); // ✅ Store role in state

      console.log("🔹 User Role:", userRole);

      if (userRole) {
        router.replace(`/dashboard/${userRole}`); // ✅ Fix incorrect push syntax
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (role) {
    return <p>Redirecting...</p>; // ✅ Show loading text instead of SignIn
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="p-4 shadow-lg bg-white rounded">
        <h2 className="text-center mb-3">Sign in to your account</h2>
        <SignIn />
      </div>
    </div>
  );
};

export default LoginPage;
