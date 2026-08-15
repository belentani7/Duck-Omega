import { describe, expect, it } from "vitest";
import { TRPCError } from "@trpc/server";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type Role = "owner" | "producer" | "client";

function createContext(role: Role): TrpcContext {
  return {
    user: {
      id: role === "owner" ? 1 : role === "producer" ? 2 : 3,
      openId: `${role}-user`,
      email: `${role}@example.com`,
      name: role,
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("RBAC de configuração financeira", () => {
  it("permite que owner consulte o status do provedor", async () => {
    const result = await appRouter.createCaller(createContext("owner")).system.paymentProvider();

    expect(result).toMatchObject({ provider: expect.any(String), configured: expect.any(Boolean), ready: expect.any(Boolean) });
  });

  it.each(["producer", "client"] as const)("bloqueia %s no status do provedor", async role => {
    const call = appRouter.createCaller(createContext(role)).system.paymentProvider();

    await expect(call).rejects.toMatchObject<TRPCError>({ code: "FORBIDDEN" });
  });
});

export {};

