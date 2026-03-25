export enum FishState {
  ACTIVE = 'active',
  IDLE = 'idle',
  SLEEP = 'sleep',
}

export enum SwimDuration {
  FAST = '2s',
  SLOW = '5s',
  NONE = '0',
}

export enum TailSpeed {
  FAST = '0.3s',
  SLOW = '0.8s',
  NONE = '0',
}

export enum FishOpacity {
  VISIBLE = 1.0,
  FADED = 0.6,
}

export enum BubbleCount {
  MANY = 5,
  FEW = 2,
  NONE = 0,
}

export enum StateThreshold {
  ACTIVE_MAX_HOURS = 24,
  IDLE_MAX_HOURS = 72,
}

export interface StateConfig {
  state: FishState;
  animationDuration: SwimDuration;
  opacity: FishOpacity;
  bubbleCount: BubbleCount;
  tailSpeed: TailSpeed;
}

export const STATE_CONFIGS: Record<FishState, StateConfig> = {
  [FishState.ACTIVE]: {
    state: FishState.ACTIVE,
    animationDuration: SwimDuration.FAST,
    opacity: FishOpacity.VISIBLE,
    bubbleCount: BubbleCount.MANY,
    tailSpeed: TailSpeed.FAST,
  },
  [FishState.IDLE]: {
    state: FishState.IDLE,
    animationDuration: SwimDuration.SLOW,
    opacity: FishOpacity.VISIBLE,
    bubbleCount: BubbleCount.FEW,
    tailSpeed: TailSpeed.SLOW,
  },
  [FishState.SLEEP]: {
    state: FishState.SLEEP,
    animationDuration: SwimDuration.NONE,
    opacity: FishOpacity.FADED,
    bubbleCount: BubbleCount.NONE,
    tailSpeed: TailSpeed.NONE,
  },
};
