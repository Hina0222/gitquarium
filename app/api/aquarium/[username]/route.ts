import type {NextRequest} from 'next/server';
import {fetchLatestActivity, GitHubApiError} from '@/lib/github';
import {calculateState} from '@/lib/state';
import {composeSvg} from '@/lib/svg/compose';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/api/aquarium/[username]'>,
) {
  const {username} = await ctx.params;

  try {
    const lastActivity = await fetchLatestActivity(username);
    const stateConfig = calculateState(lastActivity);
    const svg = composeSvg(stateConfig, username);

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
          calculateState(null),
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
          calculateState(null),
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

    const fallbackSvg = composeSvg(calculateState(null), username);
    return new Response(fallbackSvg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 's-maxage=60',
      },
    });
  }
}
