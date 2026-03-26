import {MAX_COMMITS, MAX_FISH, type AnimationConfig, type GitHubActivity} from './types';

export function calculateAnimationConfig(activity: GitHubActivity): AnimationConfig {
  const {commitCount, streakDays} = activity;
  const fishCount = Math.min(1 + Math.floor(streakDays / 3), MAX_FISH);

  if (commitCount === 0) {
    return {
      swimDuration: 0,
      tailSpeed: 0,
      opacity: 0.6,
      bubbleCount: 0,
      isSleeping: true,
      fishCount,
    };
  }

  const count = Math.min(commitCount, MAX_COMMITS);

  return {
    swimDuration: 22 - count * 2,
    tailSpeed: 1.1 - count * 0.1,
    opacity: 1.0,
    bubbleCount: Math.round((count / MAX_COMMITS) * 8),
    isSleeping: false,
    fishCount,
  };
}
