"use client";

import "./Navbar.scss";
import { IoHomeOutline } from "react-icons/io5";
import { MdCamera } from "react-icons/md";
import { PiBicycleThin} from "react-icons/pi";
import { MdOutlineAddBusiness } from "react-icons/md";
import { MdOutlineEventAvailable } from "react-icons/md";
import { MdVideoLibrary } from "react-icons/md";
import { MdRocketLaunch } from "react-icons/md";
import { RiMenu2Line } from "react-icons/ri";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../themeToggle/ThemeToggle";
import MenuCategories from "../menuCategories/MenuCategories";
import { CiFacebook } from "react-icons/ci";
import { SiYoutubekids } from "react-icons/si";
import { FaInstagram, FaTwitter } from "react-icons/fa6";
import { ImConnection } from "react-icons/im";
import { TiContacts } from "react-icons/ti";
import { GiBookAura } from "react-icons/gi";
import { useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import ProfileMenu from "../ProfileMenu";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  console.log(user?.name)
  const userName = user?.name || "Unknown User";
  const userRole = user?.role?.toLowerCase() || "user";
  const userImage = user?.image || "/fallback-image.jpg";



  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("offcanvasNavbar");
      if (sidebar && !sidebar.contains(event.target) && !event.target.closest(".navbar-toggler")) {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebar);
        bsOffcanvas?.hide();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
    <nav
      className={`navbar shadow navbar-expand-md sticky-top ${theme === "dark" ? "dark" : "light"
        }`}
    >
      <div className="container-fluid px-4">
        <button
          className="navbar-toggler d-md-none border-0 shadow-none focus-ring-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span
            className={`fs-3 ${theme === "dark" ? "text-light" : "text-dark"}`}
          >
            <RiMenu2Line />
          </span>
        </button>

        {/* Brand logo */}
        <Link href={"/"} className="cursor-pointer">
          <Image
            src="/logo.png" //"https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/logo_magz.png" //https://outlookstory.com/wp-content/uploads/2025/01/logo_OS.png
            alt="Logo"
            className="d-md-none"
            width={100}
            height={25}
            quality={100}
          />
        </Link>
        {/* desktop nav-items */}
        <div className="collapse navbar-collapse" id="main_nav">
          <ul className="navbar-nav">
            {/* Navbar links with icons */}
            <Link
              href="/"
              className="link text-decoration-none d-flex align-items-center gap-2 pe-4 ps-0"
            >
              <IoHomeOutline />
              Home
            </Link>
            <Link
              href="/category/stories"
              className="link text-decoration-none d-flex align-items-center gap-2 pe-4"
            >
              <MdCamera />
              Stories
            </Link>
            <Link
              href="/category/business"
              className="link text-decoration-none d-flex align-items-center gap-2 pe-4"
            >
              <MdOutlineAddBusiness />
              Business
            </Link>
            <Link
              href="/category/cityConnect"
              className="link text-decoration-none d-flex align-items-center gap-2 pe-4 cc"
            >
              <PiBicycleThin />
              City Connect
            </Link>
            <Link
              href="/category/events"
              className="link text-decoration-none d-flex align-items-center gap-2 pe-4"
            >
              <MdOutlineEventAvailable />
              Events
            </Link>
            <Link
              href="/category/videos"
              className="link text-decoration-none d-flex align-items-center gap-2 pe-4"
            >
              <MdVideoLibrary />
              Videos
            </Link>
            <Link
              href="/category/launchPad"
              className="link text-decoration-none d-flex align-items-center gap-2 pe-4 lp"
            >
              <MdRocketLaunch />
              Launch Pad
            </Link>
          </ul>
        </div>

        {/* Authentication buttons */}
        <div className="loginBTNS d-none d-md-block pt-1">
          {user ? <ProfileMenu /> : (
            <Link href={"/sign-in"} className="text-decoration-none">
              <span className="me-3">
                <FaUserCircle className="fs-2" />
                <span className="ps-2">Login / Register</span>
              </span>
            </Link>
          )}
        </div>

        {/* Theme toggle */}
        <div className="ps-3">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`offcanvas offcanvas-start d-block d-md-none ${theme === "dark"
          ? "bg-dark text-light border-light"
          : "bg-light text-dark border-dark"
          }`}
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        style={{ transition: "transform 0.4s ease-in-out" }}
      >
        {/* Sidebar Hader ------ */}
        <div className="offcanvas-header shadow">
          <div className="offcanvas-title" id="offcanvasNavbarLabel">
            {/* Authentication buttons */}
            <div className="loginBTNS">
              {user ? <ProfileMenu /> : (
                <Link href={"/sign-in"} className="text-decoration-none">
                  <span className="me-3">
                    <FaUserCircle className="fs-2" />
                    <span className="ps-2">Login / Register</span>
                  </span>
                </Link>
              )}
            </div>
          </div>
          <button
            type="button"
            className="btn-close bg-danger"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        {/* Sidebar Body ------ */}
        <div className="offcanvas-body px-3 py-4 ">
          {/* User Profile Section */}
          <div
            className={`profile-card text-center p-3 rounded-4 shadow-sm ${theme === "dark" ? "dark-card" : "light-card"
              }`}
          >
            <Image
              src={userImage}
              alt="User Avatar"
              className="rounded-circle border border-3 border-light mb-3"
              width={100}
              height={100}
            />
            <h5 className="fw-bold">{userName}</h5>
            {/* <p className=" fw-lighter">{userName}</p> */}
            <p className=" fw-lighter">{userRole}</p>
            <div className="d-flex justify-content-center gap-3 py-3">
              {userRole !== "user" && <Link href="/dashboard" className="btn btn-outline-success btn-sm" onClick={() => {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasNavbar"));
                bsOffcanvas?.hide();
              }}>
                Dashboard
              </Link>}
              <Link href="/dashboard?tab=profile" className="btn btn-outline-primary btn-sm" onClick={() => {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasNavbar"));
                bsOffcanvas?.hide();
              }}>
                View Profile
              </Link>

            </div>
          </div>

          {/* Pages Section */}
          <div className="trending-posts mb-4">
            <h6 className="fw-bold text-uppercase">🔥 Pages</h6>
            <ul className="navbar-nav">
              {/* Navbar links with icons */}
              <Link
                href="/"
                className="link text-decoration-none d-flex align-items-center gap-2" onClick={() => {
                  const bsOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasNavbar"));
                  bsOffcanvas?.hide();
                }}
              >
                <IoHomeOutline />
                Home
              </Link>

              <Link href="/category/stories" className="link text-decoration-none d-flex align-items-center gap-2" onClick={() => {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasNavbar"));
                bsOffcanvas?.hide();
              }}>
                <MdCamera />
                Stories
              </Link>

              <Link
                href="/category/business"
                className="link text-decoration-none d-flex align-items-center gap-2" onClick={() => {
                  const bsOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasNavbar"));
                  bsOffcanvas?.hide();
                }}
              >
                <MdOutlineAddBusiness />
                Business
              </Link>
              <Link
                href="/category/cityConnect"
                className="link text-decoration-none d-flex align-items-center gap-2" onClick={() => {
                  const bsOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasNavbar"));
                  bsOffcanvas?.hide();
                }}
              >
                <PiBicycleThin />
                City Connect
              </Link>
              <Link
                href="/category/events"
                className="link text-decoration-none d-flex align-items-center gap-2" onClick={() => {
                  const bsOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasNavbar"));
                  bsOffcanvas?.hide();
                }}
              >
                <MdOutlineEventAvailable />
                Events
              </Link>
              <Link
                href="/category/videos"
                className="link text-decoration-none d-flex align-items-center gap-2" onClick={() => {
                  const bsOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasNavbar"));
                  bsOffcanvas?.hide();
                }}
              >
                <MdVideoLibrary />
                Videos
              </Link>
              <Link
                href="/category/launchPad"
                className="link text-decoration-none d-flex align-items-center gap-2" onClick={() => {
                  const bsOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasNavbar"));
                  bsOffcanvas?.hide();
                }}
              >
                <MdRocketLaunch />
                Launch Pad
              </Link>
              <Link
                href="/about"
                className="link text-decoration-none d-flex align-items-center gap-2" onClick={() => {
                  const bsOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasNavbar"));
                  bsOffcanvas?.hide();
                }}
              >
                <GiBookAura />
                About
              </Link>
              <Link
                href="/contact"
                className="link text-decoration-none d-flex align-items-center gap-2" onClick={() => {
                  const bsOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasNavbar"));
                  bsOffcanvas?.hide();
                }}
              >
                <TiContacts />
                Contact Us
              </Link>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="categories">
            <h6 className="fw-bold text-uppercase">📂 Categories</h6>
            <div className="d-flex flex-wrap gap-2" onClick={() => {
              const bsOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasNavbar"));
              bsOffcanvas?.hide();
            }}>
              <MenuCategories />
            </div>
          </div>

          {/* Social Media Links */}
          <div className="social-links mb-4">
            <h6 className="fw-bold text-uppercase ">🌍 Stay Connected</h6>
            <div className="d-flex gap-5 justify-content-center">
              <div className="social-icons gap-5 py-3">
                <a href="#" aria-label="Facebook"><CiFacebook className="icon facebook" /></a>
                <a href="#" aria-label="YouTube"><SiYoutubekids className="icon youtube" /></a>
                <a href="#" aria-label="Twitter"><FaTwitter className="icon twitter" /></a>
                <a href="#" aria-label="Instagram"><FaInstagram className="icon instagram" /></a>
                <a href="#" aria-label="Connection"><ImConnection className="icon connection" /></a>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div
            className={`newsletter rounded-4 shadow-sm py-2 ${theme === "dark" ? "dark-card" : "light-card"
              }`}
          >
            <h6 className="fw-bold text-uppercase">🔥 Subscribe</h6>
            <p className="small">
              Get the latest posts in your inbox!
            </p>
            <form>
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Enter your email"
              />
              <button className="btn btn-warning w-100 fw-bold">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
