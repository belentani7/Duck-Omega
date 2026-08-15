export type DuckAutomationEventType =
  | "lead.created"
  | "project.created"
  | "file.received"
  | "revision.comment.created"
  | "revision.approved"
  | "order.created"
  | "order.paid"
  | "download.requested"
  | "project.overdue";

export type DuckAutomationEvent = {
  eventId: string;
  type: DuckAutomationEventType;
  entityType: string;
  entityId: number | string;
  actorId: number | string;
  occurredAt: number;
  idempotencyKey: string;
  payloadVersion: number;
};

export type AutomationBudget = {
  maxAttempts: number;
  maxExternalCalls: number;
  requiresApproval: boolean;
};

const BUDGETS: Record<DuckAutomationEventType, AutomationBudget> = {
  "lead.created": { maxAttempts: 3, maxExternalCalls: 0, requiresApproval: false },
  "project.created": { maxAttempts: 3, maxExternalCalls: 0, requiresApproval: false },
  "file.received": { maxAttempts: 3, maxExternalCalls: 0, requiresApproval: false },
  "revision.comment.created": { maxAttempts: 3, maxExternalCalls: 1, requiresApproval: false },
  "revision.approved": { maxAttempts: 3, maxExternalCalls: 0, requiresApproval: true },
  "order.created": { maxAttempts: 3, maxExternalCalls: 0, requiresApproval: false },
  "order.paid": { maxAttempts: 3, maxExternalCalls: 2, requiresApproval: true },
  "download.requested": { maxAttempts: 2, maxExternalCalls: 0, requiresApproval: false },
  "project.overdue": { maxAttempts: 2, maxExternalCalls: 1, requiresApproval: false },
};

export function getAutomationBudget(type: DuckAutomationEventType): AutomationBudget {
  return BUDGETS[type];
}

export function hasSeenIdempotencyKey(
  seenKeys: ReadonlySet<string>,
  idempotencyKey: string,
): boolean {
  return seenKeys.has(idempotencyKey);
}

export function canProcessAutomation(
  type: DuckAutomationEventType,
  attempts: number,
  approvalGranted: boolean,
): boolean {
  const budget = getAutomationBudget(type);
  return attempts < budget.maxAttempts && (!budget.requiresApproval || approvalGranted);
}
