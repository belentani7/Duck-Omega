import { describe, expect, it } from "vitest";
import { contractEffect, notificationEffect } from "../shared/paymentEffects";

describe("efectos post-pago", () => {
  it("genera contrato solo cuando no existe una clave persistida", () => {
    expect(contractEffect(undefined)).toBe("generate");
    expect(contractEffect(null)).toBe("generate");
    expect(contractEffect("contracts/order-9.pdf")).toBe("idempotent");
  });

  it("marca la notificación no entregada como reintentable", () => {
    expect(notificationEffect(true)).toBe("sent");
    expect(notificationEffect(false)).toBe("retryable");
  });
});
