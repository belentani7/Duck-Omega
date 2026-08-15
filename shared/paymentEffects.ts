export function contractEffect(currentContractKey: string | null | undefined) {
  return currentContractKey ? "idempotent" as const : "generate" as const;
}

export function notificationEffect(delivered: boolean) {
  return delivered ? "sent" as const : "retryable" as const;
}
