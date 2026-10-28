import { NextResponse } from "next/server";

export const revalidate = 3600;

type GitHubRepository = {
  id: number; name: string; full_name: string; description: string | null;
  html_url: string; homepage: string | null; language: string | null;
  topics?: string[]; stargazers_count: number; forks_count: number;
  updated_at: string; fork: boolean; archived: boolean;
};

export async function GET() {
  try {
    const response = await fetch("https://api.github.com/users/harshkhamkar26/repos?per_page=100&sort=updated&type=owner", {
      headers: { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      return NextResponse.json({ error: "GitHub repository data is temporarily unavailable.", repositories: [] }, { status: 502 });
    }
    const repositories = (await response.json()) as GitHubRepository[];
    const safeRepositories = repositories.filter((repo) => Boolean(repo.html_url)).map((repo) => ({
      id: repo.id, name: repo.name, fullName: repo.full_name,
      description: repo.description ?? "No repository description has been added yet.",
      url: repo.html_url, demoUrl: repo.homepage, language: repo.language,
      topics: repo.topics ?? [], stars: repo.stargazers_count, forks: repo.forks_count, updatedAt: repo.updated_at,
    }));
    return NextResponse.json({ repositories: safeRepositories, updatedAt: new Date().toISOString() }, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch {
    return NextResponse.json({ error: "Unable to connect to GitHub right now.", repositories: [] }, { status: 500 });
  }
}
