"use client";

import { useEffect, useState } from "react";
import { Ascii } from "ascii.rest/react";
import {
  aurora,
  matrixRain,
  starfield,
  fireworks,
  cherryBlossom,
  galaxy,
  plasma,
  seaSwell,
  rain,
  candlesticks,
  synthwave,
  sunrise,
  rocket,
  fireflies,
  radar,
} from "ascii.rest/pieces";
import { GITHUB_USERNAME, filterRepos, type GithubRepo } from "@/lib/github";

const ASCII_SCENES = [
  matrixRain,
  aurora,
  starfield,
  synthwave,
  galaxy,
  fireworks,
  plasma,
  sunrise,
  seaSwell,
  rain,
  radar,
  candlesticks,
  cherryBlossom,
  rocket,
  fireflies,
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
        const scene = ASCII_SCENES[index % ASCII_SCENES.length];
        return (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="work-item"
          >
            <div className="work-item-ascii-bg">
              <Ascii piece={scene} />
            </div>
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
