import { CiFacebook } from "react-icons/ci";
import { SiYoutubekids } from "react-icons/si";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { ImConnection } from "react-icons/im";
import Link from "next/link";  // Use Link for Next.js routing
import Image from "next/image";  // Use Image for optimized image loading
import "./Header.scss";  // Ensure the correct spelling and import path
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

function Header() {
  const { theme} = useContext(ThemeContext);

   // Set logo image based on theme
   const logoSrc = theme === "dark" 
   ? "https://outlookstory.com/wp-content/uploads/2025/01/logo_OS.png" 
   : "https://outlookstory.com/wp-content/uploads/2025/01/logo_OS.png";

 // Set advertisement image based on theme
 const adLogoSrc = theme === "dark" 
   ? "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/728x90_3.png"
   : "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/728x90_3.png";

  return (
    <div className={`topHeader ${theme === "dark" ? "dark" : "light"}`}>
      <header>
        {/* Top Header with Date and Links */}
        <div className="top-header-bar d-flex justify-content-between align-items-center border-bottom px-3">
          <div className="header-left d-flex align-items-center gap-4">
            <div>
              <p className="m-0 p-2 pe-3 border-end">Monday, November 11, 2024</p>
            </div>
            <div>
              <nav className="top-navbar">
                <Link href="#" className="text-decoration-none p-2 top-nav-links" passHref >
                  Landing Page
                </Link>
                <Link href="#" className="text-decoration-none p-2 top-nav-links" passHref>
                  Shop
                </Link>
                <Link href="#" className="text-decoration-none p-2 top-nav-links" passHref>
                  Contact
                </Link>
                <Link href="#" className="text-decoration-none p-2 top-nav-links" passHref>
                  Explore
                </Link>
              </nav>
            </div>
          </div>
          <div className="header-right">
            <div className="social-icons d-flex">
              <CiFacebook className="icon facebook" />
              <SiYoutubekids className="icon youtube" />
              <FaTwitter className="icon twitter" />
              <FaInstagram className="icon instagram" />
              <ImConnection className="icon connection" />
            </div>
          </div>
        </div>

        {/* Logo and Advertisement Section */}
        <div className="header-logo-advertisement d-flex justify-content-between p-4 align-items-center">
          <div className="logo">
           <Link href={"/"}>
           <Image 
              src={logoSrc} 
              alt="Logo" 
              width={150} 
              height={40} 
              quality={100} 
            />
           </Link>
          </div>
          <div className="advertisement-logo">
            <Image 
              src={adLogoSrc}
              alt="Advertisement Logo" 
              width={728} 
              height={90} 
              quality={100} 
            />
          </div>
        </div>

        {/* Main Navbar (Can import your actual Navbar component here) */}
        <div className="main-navbar">
          {/* <Navbar /> */}
        </div>
      </header>
    </div>
  );
}

export default Header;
