"use client";

import { useState, useRef, useEffect } from "react";
import anime from "@/lib/anime";

const TESTIMONIALS = [
  {
    quote: "Bitupan's work was exceptional. He rewritten our entire web interface using custom-tailored elements. Our loading speeds went from 4.2 seconds to under 0.8 seconds, and organic checkouts spiked by 35% within the first month itself.",
    name: "Johnathan S.",
    role: "SaaS Founder, Austin TX",
    initials: "JS",
    stars: 5,
  },
  {
    quote: "The attention to detail is unmatched. Every pixel is in place, and the performance is breathtaking. He didn't just build a site; he built a conversion engine for our agency.",
    name: "Sarah Chen",
    role: "Creative Director, Tokyo",
    initials: "SC",
    stars: 5,
  },
  {
    quote: "Professional, transparent, and incredibly fast. Bitupan delivered a complex dashboard architecture in half the estimated time without compromising a single feature.",
    name: "Marcus Thorne",
    role: "CTO, FinTech Global",
    initials: "MT",
    stars: 5,
  },
];

export default function AnimeTestimonials() {
  const [current, setCurrent] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const go = (index: number) => {
    const next = ((index % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length;
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        opacity: [1, 0],
        translateY: [0, -15],
        duration: 250,
        easing: "easeInQuad",
        complete: () => {
          setCurrent(next);
          anime({
            targets: cardRef.current,
            opacity: [0, 1],
            translateY: [15, 0],
            duration: 350,
            easing: "easeOutQuad",
          });
        },
      });
    } else {
      setCurrent(next);
    }
  };

  const t = TESTIMONIALS[current];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="section-label dark-label">
        <span className="section-label-dot emerald-dot" />
        <span>Endorsements</span>
      </div>
      <h2 className="section-title-bold">Trusted by ambitious founders</h2>

      <div className="testimonial-display-container">
        <div ref={cardRef} className="testimonial-card-main">
          <div className="testimonial-stars">
            {Array.from({ length: t.stars }).map((_, i) => (
              <span key={i} className="star-icon">★</span>
            ))}
          </div>

          <p className="testimonial-quote-text">&ldquo;{t.quote}&rdquo;</p>

          <div className="testimonial-footer">
            <div className="testimonial-avatar-glow">{t.initials}</div>
            <div>
              <div className="testimonial-author-name">{t.name}</div>
              <div className="testimonial-author-role">{t.role}</div>
            </div>
          </div>
        </div>

        <div className="testimonial-controls">
          <div className="testimonial-pagination-dots">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                className={`pagination-dot ${idx === current ? "active" : ""}`}
                onClick={() => go(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="testimonial-arrow-btns">
            <button className="arrow-btn" onClick={() => go(current - 1)} aria-label="Previous">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="arrow-btn" onClick={() => go(current + 1)} aria-label="Next">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
