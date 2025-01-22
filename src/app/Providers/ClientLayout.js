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
import Header from "../../../Components/hader/Hader.jsx";
import Navbar from "../../../Components/navbar/Navbar.jsx";
import Footer from "../../../Components/Footer/Footer.jsx";
import HeroWrapper from "../../../Components/Hero/HeroWrapper.jsx";
import { ThemeContext } from "@/app/Context/themeContext.js";
import { useContext, useEffect, useState } from "react";

export default function ClientLayout({ children }) {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isCategoryRoute = pathname.split("/")[3];

  if (mounted) {
    return (
      <>
        {!isLoginPage && <Header />}
        {!isLoginPage && <Navbar />}

        {!isCategoryRoute && !isLoginPage && <HeroWrapper />}

        <main className={theme}>{children}</main>

        {!isLoginPage && <Footer />}
      </>
    );
  }

  return null;
}
