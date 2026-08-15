"use client";

import { useEffect, useRef } from "react";
import anime from "@/lib/anime";

const METRICS = [
  { targetVal: 100, suffix: "%", label: "Client Satisfaction", desc: "Dedicated high-end support and precise engineering." },
  { targetVal: 40, suffix: "+", label: "Custom Deployments", desc: "High-performance SaaS apps & modern web solutions." },
  { targetVal: 3, suffix: "x", label: "Speed Boost", desc: "Lightweight build tooling & extreme CDN performance." },
  { targetVal: 24, suffix: "/7", label: "Active Communication", desc: "Direct feedback loops & post-launch support." },
];

export default function AnimeMetrics() {
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!metricsRef.current) return;
    const cards = metricsRef.current.querySelectorAll(".metric-box");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate card entrances
            anime({
              targets: cards,
              opacity: [0, 1],
              scale: [0.9, 1],
              duration: 700,
              delay: anime.stagger(100),
              easing: "easeOutCubic",
            });

            // Animate numbers counting up using Anime.js
            METRICS.forEach((m, idx) => {
              const numEl = cards[idx]?.querySelector(".metric-num-val");
              if (numEl) {
                const obj = { val: 0 };
                anime({
                  targets: obj,
                  val: m.targetVal,
                  round: 1,
                  easing: "easeOutExpo",
                  duration: 2000,
                  update: () => {
                    numEl.textContent = obj.val.toString();
                  },
                });
              }
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(metricsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="metrics-section">
      <div ref={metricsRef} className="metrics-grid-container">
        {METRICS.map((m) => (
          <div key={m.label} className="metric-box interactive">
            <div className="metric-number-wrapper">
              <span className="metric-num-val">0</span>
              <span className="metric-suffix">{m.suffix}</span>
            </div>
            <div className="metric-label-bold">{m.label}</div>
            <div className="metric-desc-sub">{m.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
