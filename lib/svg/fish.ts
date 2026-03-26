import type {AnimationConfig} from '../types';

const CANVAS_W = 400;
const CANVAS_H = 200;
const CX = CANVAS_W / 2;
const CY = CANVAS_H / 2;

const PADDING = 60;

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function randomPoint(scale: number): {x: number; y: number} {
  const rangeX = (CANVAS_W - PADDING * 2) * scale;
  const rangeY = (CANVAS_H - PADDING * 2) * scale;
  return {
    x: CX + rand(-rangeX / 2, rangeX / 2),
    y: CY + rand(-rangeY / 2, rangeY / 2),
  };
}

function buildSwimPath(scale: number): string {
  // 시작점 = 끝점 (루프)
  const start = randomPoint(scale);
  // 4-segment 큐빅 베지어, 컨트롤 포인트를 랜덤 생성
  const cp = Array.from({length: 12}, () => randomPoint(scale));

  return `M${start.x.toFixed(1)},${start.y.toFixed(1)}
    C${cp[0].x.toFixed(1)},${cp[0].y.toFixed(1)} ${cp[1].x.toFixed(1)},${cp[1].y.toFixed(1)} ${cp[2].x.toFixed(1)},${cp[2].y.toFixed(1)}
    C${cp[3].x.toFixed(1)},${cp[3].y.toFixed(1)} ${cp[4].x.toFixed(1)},${cp[4].y.toFixed(1)} ${cp[5].x.toFixed(1)},${cp[5].y.toFixed(1)}
    C${cp[6].x.toFixed(1)},${cp[6].y.toFixed(1)} ${cp[7].x.toFixed(1)},${cp[7].y.toFixed(1)} ${cp[8].x.toFixed(1)},${cp[8].y.toFixed(1)}
    C${cp[9].x.toFixed(1)},${cp[9].y.toFixed(1)} ${cp[10].x.toFixed(1)},${cp[10].y.toFixed(1)} ${start.x.toFixed(1)},${start.y.toFixed(1)}`;
}

export function renderFish(config: AnimationConfig): string {
  const {swimDuration, opacity, tailSpeed, isSleeping} = config;

  const swimAnimation = !isSleeping
    ? `<animateMotion dur="${swimDuration}s" repeatCount="indefinite" rotate="auto" path="${buildSwimPath(1.0)}"/>`
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
