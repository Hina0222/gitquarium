import {
  FishState,
  StateThreshold,
  STATE_CONFIGS,
  type StateConfig,
} from './types';

export function calculateState(lastActivity: Date | null): StateConfig {
  if (!lastActivity) {
    return STATE_CONFIGS[FishState.SLEEP];
  }

  const hoursAgo =
    (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60);

  if (hoursAgo <= StateThreshold.ACTIVE_MAX_HOURS) {
    return STATE_CONFIGS[FishState.ACTIVE];
  }

  if (hoursAgo <= StateThreshold.IDLE_MAX_HOURS) {
    return STATE_CONFIGS[FishState.IDLE];
  }

  return STATE_CONFIGS[FishState.SLEEP];
}
