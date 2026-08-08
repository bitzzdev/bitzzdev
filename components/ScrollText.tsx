"use client";

import { useEffect, useRef } from "react";

export default function ScrollText({ text }: { text: string }) {
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = pRef.current;
    if (!container) return;

    const sentences = text.trim().split(/(?<=[.!?])\s+/);

    sentences.forEach((sentence, sentenceIdx) => {
      const words = sentence.split(/\s+/);
      let currentLine: string[] = [];

      words.forEach((word, wordIdx) => {
        currentLine.push(word);
        const isPause = /[.,;:!?]$/.test(word);
        const isLongEnough = currentLine.length >= 5;
        const isSentenceEnd = wordIdx === words.length - 1;

        if (isPause || isLongEnough || isSentenceEnd) {
          const lineEl = document.createElement("span");
          lineEl.classList.add("line");
          lineEl.textContent = currentLine.join(" ") + " ";
          container.appendChild(lineEl);
          currentLine = [];
        }
      });

      if (sentenceIdx < sentences.length - 1) {
        const spacer = document.createElement("span");
        spacer.innerHTML = "&nbsp;";
        container.appendChild(spacer);
      }
    });

    const lines = container.querySelectorAll(".line");

    const updateLines = () => {
      const windowHeight = window.innerHeight;
      const viewportCenter = windowHeight / 2;

      lines.forEach((line) => {
        const rect = line.getBoundingClientRect();
        const lineCenter = rect.top + rect.height / 2;
        const distance = Math.abs(lineCenter - viewportCenter) / (windowHeight / 2);

        let opacity: number;
        if (distance < 0.25) {
          opacity = 1;
        } else if (distance < 0.9) {
          opacity = 1 - ((distance - 0.25) / 0.65) * 0.9;
        } else {
          opacity = 0.1;
        }
        (line as HTMLElement).style.color = `rgba(243, 242, 239, ${Math.max(0.1, Math.min(1, opacity))})`;
      });
    };

    let rafId: number;
    const loop = () => {
      updateLines();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      container.innerHTML = "";
    };
  }, [text]);

  return (
    <section className="scroll-text">
      <div className="scroll-text-inner">
        <p ref={pRef} />
      </div>
    </section>
  );
}