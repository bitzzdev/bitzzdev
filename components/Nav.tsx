"use client";

import { useSite } from "@/components/site-context";

export default function Nav() {
  const { setMenuOpen, setAboutOpen } = useSite();

  return (
    <nav className="dark-nav">
      <a href="#home" className="nav-logo-bold">
        bitz<span className="logo-dot">.dev</span>
      </a>

      <div className="nav-links-center">
        <button className="nav-link-btn" onClick={() => setAboutOpen(true)}>
          <span>About</span>
        </button>
        <a href="#work" className="nav-link-btn">
          <span>Work</span>
        </a>
        <a href="#process" className="nav-link-btn">
          <span>Process</span>
        </a>
        <a href="#services" className="nav-link-btn">
          <span>Capabilities</span>
        </a>
      </div>

      <div className="nav-right">
        <a href="#contact" className="nav-contact-pill">
          <span>Get in Touch</span>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>

        <button className="nav-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}