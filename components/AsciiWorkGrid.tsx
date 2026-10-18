"use client";

import { useEffect, useState } from "react";
import { Ascii } from "ascii.rest/react";
import {
  matrixRain,
  synthwave,
  starfield,
  galaxy,
  aurora,
  plasma,
  radar,
  candlesticks,
  equalizer,
  earth,
  blackHole,
  lorenz,
  donut,
  fireworks,
  bootLog,
  digitalClock,
} from "ascii.rest/pieces";
import { GITHUB_USERNAME, filterRepos, type GithubRepo } from "@/lib/github";

const PIECE_MAP: Record<string, any> = {
  "matrixRain": matrixRain,
  "synthwave": synthwave,
  "starfield": starfield,
  "galaxy": galaxy,
  "aurora": aurora,
  "plasma": plasma,
  "radar": radar,
  "candlesticks": candlesticks,
  "equalizer": equalizer,
  "earth": earth,
  "blackHole": blackHole,
  "lorenz": lorenz,
  "donut": donut,
  "fireworks": fireworks,
  "bootLog": bootLog,
  "digitalClock": digitalClock,
};

const PIECE_KEYS = Object.keys(PIECE_MAP);

export default function AsciiWorkGrid({ initialRepos }: { initialRepos: GithubRepo[] }) {
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
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  if (repos.length === 0 && error) {
    return (
      <p className="muted" style={{ margin: "1.5rem 0" }}>
        [unable to reach github api right now, please view github.com/{GITHUB_USERNAME} directly]
      </p>
    );
  }

  return (
    <div className="grid">
      {repos.map((repo, idx) => {
        const key = PIECE_KEYS[idx % PIECE_KEYS.length];
        const piece = PIECE_MAP[key];

        return (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="card"
          >
            <div className="well">
              <Ascii piece={piece} />
            </div>
            <span className="name">{repo.name.replace(/-/g, " ")}</span>
            <span className="note">{repo.description || repo.language || "Public repository on GitHub"}</span>
          </a>
        );
      })}
    </div>
  );
}
