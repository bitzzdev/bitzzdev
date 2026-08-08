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
    colors: ["#ff5c7a", "#8a5cff"],
    rotation: 90,
    speed: 0.18,
    scale: 0.9,
    frequency: 1.1,
    intensity: 1.6,
  },
  {
    colors: ["#00ffd1", "#8a5cff"],
    rotation: 45,
    speed: 0.25,
    frequency: 1.4,
    warpStrength: 1.4,
    iterations: 2,
    intensity: 1.8,
  },
  {
    colors: ["#f97316", "#facc15"],
    rotation: 15,
    speed: 0.3,
    scale: 0.7,
    frequency: 1.2,
    parallax: 0.6,
    noise: 0.1,
  },
  {
    colors: ["#22d3ee", "#818cf8", "#a78bfa"],
    rotation: 120,
    speed: 0.15,
    autoRotate: 5,
    bandWidth: 8,
  },
  {
    colors: ["#34d399", "#10b981"],
    rotation: 90,
    speed: 0.2,
    warpStrength: 0.8,
    intensity: 2,
    mouseInfluence: 1.4,
  },
  {
    colors: ["#f472b6", "#fb7185"],
    rotation: 60,
    speed: 0.28,
    scale: 0.85,
    frequency: 1.6,
    iterations: 3,
  },
  {
    colors: ["#facc15", "#fbbf24"],
    rotation: 100,
    speed: 0.12,
    autoRotate: 8,
    noise: 0.2,
    intensity: 1.4,
  },
  {
    colors: ["#a855f7", "#d946ef"],
    rotation: 30,
    speed: 0.22,
    frequency: 1.3,
    bandWidth: 5,
    parallax: 0.4,
  },
  {
    colors: ["#0ea5e9", "#6366f1"],
    rotation: 150,
    speed: 0.16,
    scale: 1.1,
    iterations: 2,
    warpStrength: 1.6,
  },
  {
    colors: ["#fb923c", "#ef4444"],
    rotation: 75,
    speed: 0.26,
    frequency: 0.9,
    noise: 0.05,
    mouseInfluence: 0.8,
  },
  {
    colors: ["#2dd4bf", "#f472b6"],
    rotation: 45,
    speed: 0.2,
    autoRotate: 4,
    intensity: 2.2,
    bandWidth: 7,
  },
  {
    colors: ["#eab308", "#22d3ee"],
    rotation: 20,
    speed: 0.32,
    scale: 0.75,
    frequency: 1.5,
    warpStrength: 1.2,
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
        const palette = PALETTES[index % PALETTES.length];
        return (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="work-item"
          >
            <ColorBends {...palette} />
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
