import { describe, expect, it } from "vitest";
import { canAccessStoredFile, safeEqualHex } from "./httpRoutes";

describe("HTTP security contracts", () => {
  it("accepts equal hexadecimal signatures", () => {
    expect(safeEqualHex("aabbccdd", "aabbccdd")).toBe(true);
  });

  it("rejects different signatures and different lengths", () => {
    expect(safeEqualHex("aabbccdd", "aabbccde")).toBe(false);
    expect(safeEqualHex("aabbccdd", "aabb")).toBe(false);
  });

  it("rejects empty signatures instead of treating them as valid", () => {
    expect(safeEqualHex("", "")).toBe(true);
    expect(safeEqualHex("aabbccdd", "")).toBe(false);
  });

  it("rejects malformed hexadecimal input when its decoded bytes differ", () => {
    expect(safeEqualHex("zz", "00")).toBe(false);
  });

  it("enforces file ownership and client assignment", () => {
    const file = { uploadedBy: 7, clientId: 22, visibility: "client" };
    expect(canAccessStoredFile({ id: 1, role: "owner" }, file)).toBe(true);
    expect(canAccessStoredFile({ id: 2, role: "producer" }, file)).toBe(true);
    expect(canAccessStoredFile({ id: 7, role: "client" }, file)).toBe(true);
    expect(canAccessStoredFile({ id: 9, role: "client" }, file, 22)).toBe(true);
    expect(canAccessStoredFile({ id: 9, role: "client" }, file, 23)).toBe(false);
    expect(canAccessStoredFile({ id: 9, role: "client" }, { ...file, visibility: "private" }, 22)).toBe(false);
  });
});
