export type EmailConfig = {
  enabled: boolean;
  host?: string;
  port?: number;
  user?: string;
  from?: string;
};

export function resolveEmailConfig(env: NodeJS.ProcessEnv = process.env): EmailConfig {
  const host = env.SMTP_HOST?.trim();
  const port = Number(env.SMTP_PORT || 587);
  const user = env.SMTP_USER?.trim();
  const from = env.SMTP_FROM?.trim();
  return {
    enabled: Boolean(host && Number.isInteger(port) && port > 0 && user && env.SMTP_PASS && from),
    host,
    port,
    user,
    from,
  };
}
