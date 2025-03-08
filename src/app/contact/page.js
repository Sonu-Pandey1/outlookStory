// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export const metadata = {
//   title: "About Us | " + siteMetadata.title,
//   description: "Learn more about our website.",
// };


// export default function ContactPage() {
//   return (
//     <div className="container py-5">
//       {/* Hero Section */}
//       <section className="text-center mb-5">
//         <h1 className="display-3 fw-bold text-primary">Get in Touch</h1>
//         <p className="lead text-muted">Have questions? We’d love to hear from you!</p>
//       </section>

//       {/* Contact Form */}
//       <section className="mb-5 bg-light p-5 rounded">
//         <h2 className="fw-bold text-dark text-center">Contact Us</h2>
//         <form className="mt-4">
//           <div className="mb-3">
//             <label className="form-label">Your Name</label>
//             <input type="text" className="form-control" placeholder="Enter your name" required />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Your Email</label>
//             <input type="email" className="form-control" placeholder="Enter your email" required />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Message</label>
//             <textarea className="form-control" rows="4" placeholder="Write your message..." required></textarea>
//           </div>
//           <button type="submit" className="btn btn-primary w-100">Send Message</button>
//         </form>
//       </section>

//       {/* Contact Details */}
//       <section className="text-center">
//         <h2 className="fw-bold text-dark">Our Contact Details</h2>
//         <p className="text-muted">Email: contact@ourblog.com</p>
//         <p className="text-muted">Phone: +123 456 7890</p>
//         <p className="text-muted">Address: 123 Blog Street, Blog City, BC 12345</p>
//       </section>
//     </div>
//   );
// }

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import siteMetadata from "@/config/siteMetadata"; // Ensure this file exists and exports metadata
import Head from "next/head";

export const metadata = {
  title: `Contact Us | ${siteMetadata.title}`,
  description: "Get in touch with us for inquiries, feedback, or collaborations.",
};

export default function ContactPage() {
  return (
    <>
      {/* ✅ SEO Metadata */}
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="robots" content="index, follow" />

        {/* ✅ OpenGraph Metadata */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content="https://yourblog.com/contact" />
        <meta property="og:image" content="/default-image.jpg" />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="/default-image.jpg" />
      </Head>

      <div className="container py-5">
        {/* ✅ Hero Section */}
        <section className="text-center mb-5">
          <h1 className="display-3 fw-bold text-primary">Get in Touch</h1>
          <p className="lead text-muted">Have questions? We’d love to hear from you!</p>
        </section>

        {/* ✅ Contact Form */}
        <section className="mb-5 bg-light p-5 rounded">
          <h2 className="fw-bold text-dark text-center">Contact Us</h2>
          <form className="mt-4">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Your Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Your Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="4"
                placeholder="Write your message..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send Message
            </button>
          </form>
        </section>

        {/* ✅ Contact Details */}
        <section className="text-center">
          <h2 className="fw-bold text-dark">Our Contact Details</h2>
          <p className="text-muted">
            <strong>Email:</strong> contact@ourblog.com
          </p>
          <p className="text-muted">
            <strong>Phone:</strong> +123 456 7890
          </p>
          <p className="text-muted">
            <strong>Address:</strong> 123 Blog Street, Blog City, BC 12345
          </p>
        </section>
      </div>
    </>
  );
}
