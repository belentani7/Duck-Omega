import { describe, expect, it } from "vitest";
import { isProductionPaymentReady, resolvePaymentProvider } from "../shared/paymentProvider";

describe("provedor de pagamentos", () => {
  it("mantém o modo de teste pronto sem credenciais externas", () => {
    const config = resolvePaymentProvider({ requested: "test" });
    expect(config).toMatchObject({ provider: "test", configured: true });
    expect(isProductionPaymentReady(config)).toBe(true);
  });

  it("exige token para habilitar Mercado Pago", () => {
    const pending = resolvePaymentProvider({ requested: "mercado_pago" });
    expect(pending.configured).toBe(false);
    expect(isProductionPaymentReady(pending)).toBe(false);
    const ready = resolvePaymentProvider({ requested: "mercado_pago", mercadoPagoAccessToken: "live-token" });
    expect(ready.configured).toBe(true);
    expect(isProductionPaymentReady(ready)).toBe(true);
  });
});
