import { describe, expect, it } from "vitest";
import { canAccessProjectResource } from "../shared/resourceAuth";

describe("autorização por recurso de projeto", () => {
  const associated = { clientUserId: 20 };
  const unrelated = { clientUserId: 21 };

  it.each(["owner", "producer"] as const)("permite %s em qualquer recurso", role => {
    expect(canAccessProjectResource(role, 999, unrelated)).toBe(true);
  });

  it("permite cliente associado e bloqueia cliente não relacionado", () => {
    expect(canAccessProjectResource("client", 20, associated)).toBe(true);
    expect(canAccessProjectResource("client", 20, unrelated)).toBe(false);
  });

  it("bloqueia papel genérico mesmo com identificador coincidente", () => {
    expect(canAccessProjectResource("user", 20, associated)).toBe(false);
  });
});

