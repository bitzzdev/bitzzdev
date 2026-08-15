"use client";

import { useEffect, useRef } from "react";
import anime from "@/lib/anime";

const STEPS = [
  {
    step: "01",
    name: "Discovery & Audit",
    text: "We deep-dive into your existing infrastructure, user behavior, brand goals, and performance metrics to map out targeted solutions.",
  },
  {
    step: "02",
    name: "Architecture & Design",
    text: "Creating bold high-contrast visual systems, wireframes, and scalable component hierarchies optimized for modern frontend frameworks.",
  },
  {
    step: "03",
    name: "Engineering & Motion",
    text: "Writing clean, type-safe Next.js code with anime.js smooth micro-interactions, dark mode aesthetics, and zero unnecessary overhead.",
  },
  {
    step: "04",
    name: "Launch & Continuous Support",
    text: "Extensive Lighthouse auditing, SEO indexing, deployment to high-speed global CDNs, and ongoing dedicated post-launch support.",
  },
];

export default function AnimeProcess() {
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!processRef.current) return;
    const cards = processRef.current.querySelectorAll(".process-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cards,
              opacity: [0, 1],
              translateX: [-40, 0],
              duration: 700,
              delay: anime.stagger(150),
              easing: "easeOutQuad",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(processRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="process-section" id="process">
      <div className="section-label dark-label">
        <span className="section-label-dot amber-dot" />
        <span>Workflow</span>
      </div>
      <h2 className="section-title-bold">How we build together</h2>

      <div ref={processRef} className="process-timeline-grid">
        {STEPS.map((item) => (
          <div key={item.step} className="process-card interactive">
            <div className="process-header">
              <span className="process-step-num">{item.step}</span>
              <div className="process-accent-line" />
            </div>
            <h3 className="process-card-title">{item.name}</h3>
            <p className="process-card-text">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
