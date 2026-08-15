"use client";

import { useSite } from "@/components/site-context";

export default function MobileMenu() {
  const { menuOpen, setMenuOpen } = useSite();

  if (!menuOpen) return null;

  const close = () => setMenuOpen(false);

  return (
    <div className="mobile-menu open" onClick={close}>
      <button className="mobile-menu-close" onClick={close} aria-label="Close menu">
        <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <a href="#home" onClick={close}>Home</a>
      <a href="#work" onClick={close}>Work</a>
      <a href="#process" onClick={close}>Process</a>
      <a href="#services" onClick={close}>Capabilities</a>
      <a href="#contact" onClick={close}>Contact</a>
    </div>
  );
}