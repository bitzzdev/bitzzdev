"use client";

import { Ascii } from "ascii.rest/react";
import { cpuMeters } from "ascii.rest/pieces";

export default function CpuAsciiArt() {
  return (
    <div className="cpu-ascii-wrapper">
      <div className="cpu-ascii-container">
        <Ascii
          piece={cpuMeters}
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
      </div>
    </div>
  );
}
