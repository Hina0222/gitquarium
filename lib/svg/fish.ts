import {SwimDuration, TailSpeed, type StateConfig} from '../types';

// 물고기 크기를 고려한 패딩 (몸통 rx=35 + 꼬리 22)
const PADDING = 60;
const CANVAS_W = 400;
const CANVAS_H = 200;

// 캔버스 전체를 돌아다니는 경로 (SVG path)
// active: 넓고 빠르게, idle: 좁고 느리게
function buildSwimPath(state: SwimDuration): string {
  if (state === SwimDuration.FAST) {
    // 캔버스 전체를 크게 순회
    return `M${PADDING},${CANVAS_H / 2}
      C${CANVAS_W * 0.3},${PADDING} ${CANVAS_W * 0.7},${CANVAS_H - PADDING} ${CANVAS_W - PADDING},${CANVAS_H * 0.35}
      C${CANVAS_W * 0.85},${PADDING * 0.8} ${CANVAS_W * 0.5},${PADDING} ${CANVAS_W * 0.35},${CANVAS_H * 0.45}
      C${CANVAS_W * 0.2},${CANVAS_H * 0.6} ${CANVAS_W * 0.6},${CANVAS_H - PADDING} ${CANVAS_W * 0.75},${CANVAS_H * 0.55}
      C${CANVAS_W * 0.9},${CANVAS_H * 0.4} ${CANVAS_W * 0.15},${CANVAS_H * 0.3} ${PADDING},${CANVAS_H / 2}`;
  }
  // idle: 중앙 부근에서 느긋하게 이동
  return `M${CANVAS_W * 0.25},${CANVAS_H * 0.5}
    C${CANVAS_W * 0.4},${CANVAS_H * 0.3} ${CANVAS_W * 0.6},${CANVAS_H * 0.65} ${CANVAS_W * 0.7},${CANVAS_H * 0.45}
    C${CANVAS_W * 0.75},${CANVAS_H * 0.35} ${CANVAS_W * 0.5},${CANVAS_H * 0.55} ${CANVAS_W * 0.25},${CANVAS_H * 0.5}`;
}

export function renderFish(config: StateConfig): string {
  const {animationDuration, opacity, tailSpeed} = config;
  const hasSwimAnimation = animationDuration !== SwimDuration.NONE;
  const hasTailAnimation = tailSpeed !== TailSpeed.NONE;

  // animateMotion으로 경로를 따라 이동 + rotate="auto"로 진행 방향에 맞춰 회전
  const swimAnimation = hasSwimAnimation
    ? `<animateMotion dur="${animationDuration === SwimDuration.FAST ? '8s' : '15s'}" repeatCount="indefinite" rotate="auto" path="${buildSwimPath(animationDuration)}"/>`
    : '';

  const tailAnimation = hasTailAnimation
    ? `<animateTransform attributeName="transform" type="rotate" values="-15,0,0; 15,0,0; -15,0,0" dur="${tailSpeed}" repeatCount="indefinite"/>`
    : '';

  // sleep 상태: 캔버스 중앙에 고정
  const sleepTranslate = !hasSwimAnimation ? 'transform="translate(200, 100)"' : '';

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
        ${hasTailAnimation ? `<animateTransform attributeName="transform" type="rotate" values="0,5,8; 15,5,8; 0,5,8" dur="${tailSpeed}" repeatCount="indefinite"/>` : ''}
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
