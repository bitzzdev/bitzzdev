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

export function filterRepos(data: GithubRepo[]): GithubRepo[] {
  return data
    .filter(
      (repo) =>
        !repo.fork &&
        repo.full_name !== `${GITHUB_USERNAME}/${GITHUB_USERNAME}`
    )
    .sort((a, b) => (a.pushed_at < b.pushed_at ? 1 : a.pushed_at > b.pushed_at ? -1 : 0));
}