export type TransactionState = "success" | "pending" | "failed";

const SUCCESS_STATUSES = ["settlement", "capture", "success"];
const PENDING_STATUSES = ["pending"];
// Everything else (deny, cancel, expire, failure, unknown) → failed

export function getTransactionState(status: string | null): TransactionState {
  if (!status) return "success"; // Default to success as requested
  const normalized = status.toLowerCase().trim();
  if (SUCCESS_STATUSES.includes(normalized)) return "success";
  if (PENDING_STATUSES.includes(normalized)) return "pending";
  return "failed";
}
