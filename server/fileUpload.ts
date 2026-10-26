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

/**
 * Lightweight file-container signature gate. This is NOT a malware scanner or
 * a full media parser; it prevents arbitrary HTML/scripts from being stored as
 * a trusted audio, video or document type in the legacy JSON upload route.
 */
export function matchesUploadSignature(bytes: Buffer, mimeType: string): boolean {
  const ascii = (start: number, length: number) => bytes.toString("ascii", start, start + length);
  const isIsoBmff = bytes.length >= 12 && ascii(4, 4) === "ftyp";
  const brand = isIsoBmff ? ascii(8, 4) : "";
  switch (mimeType.toLowerCase()) {
    case "audio/wav":
    case "audio/x-wav":
      return bytes.length >= 12 && ascii(0, 4) === "RIFF" && ascii(8, 4) === "WAVE";
    case "audio/mpeg":
      return (bytes.length >= 10 && ascii(0, 3) === "ID3") ||
        (bytes.length >= 4 && bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0 &&
          (bytes[1] & 0x06) !== 0 && (bytes[2] & 0xf0) !== 0xf0);
    case "application/pdf":
      return bytes.length >= 8 && ascii(0, 5) === "%PDF-" && /^[12]\\.[0-9]$/.test(ascii(5, 3));
    case "application/zip":
      return bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b &&
        ((bytes[2] === 3 && bytes[3] === 4) || (bytes[2] === 5 && bytes[3] === 6));
    case "video/webm":
      return bytes.length >= 12 && bytes.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3])) &&
        bytes.subarray(4, Math.min(bytes.length, 256)).includes(Buffer.from([0x42, 0x82, 0x84, 0x77, 0x65, 0x62, 0x6d]));
    case "audio/mp4":
    case "video/mp4":
      return isIsoBmff && new Set(["isom", "iso2", "iso5", "iso6", "mp41", "mp42", "M4A ", "M4V ", "avc1", "dash", "3gp4", "3gp5"]).has(brand);
    case "video/quicktime":
      return (isIsoBmff && brand === "qt  ") || (bytes.length >= 8 && ascii(4, 4) === "moov");
    default:
      return false;
  }
}

export function isSafeUploadName(value: string): boolean {
  return (
    value.length > 0 &&
    value.length <= 180 &&
    value.trim() === value &&
    value !== "." &&
    value !== ".." &&
    !value.startsWith(".") &&
    !value.includes("/") &&
    !value.includes("\\") &&
    !/[\x00-\x1f\x7f]/.test(value)
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
