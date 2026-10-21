"use client";

import { useEffect, useState } from "react";

export default function SeeMeButton({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleState = (e: Event) => {
      const customEvent = e as CustomEvent<{ open?: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.open === "boolean") {
        setActive(customEvent.detail.open);
      }
    };
    window.addEventListener("lanyard-state-changed", handleState);
    return () => window.removeEventListener("lanyard-state-changed", handleState);
  }, []);

  const toggle = () => {
    const next = !active;
    setActive(next);
    window.dispatchEvent(new CustomEvent("toggle-lanyard", { detail: { open: next } }));
    window.dispatchEvent(new CustomEvent("lanyard-state-changed", { detail: { open: next } }));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`button see-me-btn ${active ? "active" : ""} ${className}`.trim()}
      aria-label="Toggle Lanyard ID Card"
    >
      <span className="see-me-glint">[see me!]</span>
    </button>
  );
}
