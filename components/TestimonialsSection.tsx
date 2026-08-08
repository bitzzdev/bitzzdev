"use client";

import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    quote: "Bitupan's work was exceptional. He rewritten our entire web interface using custom-tailored elements. Our loading speeds went from 4.2 seconds to under 0.8 seconds, and organic checkouts spiked by 35% within the first month itself.",
    name: "Johnathan S.",
    role: "SaaS Founder, Austin TX",
    initials: "JS",
  },
  {
    quote: "The attention to detail is unmatched. Every pixel is in place, and the performance is breathtaking. He didn't just build a site; he built a conversion engine for our agency.",
    name: "Sarah Chen",
    role: "Creative Director, Tokyo",
    initials: "SC",
  },
  {
    quote: "Professional, transparent, and incredibly fast. Bitupan delivered a complex dashboard architecture in half the estimated time without compromising a single feature.",
    name: "Marcus Thorne",
    role: "CTO, FinTech Global",
    initials: "MT",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (quoteRef.current) quoteRef.current.style.transition = "opacity 0.3s";
  }, []);

  const go = (index: number) => {
    const next = ((index % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length;
    const quoteEl = quoteRef.current;
    if (!quoteEl) return;
    quoteEl.style.opacity = "0";
    setTimeout(() => {
      setCurrent(next);
      quoteEl.style.opacity = "1";
    }, 300);
  };

  const t = TESTIMONIALS[current];

  return (
    <section className="testimonials" id="testimonials">
      <div className="section-label">
        <span className="section-label-dot"></span>
        <span>Testimonials</span>
      </div>
      <h2 className="section-title reveal">Trusted by ambitious clients</h2>
      <div className="testimonials-wrapper reveal">
        <div className="testimonial-card">
          <div id="testimonial-quote" ref={quoteRef}>
            <p className="testimonial-quote">&quot;{t.quote}&quot;</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.initials}</div>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-nav">
          <div className="testimonial-dots">
            {TESTIMONIALS.map((item, idx) => (
              <span
                key={item.name}
                className={`testimonial-dot ${idx === current ? "active" : ""}`}
                onClick={() => go(idx)}
              />
            ))}
          </div>
          <div className="testimonial-btns">
            <button className="testimonial-btn" onClick={() => go(current - 1)}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button className="testimonial-btn" onClick={() => go(current + 1)}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}