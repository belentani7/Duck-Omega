export type ResourceRole = "owner" | "producer" | "client" | "user";

export type ResourceAccessContext = {
  resourceOwnerId?: number | null;
  clientUserId?: number | null;
};

export function canAccessProjectResource(role: ResourceRole, userId: number, resource: ResourceAccessContext) {
  if (role === "owner" || role === "producer") return true;
  if (role !== "client") return false;
  return resource.clientUserId === userId;
}

