// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export const metadata = {
//   title: "About Us | " + siteMetadata.title,
//   description: "Learn more about our website.",
// };


// export default function AboutPage() {
//   return (
//     <div className="container py-5">
//       {/* Hero Section */}
//       <section className="text-center mb-5">
//         <h1 className="display-3 fw-bold text-primary">Welcome to Our Blog</h1>
//         <p className="lead text-muted">A space where ideas, stories, and knowledge come together.</p>
//       </section>
      
//       {/* Mission Section */}
//       <section className="mb-5 text-center bg-light p-5 rounded">
//         <h2 className="fw-bold text-dark">Our Mission</h2>
//         <p className="text-muted">
//           We are dedicated to providing high-quality content that informs, inspires, and engages our readers. Our mission is to create a thriving community where voices can be heard and ideas can flourish.
//         </p>
//       </section>
      
//       {/* Our Story */}
//       <section className="mb-5 text-center">
//         <h2 className="fw-bold text-dark">Our Story</h2>
//         <p className="text-muted">
//           Founded in 2020, our blog started as a small platform for writers to share their thoughts. Over the years, we've grown into a vibrant community of content creators and readers who are passionate about diverse topics.
//         </p>
//       </section>
      
//       {/* Team Section */}
//       <section className="mb-5">
//         <h2 className="text-center fw-bold text-dark">Meet Our Team</h2>
//         <div className="row mt-4 text-center">
//           <div className="col-md-4">
//             <img src="/team-member1.jpg" className="rounded-circle mb-3" alt="Team Member 1" width="150" height="150" />
//             <h5>John Doe</h5>
//             <p className="text-muted">Founder & Editor-in-Chief</p>
//           </div>
//           <div className="col-md-4">
//             <img src="/team-member2.jpg" className="rounded-circle mb-3" alt="Team Member 2" width="150" height="150" />
//             <h5>Jane Smith</h5>
//             <p className="text-muted">Senior Content Manager</p>
//           </div>
//           <div className="col-md-4">
//             <img src="/team-member3.jpg" className="rounded-circle mb-3" alt="Team Member 3" width="150" height="150" />
//             <h5>Emily Johnson</h5>
//             <p className="text-muted">Lead Designer</p>
//           </div>
//         </div>
//       </section>
      
//       {/* Values Section */}
//       <section className="mb-5 text-center bg-light p-5 rounded">
//         <h2 className="fw-bold text-dark">Our Core Values</h2>
//         <p className="text-muted">
//           Transparency, inclusivity, and creativity are at the heart of everything we do. We believe in fostering a space where everyone can express themselves freely and responsibly.
//         </p>
//       </section>
      
//       {/* Contact Section */}
//       <section className="text-center">
//         <h2 className="fw-bold text-dark">Get in Touch</h2>
//         <p className="text-muted">We’d love to hear from you! Reach out to us for collaborations, feedback, or inquiries.</p>
//         <a href="/contact" className="btn btn-primary btn-lg">Contact Us</a>
//       </section>
//     </div>
//   );
// }


import React from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import siteMetadata from "@/config/siteMetadata"; // Ensure this file exists and exports the metadata
import Head from "next/head";

export const metadata = {
  title: `About Us | ${siteMetadata.title}`,
  description: "Learn more about our website and community.",
};

export default function AboutPage() {
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
        <meta property="og:url" content="https://yourblog.com/about" />
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
          <h1 className="display-3 fw-bold text-primary">Welcome to Our Blog</h1>
          <p className="lead text-muted">
            A space where ideas, stories, and knowledge come together.
          </p>
        </section>

        {/* ✅ Mission Section */}
        <section className="mb-5 text-center bg-light p-5 rounded">
          <h2 className="fw-bold text-dark">Our Mission</h2>
          <p className="text-muted">
            We are dedicated to providing high-quality content that informs, inspires, and engages our readers.
            Our mission is to create a thriving community where voices can be heard and ideas can flourish.
          </p>
        </section>

        {/* ✅ Our Story */}
        <section className="mb-5 text-center">
          <h2 className="fw-bold text-dark">Our Story</h2>
          <p className="text-muted">
            Founded in 2020, our blog started as a small platform for writers to share their thoughts.
            Over the years, weve grown into a vibrant community of content creators and readers who
            are passionate about diverse topics.
          </p>
        </section>

        {/* ✅ Team Section */}
        <section className="mb-5">
          <h2 className="text-center fw-bold text-dark">Meet Our Team</h2>
          <div className="row mt-4 text-center">
            {[
              { name: "John Doe", role: "Founder & Editor-in-Chief", image: "/team-member1.jpg" },
              { name: "Jane Smith", role: "Senior Content Manager", image: "/team-member2.jpg" },
              { name: "Emily Johnson", role: "Lead Designer", image: "/team-member3.jpg" },
            ].map((member, index) => (
              <div key={index} className="col-md-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="rounded-circle mb-3"
                  width={150}
                  height={150}
                />
                <h5>{member.name}</h5>
                <p className="text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ Values Section */}
        <section className="mb-5 text-center bg-light p-5 rounded">
          <h2 className="fw-bold text-dark">Our Core Values</h2>
          <p className="text-muted">
            Transparency, inclusivity, and creativity are at the heart of everything we do.
            We believe in fostering a space where everyone can express themselves freely and responsibly.
          </p>
        </section>

        {/* ✅ Contact Section */}
        <section className="text-center">
          <h2 className="fw-bold text-dark">Get in Touch</h2>
          <p className="text-muted">
            We’d love to hear from you! Reach out to us for collaborations, feedback, or inquiries.
          </p>
          <a href="/contact" className="btn btn-primary btn-lg">
            Contact Us
          </a>
        </section>
      </div>
    </>
  );
}
