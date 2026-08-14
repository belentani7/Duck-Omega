import crypto from "node:crypto";
import type { Express, Request, Response } from "express";
import { createFileRecord, recordPaymentEvent } from "./db";
import { storageGetSignedUrl, storagePut } from "./storage";
import { sdk } from "./_core/sdk";

function safeEqualHex(expected: string, received: string) {
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(received, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function registerHttpRoutes(app: Express) {
  app.post("/api/files/upload", async (req: Request, res: Response) => {
    try {
      const { fileName, mimeType, contentBase64, projectId, clientId } = req.body ?? {};
      const user = await sdk.authenticateRequest(req as any);
      if (typeof fileName !== "string" || typeof mimeType !== "string" || typeof contentBase64 !== "string" || !user?.id) {
        return res.status(400).json({ error: "fileName, mimeType e contentBase64 são obrigatórios" });
      }
      if (!/^audio\/(mpeg|wav|x-wav|mp4)|application\/(pdf|zip)|video\//.test(mimeType)) {
        return res.status(415).json({ error: "Tipo MIME não permitido" });
      }
      const buffer = Buffer.from(contentBase64, "base64");
      if (buffer.byteLength > 50 * 1024 * 1024) return res.status(413).json({ error: "O arquivo ultrapassa 50 MB" });
      const sha256 = crypto.createHash("sha256").update(buffer).digest("hex");
      const stored = await storagePut(`duck/files/${user.id}/${sha256}-${fileName}`, buffer, mimeType);
      const id = await createFileRecord({ fileName, mimeType, sizeBytes: buffer.byteLength, sha256, storageKey: stored.key, uploadedBy: user.id, projectId: typeof projectId === "number" ? projectId : undefined, clientId: typeof clientId === "number" ? clientId : undefined, visibility: "private", version: 1 });
      return res.status(201).json({ id, key: stored.key, url: stored.url, sha256 });
    } catch (error) {
      console.error("[Files] upload failed", error);
      return res.status(500).json({ error: "Não foi possível salvar o arquivo" });
    }
  });

  app.get("/api/files/:key(*)/signed-url", async (req: Request, res: Response) => {
    try {
      const user = await sdk.authenticateRequest(req as any);
      if (!user?.id) return res.status(401).json({ error: "Autenticação necessária" });
      const url = await storageGetSignedUrl(req.params.key);
      return res.json({ url, expiresInSeconds: 300 });
    } catch (error) {
      console.error("[Files] signed url failed", error);
      return res.status(500).json({ error: "Não foi possível gerar o download" });
    }
  });

  app.post("/api/payments/webhook", async (req: Request, res: Response) => {
    const rawBody = (req as Request & { rawBody?: Buffer }).rawBody;
    const payload = rawBody?.toString("utf8") ?? JSON.stringify(req.body ?? {});
    const signature = String(req.header("x-duck-signature") || "");
    const eventId = String(req.body?.id || req.body?.event_id || "");
    const secret = process.env.DUCK_PAYMENT_WEBHOOK_SECRET || "";
    const expected = secret ? crypto.createHmac("sha256", secret).update(payload).digest("hex") : "";
    if (!eventId || !secret || !signature || !safeEqualHex(expected, signature)) return res.status(401).json({ error: "Assinatura inválida" });
    const event = await recordPaymentEvent({ provider: String(req.body?.provider || "test"), eventId, orderId: typeof req.body?.orderId === "number" ? req.body.orderId : undefined, payload, signatureValid: 1 });
    if (event.duplicate) return res.status(200).json({ received: true, duplicate: true });
    return res.status(200).json({ received: true, processed: true });
  });
}
