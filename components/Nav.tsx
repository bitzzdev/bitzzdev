"use client";

import { useSite } from "@/components/site-context";

export default function Nav() {
  const { setMenuOpen, setAboutOpen } = useSite();

  return (
    <nav className="nav">
      <a href="#home" className="nav-logo">
        bitz.dev
      </a>
      <div className="nav-links">
        <button className="nav-link" onClick={() => setAboutOpen(true)}>
          <span>About</span>
        </button>
        <a href="#work" className="nav-link">
          <span>Work</span>
        </a>
        <a href="#process" className="nav-link">
          <span>Process</span>
        </a>
        <a href="#services" className="nav-link">
          <span>Services</span>
        </a>
        <a href="#contact" className="nav-cta">
          <span>Contact</span>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7v10"></path>
          </svg>
        </a>
      </div>
      <button className="nav-menu-btn" onClick={() => setMenuOpen(true)}>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </nav>
  );
}