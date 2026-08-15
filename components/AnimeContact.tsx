"use client";

import { useState, useRef, useEffect } from "react";
import anime from "@/lib/anime";

export default function AnimeContact() {
  const [submitted, setSubmitted] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!formContainerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: formContainerRef.current,
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 800,
              easing: "easeOutCubic",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(formContainerRef.current);
    return () => observer.disconnect();
  }, []);

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
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject Type: ${project}\n\nMessage:\n${message}`
    );
    window.open(`mailto:bitupanborah1k@gmail.com?subject=${subject}&body=${body}`, "_blank");

    form.reset();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-grid-wrapper" ref={formContainerRef}>
        <div className="contact-info-col">
          <div className="section-label dark-label">
            <span className="section-label-dot cyan-dot" />
            <span>Initiate Collaboration</span>
          </div>

          <h2 className="contact-title-bold">
            Let&apos;s build something <span className="highlight-text">exceptional</span> together.
          </h2>

          <p className="contact-description">
            Have a project in mind, need a code audit, or looking to build a high-performance custom application? Drop me a line below or contact directly.
          </p>

          <div className="contact-cards-stack">
            <a href="mailto:bitupanborah1k@gmail.com" className="contact-chip interactive">
              <div className="chip-icon-box">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span className="chip-label">Email Directly</span>
                <span className="chip-value">bitupanborah1k@gmail.com</span>
              </div>
            </a>

            <a href="tel:+916002128705" className="contact-chip interactive">
              <div className="chip-icon-box">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <span className="chip-label">Phone &amp; WhatsApp</span>
                <span className="chip-value">+91 60021 28705</span>
              </div>
            </a>

            <div className="contact-chip borderless">
              <div className="chip-icon-box">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <span className="chip-label">Location &amp; Availability</span>
                <span className="chip-value">Assam, India • Global Remote</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          {submitted && (
            <div className="form-success-banner">
              ✔ Thank you! Opening email client to dispatch project brief...
            </div>
          )}

          <form onSubmit={onSubmit} className="dark-form">
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name-input">Full Name *</label>
                <input
                  id="name-input"
                  name="name"
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="email-input">Email Address *</label>
                <input
                  id="email-input"
                  name="email"
                  type="email"
                  placeholder="alex@company.com"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="project-type">Project Scope</label>
              <select id="project-type" name="project" className="custom-dark-select">
                <option value="custom-app">Custom Next.js Web Application</option>
                <option value="uiux-design">UI/UX &amp; High-Contrast Interface Design</option>
                <option value="performance-audit">Speed, Core Web Vitals &amp; Code Audit</option>
                <option value="frontend-dev">Contract Frontend Engineering</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="message-input">Project Brief / Details *</label>
              <textarea
                id="message-input"
                name="message"
                rows={5}
                placeholder="Tell me about your project timelines, key goals, and tech stack..."
                required
              />
            </div>

            <button type="submit" className="submit-btn-glow">
              <span>Transmit Inquiry</span>
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
