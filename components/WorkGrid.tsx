"use client";

import { useEffect, useState } from "react";
import MoltenMetal, { type MoltenMetalColorMode } from "@/components/MoltenMetal";
import { GITHUB_USERNAME, filterRepos, type GithubRepo } from "@/lib/github";

interface MoltenPreset {
  color1: string;
  color2: string;
  color3: string;
  colorMode: MoltenMetalColorMode;
  speed?: number;
  scale?: number;
  swirl?: number;
  fold?: number;
  glow?: number;
  detail?: number;
}

const MOLTEN_PRESETS: MoltenPreset[] = [
  // Electric Violet & Magenta
  {
    color1: "#5227FF",
    color2: "#FF9FFC",
    color3: "#FFFFFF",
    colorMode: "molten",
    speed: 0.32,
    scale: 4.2,
    swirl: 1.1,
    fold: -0.22,
    glow: 1.7,
  },
  // Liquid Gold & Amber Flame
  {
    color1: "#D97706",
    color2: "#FDE047",
    color3: "#FFFBEB",
    colorMode: "ember",
    speed: 0.28,
    scale: 3.8,
    swirl: 1.3,
    fold: -0.2,
    glow: 1.8,
  },
  // Cyber Cyan & Ice Blue
  {
    color1: "#0284C7",
    color2: "#38BDF8",
    color3: "#F0F9FF",
    colorMode: "frost",
    speed: 0.35,
    scale: 4.5,
    swirl: 0.9,
    fold: -0.24,
    glow: 1.6,
  },
  // Molten Ruby & Rose Gold
  {
    color1: "#E11D48",
    color2: "#FB7185",
    color3: "#FFF1F2",
    colorMode: "molten",
    speed: 0.3,
    scale: 4.0,
    swirl: 1.2,
    fold: -0.19,
    glow: 1.65,
  },
  // Emerald Aurora & Mint Chrome
  {
    color1: "#059669",
    color2: "#34D399",
    color3: "#ECFDF5",
    colorMode: "frost",
    speed: 0.26,
    scale: 4.4,
    swirl: 1.0,
    fold: -0.21,
    glow: 1.7,
  },
  // Hot Copper & Ember Glow
  {
    color1: "#EA580C",
    color2: "#FB923C",
    color3: "#FFF7ED",
    colorMode: "ember",
    speed: 0.34,
    scale: 3.9,
    swirl: 1.4,
    fold: -0.23,
    glow: 1.8,
  },
  // Royal Indigo & Electric Cobalt
  {
    color1: "#4F46E5",
    color2: "#A5B4FC",
    color3: "#EEF2FF",
    colorMode: "frost",
    speed: 0.31,
    scale: 4.1,
    swirl: 1.05,
    fold: -0.2,
    glow: 1.6,
  },
  // Neon Orchid & Fuchsia Blaze
  {
    color1: "#C026D3",
    color2: "#F472B6",
    color3: "#FDF2F8",
    colorMode: "molten",
    speed: 0.29,
    scale: 4.3,
    swirl: 1.15,
    fold: -0.25,
    glow: 1.75,
  },
  // Acid Lime & Cyber Zinc
  {
    color1: "#65A30D",
    color2: "#BEF264",
    color3: "#F7FEE7",
    colorMode: "ember",
    speed: 0.33,
    scale: 4.0,
    swirl: 1.25,
    fold: -0.18,
    glow: 1.6,
  },
  // Deep Oceanic Teal & Platinum
  {
    color1: "#0D9488",
    color2: "#5EEAD4",
    color3: "#F0FDFA",
    colorMode: "frost",
    speed: 0.27,
    scale: 4.6,
    swirl: 0.95,
    fold: -0.22,
    glow: 1.65,
  },
  // Molten Solar Flare & Sunset
  {
    color1: "#DC2626",
    color2: "#F97316",
    color3: "#FEF08A",
    colorMode: "molten",
    speed: 0.36,
    scale: 3.7,
    swirl: 1.35,
    fold: -0.26,
    glow: 1.9,
  },
  // Deep Amethyst & Titanium Pearl
  {
    color1: "#7C3AED",
    color2: "#C084FC",
    color3: "#FAF5FF",
    colorMode: "molten",
    speed: 0.3,
    scale: 4.2,
    swirl: 1.1,
    fold: -0.2,
    glow: 1.7,
  },
];

export default function WorkGrid({ initialRepos }: { initialRepos: GithubRepo[] }) {
  const [repos, setRepos] = useState<GithubRepo[]>(initialRepos);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
          { headers: { Accept: "application/vnd.github+json" } }
        );
        if (!res.ok) {
          setError(true);
          return;
        }
        const data: GithubRepo[] = await res.json();
        if (active) {
          setRepos(filterRepos(data));
          setError(false);
        }
      } catch {
        setError(true);
      }
    };

    fetchRepos();
    const interval = setInterval(fetchRepos, 300000);
    const onFocus = () => fetchRepos();
    window.addEventListener("focus", onFocus);

    return () => {
      active = false;
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  if (repos.length === 0 && error) {
    return (
      <p className="work-item-desc" style={{ marginTop: "1rem", color: "var(--text-mid)" }}>
        Unable to load repositories from GitHub right now. Try again shortly.
      </p>
    );
  }

  return (
    <div className="work-grid">
      {repos.map((repo, index) => {
        const preset = MOLTEN_PRESETS[index % MOLTEN_PRESETS.length];
        return (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="work-item"
          >
            <MoltenMetal
              {...preset}
              grain={true}
              grainIntensity={0.06}
              mouseInteraction={true}
              mouseStrength={0.35}
              opacity={0.92}
              backgroundColor="#080807"
            />
            <div className="work-item-shape-2" />
            <div className="work-item-inner">
              <h3 className="work-item-title">{repo.name.replace(/-/g, " ")}</h3>
              <p className="work-item-desc">{repo.description || repo.language || "Public repository"}</p>
            </div>
            <div className="work-item-arrow">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7v10"></path>
              </svg>
            </div>
          </a>
        );
      })}
    </div>
  );
}
