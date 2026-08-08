"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

export default function ContactSection() {
  const [success, setSuccess] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const project = String(data.get("project") || "");
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) {
      alert("Please fill out all mandatory fields.");
      return;
    }
    const subject = encodeURIComponent(`New Project Inquiry: ${project}`);
    const body = encodeURIComponent(`Name: ${name}\n\nEmail: ${email}\n\nProject Type: ${project}\n\nMessage:\n${message}`);
    window.open(`mailto:bitupanborah1k@gmail.com?subject=${subject}&body=${body}`, "_blank");
    form.reset();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-grid">
        <div className="contact-info">
          <div className="section-label">
            <span className="section-label-dot"></span>
            <span>Contact</span>
          </div>
          <h2 className="section-title reveal">Let&apos;s build something great together</h2>
          <p className="contact-text reveal">
            Ready to elevate your digital presence? Let&apos;s talk about how we can build clean
            systems, speed up your codebase, and deliver absolute utility to your users.
          </p>
          <div className="contact-details reveal">
            <div className="contact-item">
              <div className="contact-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-value">
                  <a href="mailto:bitupanborah1k@gmail.com">bitupanborah1k@gmail.com</a>
                </div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <div>
                <div className="contact-label">Phone</div>
                <div className="contact-value">
                  <a href="tel:+916002128705">+91 60021 28705</a>
                </div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <div className="contact-label">Location</div>
                <div className="contact-value">Assam, India (Available Globally)</div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-form reveal">
          {success && <div className="form-success visible">Thank you! Your message was sent successfully.</div>}
          <form id="contact-form" onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="form-name">Full Name</label>
              <input type="text" id="form-name" name="name" className="form-input" placeholder="e.g. Alex Rivera" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="form-email">Email Address</label>
              <input type="email" id="form-email" name="email" className="form-input" placeholder="alex@company.com" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="form-project">Project Type</label>
              <select id="form-project" name="project" className="form-select form-input">
                <option value="custom-app">Custom Web Application</option>
                <option value="uiux-design">UI/UX Interface Design</option>
                <option value="performance-audit">Speed &amp; Performance Tuning</option>
                <option value="frontend-dev">Frontend Development</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="form-message">Project Brief</label>
              <textarea id="form-message" name="message" className="form-textarea" placeholder="Tell me about your project..." required />
            </div>
            <button type="submit" className="form-submit">Submit Brief</button>
          </form>
        </div>
      </div>
    </section>
  );
}