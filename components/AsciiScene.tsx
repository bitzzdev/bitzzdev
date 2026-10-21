"use client";

import { useEffect, useRef } from "react";
import { mount } from "@/lib/ascii-pieces/mount.js";

interface AsciiSceneProps {
  piece: any;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AsciiScene({ piece, label, className = "art", style }: AsciiSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el || !piece) return;

    let cleanup: (() => void) | undefined;
    try {
      cleanup = mount(el, piece);
    } catch (err) {
      console.error("Failed to mount ASCII piece:", err);
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, [piece]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label={label || piece?.meta?.name || "ascii scene"}
      style={{
        width: "100%",
        display: "block",
        ...style,
      }}
    />
  );
}
