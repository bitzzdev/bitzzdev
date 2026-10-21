"use client";

import { useEffect, useState } from "react";
import AsciiScene from "@/components/AsciiScene";
import { PROJECT_BANNER_PIECES } from "@/lib/ascii-pieces";
import { GITHUB_USERNAME, filterRepos, type GithubRepo } from "@/lib/github";

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
        // Unique piece for each card without repetition
        const pieceModule =
          idx < PROJECT_BANNER_PIECES.length
            ? PROJECT_BANNER_PIECES[idx]
            : PROJECT_BANNER_PIECES[idx % PROJECT_BANNER_PIECES.length];

        const cols = pieceModule?.meta?.cols || 200;
        const rows = pieceModule?.meta?.rows || 100;
        const cell = pieceModule?.meta?.cell || 1;
        const ground = pieceModule?.meta?.ground || "#000000";
        const pieceTitle = pieceModule?.meta?.name || "scene";

        return (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="card"
          >
            <div
              className="well scene"
              style={{
                "--cols": cols,
                "--rows": rows,
                "--cell": cell,
                "--ground": ground,
              } as React.CSSProperties}
            >
              <AsciiScene piece={pieceModule} label={pieceTitle} />
            </div>
            <span className="name">{repo.name.replace(/-/g, " ")}</span>
            <span className="note">{repo.description || repo.language || "Public repository on GitHub"}</span>
          </a>
        );
      })}
    </div>
  );
}
