"use client";

import { useEffect, useRef } from "react";
import anime from "@/lib/anime";

const ITEMS = [
  "FULLSTACK ARCHITECTURE",
  "NEXT.JS 16",
  "REACT 19",
  "TYPESCRIPT",
  "PIXEL-PERFECT UI",
  "LIGHTHOUSE 100",
  "ANIME.JS MOTION",
  "PERFORMANCE OBSESSED",
  "CUSTOM WEB APPS",
];

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const track = marqueeRef.current.querySelector(".marquee-track");
    if (!track) return;

    // Anime.js smooth infinite loop translation
    const anim = anime({
      targets: track,
      translateX: ["0%", "-50%"],
      duration: 25000,
      easing: "linear",
      loop: true,
    });

    return () => anim.pause();
  }, []);

  return (
    <div className="marquee-wrapper" ref={marqueeRef}>
      <div className="marquee-track">
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, idx) => (
          <div key={idx} className="marquee-item">
            <span className="marquee-star">★</span>
            <span className="marquee-text">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
