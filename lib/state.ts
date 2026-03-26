import {MAX_COMMITS, type AnimationConfig} from './types';

export function calculateAnimationConfig(commitCount: number): AnimationConfig {
  if (commitCount === 0) {
    return {
      swimDuration: 0,
      tailSpeed: 0,
      opacity: 0.6,
      bubbleCount: 0,
      isSleeping: true,
    };
  }

  const count = Math.min(commitCount, MAX_COMMITS);

  return {
    swimDuration: 22 - count * 2,
    tailSpeed: 1.1 - count * 0.1,
    opacity: 1.0,
    bubbleCount: Math.round((count / MAX_COMMITS) * 8),
    isSleeping: false,
  };
}
