"use client";

import { Ascii } from "ascii.rest/react";
import { kyotoDusk } from "ascii.rest/pieces";

export default function CpuAsciiArt() {
  return (
    <Ascii
      piece={kyotoDusk}
      className="art"
    />
  );
}
