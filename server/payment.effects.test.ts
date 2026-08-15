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

  it("mantém checkout pago idempotente quando o contractKey já existe", () => {
    const paidOrder = { status: "paid", contractKey: "contracts/order-42.pdf" };
    expect(paidOrder.status).toBe("paid");
    expect(contractEffect(paidOrder.contractKey)).toBe("idempotent");
    expect(notificationEffect(false)).toBe("retryable");
    expect(notificationEffect(true)).toBe("sent");
  });

  it("separa efeitos do contrato e da notificação para permitir reprocessamento independente", () => {
    expect({ contract: contractEffect(undefined), notification: notificationEffect(false) }).toEqual({ contract: "generate", notification: "retryable" });
    expect({ contract: contractEffect("contracts/order-42.pdf"), notification: notificationEffect(true) }).toEqual({ contract: "idempotent", notification: "sent" });
  });
});
