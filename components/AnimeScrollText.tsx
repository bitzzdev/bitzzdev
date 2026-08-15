"use client";

import { useEffect, useRef } from "react";
import anime from "@/lib/anime";

interface AnimeScrollTextProps {
  text: string;
  tagline?: string;
}

export default function AnimeScrollText({ text, tagline }: AnimeScrollTextProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    // Clean previous
    container.innerHTML = "";

    const words = text.trim().split(/\s+/);
    words.forEach((word) => {
      const span = document.createElement("span");
      span.className = "scroll-word";
      span.innerText = word + " ";
      container.appendChild(span);
    });

    const wordEls = container.querySelectorAll(".scroll-word");

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Calculate overall scroll progress through the section
      const totalDist = windowH + rect.height;
      const currentPos = windowH - rect.top;
      const progress = Math.max(0, Math.min(1, currentPos / totalDist));

      // Reveal words progressively based on scroll position
      const totalWords = wordEls.length;
      const activeCount = Math.floor(progress * (totalWords + 10));

      wordEls.forEach((el, index) => {
        const isHighlighted = index < activeCount;
        if (isHighlighted) {
          (el as HTMLElement).style.color = "#FFFFFF";
          (el as HTMLElement).style.opacity = "1";
          (el as HTMLElement).style.transform = "translateY(0px)";
        } else {
          (el as HTMLElement).style.color = "rgba(255, 255, 255, 0.18)";
          (el as HTMLElement).style.opacity = "0.35";
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [text]);

  return (
    <section ref={sectionRef} className="anime-scroll-text-section" id="scroll-intro">
      <div className="anime-scroll-inner">
        {tagline && (
          <div className="section-label dark-label">
            <span className="section-label-dot cyan-dot" />
            <span>{tagline}</span>
          </div>
        )}
        <div ref={contentRef} className="scroll-words-container" />
      </div>
    </section>
  );
}
