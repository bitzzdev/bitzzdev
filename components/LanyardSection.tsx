"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/components/Lanyard"), { ssr: false });

export default function LanyardSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ open?: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.open === "boolean") {
        setOpen(customEvent.detail.open);
      } else {
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("toggle-lanyard", handleToggle);
    return () => window.removeEventListener("toggle-lanyard", handleToggle);
  }, []);

  if (!open) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        marginBottom: "2.5rem",
        border: "1px solid var(--border)",
        background: "var(--well)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1rem",
          borderBottom: "1px dotted var(--muted)",
          fontSize: "0.8125rem",
          color: "var(--muted)",
        }}
      >
        <span>$ lanyard --card --interactive</span>
        <button
          type="button"
          className="button"
          onClick={() => {
            setOpen(false);
            window.dispatchEvent(new CustomEvent("lanyard-state-changed", { detail: { open: false } }));
          }}
          aria-label="Close lanyard"
        >
          <span>[close &times;]</span>
        </button>
      </div>

      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <Lanyard
          frontImage="/me.png"
          backImage="/me.png"
          cardColor="#000000"
          strapColor="#ffffff"
          metal="silver"
          finish="glossy"
          imageFit="cover"
        />
      </div>
      <div
        style={{
          textAlign: "center",
          padding: "0.5rem",
          fontSize: "0.75rem",
          color: "var(--muted)",
          borderTop: "1px dotted var(--border)",
        }}
      >
        <span>drag, toss or click the card to flip</span>
      </div>
    </div>
  );
}
