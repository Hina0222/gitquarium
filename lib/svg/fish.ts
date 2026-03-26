import type {AnimationConfig} from '../types';

const CANVAS_W = 400;
const CANVAS_H = 200;
const CX = CANVAS_W / 2;
const CY = CANVAS_H / 2;

function lerp(center: number, target: number, scale: number): number {
  return center + (target - center) * scale;
}

function buildSwimPath(scale: number): string {
  const PADDING = 60;
  // 기존 FAST 경로의 각 포인트를 캔버스 중심 기준으로 scale 적용
  const points = [
    // M start
    {x: PADDING, y: CANVAS_H / 2},
    // C1
    {x: CANVAS_W * 0.3, y: PADDING},
    {x: CANVAS_W * 0.7, y: CANVAS_H - PADDING},
    {x: CANVAS_W - PADDING, y: CANVAS_H * 0.35},
    // C2
    {x: CANVAS_W * 0.85, y: PADDING * 0.8},
    {x: CANVAS_W * 0.5, y: PADDING},
    {x: CANVAS_W * 0.35, y: CANVAS_H * 0.45},
    // C3
    {x: CANVAS_W * 0.2, y: CANVAS_H * 0.6},
    {x: CANVAS_W * 0.6, y: CANVAS_H - PADDING},
    {x: CANVAS_W * 0.75, y: CANVAS_H * 0.55},
    // C4
    {x: CANVAS_W * 0.9, y: CANVAS_H * 0.4},
    {x: CANVAS_W * 0.15, y: CANVAS_H * 0.3},
    {x: PADDING, y: CANVAS_H / 2},
  ];

  const s = points.map(p => ({
    x: lerp(CX, p.x, scale),
    y: lerp(CY, p.y, scale),
  }));

  return `M${s[0].x},${s[0].y}
    C${s[1].x},${s[1].y} ${s[2].x},${s[2].y} ${s[3].x},${s[3].y}
    C${s[4].x},${s[4].y} ${s[5].x},${s[5].y} ${s[6].x},${s[6].y}
    C${s[7].x},${s[7].y} ${s[8].x},${s[8].y} ${s[9].x},${s[9].y}
    C${s[10].x},${s[10].y} ${s[11].x},${s[11].y} ${s[12].x},${s[12].y}`;
}

export function renderFish(config: AnimationConfig): string {
  const {swimDuration, opacity, tailSpeed, isSleeping} = config;

  const swimAnimation = !isSleeping
    ? `<animateMotion dur="${swimDuration}s" repeatCount="indefinite" rotate="auto" path="${buildSwimPath(swimDuration <= 2.5 ? 1.0 : swimDuration <= 4.0 ? 0.6 : 0.3)}"/>`
    : '';

  const tailAnimation = !isSleeping
    ? `<animateTransform attributeName="transform" type="rotate" values="-15,0,0; 15,0,0; -15,0,0" dur="${tailSpeed}s" repeatCount="indefinite"/>`
    : '';

  const sleepTranslate = isSleeping ? 'transform="translate(200, 100)"' : '';

  return `
    <g opacity="${opacity}" ${sleepTranslate}>
      ${swimAnimation}
      <!-- body -->
      <ellipse cx="0" cy="0" rx="35" ry="18" fill="#f4a832"/>
      <ellipse cx="0" cy="0" rx="35" ry="18" fill="url(#fishBody)" opacity="0.3"/>
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
    </g>
  `;
}
