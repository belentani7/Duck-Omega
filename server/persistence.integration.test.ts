import { beforeEach, describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { resetIsolatedCheckoutAndMission } from "./db";
import type { TrpcContext } from "./_core/context";

const ownerContext = {
  user: { id: 77, openId: "duck-persistence", name: "Duck", email: "duck@example.com", loginMethod: "test", role: "owner", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
  req: { protocol: "https", headers: {} },
  res: {},
} as TrpcContext;

const clientContext = { ...ownerContext, user: { ...ownerContext.user, role: "client" } } as TrpcContext;

describe("persistência isolada pelos callers tRPC reais", () => {
  beforeEach(() => {
    process.env.NODE_ENV = "test";
    resetIsolatedCheckoutAndMission();
  });

  it("cria um pedido e status lê o registro persistido", async () => {
    const caller = appRouter.createCaller(ownerContext);
    const created = await caller.checkout.createTestOrder({ buyerEmail: "cliente@example.com", beatId: 9, licenseType: "non_exclusive", totalCents: 18000 });
    expect(created).toMatchObject({ id: 1, status: "pending", provider: "test" });
    await expect(caller.checkout.status({ orderId: created.id })).resolves.toMatchObject({ id: 1, buyerEmail: "cliente@example.com", status: "pending", totalCents: 18000 });
    await expect(caller.checkout.transition({ orderId: created.id, status: "paid" })).resolves.toMatchObject({ id: 1, status: "paid" });
    await expect(caller.checkout.status({ orderId: created.id })).resolves.toMatchObject({ status: "paid" });
  });

  it("mantém a máquina de estados fail-closed no pedido isolado", async () => {
    const caller = appRouter.createCaller(ownerContext);
    const created = await caller.checkout.createTestOrder({ buyerEmail: "cliente@example.com", beatId: 10, licenseType: "exclusive", totalCents: 25000 });
    await caller.checkout.transition({ orderId: created.id, status: "paid" });
    await expect(caller.checkout.transition({ orderId: created.id, status: "cancelled" })).rejects.toThrow(/inválida/i);
    await expect(caller.checkout.status({ orderId: created.id })).resolves.toMatchObject({ status: "paid" });
  });

  it("protege a transição de checkout para produtor", async () => {
    const caller = appRouter.createCaller(clientContext);
    await expect(caller.checkout.transition({ orderId: 1, status: "paid" })).rejects.toThrow(/produtor/i);
  });

  it("persiste início, avanço e desbloqueio da missão pelo router real", async () => {
    const caller = appRouter.createCaller(ownerContext);
    await expect(caller.mission.progress()).resolves.toMatchObject({ userId: 77, currentStep: 1, started: 0, unlocked: 0 });
    await expect(caller.mission.start()).resolves.toMatchObject({ started: 1, currentStep: 1 });
    await expect(caller.mission.advance({ currentStep: 3 })).resolves.toMatchObject({ currentStep: 3, started: 1, unlocked: 0 });
    await expect(caller.mission.advance({ currentStep: 5 })).resolves.toMatchObject({ currentStep: 5 });
    await expect(caller.mission.unlock()).resolves.toMatchObject({ currentStep: 5, started: 1, unlocked: 1 });
    await expect(caller.mission.progress()).resolves.toMatchObject({ currentStep: 5, unlocked: 1 });
  });

  it("nega desbloqueio antes da quinta etapa sem perder o estado", async () => {
    const caller = appRouter.createCaller(ownerContext);
    await caller.mission.start();
    await caller.mission.advance({ currentStep: 2 });
    await expect(caller.mission.unlock()).rejects.toThrow(/etapas/i);
    await expect(caller.mission.progress()).resolves.toMatchObject({ currentStep: 2, started: 1, unlocked: 0 });
  });
});
