export type PersistedMissionState = {
  currentStep: number;
  started: number;
  unlocked: number;
};

export function resolveMissionState(input: {
  authenticated: boolean;
  localStarted: boolean;
  localUnlocked: boolean;
  persisted?: PersistedMissionState;
}) {
  if (input.authenticated && input.persisted) {
    return {
      currentStep: Math.max(1, input.persisted.currentStep),
      started: Boolean(input.persisted.started),
      unlocked: Boolean(input.persisted.unlocked),
    };
  }
  return {
    currentStep: 1,
    started: input.authenticated ? false : input.localStarted,
    unlocked: false,
  };
}
