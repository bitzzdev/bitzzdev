"use client";

import dynamic from "next/dynamic";

const HalftoneReveal = dynamic(() => import("@/components/HalftoneReveal"), {
  ssr: false,
});

export default function AboutHalftoneImage() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "460px",
        height: "460px",
        position: "relative",
        margin: "1.5rem 0",
        border: "1px solid var(--border)",
        background: "var(--well)",
        overflow: "hidden",
      }}
    >
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
  );
}
