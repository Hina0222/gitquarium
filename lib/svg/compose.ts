import type {AnimationConfig} from '../types';
import {renderBackground} from './background';
import {renderBubbles} from './bubbles';
import {fishRegistry, SWIM_ZONES} from './fish';

const WIDTH = 400;
const HEIGHT = 200;

export function composeSvg(config: AnimationConfig, username: string): string {
  const count = Math.min(config.fishCount, fishRegistry.length, SWIM_ZONES.length);

  const defs = fishRegistry
    .slice(0, count)
    .map((f) => f.defs)
    .join('\n');

  const fishes = fishRegistry
    .slice(0, count)
    .map((f, i) => f.render(config, SWIM_ZONES[i]))
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    ${defs}
  </defs>
  ${renderBackground(WIDTH, HEIGHT)}
  ${fishes}
  ${renderBubbles(config.bubbleCount)}
  <text x="10" y="${HEIGHT - 10}" fill="white" font-size="10" font-family="sans-serif" opacity="0.5">@${username}</text>
</svg>`;
}
