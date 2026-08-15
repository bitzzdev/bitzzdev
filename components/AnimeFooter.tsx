"use client";

import { useEffect, useState } from "react";
import anime from "@/lib/anime";

export default function AnimeFooter() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as any).__bitz_lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="anime-footer">
      <div className="footer-top-row">
        <div className="footer-brand-block">
          <div className="footer-logo-bold">bitz.dev</div>
          <p className="footer-tagline-sub">
            High-performance engineering structures and tailored pixel-perfection. Providing absolute code integrity to growing enterprise businesses worldwide.
          </p>
          <div className="footer-live-clock">
            <span className="clock-pulse" />
            <span className="clock-text">LOCAL TIME: {time || "00:00:00 UTC"}</span>
          </div>
        </div>

        <div className="footer-nav-columns">
          <div className="nav-col">
            <h4 className="nav-col-title">Navigation</h4>
            <a href="#home">Home</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#services">Capabilities</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="nav-col">
            <h4 className="nav-col-title">Connect</h4>
            <a href="https://github.com/bitzzdev" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href="https://instagram.com/bitz.dev" target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
            <a href="mailto:bitupanborah1k@gmail.com">Email ↗</a>
            <a href="tel:+916002128705">Call ↗</a>
          </div>
        </div>

        <div className="footer-action-col">
          <button onClick={scrollToTop} className="back-to-top-btn interactive" aria-label="Back to top">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>TOP</span>
          </button>
        </div>
      </div>

      <div className="footer-giant-banner">
        <span className="giant-title">BITZ.DEV</span>
      </div>

      <div className="footer-bottom-bar">
        <p>&copy; {new Date().getFullYear()} bitz.dev • All Rights Reserved.</p>
        <p>Built with Next.js 16, Anime.js &amp; Lenis.</p>
      </div>
    </footer>
  );
}
