export const GITHUB_USERNAME = "bitzzdev";

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  topics: string[];
}

export async function getPublicRepos(): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    const data: GithubRepo[] = await res.json();
    return filterRepos(data);
  } catch {
    return [];
  }
}

export const CURATED_REPO_NAMES = ["tiv", "oha", "bitzdots", "hyprconfig", "minegpt", "nexui"];

export function filterRepos(data: GithubRepo[]): GithubRepo[] {
  // Filter for curated repos specified: tiv, oha, bitzdots, hyprconfig, minegpt
  const curated = data.filter((repo) =>
    CURATED_REPO_NAMES.includes(repo.name.toLowerCase())
  );

  // Maintain consistent priority ordering: tiv, oha, bitzdots, hyprconfig, minegpt
  return curated.sort((a, b) => {
    const idxA = CURATED_REPO_NAMES.indexOf(a.name.toLowerCase());
    const idxB = CURATED_REPO_NAMES.indexOf(b.name.toLowerCase());
    return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
  });
}