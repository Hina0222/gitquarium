import {goldfish} from './goldfish';
import {beluga} from './beluga';
import {clownfish} from './clownfish';
import type {FishRenderer} from './common';

export type {FishRenderer, SwimZone} from './common';
export {SWIM_ZONES} from './common';

// 순서 = 등장 우선순위. 새 물고기 추가 시 여기에 import & push만 하면 됨
export const fishRegistry: FishRenderer[] = [goldfish, clownfish, beluga];
