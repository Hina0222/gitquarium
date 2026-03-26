import type {AnimationConfig} from '../../types';
import {buildSwimPath, type FishRenderer, type SwimZone} from './common';

export const clownfish: FishRenderer = {
  name: 'clownfish',

  defs: `
    <radialGradient id="clownfish-body" cx="0.3" cy="0.3" r="0.7">
      <stop offset="0%" stop-color="#ff8c42"/>
      <stop offset="100%" stop-color="#e8501a"/>
    </radialGradient>`,

  render(config: AnimationConfig, zone: SwimZone): string {
    const {swimDuration, opacity, tailSpeed, isSleeping} = config;

    const swimAnimation = !isSleeping
      ? `<animateMotion dur="${swimDuration}s" repeatCount="indefinite" rotate="auto" path="${buildSwimPath(zone.cx, zone.cy, zone.scale)}"/>`
      : '';

    const tailAnimation = !isSleeping
      ? `<animateTransform attributeName="transform" type="rotate" values="-12,0,0; 12,0,0; -12,0,0" dur="${tailSpeed}s" repeatCount="indefinite"/>`
      : '';

    const finAnimation = !isSleeping
      ? `<animateTransform attributeName="transform" type="rotate" values="0,5,8; 12,5,8; 0,5,8" dur="${tailSpeed}s" repeatCount="indefinite"/>`
      : '';

    const sleepTranslate = isSleeping
      ? `transform="translate(${zone.cx}, ${zone.cy})"`
      : '';

    return `
    <g opacity="${opacity}" ${sleepTranslate}>
      ${swimAnimation}
      <!-- body -->
      <ellipse cx="0" cy="0" rx="30" ry="16" fill="url(#clownfish-body)"/>
      <!-- body shine -->
      <ellipse cx="-4" cy="-5" rx="16" ry="6" fill="#ffb074" opacity="0.4"/>
      <!-- white stripes -->
      <path d="M-12,-16 Q-14,-4 -12,16" fill="none" stroke="white" stroke-width="4" opacity="0.9"/>
      <path d="M-12,-16 Q-14,-4 -12,16" fill="none" stroke="#1a1a2e" stroke-width="4.8" opacity="0.15"/>
      <path d="M6,-16 Q4,-2 6,16" fill="none" stroke="white" stroke-width="3.5" opacity="0.9"/>
      <path d="M6,-16 Q4,-2 6,16" fill="none" stroke="#1a1a2e" stroke-width="4.3" opacity="0.15"/>
      <path d="M22,-12 Q20,-1 22,12" fill="none" stroke="white" stroke-width="3" opacity="0.9"/>
      <path d="M22,-12 Q20,-1 22,12" fill="none" stroke="#1a1a2e" stroke-width="3.6" opacity="0.15"/>
      <!-- dorsal fin -->
      <polygon points="-8,-16 2,-26 14,-15" fill="#e8501a" opacity="0.85"/>
      <polygon points="-8,-16 2,-26 14,-15" fill="white" opacity="0.15"/>
      <!-- pectoral fin -->
      <polygon points="5,8 16,18 0,16" fill="#e8501a" opacity="0.7">
        ${finAnimation}
      </polygon>
      <!-- ventral fin -->
      <polygon points="-5,14 2,22 -12,16" fill="#e8501a" opacity="0.7"/>
      <!-- tail -->
      <g transform="translate(30, 0)">
        ${tailAnimation}
        <polygon points="0,-10 18,-16 18,16 0,10" fill="#e8501a"/>
        <!-- tail stripe hint -->
        <path d="M8,-14 Q7,0 8,14" fill="none" stroke="white" stroke-width="2" opacity="0.5"/>
      </g>
      <!-- eye -->
      <circle cx="-16" cy="-3" r="5.5" fill="white"/>
      <circle cx="-14.5" cy="-3" r="2.8" fill="#1a1a2e"/>
      <circle cx="-13.8" cy="-4" r="1" fill="white"/>
      <!-- eye ring -->
      <circle cx="-16" cy="-3" r="5.5" fill="none" stroke="#e8501a" stroke-width="1" opacity="0.5"/>
      <!-- mouth -->
      <path d="M-28,-1 Q-31,2 -28,4" fill="none" stroke="#c4400f" stroke-width="1.5" stroke-linecap="round"/>
    </g>`;
  },
};
