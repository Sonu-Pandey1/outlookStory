// app/layout.js
"use client"
import { usePathname } from "next/navigation";
import Header from "../hader/Hader.jsx"; // Assuming you have a Header component
import Navbar from "../navbar/Navbar.jsx"; // Assuming you have a Navbar component
import Footer from "../Footer/Footer.jsx"; // Assuming you have a Footer component
import HeroWrapper from "../Hero/HeroWrapper"; // Assuming you have a HeroWrapper component
import "../../src/app/globals.scss"; // Import your global styles

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Conditionally render heroWrapper based on the route
  const isLoginPage = pathname === "/login";
  const isCategoryRoute = pathname.split("/")[3];
  // console.log(isCategoryRoute)

  return (
    <html lang="en">
      <body>
        {/* Render Header and Navbar except on login page */}
        {!isLoginPage && <Header />}
        {!isLoginPage && <Navbar />}

        {/* Conditionally render HeroWrapper (don't render it on the single blog page) */}
        {!isCategoryRoute && !isLoginPage && <HeroWrapper />}

        <main>{children}</main>

        {/* Render Footer except on login page */}
        {!isLoginPage && <Footer />}
      </body>
    </html>
  );
}
