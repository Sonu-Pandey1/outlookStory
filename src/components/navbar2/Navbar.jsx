"use client";
import "./Navbar.scss";
import { IoHomeOutline } from "react-icons/io5";
import { MdCamera } from "react-icons/md";
import { PiBicycleThin } from "react-icons/pi";
import { MdOutlineAddBusiness } from "react-icons/md";
import { MdOutlineEventAvailable } from "react-icons/md";
import { MdVideoLibrary } from "react-icons/md";
import { MdRocketLaunch } from "react-icons/md";
// import { FaMoon, FaSun } from "react-icons/fa6";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { dark ,light } from "@clerk/themes"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

function Navbar() {
  const { theme, toggle } = useContext(ThemeContext);
  const { status } = useSession();

  return (
    <nav
      className={`navbar shadow navbar-expand-md sticky-top ${
        theme === "dark" ? "dark" : "light"
      }`}
    >
      <div className="container-fluid px-4">
        <button
          className="navbar-toggler d-md-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Brand logo */}
        <Link href={"/"} className="cursor-pointer">
          <Image
            src="https://outlookstory.com/wp-content/uploads/2025/01/logo_OS.png"
            alt="Logo"
            className="d-md-none"
            width={150}
            height={40}
            quality={100}
          />
        </Link>

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
              className="link text-decoration-none d-flex align-items-center gap-2 pe-4"
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
              className="link text-decoration-none d-flex align-items-center gap-2 pe-4"
            >
              <MdRocketLaunch />
              Launch Pad
            </Link>
          </ul>
        </div>

        {/* Authentication buttons */}
        {/* <div> */}
          <SignedOut>
            {/* <SignInButton /> */}
            <Link href={"/sign-in"}>  
              <button className="btn btn-outline-primary">Login/Signup</button> 
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={ {baseTheme: theme ==="light" ?light:dark}} userProfileUrl="/dashboard?tab=profile" />
          </SignedIn>
        {/* </div> */}
        <div className="d-none d-md-block">
          <Link className="pe-3" href={"/login"}>
            {status === "unauthenticated" ? (
              <button className="btn btn-outline-primary">Login/Signup</button>
            ) : (
              <button
                className="btn btn-outline-danger"
                onClick={() => signOut()}
              >
                LogOut
              </button>
            )}
          </Link>
        </div>

        {/* Theme toggle */}
        <ThemeToggle />
      </div>

      {/* Mobile menu */}
      <div
        className="offcanvas offcanvas-start d-md-none"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <Link className="pe-3" href="/login">
            <button className="btn btn-outline-primary">Login/Signup</button>
          </Link>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {/* Mobile navigation links */}
          <ul className="navbar-nav">
            {/* Additional menu items can go here */}
          </ul>
          <form className="d-flex mt-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
