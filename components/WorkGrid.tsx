"use client";

import { useEffect, useState } from "react";
import ColorBends from "@/components/ColorBends";
import { GITHUB_USERNAME, filterRepos, type GithubRepo } from "@/lib/github";

const PALETTES: Array<{ colors: string[]; rotation?: number; speed?: number; scale?: number; frequency?: number; warp?: number; intensity?: number }> = [
  { colors: ["#A855F7"], rotation: 90, speed: 0.12, intensity: 2.5 },
  { colors: ["#ff5c7a", "#f97316"], rotation: 30, speed: 0.25, frequency: 1.5, scale: 0.7 },
  { colors: ["#ff5c7a", "#fb923c"], rotation: 15, speed: 0.3, frequency: 1.2, scale: 0.9 },
  { colors: ["#fb923c", "#fef08a"], rotation: 90, speed: 0.12, intensity: 2.5 },
  { colors: ["#22d3ee", "#818cf8"], rotation: 45, speed: 0.2, frequency: 1.1 },
  { colors: ["#34d399", "#10b981"], rotation: 120, speed: 0.15, intensity: 2 },
  { colors: ["#f472b6", "#a78bfa"], rotation: 60, speed: 0.28, scale: 0.8 },
  { colors: ["#facc15", "#f97316"], rotation: 100, speed: 0.18, frequency: 1.4 },
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
            className="work-item reveal"
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