import { describe, expect, it, vi } from "vitest";

let currentStatus: "pending" | "paid" | "failed" | "cancelled" = "pending";

vi.mock("./db", async importOriginal => {
  const actual = await importOriginal<typeof import("./db")>();
  return {
    ...actual,
    createTestOrder: vi.fn().mockImplementation(async () => ({ id: 42, status: "pending" })),
    getOrder: vi.fn().mockImplementation(async () => ({ id: 42, status: currentStatus, buyerEmail: "cliente@example.com" })),
    transitionOrder: vi.fn().mockImplementation(async (_id: number, next: "paid" | "failed" | "cancelled" | "refunded") => {
      if (!actual.canTransitionOrder(currentStatus, next)) throw new Error(`Transição inválida: ${currentStatus} para ${next}`);
      currentStatus = next as typeof currentStatus;
      return { id: 42, status: currentStatus };
    }),
  };
});

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const ownerContext = {
  user: { id: 1, openId: "owner", name: "Duck", email: "duck@example.com", loginMethod: "test", role: "owner", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
  req: { protocol: "https", headers: {} },
  res: {},
} as TrpcContext;

describe("checkout router", () => {
  it("cria, consulta e transiciona um pedido de teste", async () => {
    currentStatus = "pending";
    const caller = appRouter.createCaller(ownerContext);
    await expect(caller.checkout.createTestOrder({ buyerEmail: "cliente@example.com", beatId: 42, licenseType: "non_exclusive", totalCents: 15000 })).resolves.toEqual({ id: 42, status: "pending" });
    await expect(caller.checkout.status({ orderId: 42 })).resolves.toMatchObject({ id: 42, status: "pending" });
    await expect(caller.checkout.transition({ orderId: 42, status: "paid" })).resolves.toEqual({ id: 42, status: "paid" });
  });

  it.each(["paid", "failed", "cancelled"] as const)("permite pending para %s", async nextStatus => {
    currentStatus = "pending";
    await expect(appRouter.createCaller(ownerContext).checkout.transition({ orderId: 42, status: nextStatus })).resolves.toEqual({ id: 42, status: nextStatus });
  });

  it("rejeita uma transição inválida de paid para cancelled", async () => {
    currentStatus = "paid";
    await expect(appRouter.createCaller(ownerContext).checkout.transition({ orderId: 42, status: "cancelled" })).rejects.toThrow(/inválida/i);
  });

  it("permite transições apenas com papel de produtor", async () => {
    const clientContext = { ...ownerContext, user: { ...ownerContext.user, role: "client" } } as TrpcContext;
    await expect(appRouter.createCaller(clientContext).checkout.transition({ orderId: 42, status: "paid" })).rejects.toThrow(/produtor/i);
  });
});
