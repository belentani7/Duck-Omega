import { describe, expect, it } from "vitest";
import { nextFileVersionFromMetadata } from "./db";

type PersistedMetadata = { fileName: string; projectId: number; clientId: number; version: number };

describe("persisted file versioning", () => {
  it("increments repeated uploads from persisted metadata and reads the latest record", () => {
    const persisted: PersistedMetadata[] = [];
    const scope = { fileName: "mix.wav", projectId: 12, clientId: 22 };
    const scopedRows = () => persisted.filter(row => row.fileName === scope.fileName && row.projectId === scope.projectId && row.clientId === scope.clientId);

    const first = { ...scope, version: nextFileVersionFromMetadata(scopedRows()) };
    persisted.push(first);
    const second = { ...scope, version: nextFileVersionFromMetadata(scopedRows()) };
    persisted.push(second);

    expect(first.version).toBe(1);
    expect(second.version).toBe(2);
    expect(scopedRows()).toEqual([first, second]);
    expect(nextFileVersionFromMetadata(scopedRows())).toBe(3);
    expect(nextFileVersionFromMetadata([{ version: 4 }, { version: 2 }])).toBe(5);
  });
});
