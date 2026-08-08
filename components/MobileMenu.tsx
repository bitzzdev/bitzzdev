"use client";

import { useSite } from "@/components/site-context";

export default function MobileMenu() {
  const { menuOpen, setMenuOpen } = useSite();

  if (!menuOpen) return null;

  const close = () => setMenuOpen(false);

  return (
    <div className="mobile-menu open" onClick={close}>
      <button className="mobile-menu-close" onClick={close}>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <a href="#home" onClick={close}>Home</a>
      <a href="#work" onClick={close}>Work</a>
      <a href="#process" onClick={close}>Process</a>
      <a href="#services" onClick={close}>Services</a>
      <a href="#contact" onClick={close}>Contact</a>
    </div>
  );
}