import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { canTransitionOrder } from "./db";
import type { TrpcContext } from "./_core/context";

const publicContext = {
  user: null,
  req: { protocol: "https", headers: {} },
  res: {} as TrpcContext["res"],
} as TrpcContext;

describe("Duck Hub core contracts", () => {
  it("reports a healthy service", async () => {
    const result = await appRouter.createCaller(publicContext).system.health();
    expect(result).toEqual({ ok: true, service: "duck-hub" });
  });

  it("exposes a public catalog query without authentication", async () => {
    const result = await appRouter.createCaller(publicContext).catalog.publicList();
    expect(Array.isArray(result)).toBe(true);
  });

  it("blocks a client from producer-only project creation", async () => {
    const clientContext = { ...publicContext, user: { id: 2, openId: "client", name: "Cliente", email: "cliente@example.com", loginMethod: "test", role: "client", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() } } as TrpcContext;
    await expect(appRouter.createCaller(clientContext).projects.create({ clientId: 1, title: "Projeto válido", revisionLimit: 2 })).rejects.toThrow(/produtor/i);
  });

  it("rejects a project without a valid title", async () => {
    const context = {
      ...publicContext,
      user: { id: 1, openId: "owner", name: "Duck", email: "duck@example.com", loginMethod: "test", role: "owner", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    } as TrpcContext;
    await expect(appRouter.createCaller(context).projects.create({ clientId: 1, title: "x", revisionLimit: 2 })).rejects.toThrow();
  });

  it("covers valid and invalid checkout transitions", () => {
    expect(canTransitionOrder("pending", "paid")).toBe(true);
    expect(canTransitionOrder("pending", "failed")).toBe(true);
    expect(canTransitionOrder("pending", "cancelled")).toBe(true);
    expect(canTransitionOrder("paid", "cancelled")).toBe(false);
  });

  it("rejects invalid checkout state inputs", async () => {
    await expect(appRouter.createCaller(publicContext).checkout.createTestOrder({ buyerEmail: "cliente@example.com", beatId: 1, licenseType: "non_exclusive", totalCents: 0 })).rejects.toThrow();
    await expect(appRouter.createCaller(publicContext).checkout.status({ orderId: 0 })).rejects.toThrow();
  });

  it("validates timestamp comments before calling the backend", async () => {
    const context = { ...publicContext, user: { id: 1, openId: "owner", name: "Duck", email: "duck@example.com", loginMethod: "test", role: "owner", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() } } as TrpcContext;
    await expect(appRouter.createCaller(context).projects.addComment({ revisionId: 1, body: "Entrada no refrão", timestampMs: -1 })).rejects.toThrow();
  });
});
