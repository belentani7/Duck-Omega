export type PaymentProviderName = "test" | "mercado_pago";

export type PaymentProviderConfig = {
  provider: PaymentProviderName;
  configured: boolean;
  requiresProductionSecrets: boolean;
};

export function resolvePaymentProvider(input: {
  requested?: string;
  mercadoPagoAccessToken?: string;
}): PaymentProviderConfig {
  const requested = input.requested?.toLowerCase();
  if (requested === "mercado_pago") {
    return {
      provider: "mercado_pago",
      configured: Boolean(input.mercadoPagoAccessToken),
      requiresProductionSecrets: true,
    };
  }
  return { provider: "test", configured: true, requiresProductionSecrets: false };
}

export function isProductionPaymentReady(config: PaymentProviderConfig) {
  return config.provider === "test" || config.configured;
}
