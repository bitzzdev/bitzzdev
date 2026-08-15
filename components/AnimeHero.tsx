"use client";

import { useEffect, useRef } from "react";
import anime from "@/lib/anime";
import SideRays from "@/components/SideRays";

export default function AnimeHero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Anime.js entrance timeline
    const tl = anime.timeline({
      easing: "easeOutExpo",
    });

    if (badgeRef.current) {
      tl.add({
        targets: badgeRef.current,
        opacity: [0, 1],
        translateY: [25, 0],
        duration: 800,
      });
    }

    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll(".hero-char");
      tl.add({
        targets: letters,
        translateY: [120, 0],
        rotateX: [-90, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(40),
      }, "-=400");
    }

    if (descRef.current) {
      tl.add({
        targets: descRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
      }, "-=600");
    }

    if (ctaRef.current) {
      const buttons = ctaRef.current.children;
      tl.add({
        targets: buttons,
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.9, 1],
        duration: 800,
        delay: anime.stagger(120),
      }, "-=600");
    }

    if (scrollIndRef.current) {
      anime({
        targets: ".scroll-dot",
        translateY: [0, 14],
        opacity: [1, 0.2],
        duration: 1500,
        loop: true,
        easing: "easeInOutQuad",
      });
    }
  }, []);

  const titleText = "BITZ.DEV";

  return (
    <section className="hero-section" id="home">
      <div className="hero-bg-glow" />
      <div className="hero-grid-pattern" />

      <SideRays
        speed={2.2}
        rayColor1="#38bdf8"
        rayColor2="#818cf8"
        intensity={2.2}
        spread={2.5}
        origin="top-right"
        tilt={5}
        saturation={1.8}
        blend={0.85}
        falloff={1.5}
        opacity={0.85}
      />

      <div className="hero-container">
        <div ref={badgeRef} className="hero-status-badge">
          <span className="pulse-dot" />
          <span className="badge-text">Available for Q3/Q4 Projects &amp; Contracts</span>
        </div>

        <h1 ref={titleRef} className="hero-main-title" aria-label={titleText}>
          {titleText.split("").map((char, i) => (
            <span key={i} className="hero-char-wrap">
              <span className="hero-char">{char}</span>
            </span>
          ))}
        </h1>

        <p ref={descRef} className="hero-tagline">
          Crafting <span className="highlight-cyan">high-performance</span> digital products, custom web applications, &amp; pixel-perfect user experiences with ultra-low latency.
        </p>

        <div ref={ctaRef} className="hero-cta-group">
          <a href="#work" className="btn-primary">
            <span>Explore Work</span>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
          <a href="#contact" className="btn-secondary">
            <span>Initiate Brief</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      <a ref={scrollIndRef} href="#scroll-intro" className="hero-scroll-indicator" aria-label="Scroll down">
        <span className="scroll-track">
          <span className="scroll-dot" />
        </span>
        <span className="scroll-label">SCROLL</span>
      </a>
    </section>
  );
}
