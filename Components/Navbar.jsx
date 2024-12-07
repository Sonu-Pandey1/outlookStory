

import "./Navbar.scss"
import Input from "../Components/Search";
import { IoHomeOutline } from "react-icons/io5";
import { MdCamera } from "react-icons/md";
import { PiBicycleThin } from "react-icons/pi";
import { MdOutlineAddBusiness } from "react-icons/md";
import { MdOutlineEventAvailable } from "react-icons/md";
import { MdVideoLibrary } from "react-icons/md";
import { MdRocketLaunch } from "react-icons/md";
// import { SiLaunchpad } from "react-icons/si";
import { RiMenuAddLine } from "react-icons/ri";
import Link from "next/link";


function Navbar() {
    return (
        <>
            <nav className="navbar  navbar-expand-md bg-danger-subtle sticky-top">
                <div className="container-fluid px-4 bg-danger">

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
                    <img
                        className="d-md-none"
                        src="https://outlookstory.com/wp-content/uploads/2024/10/logo_OS.png"
                        alt="logo"
                    />


                    <div className="collapse navbar-collapse" id="main_nav">
                        <ul className="navbar-nav">

                            <Link href={"/"} className=" text-decoration-none d-flex align-items-center gap-2 pe-4">
                                <IoHomeOutline />
                                Home
                            </Link>
                            <Link href={"/stories"} className=" text-decoration-none d-flex align-items-center gap-2 pe-4">
                            <MdCamera />
                                Stories
                            </Link>
                            <Link href={"/business"} className=" text-decoration-none d-flex align-items-center gap-2 pe-4">
                            <MdOutlineAddBusiness />
                                Business
                            </Link>
                            <Link href={"/city-connect"} className=" text-decoration-none d-flex align-items-center gap-2 pe-4">
                            <PiBicycleThin />
                                City Connect
                            </Link>
                            <Link href={"/event"} className=" text-decoration-none d-flex align-items-center gap-2 pe-4">
                            <MdOutlineEventAvailable />
                                Events
                                {/* no mgm */}
                            </Link>
                            <Link href={"/videos"} className=" text-decoration-none d-flex align-items-center gap-2 pe-4">
                            <MdVideoLibrary />
                                Videos
                                  {/* no mgm */}
                            </Link>
                            <Link href={"/launch-pad"} className=" text-decoration-none d-flex align-items-center gap-2 pe-4">
                            <MdRocketLaunch />
                                Launch Pad
                                  {/* no mgm */}
                            </Link>
                            <button className=" text-decoration-none d-flex align-items-center gap-2 pe-4">
                                {/* <SiLaunchpad /> */}
                                <RiMenuAddLine />
                                More
                                {/* small dropdown */}
                            </button>
                           
                            
                            <li className="nav-item dropdown has-megamenu">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="https://bhutaniinfra.netlify.app/"
                                    id="megamenuDropdown"
                                    role="button"

                                    aria-expanded="false"
                                >
                                    Mega menu
                                </a>
                                <div className="dropdown-menu megamenu p-3 mx-auto" aria-labelledby="megamenuDropdown">
                                    This is the content of the megamenu. Customize with links, images, etc.
                                    This is the content of the megamenu. Customize with links, images, etc.
                                    This is the content of the megamenu. Customize with links, images, etc.
                                    This is the content of the megamenu. Customize with links, images, etc.
                                    This is the content of the megamenu. Customize with links, images, etc.
                                </div>
                            </li>
                        </ul>
                    </div>


                    <div className="d-none d-md-block">
                        <Input />
                    </div>


                    <div
                        className="offcanvas offcanvas-start d-md-none"
                        tabIndex="-1"
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                    >
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas Menu</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Services</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <form className="d-flex mt-3" role="search">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
