// src/app/ClientLayout.js (Client component)

"use client"; // This is necessary to mark this component as a client component

import { usePathname } from "next/navigation";
import Navbar from "../../Components/navbar/Navbar.jsx";
import Hader from "../../Components/hader/Hader.jsx";
import Footer from "../../Components/Footer/Footer";
import HeroWrapper from "../../Components/Hero/HeroWrapper"; // Import HeroWrapper

export default function ClientLayout({ children }) {
  const pathname = usePathname(); // Get the current path

  // Check if the current path is the login page
  const isLoginPage = pathname === "/login";

  return (
    <>
      {/* Conditionally render HeroWrapper, Navbar, Hader, and Footer based on the path */}
      {!isLoginPage && <HeroWrapper />} {/* Show HeroWrapper only on non-login pages */}
      
      {!isLoginPage && (
        <>
          <Hader />
          <Navbar />
        </>
      )}
      
      {children}
      
      {!isLoginPage && <Footer />}
    </>
  );
}
