"use client";

import { useEffect, useState, useRef } from "react";
import anime from "@/lib/anime";
import ColorBends from "@/components/ColorBends";
import { GITHUB_USERNAME, filterRepos, type GithubRepo } from "@/lib/github";

interface Palette {
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
  { rotation: 90, speed: 0.16, scale: 0.95, frequency: 1.2, bandWidth: 6, intensity: 1.8 },
  { rotation: 45, speed: 0.22, frequency: 1.1, bandWidth: 7, mouseInfluence: 1.3, intensity: 1.6 },
  { rotation: 15, speed: 0.28, scale: 0.85, frequency: 1.4, bandWidth: 5, intensity: 2 },
  { rotation: 120, speed: 0.14, frequency: 1, bandWidth: 8, autoRotate: 4, intensity: 1.7 },
  { rotation: 60, speed: 0.2, scale: 1.05, frequency: 1.3, bandWidth: 6, parallax: 0.6, intensity: 1.9 },
  { rotation: 30, speed: 0.24, frequency: 1.2, bandWidth: 7, intensity: 1.6 },
  { rotation: 100, speed: 0.18, scale: 0.9, frequency: 1.5, bandWidth: 5, noise: 0.1, intensity: 1.8 },
];

const DARK_ACCENTS: [string, string][] = [
  ["#38bdf8", "#6366f1"],
  ["#818cf8", "#a855f7"],
  ["#a855f7", "#ec4899"],
  ["#34d399", "#38bdf8"],
  ["#f43f5e", "#fb923c"],
  ["#fbbf24", "#f43f5e"],
  ["#60a5fa", "#34d399"],
];

export default function AnimeWorkGrid({ initialRepos }: { initialRepos: GithubRepo[] }) {
  const [repos, setRepos] = useState<GithubRepo[]>(initialRepos);
  const [filter, setFilter] = useState<string>("all");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
          { headers: { Accept: "application/vnd.github+json" } }
        );
        if (res.ok) {
          const data: GithubRepo[] = await res.json();
          if (active) setRepos(filterRepos(data));
        }
      } catch {
        // preserve initial repos if fetch fails
      }
    };

    fetchRepos();
    return () => {
      active = false;
    };
  }, []);

  const filteredRepos = repos.filter((repo) => {
    if (filter === "all") return true;
    if (filter === "typescript") return repo.language?.toLowerCase() === "typescript";
    if (filter === "javascript") return repo.language?.toLowerCase() === "javascript" || repo.language?.toLowerCase() === "html";
    if (filter === "starred") return repo.stargazers_count > 0;
    return true;
  });

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".work-card");
    anime({
      targets: cards,
      opacity: [0, 1],
      translateY: [40, 0],
      scale: [0.96, 1],
      duration: 600,
      delay: anime.stagger(80),
      easing: "easeOutCubic",
    });
  }, [filter, repos]);

  return (
    <div className="work-section-container">
      <div className="work-filter-bar">
        <button
          className={`filter-chip ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Repositories ({repos.length})
        </button>
        <button
          className={`filter-chip ${filter === "typescript" ? "active" : ""}`}
          onClick={() => setFilter("typescript")}
        >
          TypeScript
        </button>
        <button
          className={`filter-chip ${filter === "javascript" ? "active" : ""}`}
          onClick={() => setFilter("javascript")}
        >
          JavaScript / Web
        </button>
        <button
          className={`filter-chip ${filter === "starred" ? "active" : ""}`}
          onClick={() => setFilter("starred")}
        >
          Starred
        </button>
      </div>

      <div ref={gridRef} className="anime-work-grid">
        {filteredRepos.map((repo, index) => {
          const palette = PALETTES[index % PALETTES.length];
          const colors = DARK_ACCENTS[index % DARK_ACCENTS.length];

          return (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="work-card interactive"
            >
              <div className="work-card-bg">
                <ColorBends {...palette} colors={colors} />
              </div>
              <div className="work-card-overlay" />

              <div className="work-card-top">
                <div className="work-card-badges">
                  {repo.language && <span className="lang-badge">{repo.language}</span>}
                  {repo.stargazers_count > 0 && (
                    <span className="meta-badge">
                      ★ {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="meta-badge">
                      🍴 {repo.forks_count}
                    </span>
                  )}
                </div>
                <div className="card-arrow-icon">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>

              <div className="work-card-content">
                <h3 className="work-card-title">{repo.name.replace(/-/g, " ")}</h3>
                <p className="work-card-desc">{repo.description || "High performance open-source code repository."}</p>
                <div className="work-card-repo-meta">
                  <span className="repo-url-label">github.com/{repo.full_name}</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
