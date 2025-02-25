import Link from "next/link";
import Image from "next/image";
import "./Footer.scss";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="footer pt-5 pb-3">
      <div className="container-fluid px-4 px-md-5">
        <div className="row gy-4">
          {/* Logo and About Section */}
          <div className="col-md-4">
            <div className="footer-logo mb-3">
              <Image
                src= "/logo.png" 
                alt="Logo"
                width={150}
                height={50}
                className="img-fluid"
              />
            </div>
            <p className="text-muted">
              Building a brighter future with intuitive designs and seamless
              experiences. Join us in shaping tomorrow, today.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-2 text-c">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/about" className="text-muted">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-muted">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
          {/* Categories Section */}
          <div className="col-md-2">
            <h5 className="footer-heading">Categories</h5>
            <ul className="list-unstyled d-flex flex-wrap gap-3">
              <li>
                <Link href="/" className="text-muted">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/category/stories" className="text-muted">
                  Stories
                </Link>
              </li>
              <li>
                <Link href="/category/business" className="text-muted">
                  Business
                </Link>
              </li>
              <li>
                <Link href="/category/cityConnect" className="text-muted">
                  City Connect
                </Link>
              </li>
              <li>
                <Link href="/category/events" className="text-muted">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/category/videos" className="text-muted">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/category/launchPad" className="text-muted">
                  Launch pad
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription Section */}
          <div className="col-md-4">
            <h5 className="footer-heading">Newsletter</h5>
            <p>
              Subscribe to our mailing list to receives daily updates direct to
              your inbox!
            </p>
            <form>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control w-100"
                  placeholder="Your email address"
                  aria-label="Your email"
                  required
                />
                <button className="btn btn-primary btn-sm" type="submit">
                  Subscribe
                </button>
              </div>
            </form>
            <p className="spamP">*we hate spam as much as you do</p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom mt-4 pt-4 border-top d-flex justify-content-between ">
          <p className="text-center text-muted mb-0">
            © {new Date().getFullYear()} outlookstory.com. All Rights Reserved.
          </p>
          <div className="social-links d-flex pt-2 ">
            <Link
              href="https://facebook.com"
              className="me-3 text-muted"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <i className="bi bi-facebook"></i> */}
              <FaFacebook />
            </Link>
            <Link
              href="https://youtube.com"
              className="me-3 text-muted"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </Link>
            <Link
              href="https://twitter.com"
              className="me-3 text-muted"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </Link>
            <Link
              href="https://instagram.com"
              className="me-3 text-muted"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <i className="bi bi-instagram"></i> */}
              <FaInstagram />
            </Link>
            <Link
              href="https://linkedin.com"
              className="text-muted"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <i className="bi bi-linkedin"></i> */}
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
