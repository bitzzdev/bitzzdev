"use client";

import AsciiScene from "@/components/AsciiScene";

const HERO_CONFIG = {
  name: "kyoto dusk",
  slug: "kyoto-dusk",
  load: () => import("@/lib/ascii-pieces/kyoto-dusk.js"),
};

export default function CpuAsciiArt() {
  return (
    <AsciiScene
      config={HERO_CONFIG}
      label="kyoto dusk"
      className="hero-scene"
    />
  );
}
