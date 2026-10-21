"use client";

import { useEffect, useRef } from "react";
import { mount } from "@/lib/ascii-pieces/mount.js";
import { registerScene } from "@/lib/scene-scheduler";

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

    let mountedInstance: any = null;
    let unregister: (() => void) | null = null;

    try {
      mountedInstance = mount(el, piece);

      // Register with viewport manager (1 active on phone, 2 active on desktop)
      unregister = registerScene(el, (isActive) => {
        mountedInstance?.setActive?.(isActive);
      });
    } catch (err) {
      console.error("Failed to mount ASCII piece:", err);
    }

    return () => {
      unregister?.();
      mountedInstance?.destroy?.();
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
