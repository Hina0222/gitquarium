import {MAX_COMMITS, type GitHubActivity} from './types';

export class GitHubApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

function calculateStreak(events: { created_at: string }[]): number {
  const activeDates = new Set<string>();
  for (const event of events) {
    activeDates.add(event.created_at.substring(0, 10));
  }

  const sorted = [...activeDates].sort().reverse();
  if (sorted.length === 0) return 0;

  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1] + 'T00:00:00Z');
    const curr = new Date(sorted[i] + 'T00:00:00Z');
    const diffMs = prev.getTime() - curr.getTime();
    if (diffMs === 86_400_000) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export async function fetchGitHubActivity(
  username: string,
): Promise<GitHubActivity> {
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

  const streakDays = calculateStreak(events);

  console.log(`[GitHub API] PushEvent count (3 days): ${commitCount}, streak: ${streakDays} days`);
  return {
    commitCount: Math.min(commitCount, MAX_COMMITS),
    streakDays,
  };
}
