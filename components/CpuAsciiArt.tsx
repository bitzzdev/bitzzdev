"use client";

import { Ascii } from "ascii.rest/react";
import { cpuMeters } from "ascii.rest/pieces";

export default function CpuAsciiArt() {
  return (
    <Ascii
      piece={cpuMeters}
      className="art"
      options={{
        commands: [
          "build",
          "indexer",
          "server",
          "backup",
          "sync",
          "editor",
          "shell",
        ],
      }}
    />
  );
}
