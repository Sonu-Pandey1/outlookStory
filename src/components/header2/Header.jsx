import { CiFacebook } from "react-icons/ci";
import { SiYoutubekids } from "react-icons/si";
import { FaTwitter, FaInstagram } from "react-icons/fa6";
import { ImConnection } from "react-icons/im";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import "./Header.scss";

function Header() {
  const { theme } = useContext(ThemeContext);

  // Theme-based images
  const logoSrc = theme === "dark"
    ? "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/logo_magz.png"
    : "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/logo_magz.png";

  const adLogoSrc = theme === "dark"
    ? "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/728x90_3.png"
    : "https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/728x90_3.png";

  return (
    <div className={`topHeader ${theme} d-none d-md-block`}>
      <header className="container-fluid">
        
        {/* Top Header Section */}
        <div className="top-header-bar d-flex flex-wrap justify-content-between align-items-center border-bottom px-3 py-2">
          <div className="header-left d-flex flex-wrap align-items-center gap-3">
            <p className="m-0 p-2 border-end">Monday, November 11, 2024</p>
            <nav className="top-navbar d-flex flex-wrap">
              <Link href="#" className="text-decoration-none p-2 top-nav-links">Landing Page</Link>
              <Link href="#" className="text-decoration-none p-2 top-nav-links">Shop</Link>
              <Link href="#" className="text-decoration-none p-2 top-nav-links">Contact</Link>
              <Link href="#" className="text-decoration-none p-2 top-nav-links">Explore</Link>
            </nav>
          </div>
          <div className="header-right">
            <div className="social-icons d-flex gap-3">
              <a href="#" aria-label="Facebook"><CiFacebook className="icon facebook" /></a>
              <a href="#" aria-label="YouTube"><SiYoutubekids className="icon youtube" /></a>
              <a href="#" aria-label="Twitter"><FaTwitter className="icon twitter" /></a>
              <a href="#" aria-label="Instagram"><FaInstagram className="icon instagram" /></a>
              <a href="#" aria-label="Connection"><ImConnection className="icon connection" /></a>
            </div>
          </div>
        </div>

        {/* Logo & Advertisement Section */}
      <div className="imgWrapper container-fluid">
      <div className="header-logo-advertisement d-flex align-items-center p-3 row">
          <div className="logo col ">
            <Link href="/">
              <div className="logo-container">
                <Image src={logoSrc} alt="Logo" fill priority className="responsive-img" />
              </div>
            </Link>
          </div>
          <div className="advertisement-logo col p-0">
            <div className="ad-container ">
              <Image src={adLogoSrc} alt="Advertisement" fill priority className="responsive-img" />
            </div>
          </div>
        </div>
      </div>

        {/* Main Navbar Placeholder */}
        <div className="main-navbar">
          {/* <Navbar /> */}
        </div>
      </header>
    </div>
  );
}

export default Header;
