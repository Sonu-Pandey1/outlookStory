import Link from "next/link";
import Image from "next/image";
import "./Footer.scss";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="footer pt-5 pb-3">
      <div className="container-fluid px-5">
        <div className="row gy-4">
          {/* Logo and About Section */}
          <div className="col-md-4">
            <div className="footer-logo mb-3">
              <Image
                src="https://jnews.io/magazine/wp-content/uploads/sites/34/2017/12/logo_magz_dark.png"
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
                <Link href="/business" className="text-muted">
                  Business
                </Link>
              </li>
              <li>
                <Link href="/fashion" className="text-muted">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/food" className="text-muted">
                  Food
                </Link>
              </li>
              <li>
                <Link href="/haelth" className="text-muted">
                  Health
                </Link>
              </li>
              <li>
                <Link href="/entertainment" className="text-muted">
                  Entertainment
                </Link>
              </li>
              <li>
                <Link href="/lifestyle" className="text-muted">
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link href="/sports" className="text-muted">
                  Sports
                </Link>
              </li>
              <li>
                <Link href="/travel" className="text-muted">
                  Travel
                </Link>
              </li>
              <li>
                <Link href="/world" className="text-muted">
                  World
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
                  className="form-control"
                  placeholder="Your email address"
                  aria-label="Your email"
                  required
                />
                <button className="btn btn-primary" type="submit">
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
            © {new Date().getFullYear()} YourStory.com. All Rights Reserved.
          </p>
          <div className="social-links d-flex">
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
              <FaYoutube/>
            </Link>
            <Link
              href="https://twitter.com"
              className="me-3 text-muted"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter/>
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
