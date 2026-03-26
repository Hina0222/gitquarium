import type {NextRequest} from 'next/server';
import {fetchCommitCount, GitHubApiError} from '@/lib/github';
import {calculateAnimationConfig} from '@/lib/state';
import {composeSvg} from '@/lib/svg/compose';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/api/aquarium/[username]'>,
) {
  const {username} = await ctx.params;

  try {
    const commitCount = await fetchCommitCount(username);
    const config = calculateAnimationConfig(commitCount);
    const svg = composeSvg(config, username);

    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 's-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    if (error instanceof GitHubApiError) {
      if (error.statusCode === 404) {
        const errorSvg = composeSvg(
          calculateAnimationConfig(0),
          `${username} (not found)`,
        );
        return new Response(errorSvg, {
          status: 200,
          headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 's-maxage=3600',
          },
        });
      }
      if (error.statusCode === 403) {
        const rateLimitSvg = composeSvg(
          calculateAnimationConfig(0),
          `${username} (rate limited)`,
        );
        return new Response(rateLimitSvg, {
          status: 200,
          headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 's-maxage=600',
          },
        });
      }
    }

    const fallbackSvg = composeSvg(calculateAnimationConfig(0), username);
    return new Response(fallbackSvg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 's-maxage=60',
      },
    });
  }
}
