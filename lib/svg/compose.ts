import type {AnimationConfig} from '../types';
import {renderBackground} from './background';
import {renderBubbles} from './bubbles';
import {renderFish} from './fish';

const WIDTH = 400;
const HEIGHT = 200;

export function composeSvg(config: AnimationConfig, username: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <radialGradient id="fishBody" cx="0.3" cy="0.3" r="0.7">
      <stop offset="0%" stop-color="#ffe066"/>
      <stop offset="100%" stop-color="#f4a832"/>
    </radialGradient>
  </defs>
  ${renderBackground(WIDTH, HEIGHT)}
  ${renderFish(config)}
  ${renderBubbles(config.bubbleCount)}
  <text x="10" y="${HEIGHT - 10}" fill="white" font-size="10" font-family="sans-serif" opacity="0.5">@${username}</text>
</svg>`;
}
