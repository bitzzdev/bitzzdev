"use client";

import { useEffect, useState } from "react";
import ColorBends from "@/components/ColorBends";
import { GITHUB_USERNAME, filterRepos, type GithubRepo } from "@/lib/github";

interface Palette {
  colors: string[];
  rotation?: number;
  autoRotate?: number;
  speed?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
  iterations?: number;
  intensity?: number;
  bandWidth?: number;
}

const PALETTES: Palette[] = [
  {
    colors: ["#a855f7", "#7c3aed"],
    rotation: 90,
    speed: 0.16,
    scale: 0.95,
    frequency: 1.2,
    bandWidth: 6,
    intensity: 1.8,
  },
  {
    colors: ["#ef4444", "#dc2626"],
    rotation: 45,
    speed: 0.22,
    frequency: 1.1,
    bandWidth: 7,
    mouseInfluence: 1.3,
    intensity: 1.6,
  },
  {
    colors: ["#ec4899", "#db2777"],
    rotation: 15,
    speed: 0.28,
    scale: 0.85,
    frequency: 1.4,
    bandWidth: 5,
    intensity: 2,
  },
  {
    colors: ["#8b5cf6", "#6366f1"],
    rotation: 120,
    speed: 0.14,
    frequency: 1,
    bandWidth: 8,
    autoRotate: 4,
    intensity: 1.7,
  },
  {
    colors: ["#f43f5e", "#e11d48"],
    rotation: 60,
    speed: 0.2,
    scale: 1.05,
    frequency: 1.3,
    bandWidth: 6,
    parallax: 0.6,
    intensity: 1.9,
  },
  {
    colors: ["#c026d3", "#9333ea"],
    rotation: 30,
    speed: 0.24,
    frequency: 1.2,
    bandWidth: 7,
    intensity: 1.6,
  },
  {
    colors: ["#e11d48", "#f472b6"],
    rotation: 100,
    speed: 0.18,
    scale: 0.9,
    frequency: 1.5,
    bandWidth: 5,
    noise: 0.1,
    intensity: 1.8,
  },
  {
    colors: ["#6366f1", "#8b5cf6"],
    rotation: 75,
    speed: 0.26,
    frequency: 1.1,
    bandWidth: 8,
    autoRotate: 6,
    intensity: 1.5,
  },
  {
    colors: ["#d946ef", "#a855f7"],
    rotation: 15,
    speed: 0.2,
    scale: 1.1,
    frequency: 1.4,
    bandWidth: 6,
    intensity: 1.7,
  },
  {
    colors: ["#f97316", "#ef4444"],
    rotation: 135,
    speed: 0.3,
    scale: 0.8,
    frequency: 1.2,
    bandWidth: 6,
    noise: 0.05,
    intensity: 2,
  },
  {
    colors: ["#7c3aed", "#ec4899"],
    rotation: 50,
    speed: 0.17,
    frequency: 1.3,
    bandWidth: 7,
    mouseInfluence: 1.5,
    intensity: 1.8,
  },
  {
    colors: ["#ef4444", "#f43f5e"],
    rotation: 95,
    speed: 0.23,
    scale: 0.9,
    frequency: 1,
    bandWidth: 9,
    autoRotate: 3,
    intensity: 1.6,
  },
  {
    colors: ["#9333ea", "#6366f1"],
    rotation: 40,
    speed: 0.19,
    frequency: 1.5,
    bandWidth: 6,
    intensity: 2,
  },
  {
    colors: ["#db2777", "#e11d48"],
    rotation: 110,
    speed: 0.25,
    scale: 1,
    frequency: 1.2,
    bandWidth: 7,
    parallax: 0.5,
    intensity: 1.7,
  },
];

const bannerGradient = (colors: string[]) =>
  `linear-gradient(160deg, ${colors[0]}cc, ${colors[Math.min(1, colors.length - 1)]}cc)`;

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
        const palette = PALETTES[index % PALETTES.length];
        return (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="work-item"
          >
            <ColorBends {...palette} style={{ background: bannerGradient(palette.colors) }} />
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
