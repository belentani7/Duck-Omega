import { and, desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  activity,
  beats,
  chatMessages,
  clients,
  deliverables,
  files,
  orders,
  paymentEvents,
  projects,
  revisions,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  for (const field of textFields) {
    if (user[field] !== undefined) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  }
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "owner";
    updateSet.role = "owner";
  }
  values.lastSignedIn ??= new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function listClients() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(clients).orderBy(desc(clients.updatedAt));
}

export async function createClient(input: typeof clients.$inferInsert) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.insert(clients).values(input);
  return result[0]?.insertId ? Number(result[0].insertId) : undefined;
}

export async function listProjects(clientId?: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projects).where(clientId ? eq(projects.clientId, clientId) : undefined).orderBy(desc(projects.updatedAt));
}

export async function createProject(input: typeof projects.$inferInsert) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.insert(projects).values(input);
  return result[0]?.insertId ? Number(result[0].insertId) : undefined;
}

export async function listBeats() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(beats).orderBy(desc(beats.createdAt));
}

export async function listActivity() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(activity).orderBy(desc(activity.createdAt)).limit(12);
}

export async function dashboardStats() {
  const db = await getDb();
  if (!db) return { clients: 0, activeProjects: 0, revenueCents: 0, recentOrders: 0 };
  const [clientCount, activeProjects, revenue, recentOrders] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(clients),
    db.select({ count: sql<number>`count(*)` }).from(projects).where(sql`${projects.status} <> 'delivered'`),
    db.select({ total: sql<number>`coalesce(sum(${orders.totalCents}), 0)` }).from(orders).where(eq(orders.status, "paid")),
    db.select({ count: sql<number>`count(*)` }).from(orders),
  ]);
  return {
    clients: Number(clientCount[0]?.count ?? 0),
    activeProjects: Number(activeProjects[0]?.count ?? 0),
    revenueCents: Number(revenue[0]?.total ?? 0),
    recentOrders: Number(recentOrders[0]?.count ?? 0),
  };
}

export async function saveChatMessage(input: typeof chatMessages.$inferInsert) {
  const db = await getDb();
  if (!db) return;
  await db.insert(chatMessages).values(input);
}

export async function recentChatMessages(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chatMessages).where(eq(chatMessages.userId, userId)).orderBy(desc(chatMessages.createdAt)).limit(20);
}

export async function countProjectRevisions(projectId: number) {
  const db = await getDb();
  if (!db) return 0;
  const rows = await db.select({ count: sql<number>`count(*)` }).from(revisions).where(eq(revisions.projectId, projectId));
  return Number(rows[0]?.count ?? 0);
}

export async function getProject(projectId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(projects).where(eq(projects.id, projectId)).limit(1);
  return rows[0];
}

export async function createRevision(input: typeof revisions.$inferInsert) {
  const db = await getDb();
  if (!db) return undefined;
  const project = await getProject(input.projectId);
  if (!project) throw new Error("Proyecto no encontrado");
  const count = await countProjectRevisions(input.projectId);
  if (count >= project.revisionLimit) throw new Error("Se alcanzó el límite de revisiones del proyecto");
  const result = await db.insert(revisions).values(input);
  await db.update(projects).set({ revisionCount: count + 1, status: "review" }).where(eq(projects.id, input.projectId));
  return result[0]?.insertId ? Number(result[0].insertId) : undefined;
}

export async function getFileMetadata(fileId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(files).where(eq(files.id, fileId)).limit(1);
  return rows[0];
}


export async function createFileRecord(input: typeof files.$inferInsert) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.insert(files).values(input);
  return result[0]?.insertId ? Number(result[0].insertId) : undefined;
}

export async function recordPaymentEvent(input: { provider: string; eventId: string; orderId?: number; payload: string; signatureValid: number }) {
  const db = await getDb();
  if (!db) return { duplicate: false };
  try {
    await db.insert(paymentEvents).values(input);
    return { duplicate: false };
  } catch (error: unknown) {
    if (String(error).toLowerCase().includes("duplicate")) return { duplicate: true };
    throw error;
  }
}
