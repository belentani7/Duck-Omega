import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
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

  it("rejects a project without a valid title", async () => {
    const context = {
      ...publicContext,
      user: { id: 1, openId: "owner", name: "Duck", email: "duck@example.com", loginMethod: "test", role: "owner", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    } as TrpcContext;
    await expect(appRouter.createCaller(context).projects.create({ clientId: 1, title: "x", revisionLimit: 2 })).rejects.toThrow();
  });
});
