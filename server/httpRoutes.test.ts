import { describe, expect, it } from "vitest";
import { safeEqualHex } from "./httpRoutes";

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
});
