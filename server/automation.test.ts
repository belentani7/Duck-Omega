import { describe, expect, it } from "vitest";
import {
  canProcessAutomation,
  getAutomationBudget,
  hasSeenIdempotencyKey,
  planAutomationActions,
} from "../shared/automation";

describe("Duck automation contract", () => {
  it("requires approval for payment and revision release events", () => {
    expect(getAutomationBudget("order.paid").requiresApproval).toBe(true);
    expect(getAutomationBudget("revision.approved").requiresApproval).toBe(true);
    expect(canProcessAutomation("order.paid", 0, false)).toBe(false);
    expect(canProcessAutomation("order.paid", 0, true)).toBe(true);
  });

  it("enforces bounded attempts for external workflows", () => {
    expect(canProcessAutomation("project.overdue", 0, false)).toBe(true);
    expect(canProcessAutomation("project.overdue", 2, false)).toBe(false);
  });

  it("detects duplicate provider events by idempotency key", () => {
    const seen = new Set(["mp-event-123"]);
    expect(hasSeenIdempotencyKey(seen, "mp-event-123")).toBe(true);
    expect(hasSeenIdempotencyKey(seen, "mp-event-456")).toBe(false);
  });

  it("plans safe internal actions for payment and overdue events", () => {
    expect(planAutomationActions("order.paid", 0, true)).toEqual(["record_activity", "queue_delivery", "queue_statement"]);
    expect(planAutomationActions("order.paid", 0, false)).toEqual(["open_exception"]);
    expect(planAutomationActions("project.overdue", 0, false)).toContain("open_exception");
  });
});
