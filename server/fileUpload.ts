/**
 * Defensive transport validation for authenticated Duck file submissions.
 *
 * MIME headers still need independent file-signature checks before a file is
 * treated as safe media. Large files should eventually use signed multipart
 * uploads; this helper bounds the legacy JSON/Base64 route.
 */
export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;
const MAX_ENCODED_CHARS = Math.ceil(MAX_UPLOAD_BYTES / 3) * 4;

const ALLOWED_MIME = new Set([
  "audio/mpeg",
  "audio/wav",
  "audio/x-wav",
  "audio/mp4",
  "application/pdf",
  "application/zip",
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

export function isAllowedUploadMime(value: string): boolean {
  return ALLOWED_MIME.has(value.toLowerCase());
}

export function isSafeUploadName(value: string): boolean {
  return (
    value.length > 0 &&
    value.length <= 180 &&
    value.trim() === value &&
    value !== "." &&
    value !== ".." &&
    !value.startsWith(".") &&
    !/[\\/\\\\\x00-\x1f\x7f]/.test(value)
  );
}

export function isOptionalPositiveId(value: unknown): value is number | undefined {
  return value === undefined || (typeof value === "number" && Number.isSafeInteger(value) && value > 0);
}

export class UploadValidationError extends Error {
  constructor(public readonly status: 400 | 413, message: string) {
    super(message);
    this.name = "UploadValidationError";
  }
}

const BASE64_RE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

/** Reject garbage, silent truncation and padding ambiguity before decoding. */
export function decodeUploadBase64(value: string): Buffer {
  if (value.length > MAX_ENCODED_CHARS) {
    throw new UploadValidationError(413, "O arquivo ultrapassa 50 MB");
  }
  if (!value || !BASE64_RE.test(value)) {
    throw new UploadValidationError(400, "Conteúdo Base64 inválido");
  }

  const padding = value.endsWith("==") ? 2 : value.endsWith("=") ? 1 : 0;
  const decodedLength = (value.length / 4) * 3 - padding;
  if (decodedLength > MAX_UPLOAD_BYTES) {
    throw new UploadValidationError(413, "O arquivo ultrapassa 50 MB");
  }
  if (decodedLength < 1) {
    throw new UploadValidationError(400, "Arquivo vazio");
  }

  // Node's Buffer parser accepts noncanonical trailing bits by default.
  if (padding) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    const last = alphabet.indexOf(value[value.length - padding - 1]);
    if (last < 0 || last % (padding === 2 ? 16 : 4) !== 0) {
      throw new UploadValidationError(400, "Conteúdo Base64 inválido");
    }
  }
  return Buffer.from(value, "base64");
}
