import {MAX_COMMITS} from './types';

export class GitHubApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

export async function fetchCommitCount(
  username: string,
): Promise<number> {
  const headers: Record<string, string> = {
    'User-Agent': 'git-aquarium',
    Accept: 'application/vnd.github.v3+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const url = `https://api.github.com/users/${encodeURIComponent(username)}/events?per_page=100`;
  console.log(`[GitHub API] GET ${url}`);

  const res = await fetch(url, {headers});

  console.log(`[GitHub API] ${res.status} ${res.statusText} (rate-limit remaining: ${res.headers.get('x-ratelimit-remaining')})`);

  if (!res.ok) {
    if (res.status === 404) {
      throw new GitHubApiError(404, `User '${username}' not found`);
    }
    if (res.status === 403) {
      throw new GitHubApiError(403, 'GitHub API rate limit exceeded');
    }
    throw new GitHubApiError(res.status, `GitHub API error: ${res.statusText}`);
  }

  const events: { type: string; created_at: string }[] = await res.json();

  const threeDaysAgo = Date.now() - 72 * 60 * 60 * 1000;
  let commitCount = 0;

  for (const event of events) {
    if (new Date(event.created_at).getTime() < threeDaysAgo) {
      break;
    }
    if (event.type === 'PushEvent') {
      commitCount++;
    }
  }

  console.log(`[GitHub API] PushEvent count (3 days): ${commitCount}`);
  return Math.min(commitCount, MAX_COMMITS);
}
