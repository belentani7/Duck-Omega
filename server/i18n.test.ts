import { describe, expect, it } from "vitest";
import { translations } from "../src/lib/i18n";

describe("Duck Hub i18n catalog", () => {
  it("keeps the four supported locales aligned on operational keys", () => {
    const locales = Object.values(translations);
    const required = [
      "mission",
      "hub",
      "beats",
      "tools",
      "startTransmission",
      "studioControl",
      "nextVersion",
      "catalogLead",
      "deliveryChecklist",
      "backendOnline",
      "audioDeck",
      "audioTimeline",
      "audioPlay",
      "audioPause",
      "audioMode",
    ] as const;

    for (const locale of locales) {
      for (const key of required) {
        expect(locale[key], key).toBeTypeOf("string");
        expect(locale[key].trim(), key).not.toBe("");
      }
    }
  });

  it("does not fall back to Portuguese for the primary translated headlines", () => {
    expect(translations.es.productionSecret).toBe("El sonido empieza en el estudio.");
    expect(translations.en.productionSecret).toBe("Sound starts in the studio.");
    expect(translations.fr.productionSecret).toBe("Le son commence au studio.");
    expect(translations.es.studioControl).toBe("El estudio, bajo control.");
    expect(translations.en.studioControl).toBe("The studio, under control.");
    expect(translations.fr.studioControl).toBe("Le studio, sous contrôle.");
  });
});
