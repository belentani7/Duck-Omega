import { describe, expect, it } from "vitest";
import { resolveMissionState } from "../shared/missionState";

describe("estado visual de misión", () => {
  it("mantiene bloqueado el núcleo cuando el backend devuelve unlocked 0", () => {
    const state = resolveMissionState({
      authenticated: true,
      localStarted: true,
      localUnlocked: true,
      persisted: { currentStep: 5, started: 1, unlocked: 0 },
    });
    expect(state).toEqual({ currentStep: 5, started: true, unlocked: false });
  });

  it("no permite desbloqueo local para usuarios no autenticados", () => {
    const state = resolveMissionState({
      authenticated: false,
      localStarted: true,
      localUnlocked: true,
    });
    expect(state).toEqual({ currentStep: 1, started: true, unlocked: false });
  });
});
