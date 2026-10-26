import { describe, expect, it } from "vitest";
import {
  decodeUploadBase64,
  isAllowedUploadMime,
  isOptionalPositiveId,
  isSafeUploadName,
  matchesUploadSignature,
  MAX_UPLOAD_BYTES,
  UploadValidationError,
} from "./fileUpload";

describe("Duck file upload transport validation", () => {
  it("accepts only exact allowed media types", () => {
    for (const mime of ["audio/mpeg", "audio/wav", "audio/x-wav", "audio/mp4", "application/pdf", "application/zip", "video/mp4", "video/webm", "video/quicktime"]) {
      expect(isAllowedUploadMime(mime)).toBe(true);
    }
    for (const mime of ["audio/wav-malicious", "application/pdf-extra", "video/x-dangerous", "text/html", "application/octet-stream", "audio/x-wav; charset=utf-8"]) {
      expect(isAllowedUploadMime(mime)).toBe(false);
    }
  });

  it("rejects path separators, hidden files, whitespace and control characters", () => {
    expect(isSafeUploadName("Final mix 01.wav")).toBe(true);
    for (const name of ["", ".", "..", "../evil.mp3", "folder/file.wav", "folder\\file.wav", ".env", " hidden.mp3", "file.pdf ", "bad\nname.wav", "X".repeat(181)]) {
      expect(isSafeUploadName(name)).toBe(false);
    }
  });

  it("requires safe positive numeric references when supplied", () => {
    expect(isOptionalPositiveId(undefined)).toBe(true);
    expect(isOptionalPositiveId(2)).toBe(true);
    for (const id of [null, 0, -1, 2.5, NaN, Number.MAX_SAFE_INTEGER + 1, "1"]) {
      expect(isOptionalPositiveId(id)).toBe(false);
    }
  });

  it("decodes canonical Base64 and refuses invalid padding or silent truncation", () => {
    expect(decodeUploadBase64("AAEC")).toEqual(Buffer.from([0, 1, 2]));
    expect(decodeUploadBase64("AQ==")).toEqual(Buffer.from([1]));
    for (const value of ["", "AAAA!", "AQ=", "AB==", "AAB=", "ZGVt bw==", "A", "data:audio/wav;base64,AAEC"]) {
      expect(() => decodeUploadBase64(value)).toThrow(UploadValidationError);
    }
  });

  it("blocks oversized files from allocation", () => {
    expect(() => decodeUploadBase64("A".repeat(Math.ceil(MAX_UPLOAD_BYTES / 3) * 4 + 4))).toThrowError("O arquivo ultrapassa 50 MB");
  });
  it("recognizes supported file container signatures", () => {
    const wav = Buffer.from("UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=", "base64");
    const mp4 = Buffer.concat([Buffer.from([0, 0, 0, 16]), Buffer.from("ftypisom"), Buffer.alloc(4)]);
    const quicktime = Buffer.concat([Buffer.from([0, 0, 0, 12]), Buffer.from("ftypqt  ")]);
    const webm = Buffer.from([0x1a, 0x45, 0xdf, 0xa3, 0x42, 0x82, 0x84, 0x77, 0x65, 0x62, 0x6d, 0, 0]);
    for (const [data, type] of [
      [wav, "audio/wav"], [wav, "audio/x-wav"],
      [Buffer.from([0x49, 0x44, 0x33, 4, 0, 0, 0, 0, 0, 0]), "audio/mpeg"],
      [Buffer.from("%PDF-1.7"), "application/pdf"],
      [Buffer.from([0x50, 0x4b, 3, 4, 0, 0]), "application/zip"],
      [mp4, "video/mp4"], [mp4, "audio/mp4"],
      [quicktime, "video/quicktime"], [webm, "video/webm"],
    ] as Array<[Buffer, string]>) {
      expect(matchesUploadSignature(data, type)).toBe(true);
    }
  });

  it("rejects HTML masquerading as media and mismatched file types", () => {
    const html = Buffer.from("<script>alert(1)</script>");
    for (const type of ["audio/wav", "audio/mpeg", "application/pdf", "application/zip", "video/mp4", "video/webm", "video/quicktime"]) {
      expect(matchesUploadSignature(html, type)).toBe(false);
    }
    const wav = Buffer.from("UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=", "base64");
    expect(matchesUploadSignature(wav, "application/pdf")).toBe(false);
    expect(matchesUploadSignature(Buffer.alloc(0), "audio/wav")).toBe(false);
    expect(matchesUploadSignature(Buffer.from("%PDF-1.7"), "text/html")).toBe(false);
  });

});
