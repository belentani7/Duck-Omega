import { describe, expect, it, vi } from "vitest";

let mission = { userId: 7, currentStep: 1, started: 0, unlocked: 0 };

vi.mock("./db", async importOriginal => {
  const actual = await importOriginal<typeof import("./db")>();
  return {
    ...actual,
    getMissionProgress: vi.fn().mockImplementation(async () => mission),
    startMission: vi.fn().mockImplementation(async () => { mission = { ...mission, started: 1 }; return mission; }),
    advanceMission: vi.fn().mockImplementation(async (_userId: number, currentStep: number) => { mission = { ...mission, currentStep }; return mission; }),
    unlockMission: vi.fn().mockImplementation(async () => { if (mission.currentStep < 5) throw new Error("Complete todas as etapas da missão"); mission = { ...mission, started: 1, currentStep: 5, unlocked: 1 }; return mission; }),
  };
});

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const context = {
  user: { id: 7, openId: "owner", name: "Duck", email: "duck@example.com", loginMethod: "test", role: "owner", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
  req: { protocol: "https", headers: {} },
  res: {},
} as TrpcContext;

describe("missão persistida", () => {
  it("nega desbloqueio antes da última etapa", async () => {
    mission = { userId: 7, currentStep: 1, started: 1, unlocked: 0 };
    await expect(appRouter.createCaller(context).mission.unlock()).rejects.toThrow(/etapas/i);
  });

  it("lê, inicia, avança e restaura o desbloqueio", async () => {
    mission = { userId: 7, currentStep: 1, started: 0, unlocked: 0 };
    const caller = appRouter.createCaller(context);
    await expect(caller.mission.progress()).resolves.toMatchObject({ currentStep: 1, started: 0, unlocked: 0 });
    await expect(caller.mission.start()).resolves.toMatchObject({ started: 1 });
    await expect(caller.mission.advance({ currentStep: 3 })).resolves.toMatchObject({ currentStep: 3 });
    await expect(caller.mission.advance({ currentStep: 5 })).resolves.toMatchObject({ currentStep: 5 });
    await expect(caller.mission.unlock()).resolves.toMatchObject({ currentStep: 5, started: 1, unlocked: 1 });
    await expect(caller.mission.progress()).resolves.toMatchObject({ currentStep: 5, unlocked: 1 });
  });
});
