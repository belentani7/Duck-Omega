import crypto from "node:crypto";
import http from "node:http";
import express from "express";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { registerHttpRoutes } from "./httpRoutes";
import * as db from "./db";
import * as storage from "./storage";
import { sdk } from "./_core/sdk";

let server: http.Server;
let baseUrl = "";

function requestJson(path: string, options: { method?: string; body?: unknown; headers?: Record<string, string> } = {}) {
  return new Promise<{ status: number; body: any }>((resolve, reject) => {
    const body = options.body === undefined ? "" : JSON.stringify(options.body);
    const url = new URL(path, baseUrl);
    const req = http.request(url, {
      method: options.method ?? "GET",
      headers: { ...(body ? { "content-type": "application/json", "content-length": Buffer.byteLength(body) } : {}), ...(options.headers ?? {}) },
    }, res => {
      let raw = "";
      res.setEncoding("utf8");
      res.on("data", chunk => { raw += chunk; });
      res.on("end", () => {
        let parsed: unknown = raw;
        try { parsed = raw ? JSON.parse(raw) : null; } catch { /* keep text */ }
        resolve({ status: res.statusCode ?? 0, body: parsed });
      });
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

describe("HTTP route integration contracts", () => {
  beforeAll(async () => {
    const app = express();
    app.use(express.json({ limit: "80mb", verify: (req, _res, buffer) => { (req as any).rawBody = Buffer.from(buffer); } }));
    registerHttpRoutes(app);
    server = http.createServer(app);
    await new Promise<void>(resolve => server.listen(0, "127.0.0.1", () => resolve()));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("Servidor de teste não iniciou");
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    await new Promise<void>(resolve => server.close(() => resolve()));
  });

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(sdk, "authenticateRequest").mockResolvedValue({ id: 7, role: "owner" } as any);
    vi.spyOn(storage, "storagePut").mockResolvedValue({ key: "duck/files/7/hash-demo.wav", url: "https://storage.test/file" });
    vi.spyOn(storage, "storageGetSignedUrl").mockResolvedValue("https://storage.test/signed");
    vi.spyOn(db, "createFileRecord").mockResolvedValue(42);
    vi.spyOn(db, "getFileByStorageKey").mockResolvedValue({ id: 42, storageKey: "duck/files/7/hash-demo.wav", uploadedBy: 7, clientId: 22, visibility: "client", version: 1 } as any);
    vi.spyOn(db, "getClientByUserId").mockResolvedValue(undefined);
    vi.spyOn(db, "recordPaymentEvent").mockResolvedValue({ duplicate: false });
    vi.spyOn(db, "transitionOrder").mockResolvedValue({ id: 9, status: "paid" });
  });

  it("covers upload authentication, MIME rejection, size limit and metadata persistence", async () => {
    vi.spyOn(sdk, "authenticateRequest").mockResolvedValueOnce(null as any);
    const unauthenticated = await requestJson("/api/files/upload", { method: "POST", body: { fileName: "demo.wav", mimeType: "audio/wav", contentBase64: "ZGVt bw==" } });
    expect(unauthenticated.status).toBe(400);

    const invalidMime = await requestJson("/api/files/upload", { method: "POST", body: { fileName: "demo.exe", mimeType: "application/x-msdownload", contentBase64: "ZGVtbw==" } });
    expect(invalidMime.status).toBe(415);

    const tooLarge = await requestJson("/api/files/upload", { method: "POST", body: { fileName: "large.wav", mimeType: "audio/wav", contentBase64: Buffer.alloc(50 * 1024 * 1024 + 1).toString("base64") } });
    expect(tooLarge.status).toBe(413);

    const accepted = await requestJson("/api/files/upload", { method: "POST", body: { fileName: "demo.wav", mimeType: "audio/wav", contentBase64: Buffer.from("demo").toString("base64"), projectId: 3, clientId: 22 } });
    expect(accepted.status).toBe(201);
    expect(db.createFileRecord).toHaveBeenCalledWith(expect.objectContaining({ fileName: "demo.wav", mimeType: "audio/wav", projectId: 3, clientId: 22, version: 1 }));
  });

  it("covers signed-url 401, 404, 403 and authorized access", async () => {
    vi.spyOn(sdk, "authenticateRequest").mockResolvedValueOnce(null as any);
    expect((await requestJson("/api/files/duck/files/7/hash-demo.wav/signed-url")).status).toBe(401);

    vi.spyOn(sdk, "authenticateRequest").mockResolvedValue({ id: 9, role: "client" } as any);
    vi.spyOn(db, "getFileByStorageKey").mockResolvedValueOnce(undefined);
    expect((await requestJson("/api/files/duck/files/missing/signed-url")).status).toBe(404);

    vi.spyOn(db, "getFileByStorageKey").mockResolvedValue({ id: 42, storageKey: "duck/files/7/hash-demo.wav", uploadedBy: 7, clientId: 22, visibility: "client", version: 1 } as any);
    vi.spyOn(db, "getClientByUserId").mockResolvedValue({ id: 23 } as any);
    expect((await requestJson("/api/files/duck/files/7/hash-demo.wav/signed-url")).status).toBe(403);

    vi.spyOn(db, "getClientByUserId").mockResolvedValue({ id: 22 } as any);
    const authorized = await requestJson("/api/files/duck/files/7/hash-demo.wav/signed-url");
    expect(authorized.status).toBe(200);
    expect(authorized.body).toEqual({ url: "https://storage.test/signed", expiresInSeconds: 300 });
  });

  it("covers webhook signature, raw body, idempotency and transition", async () => {
    const payload = JSON.stringify({ id: "evt-9", orderId: 9, provider: "test", status: "paid" });
    const signature = crypto.createHmac("sha256", "integration-secret").update(payload).digest("hex");
    const previous = process.env.DUCK_PAYMENT_WEBHOOK_SECRET;
    process.env.DUCK_PAYMENT_WEBHOOK_SECRET = "integration-secret";
    try {
      const invalid = await requestJson("/api/payments/webhook", { method: "POST", body: JSON.parse(payload), headers: { "x-duck-signature": "00" } });
      expect(invalid.status).toBe(401);

      const accepted = await requestJson("/api/payments/webhook", { method: "POST", body: JSON.parse(payload), headers: { "x-duck-signature": signature } });
      expect(accepted.status).toBe(200);
      expect(accepted.body).toEqual({ received: true, processed: true });
      expect(db.recordPaymentEvent).toHaveBeenCalledWith(expect.objectContaining({ eventId: "evt-9", orderId: 9, payload, signatureValid: 1 }));
      expect(db.transitionOrder).toHaveBeenCalledWith(9, "paid");

      vi.spyOn(db, "recordPaymentEvent").mockResolvedValueOnce({ duplicate: true });
      const duplicate = await requestJson("/api/payments/webhook", { method: "POST", body: JSON.parse(payload), headers: { "x-duck-signature": signature } });
      expect(duplicate.status).toBe(200);
      expect(duplicate.body).toEqual({ received: true, duplicate: true });
    } finally {
      if (previous === undefined) delete process.env.DUCK_PAYMENT_WEBHOOK_SECRET;
      else process.env.DUCK_PAYMENT_WEBHOOK_SECRET = previous;
    }
  });
});
