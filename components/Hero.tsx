"use client";

import { useEffect, useState } from "react";
import SideRays from "@/components/SideRays";

const TITLES = ["bitz.dev", "bitzdev", "bitzzdev"];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTarget = TITLES[titleIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentTarget.substring(0, displayText.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % TITLES.length);
      }
    } else {
      if (displayText.length < currentTarget.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentTarget.substring(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="hero-grain"></div>
      <SideRays
        speed={2.5}
        rayColor1="#EAB308"
        rayColor2="#96c8ff"
        intensity={2}
        spread={2}
        origin="top-right"
        tilt={0}
        saturation={1.5}
        blend={0.75}
        falloff={1.6}
        opacity={1.0}
      />
      <h1 className="hero-title">
        {displayText}
        <span className="typewriter-cursor">|</span>
      </h1>
      <p className="hero-subtitle">
        Freelance Frontend Developer crafting pixel-perfect, high-performance web experiences.
      </p>
    </section>
  );
}