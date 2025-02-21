// "use client"
// import { usePathname } from "next/navigation";
// import Header from "../hader/Hader.jsx"; // Assuming you have a Header component
// import Navbar from "../navbar/Navbar.jsx"; // Assuming you have a Navbar component
// import Footer from "../Footer/Footer.jsx"; // Assuming you have a Footer component
// import HeroWrapper from "../Hero/HeroWrapper"; // Assuming you have a HeroWrapper component
// import "../../src/app/globals.scss"; // Import your global styles
// import { ThemeContext } from "@/Context/themeContext.js";
// import { useContext, useEffect, useState } from "react";

// export default function RootLayout({ children }) {
//   const {theme} = useContext(ThemeContext);
//   const [mounted,setMounted] = useState(false)
//   console.log(theme)

//   useEffect(()=>{
//     setMounted(true)
//   },[]);

//   const pathname = usePathname();

//   // Conditionally render heroWrapper based on the route
//   const isLoginPage = pathname === "/login";
//   const isCategoryRoute = pathname.split("/")[3];
//   // console.log(isCategoryRoute)

//   if(mounted){
//     return (
//       <html lang="en">
//         <body>
//           {/* Render Header and Navbar except on login page */}
//           {!isLoginPage && <Header />}
//           {!isLoginPage && <Navbar />}

//           {/* Conditionally render HeroWrapper (don't render it on the single blog page) */}
//           {!isCategoryRoute && !isLoginPage && <HeroWrapper />}

//           <main className={theme}>{children}</main>

//           {/* Render Footer except on login page */}
//           {!isLoginPage && <Footer />}
//         </body>
//       </html>
//     );
//   }
//   }


"use client";
import { usePathname } from "next/navigation";
import Header from "../components/header2/Header.jsx";
import Navbar from "../components/navbar2/Navbar.jsx";
import Footer from "../components/Footer2/Footer.jsx";
import HeroWrapper from "../components/Hero2/HeroWrapper.jsx";
import { ThemeContext } from "../context/ThemeContext";
import React, { useContext, useEffect, useState } from "react";

export default function ClientLayout({ children }) {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pathname = usePathname();
  const isLoginPage = pathname === "/sign-in";
  const isCategoryRoute = pathname.split("/")[3];
  const isDashboardPage = pathname === "/dashboard"; 
  const isCreatePostPage = pathname === "/dashboard/create-post"; 

  if (mounted) {
    return (
      <>
        {!isLoginPage && !isDashboardPage && !isCreatePostPage && <Header />}
        <Navbar />

        {!isCategoryRoute && !isLoginPage && !isDashboardPage && !isCreatePostPage && <HeroWrapper theme={theme} />}
        <main className={theme} style={{ transition: "all 0.3s ease" }}>
          {children}
        </main>

        {!isLoginPage && !isDashboardPage && !isCreatePostPage && <Footer />}
      </>
    );
  }

  return null;
}
