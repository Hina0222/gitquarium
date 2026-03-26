import type {AnimationConfig} from '../../types';
import {buildSwimPath, type FishRenderer, type SwimZone} from './common';

export const goldfish: FishRenderer = {
  name: 'goldfish',

  defs: `
    <radialGradient id="goldfish-body" cx="0.3" cy="0.3" r="0.7">
      <stop offset="0%" stop-color="#ffe066"/>
      <stop offset="100%" stop-color="#f4a832"/>
    </radialGradient>`,

  render(config: AnimationConfig, zone: SwimZone): string {
    const {swimDuration, opacity, tailSpeed, isSleeping} = config;

    const swimAnimation = !isSleeping
      ? `<animateMotion dur="${swimDuration}s" repeatCount="indefinite" rotate="auto" path="${buildSwimPath(zone.cx, zone.cy, zone.scale)}"/>`
      : '';

    const tailAnimation = !isSleeping
      ? `<animateTransform attributeName="transform" type="rotate" values="-15,0,0; 15,0,0; -15,0,0" dur="${tailSpeed}s" repeatCount="indefinite"/>`
      : '';

    const sleepTranslate = isSleeping
      ? `transform="translate(${zone.cx}, ${zone.cy})"`
      : '';

    return `
    <g opacity="${opacity}" ${sleepTranslate}>
      ${swimAnimation}
      <!-- body -->
      <ellipse cx="0" cy="0" rx="35" ry="18" fill="#f4a832"/>
      <ellipse cx="0" cy="0" rx="35" ry="18" fill="url(#goldfish-body)" opacity="0.3"/>
      <!-- body shine -->
      <ellipse cx="-5" cy="-6" rx="20" ry="8" fill="#ffd966" opacity="0.4"/>
      <!-- dorsal fin -->
      <polygon points="-5,-18 5,-30 15,-16" fill="#e8912d" opacity="0.85"/>
      <!-- pectoral fin -->
      <polygon points="5,8 18,20 0,18" fill="#e8912d" opacity="0.7">
        ${!isSleeping ? `<animateTransform attributeName="transform" type="rotate" values="0,5,8; 15,5,8; 0,5,8" dur="${tailSpeed}s" repeatCount="indefinite"/>` : ''}
      </polygon>
      <!-- tail -->
      <g transform="translate(35, 0)">
        ${tailAnimation}
        <polygon points="0,-12 22,-20 22,20 0,12" fill="#e8912d"/>
      </g>
      <!-- eye -->
      <circle cx="-18" cy="-4" r="6" fill="white"/>
      <circle cx="-16" cy="-4" r="3" fill="#1a1a2e"/>
      <circle cx="-15" cy="-5" r="1" fill="white"/>
      <!-- mouth -->
      <path d="M-33,-2 Q-36,2 -33,4" fill="none" stroke="#d4872a" stroke-width="1.5" stroke-linecap="round"/>
      <!-- scales pattern -->
      <path d="M-10,0 Q-5,-5 0,0 Q5,5 10,0" fill="none" stroke="#d4872a" stroke-width="0.5" opacity="0.3"/>
      <path d="M-5,6 Q0,1 5,6 Q10,11 15,6" fill="none" stroke="#d4872a" stroke-width="0.5" opacity="0.3"/>
    </g>`;
  },
};
