import type {AnimationConfig} from '../../types';
import {buildSwimPath, type FishRenderer, type SwimZone} from './common';

export const beluga: FishRenderer = {
  name: 'beluga',

  defs: `
    <radialGradient id="beluga-body" cx="0.35" cy="0.35" r="0.65">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#d8dfe8"/>
    </radialGradient>`,

  render(config: AnimationConfig, zone: SwimZone): string {
    const {swimDuration, opacity, tailSpeed, isSleeping} = config;

    const dur = (swimDuration * 1.3).toFixed(1);
    const tailDur = (tailSpeed * 1.5).toFixed(2);

    const swimAnimation = !isSleeping
      ? `<animateMotion dur="${dur}s" repeatCount="indefinite" rotate="auto" path="${buildSwimPath(zone.cx, zone.cy, zone.scale)}"/>`
      : '';

    const tailAnimation = !isSleeping
      ? `<animateTransform attributeName="transform" type="rotate" values="-8,0,0; 8,0,0; -8,0,0" dur="${tailDur}s" repeatCount="indefinite"/>`
      : '';

    const flipperAnimation = !isSleeping
      ? `<animateTransform attributeName="transform" type="rotate" values="0,0,5; 10,0,5; 0,0,5" dur="${tailDur}s" repeatCount="indefinite"/>`
      : '';

    const sleepTranslate = isSleeping
      ? `transform="translate(${zone.cx}, ${zone.cy})"`
      : '';

    return `
    <g opacity="${opacity}" ${sleepTranslate}>
      ${swimAnimation}
      <!-- body: plump rounded beluga shape -->
      <ellipse cx="0" cy="0" rx="28" ry="14" fill="url(#beluga-body)"/>
      <!-- melon (rounded forehead bump) -->
      <ellipse cx="-18" cy="-4" rx="14" ry="13" fill="#edf0f6"/>
      <!-- melon highlight -->
      <ellipse cx="-20" cy="-8" rx="8" ry="6" fill="white" opacity="0.4"/>
      <!-- body highlight -->
      <ellipse cx="0" cy="-5" rx="16" ry="5" fill="white" opacity="0.25"/>
      <!-- dorsal ridge (beluga has no dorsal fin) -->
      <path d="M-2,-14 Q4,-15.5 10,-14" fill="none" stroke="#cdd4de" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
      <!-- pectoral flipper -->
      <path d="M-4,10 Q2,20 -10,18 Z" fill="#cdd6e2" opacity="0.6">
        ${flipperAnimation}
      </path>
      <!-- tail flukes -->
      <g transform="translate(26, 0)">
        ${tailAnimation}
        <path d="M0,-3 Q4,-6 8,-12 Q10,-8 6,0 Q10,8 8,12 Q4,6 0,3 Z" fill="#cdd6e2"/>
      </g>
      <!-- eye -->
      <circle cx="-22" cy="-2" r="3" fill="white"/>
      <circle cx="-21.2" cy="-2" r="1.5" fill="#2a2a3e"/>
      <circle cx="-20.8" cy="-2.5" r="0.6" fill="white"/>
      <!-- mouth -->
      <path d="M-30,2 Q-32,4 -29,5" fill="none" stroke="#b8c0cc" stroke-width="1" stroke-linecap="round"/>
    </g>`;
  },
};
