import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { canTransitionOrder } from "./db";
import type { TrpcContext } from "./_core/context";

const publicContext = {
  user: null,
  req: { protocol: "https", headers: {} },
  res: {} as TrpcContext["res"],
} as TrpcContext;

const ownerContext = {
  ...publicContext,
  user: { id: 1, openId: "owner", name: "Duck", email: "duck@example.com", loginMethod: "test", role: "owner", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
} as TrpcContext;

const clientContext = {
  ...publicContext,
  user: { id: 2, openId: "client", name: "Cliente", email: "cliente@example.com", loginMethod: "test", role: "client", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
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
    await expect(appRouter.createCaller(clientContext).projects.create({ clientId: 1, title: "Projeto válido", revisionLimit: 2 })).rejects.toThrow(/produtor/i);
  });

  it("rejects a project without a valid title", async () => {
    await expect(appRouter.createCaller(ownerContext).projects.create({ clientId: 1, title: "x", revisionLimit: 2 })).rejects.toThrow();
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
    await expect(appRouter.createCaller(ownerContext).projects.addComment({ revisionId: 1, body: "Entrada no refrão", timestampMs: -1 })).rejects.toThrow();
    await expect(appRouter.createCaller(ownerContext).projects.addComment({ revisionId: 1, body: "Entrada no refrão", timestampMs: 0 })).rejects.toThrow(/revisão|database|connect/i);
  });

  it("enforces the server-side revision limit bounds", async () => {
    await expect(appRouter.createCaller(ownerContext).projects.create({ clientId: 1, title: "Projeto válido", revisionLimit: 21 })).rejects.toThrow();
    await expect(appRouter.createCaller(ownerContext).projects.create({ clientId: 1, title: "Projeto válido", revisionLimit: -1 })).rejects.toThrow();
  });
});

describe("Duck Hub operational access contracts", () => {
  it("validates CRM email input before attempting persistence", async () => {
    await expect(appRouter.createCaller(ownerContext).clients.create({ name: "Cliente válido", email: "email-invalido" })).rejects.toThrow();
  });

  it("exposes client history only to producers and returns a stable aggregate shape", async () => {
    await expect(appRouter.createCaller(clientContext).clients.history({ clientId: 1 })).rejects.toThrow(/produtor|autoriz/i);
    await expect(appRouter.createCaller(ownerContext).clients.history({ clientId: 0 })).rejects.toThrow();
    await expect(appRouter.createCaller(ownerContext).clients.history({ clientId: 1 })).resolves.toEqual({ projects: [], orders: [], activity: [] });
  });

  it("keeps project deliverable queries and mutations producer-only", async () => {
    await expect(appRouter.createCaller(clientContext).projects.deliverables({ projectId: 1 })).rejects.toThrow(/produtor|autoriz/i);
    await expect(appRouter.createCaller(clientContext).projects.createDeliverable({ projectId: 1, title: "Mix final" })).rejects.toThrow(/produtor|autoriz/i);
    await expect(appRouter.createCaller(clientContext).projects.updateDeliverable({ deliverableId: 1, status: "approved" })).rejects.toThrow(/produtor|autoriz/i);
    await expect(appRouter.createCaller(ownerContext).projects.deliverables({ projectId: 1 })).resolves.toEqual(expect.any(Array));
    await expect(appRouter.createCaller(ownerContext).projects.createDeliverable({ projectId: 1, title: "x" })).rejects.toThrow();
    await expect(appRouter.createCaller(ownerContext).projects.updateDeliverable({ deliverableId: 1, status: "invalid" as "approved" })).rejects.toThrow();
  });

  it("keeps mission progress protected and validates step bounds", async () => {
    await expect(appRouter.createCaller(publicContext).mission.progress()).rejects.toThrow();
    await expect(appRouter.createCaller(ownerContext).mission.advance({ currentStep: 0 })).rejects.toThrow();
    await expect(appRouter.createCaller(ownerContext).mission.advance({ currentStep: 21 })).rejects.toThrow();
  });
});
