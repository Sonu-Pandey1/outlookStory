import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ContactPage() {
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <section className="text-center mb-5">
        <h1 className="display-3 fw-bold text-primary">Get in Touch</h1>
        <p className="lead text-muted">Have questions? We’d love to hear from you!</p>
      </section>

      {/* Contact Form */}
      <section className="mb-5 bg-light p-5 rounded">
        <h2 className="fw-bold text-dark text-center">Contact Us</h2>
        <form className="mt-4">
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Your Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows="4" placeholder="Write your message..." required></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">Send Message</button>
        </form>
      </section>

      {/* Contact Details */}
      <section className="text-center">
        <h2 className="fw-bold text-dark">Our Contact Details</h2>
        <p className="text-muted">Email: contact@ourblog.com</p>
        <p className="text-muted">Phone: +123 456 7890</p>
        <p className="text-muted">Address: 123 Blog Street, Blog City, BC 12345</p>
      </section>
    </div>
  );
}
