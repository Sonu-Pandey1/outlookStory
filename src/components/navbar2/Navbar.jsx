"use client";
import "./Navbar.scss";
import { IoHomeOutline } from "react-icons/io5";
import { MdCamera } from "react-icons/md";
import { PiBicycleThin, PiUserCircleCheckDuotone } from "react-icons/pi";
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
import { dark, light } from "@clerk/themes";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

function Navbar() {
  const { theme, toggle } = useContext(ThemeContext);

  return (
    <nav
      className={`navbar shadow navbar-expand-md sticky-top ${
        theme === "dark" ? "dark" : "light"
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
            src= "/logo.png"   //"https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/logo_magz.png" //https://outlookstory.com/wp-content/uploads/2025/01/logo_OS.png
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
        <div className="loginBTNS d-none d-md-block">
          <SignedOut>
            {/* <SignInButton /> */}
            <Link href={"/sign-in"}>
              <span className="me-3">
                <PiUserCircleCheckDuotone className="fs-2" />
                <span className="ps-2">Login / Register</span>
              </span>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{ baseTheme: theme === "light" ? light : dark }}
              userProfileUrl="/dashboard?tab=profile"
            />
          </SignedIn>
        </div>

        {/* Theme toggle */}
        <div>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`offcanvas offcanvas-end d-block d-md-none ${
          theme === "dark"
            ? "bg-dark text-light border-light"
            : "bg-light text-dark border-dark"
        }`}
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        style={{ transition: "transform .6s ease-in-out" }}
      >
        <div className="offcanvas-header shadow">
          <div className="offcanvas-title" id="offcanvasNavbarLabel">
            <div className="loginBTNS">
              <SignedOut>
                <Link href={"/sign-in"} className="d-flex align-items-center">
                  <PiUserCircleCheckDuotone className="fs-2 me-2" />
                  <span className="fw-semibold">Login / Register</span>
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{ baseTheme: theme === "light" ? light : dark }}
                  userProfileUrl="/dashboard?tab=profile"
                />
              </SignedIn>
            </div>
          </div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body px-3 py-4">
          {/* User Profile Section */}
          <div
            className={`profile-card text-center p-3 rounded-4 shadow-sm ${
              theme === "dark" ? "dark-card" : "light-card"
            }`}
          >
            <Image
              src="https://i.pravatar.cc/100"
              alt="User Avatar"
              className="rounded-circle border border-3 border-light mb-3"
              width={100}
              height={100}
            />
            <h5 className="fw-bold">John Doe</h5>
            <p className="text-muted">@johndoe</p>
            <Link href="/profile" className="btn btn-outline-primary btn-sm">
              View Profile
            </Link>
          </div>

          {/* Trending Posts Section */}
          <div className="trending-posts mb-4">
            <h6 className="fw-bold text-uppercase">🔥 Trending Now</h6>
            <ul className="list-unstyled">
              {[
                {
                  title: "How AI is Changing the World",
                  img: "https://source.unsplash.com/60x60/?ai",
                },
                {
                  title: "Top 10 Business Trends for 2025",
                  img: "https://source.unsplash.com/60x60/?business",
                },
                {
                  title: "Best Travel Destinations in 2025",
                  img: "https://source.unsplash.com/60x60/?travel",
                },
              ].map((post, index) => (
                <li
                  key={index}
                  className={`d-flex align-items-center gap-3 p-2 trending-item rounded-3 ${
                    theme === "dark" ? "dark-item" : "light-item"
                  }`}
                >
                  <Image
                    src={post.img}
                    alt="Post Thumbnail"
                    className="rounded-3"
                    width={60}
                    height={60}
                  />
                  <Link
                    href={`/post/${index + 1}`}
                    className="text-decoration-none fw-semibold"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="categories mb-4">
            <h6 className="fw-bold text-uppercase">📂 Categories</h6>
            <div className="d-flex flex-wrap gap-2">
              {[
                "Technology",
                "Business",
                "Lifestyle",
                "Travel",
                "Health",
                "Food",
              ].map((category, index) => (
                <Link
                  href={`/category/${category.toLowerCase()}`}
                  key={index}
                  className={`category-pill ${
                    theme === "dark" ? "dark-pill" : "light-pill"
                  }`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="social-links mb-4">
            <h6 className="fw-bold text-uppercase">🌍 Stay Connected</h6>
            <div className="d-flex gap-3">
              {[
                { icon: "fab fa-facebook-f", link: "https://facebook.com" },
                { icon: "fab fa-twitter", link: "https://twitter.com" },
                { icon: "fab fa-instagram", link: "https://instagram.com" },
                { icon: "fab fa-linkedin-in", link: "https://linkedin.com" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.link}
                  target="_blank"
                  className="social-icon"
                >
                  <i className={social.icon}></i>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div
            className={`newsletter p-3 rounded-4 shadow-sm ${
              theme === "dark" ? "dark-card" : "light-card"
            }`}
          >
            <h6 className="fw-bold text-uppercase">📩 Subscribe</h6>
            <p className="text-muted small">
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
