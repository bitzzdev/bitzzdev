"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { mount } from "@/lib/ascii-pieces/mount.js";
import { registerScene } from "@/lib/scene-scheduler";
import type { SceneConfig } from "@/lib/ascii-pieces";

interface AsciiSceneProps {
  config: SceneConfig;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AsciiScene({ config, label, className = "art", style }: AsciiSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const mountedInstanceRef = useRef<any>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Register with viewport manager
    const unregister = registerScene(el, async (active) => {
      if (active) {
        setIsAnimating(true);

        // Load piece code dynamically only when it enters active viewport
        if (!isLoadedRef.current) {
          try {
            const pieceModule = await config.load();
            isLoadedRef.current = true;
            if (canvasRef.current && !mountedInstanceRef.current) {
              mountedInstanceRef.current = mount(canvasRef.current, pieceModule);
            }
          } catch (err) {
            console.error("Failed to load scene module:", config.slug, err);
          }
        }

        mountedInstanceRef.current?.setActive?.(true);
      } else {
        setIsAnimating(false);
        mountedInstanceRef.current?.setActive?.(false);
      }
    });

    return () => {
      unregister();
      mountedInstanceRef.current?.destroy?.();
      mountedInstanceRef.current = null;
    };
  }, [config]);

  const posterSrc = `/ascii-posters/${config.slug}.webp`;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "2 / 1",
        overflow: "hidden",
        background: "#000000",
        ...style,
      }}
    >
      {/* 
        Instant WebP Poster: Zero JS execution time on page refresh!
        2GB RAM phones render the poster in <15ms without freezing the main thread.
      */}
      <Image
        src={posterSrc}
        alt={label || config.name}
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        priority
        style={{
          objectFit: "fill",
          opacity: isAnimating ? 0 : 1,
          transition: "opacity 0.25s ease-out",
          pointerEvents: "none",
        }}
      />

      {/* 
        Interactive Live Animated Canvas:
        Only initialized and animated when in the active viewport (max 1 phone, max 2 desktop).
      */}
      <canvas
        ref={canvasRef}
        className={className}
        role="img"
        aria-label={label || config.name}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          opacity: isAnimating ? 1 : 0,
          transition: "opacity 0.25s ease-in",
          pointerEvents: isAnimating ? "auto" : "none",
        }}
      />
    </div>
  );
}
