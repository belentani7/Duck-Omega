import { describe, expect, it } from "vitest";
import {
  decodeUploadBase64,
  isAllowedUploadMime,
  isOptionalPositiveId,
  isSafeUploadName,
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
});
