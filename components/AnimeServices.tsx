"use client";

import { useEffect, useRef } from "react";
import anime from "@/lib/anime";

const SERVICES = [
  {
    num: "01",
    title: "Custom Web Applications",
    tagline: "Scalable Single Page Applications & Next.js Ecosystems",
    desc: "Robust, production-grade web applications engineered with Next.js, React, and TypeScript. Built for maximum speed, security, and fluid state management.",
    features: ["Next.js App Router Architecture", "TypeScript Type-Safety", "REST & GraphQL Integration", "State Management & Offline Support"],
  },
  {
    num: "02",
    title: "UI/UX & Motion Systems",
    tagline: "Big Bold Aesthetics & Micro-Interactions",
    desc: "Mobile-first interfaces engineered with high typographic precision, dark mode theme systems, and silky 60fps animations powered by anime.js.",
    features: ["Custom Design Systems", "Anime.js & Lenis Smooth Animations", "Responsive Glassmorphism Layouts", "Accessible WAI-ARIA Standards"],
  },
  {
    num: "03",
    title: "Performance & SEO Tuning",
    tagline: "Sub-Second Load Times & 100 Lighthouse",
    desc: "Eliminating render-blocking assets, script bloat, and layout shifts to achieve perfect Google Core Web Vitals and top search ranking performance.",
    features: ["100/100 Core Web Vitals", "Sub-50ms Total Blocking Time", "Bundle Optimization & Code Splitting", "SEO Schema & Dynamic Meta Tags"],
  },
];

export default function AnimeServices() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll(".service-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: items,
              opacity: [0, 1],
              translateY: [50, 0],
              scale: [0.95, 1],
              duration: 800,
              delay: anime.stagger(150),
              easing: "easeOutCubic",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="services-section" id="services">
      <div className="section-label dark-label">
        <span className="section-label-dot violet-dot" />
        <span>Capabilities</span>
      </div>
      <h2 className="section-title-bold">Architecting digital excellence</h2>

      <div ref={containerRef} className="services-grid">
        {SERVICES.map((srv) => (
          <div key={srv.num} className="service-card interactive">
            <div className="service-card-top">
              <span className="service-num-bold">{srv.num}</span>
              <span className="service-tagline">{srv.tagline}</span>
            </div>
            <h3 className="service-title-bold">{srv.title}</h3>
            <p className="service-desc-dark">{srv.desc}</p>
            <ul className="service-feature-list">
              {srv.features.map((feat, i) => (
                <li key={i}>
                  <span className="bullet-glow" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
