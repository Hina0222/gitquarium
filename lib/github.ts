export class GitHubApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

export async function fetchLatestActivity(
  username: string,
): Promise<Date | null> {
  const headers: Record<string, string> = {
    'User-Agent': 'git-aquarium',
    Accept: 'application/vnd.github.v3+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const url = `https://api.github.com/users/${encodeURIComponent(username)}/events?per_page=1`;
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

  const events: { created_at: string }[] = await res.json();

  if (events.length === 0) {
    return null;
  }

  return new Date(events[0].created_at);
}
