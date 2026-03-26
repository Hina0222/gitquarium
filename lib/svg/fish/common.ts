import type {AnimationConfig} from '../../types';

export interface SwimZone {
  cx: number;
  cy: number;
  scale: number;
}

export interface FishRenderer {
  name: string;
  defs: string;
  render(config: AnimationConfig, zone: SwimZone): string;
}

export const SWIM_ZONES: SwimZone[] = [
  {cx: 200, cy: 100, scale: 1.0},
  {cx: 120, cy: 70, scale: 0.8},
  {cx: 300, cy: 130, scale: 0.75},
  {cx: 80, cy: 140, scale: 0.7},
  {cx: 320, cy: 60, scale: 0.65},
];

const CANVAS_W = 400;
const CANVAS_H = 200;
const PADDING = 60;

export function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function randomPoint(
  cx: number,
  cy: number,
  scale: number,
): {x: number; y: number} {
  const rangeX = (CANVAS_W - PADDING * 2) * scale;
  const rangeY = (CANVAS_H - PADDING * 2) * scale;
  return {
    x: cx + rand(-rangeX / 2, rangeX / 2),
    y: cy + rand(-rangeY / 2, rangeY / 2),
  };
}

export function buildSwimPath(cx: number, cy: number, scale: number): string {
  const start = randomPoint(cx, cy, scale);
  const cp = Array.from({length: 12}, () => randomPoint(cx, cy, scale));

  return `M${start.x.toFixed(1)},${start.y.toFixed(1)}
    C${cp[0].x.toFixed(1)},${cp[0].y.toFixed(1)} ${cp[1].x.toFixed(1)},${cp[1].y.toFixed(1)} ${cp[2].x.toFixed(1)},${cp[2].y.toFixed(1)}
    C${cp[3].x.toFixed(1)},${cp[3].y.toFixed(1)} ${cp[4].x.toFixed(1)},${cp[4].y.toFixed(1)} ${cp[5].x.toFixed(1)},${cp[5].y.toFixed(1)}
    C${cp[6].x.toFixed(1)},${cp[6].y.toFixed(1)} ${cp[7].x.toFixed(1)},${cp[7].y.toFixed(1)} ${cp[8].x.toFixed(1)},${cp[8].y.toFixed(1)}
    C${cp[9].x.toFixed(1)},${cp[9].y.toFixed(1)} ${cp[10].x.toFixed(1)},${cp[10].y.toFixed(1)} ${start.x.toFixed(1)},${start.y.toFixed(1)}`;
}
