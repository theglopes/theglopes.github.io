import { mkdir, writeFile } from "node:fs/promises";

const username = process.env.GITHUB_USERNAME || "theglopes";
const token = process.env.GITHUB_TOKEN;

if (!token) {
  throw new Error("GITHUB_TOKEN is required to update stats");
}

const headers = {
  Authorization: `Bearer ${token}`,
  "User-Agent": "portfolio-github-stats",
  Accept: "application/vnd.github+json",
};

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { ...headers, ...(options.headers || {}) },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Request failed for ${url}: ${response.status} ${response.statusText}\n${body}`);
  }
  return response.json();
}

async function fetchAllRepos(login) {
  const repos = [];
  for (let page = 1; page <= 10; page += 1) {
    const url = `https://api.github.com/users/${login}/repos?per_page=100&page=${page}&type=owner&sort=updated`;
    const chunk = await fetchJson(url);
    repos.push(...chunk);
    if (chunk.length < 100) break;
  }
  return repos;
}

async function fetchCommitTotal(login) {
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          totalCommitContributions
        }
      }
    }
  `;
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login } }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}\n${body}`);
  }
  const payload = await response.json();
  if (payload.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(payload.errors)}`);
  }
  return (
    payload.data?.user?.contributionsCollection?.totalCommitContributions || 0
  );
}

async function main() {
  const [userData, repos, commitTotal] = await Promise.all([
    fetchJson(`https://api.github.com/users/${username}`),
    fetchAllRepos(username),
    fetchCommitTotal(username),
  ]);

  const repoSizeKb = repos
    .filter((repo) => !repo.fork)
    .reduce((sum, repo) => sum + (repo.size || 0), 0);

  const stats = {
    updatedAt: new Date().toISOString(),
    projects: normalizeNumber(userData.public_repos),
    repoSizeKb: normalizeNumber(repoSizeKb),
    commits: normalizeNumber(commitTotal),
  };

  await mkdir("data", { recursive: true });
  await writeFile("data/github-stats.json", `${JSON.stringify(stats, null, 2)}\n`);
}

function normalizeNumber(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }
  return parsed;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
