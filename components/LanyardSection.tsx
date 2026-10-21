"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/components/Lanyard"), { ssr: false });

export default function LanyardSection() {
  const [open, setOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ open?: boolean }>;
      const nextOpen =
        customEvent.detail && typeof customEvent.detail.open === "boolean"
          ? customEvent.detail.open
          : !open;

      if (nextOpen) {
        if (timerRef.current) clearTimeout(timerRef.current);
        setAnimating(true);
        requestAnimationFrame(() => {
          setOpen(true);
        });
      } else {
        setOpen(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setAnimating(false);
        }, 450);
      }
    };

    window.addEventListener("toggle-lanyard", handleToggle);
    return () => {
      window.removeEventListener("toggle-lanyard", handleToggle);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("toggle-lanyard", { detail: { open: false } }));
    window.dispatchEvent(new CustomEvent("lanyard-state-changed", { detail: { open: false } }));
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setAnimating(false);
    }, 450);
  };

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!animating && !open) return null;

  return (
    <div
      className={`lanyard-overlay ${open ? "open" : ""}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div className="lanyard-backdrop" onClick={handleClose} />

      {/* Floating lanyard container dropping from the top */}
      <div className="lanyard-stage">
        {/* Only the [close card] button at the top */}
        <div className="lanyard-close-bar">
          <button
            type="button"
            className="button lanyard-close-btn"
            onClick={handleClose}
            aria-label="Close card"
          >
            <span>[close card &times;]</span>
          </button>
        </div>

        {/* 3D Lanyard Canvas */}
        <div className="lanyard-canvas-wrap">
          <Lanyard
            frontImage="/me-bw.png"
            backImage="/card-back.png"
            cardColor="#000000"
            strapColor="#ffffff"
            metal="silver"
            finish="glossy"
            imageFit="cover"
          />
        </div>
      </div>
    </div>
  );
}
