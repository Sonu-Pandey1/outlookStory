"use client";

import { usePathname } from "next/navigation";
import Navbar from "../../Components/navbar/Navbar.jsx";
import Hader from "../../Components/hader/Hader.jsx";
import Footer from "../../Components/Footer/Footer";
import HeroWrapper from "../../Components/Hero/HeroWrapper";
import { useEffect } from "react";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";


  useEffect(() => {
    // Smoothly scroll to the top when route changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Adds smooth scrolling
    });
  }, [pathname]); // Runs every time the pathname changes


  return (
    <>
      

      {!isLoginPage && (
        <>
          <Hader />
          <Navbar />
        </>
      )}
      {!isLoginPage && <HeroWrapper />}

      {children}

      {!isLoginPage && <Footer />}
    </>
  );
}
