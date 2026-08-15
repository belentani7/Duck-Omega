import { describe, expect, it } from "vitest";
import { buildContractPdf } from "./contracts";

describe("contrato PDF", () => {
  it("genera un documento PDF operacional con pedido y licencia", async () => {
    const bytes = await buildContractPdf({
      orderId: 42,
      buyerEmail: "cliente@example.com",
      beatTitle: "Gema 01",
      licenseType: "non_exclusive",
      totalCents: 12900,
      provider: "test",
      createdAt: new Date("2026-08-15T00:00:00Z"),
    });
    expect(Buffer.from(bytes).subarray(0, 5).toString()).toBe("%PDF-");
    expect(bytes.byteLength).toBeGreaterThan(900);
  });
});
