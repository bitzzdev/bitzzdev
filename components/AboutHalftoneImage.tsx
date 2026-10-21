"use client";

import dynamic from "next/dynamic";

const HalftoneReveal = dynamic(() => import("@/components/HalftoneReveal"), {
  ssr: false,
});

export default function AboutHalftoneImage() {
  return (
    <div className="about-image-wrap">
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
      </div>
    </div>
  );
}
