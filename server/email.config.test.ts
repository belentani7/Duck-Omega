import { describe, expect, it } from "vitest";
import { resolveEmailConfig } from "../shared/emailConfig";

describe("configuração de email transacional", () => {
  it("permanece desativada quando as credenciais SMTP não existem", () => {
    const config = resolveEmailConfig({});
    expect(config.enabled).toBe(false);
    expect(config.host).toBeUndefined();
  });

  it("só habilita com o conjunto completo de configuração", () => {
    const config = resolveEmailConfig({
      SMTP_HOST: "smtp.example.com",
      SMTP_PORT: "587",
      SMTP_USER: "duck@example.com",
      SMTP_PASS: "app-password",
      SMTP_FROM: "Duck Hub <duck@example.com>",
    });
    expect(config).toMatchObject({ enabled: true, host: "smtp.example.com", port: 587, user: "duck@example.com" });
  });
});
