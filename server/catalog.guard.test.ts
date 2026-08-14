import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("proteção de preview do catálogo", () => {
  it("exige a marca previewWatermarked antes de renderizar áudio público", () => {
    const source = readFileSync(resolve(process.cwd(), "client/src/pages/PublicCatalog.tsx"), "utf8");
    expect(source).toContain("beat.previewWatermarked === 1");
    expect(source).toContain("Preview protegido será disponibilizado pelo Duck.");
  });
});
