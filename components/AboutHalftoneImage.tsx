"use client";

import dynamic from "next/dynamic";

const HalftoneReveal = dynamic(() => import("@/components/HalftoneReveal"), {
  ssr: false,
});

export default function AboutHalftoneImage() {
  return (
    <figure
      className="about-image-wrap"
      aria-label="Portrait of Bitupan Borah (Dev Borah)"
    >
      <div className="about-image-card">
        <HalftoneReveal
          src="/me.png"
          mode="mono"
          shape="dot"
          cellSize={6}
          angle={45}
          inkColor="#f4f1ea"
          paperColor="#120f17"
          revealRadius={160}
        />
        {/* Semantic fallback image for search crawlers and screen readers */}
        <noscript>
          <img
            src="/me.png"
            alt="Bitupan Borah (Dev Borah) — Software & Web Developer"
            width={460}
            height={460}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </noscript>
      </div>
      <figcaption className="sr-only">
        Portrait photograph of software developer Bitupan Borah (Dev Borah)
      </figcaption>
    </figure>
  );
}
