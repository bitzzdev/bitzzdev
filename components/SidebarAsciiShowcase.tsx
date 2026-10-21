"use client";

import { useEffect, useState } from "react";
import AsciiScene from "@/components/AsciiScene";
import { SIDEBAR_LEFT_PIECES } from "@/lib/ascii-pieces";

export default function SidebarAsciiShowcase() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % SIDEBAR_LEFT_PIECES.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + SIDEBAR_LEFT_PIECES.length) % SIDEBAR_LEFT_PIECES.length);
  };

  const pieceModule = SIDEBAR_LEFT_PIECES[index];
  const name = pieceModule?.meta?.name || "scene";
  const note = pieceModule?.meta?.note || "";
  const cols = pieceModule?.meta?.cols || 200;
  const rows = pieceModule?.meta?.rows || 100;
  const cell = pieceModule?.meta?.cell || 1;
  const ground = pieceModule?.meta?.ground || "#000000";

  return (
    <div className="side-ascii-widget" style={{ marginTop: "1.75rem", marginBottom: "1.75rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem",
          fontSize: "0.75rem",
          color: "var(--muted)",
        }}
      >
        <span>$ scene: {name}</span>
        <span style={{ display: "flex", gap: "0.5ch" }}>
          <button
            type="button"
            className="button"
            onClick={prev}
            aria-label="Previous scene"
            style={{ padding: "0 0.4ch", fontSize: "0.75rem" }}
          >
            &lt;
          </button>
          <span>{index + 1}/7</span>
          <button
            type="button"
            className="button"
            onClick={next}
            aria-label="Next scene"
            style={{ padding: "0 0.4ch", fontSize: "0.75rem" }}
          >
            &gt;
          </button>
        </span>
      </div>

      <div
        className="well scene"
        style={{
          "--cols": cols,
          "--rows": rows,
          "--cell": cell,
          "--ground": ground,
          borderRadius: 0,
        } as React.CSSProperties}
      >
        <AsciiScene piece={pieceModule} label={name} />
      </div>

      <div
        style={{
          fontSize: "0.6875rem",
          color: "var(--muted)",
          marginTop: "0.4rem",
          lineHeight: 1.4,
        }}
      >
        {note}
      </div>
    </div>
  );
}
