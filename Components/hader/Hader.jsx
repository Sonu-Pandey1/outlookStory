import { CiFacebook } from "react-icons/ci";
import { SiYoutubekids } from "react-icons/si";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { ImConnection } from "react-icons/im";
import "./Hader.scss"

function Hader() {
  return (
   <div className="top-Hader">
     <header>
                <div className="topHadder  d-flex justify-content-between align-items-center border-bottom px-3">
                    <div className="haderLeft d-flex align-items-center justify-content-between gap-4">
                        <div>
                            <p className="m-0 p-2 pe-3 border-end">Monday, November 11, 2024</p>
                        </div>
                        <div>
                            <nav className="topNavbar ">
                                <a href="#" className="text-decoration-none   p-2 topNavLinks">Landing Page</a>
                                <a href="#" className="text-decoration-none   p-2 topNavLinks">Shop</a>
                                <a href="#" className="text-decoration-none  p-2 topNavLinks">Contact</a>
                                <a href="#" className="text-decoration-none   p-2 topNavLinks">Explore</a>
                            </nav>
                        </div>

                    </div>
                    <div className="haderRight">
                        <div className="socicalIcons d-flex">
                            <CiFacebook className="icon facebook" />
                            <SiYoutubekids className="icon" />
                            <FaTwitter className="icon twitter" />
                            <FaInstagram className="icon" />
                            <ImConnection className="icon" />

                        </div>
                    </div>


                </div>

                <div className="hadder d-flex justify-content-between p-4 align-items-center">
                    <div className="Logo">
                        <img src="https://jnews.io/default/wp-content/uploads/sites/3/2017/01/logo1.png" alt="Logo" />
                    </div>
                    <div className="aLogo">
                        <img src="https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/728x90_3.png" alt="advertisment-Logo" />
                    </div>


                </div>


                <div className="MainNavbar ">
                {/* <Navbar/> */}

                </div>



            </header>
   </div>
  )
}

export default Hader
