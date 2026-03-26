export interface AnimationConfig {
  swimDuration: number;
  tailSpeed: number;
  opacity: number;
  bubbleCount: number;
  isSleeping: boolean;
  fishCount: number;
}

export interface GitHubActivity {
  commitCount: number;
  streakDays: number;
}

export const MAX_COMMITS = 10;
export const MAX_FISH = 5;
