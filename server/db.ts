import { and, desc, eq, inArray, or, sql } from "drizzle-orm";
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
  orderItems,
  paymentEvents,
  missionProgress,
  projects,
  revisionComments,
  revisions,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";
import { notifyOwner } from "./_core/notification";
import { storeContractPdf } from "./contracts";
import { contractEffect, notificationEffect } from "../shared/paymentEffects";
import { isProductionPaymentReady, resolvePaymentProvider, type PaymentProviderName } from "../shared/paymentProvider";
import { planAutomationActions, type DuckAutomationEventType } from "../shared/automation";

let _db: ReturnType<typeof drizzle> | null = null;

type IsolatedFileMetadata = typeof files.$inferInsert & { id: number };
const isolatedFileMetadata: IsolatedFileMetadata[] = [];
let isolatedFileId = 1;

type IsolatedOrder = {
  id: number;
  buyerEmail: string;
  clientId?: number;
  beatId: number;
  licenseType: "exclusive" | "non_exclusive";
  totalCents: number;
  provider: PaymentProviderName;
  status: "pending" | "paid" | "failed" | "cancelled" | "refunded";
  contractKey?: string | null;
};
const isolatedOrders: IsolatedOrder[] = [];
let isolatedOrderId = 1;

type IsolatedMissionProgress = { userId: number; currentStep: number; started: number; unlocked: number };
const isolatedMissionProgress: IsolatedMissionProgress[] = [];
const isolatedClientActivity: Array<typeof activity.$inferInsert> = [];

export function resetIsolatedCheckoutAndMission() {
  isolatedOrders.length = 0;
  isolatedOrderId = 1;
  isolatedMissionProgress.length = 0;
}

export function resetIsolatedFileMetadata() {
  isolatedFileMetadata.length = 0;
  isolatedFileId = 1;
}

function isTestWithoutDatabase() {
  return process.env.NODE_ENV === "test" || process.env.VITEST === "true";
}

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
  const id = result[0]?.insertId ? Number(result[0].insertId) : undefined;
  if (id) { await recordActivity({ type: "client.created", title: "Novo cliente cadastrado", detail: input.name, entityType: "client", entityId: id }); await executeAutomationEvent({ type: "lead.created", entityType: "client", entityId: id, actorId: undefined }); }
  return id;
}

export async function updateClientNotes(input: { clientId: number; notes: string }) {
  if (isTestWithoutDatabase()) {
    isolatedClientActivity.push({ type: "client.notes.updated", title: "Notas do cliente atualizadas", detail: input.notes.slice(0, 180), entityType: "client", entityId: input.clientId });
    return { clientId: input.clientId, notes: input.notes };
  }
  const db = await getDb();
  if (!db) return undefined;
  await db.update(clients).set({ notes: input.notes }).where(eq(clients.id, input.clientId));
  await recordActivity({ type: "client.notes.updated", title: "Notas do cliente atualizadas", detail: input.notes.slice(0, 180), entityType: "client", entityId: input.clientId });
  return { clientId: input.clientId, notes: input.notes };
}

export async function listProjects(clientId?: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projects).where(clientId ? eq(projects.clientId, clientId) : undefined).orderBy(desc(projects.updatedAt));
}

export async function updateProjectSchedule(input: { projectId: number; status?: "discovery" | "in_progress" | "review" | "delivered"; dueDate?: Date | null }) {
  if (isTestWithoutDatabase()) return { projectId: input.projectId, status: input.status, dueDate: input.dueDate };
  const db = await getDb();
  if (!db) return undefined;
  await db.update(projects).set({ ...(input.status ? { status: input.status } : {}), ...(input.dueDate !== undefined ? { dueDate: input.dueDate } : {}) }).where(eq(projects.id, input.projectId));
  await recordActivity({ type: "project.schedule.updated", title: "Prazo do projeto atualizado", detail: `Projeto #${input.projectId}`, entityType: "project", entityId: input.projectId });
  return { projectId: input.projectId, status: input.status, dueDate: input.dueDate };
}

export async function createProject(input: typeof projects.$inferInsert) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.insert(projects).values(input);
  const id = result[0]?.insertId ? Number(result[0].insertId) : undefined;
  if (id) { await recordActivity({ type: "project.created", title: "Novo projeto criado", detail: input.title, entityType: "project", entityId: id }); await executeAutomationEvent({ type: "project.created", entityType: "project", entityId: id, actorId: undefined }); }
  return id;
}

export async function listClientHistory(clientId: number) {
  if (isTestWithoutDatabase()) {
    return {
      projects: [],
      orders: [],
      activity: isolatedClientActivity.filter((item) => item.entityType === "client" && item.entityId === clientId),
    };
  }
  const db = await getDb();
  if (!db) return { projects: [], orders: [], activity: [] };
  const [clientProjects, clientOrders, clientActivity] = await Promise.all([
    db.select().from(projects).where(eq(projects.clientId, clientId)).orderBy(desc(projects.updatedAt)),
    db.select().from(orders).where(eq(orders.clientId, clientId)).orderBy(desc(orders.updatedAt)),
    db.select().from(activity).where(
      or(
        and(eq(activity.entityType, "client"), eq(activity.entityId, clientId)),
        and(eq(activity.entityType, "project"), inArray(activity.entityId, db.select({ id: projects.id }).from(projects).where(eq(projects.clientId, clientId)))),
        and(eq(activity.entityType, "order"), inArray(activity.entityId, db.select({ id: orders.id }).from(orders).where(eq(orders.clientId, clientId)))),
      ),
    ).orderBy(desc(activity.createdAt)).limit(50),
  ]);
  return { projects: clientProjects, orders: clientOrders, activity: clientActivity };
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

export async function getRevisionAccessContext(revisionId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db
    .select({ id: revisions.id, projectId: revisions.projectId, clientUserId: clients.userId })
    .from(revisions)
    .innerJoin(projects, eq(revisions.projectId, projects.id))
    .innerJoin(clients, eq(projects.clientId, clients.id))
    .where(eq(revisions.id, revisionId))
    .limit(1);
  return rows[0];
}

export async function createRevision(input: typeof revisions.$inferInsert) {
  const db = await getDb();
  if (!db) return undefined;
  const project = await getProject(input.projectId);
  if (!project) throw new Error("Projeto não encontrado");
  const count = await countProjectRevisions(input.projectId);
  if (count >= project.revisionLimit) throw new Error("O limite de revisões do projeto foi atingido");
  const result = await db.insert(revisions).values(input);
  await db.update(projects).set({ revisionCount: count + 1, status: "review" }).where(eq(projects.id, input.projectId));
  const id = result[0]?.insertId ? Number(result[0].insertId) : undefined;
  if (id) { await recordActivity({ type: "revision.requested", title: "Nova revisão solicitada", detail: input.summary ?? "Revisão do projeto", entityType: "revision", entityId: id, actorId: input.requestedBy }); await executeAutomationEvent({ type: "revision.comment.created", entityType: "revision", entityId: id, actorId: input.requestedBy }); }
  return id;
}

export async function listResourceMetadata() {
  const db = await getDb();
  if (isTestWithoutDatabase()) return isolatedFileMetadata.map(({ id, fileName, projectId, clientId, version, visibility, mimeType, sizeBytes, createdAt }) => ({ id, fileName, projectId, clientId, version, visibility, mimeType, sizeBytes, createdAt }));
  if (!db) return [];
  return db.select({ id: files.id, fileName: files.fileName, projectId: files.projectId, clientId: files.clientId, version: files.version, visibility: files.visibility, mimeType: files.mimeType, sizeBytes: files.sizeBytes, createdAt: files.createdAt }).from(files).orderBy(desc(files.createdAt)).limit(100);
}

export async function getFileMetadata(fileId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(files).where(eq(files.id, fileId)).limit(1);
  return rows[0];
}

export async function getFileByStorageKey(storageKey: string) {
  if (isTestWithoutDatabase()) return isolatedFileMetadata.find(file => file.storageKey === storageKey) as any;
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(files).where(eq(files.storageKey, storageKey)).limit(1);
  return rows[0];
}

export async function getClientByUserId(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(clients).where(eq(clients.userId, userId)).limit(1);
  return rows[0];
}


export function nextFileVersionFromMetadata(rows: Array<{ version?: number }>) {
  return Math.max(0, ...rows.map(row => row.version ?? 0)) + 1;
}

export async function getNextFileVersion(input: { fileName: string; projectId?: number; clientId?: number }) {
  if (isTestWithoutDatabase()) {
    const rows = isolatedFileMetadata.filter(file => file.fileName === input.fileName && file.projectId === input.projectId && file.clientId === input.clientId);
    return nextFileVersionFromMetadata(rows);
  }
  const db = await getDb();
  if (!db) return 1;
  const rows = await db.select({ version: files.version }).from(files).where(
    and(
      eq(files.fileName, input.fileName),
      input.projectId === undefined ? sql`1 = 1` : eq(files.projectId, input.projectId),
      input.clientId === undefined ? sql`1 = 1` : eq(files.clientId, input.clientId),
    ),
  ).orderBy(desc(files.version)).limit(1);
  return nextFileVersionFromMetadata(rows);
}

export async function createFileRecord(input: typeof files.$inferInsert) {
  if (isTestWithoutDatabase()) {
    const record = { ...input, id: isolatedFileId++ } as IsolatedFileMetadata;
    isolatedFileMetadata.push(record);
    return record.id;
  }
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


export async function addRevisionComment(input: typeof revisionComments.$inferInsert) {
  const db = await getDb();
  if (!db) return undefined;
  const revision = await db.select().from(revisions).where(eq(revisions.id, input.revisionId)).limit(1);
  if (!revision[0]) throw new Error("Revisão não encontrada");
  const result = await db.insert(revisionComments).values(input);
  const id = result[0]?.insertId ? Number(result[0].insertId) : undefined;
  if (id) await executeAutomationEvent({ type: "revision.comment.created", entityType: "revisionComment", entityId: id, actorId: input.authorId });
  return id;
}

export async function listRevisionComments(revisionId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(revisionComments).where(eq(revisionComments.revisionId, revisionId)).orderBy(desc(revisionComments.createdAt));
}


export async function createTestOrder(input: { buyerEmail: string; clientId?: number; beatId: number; licenseType: "exclusive" | "non_exclusive"; totalCents: number; provider?: PaymentProviderName }) {
  const provider = resolvePaymentProvider({ requested: input.provider ?? "test", mercadoPagoAccessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });
  if (!isProductionPaymentReady(provider)) throw new Error("Mercado Pago não está configurado para produção");
  if (isTestWithoutDatabase()) {
    const order: IsolatedOrder = { id: isolatedOrderId++, buyerEmail: input.buyerEmail, clientId: input.clientId, beatId: input.beatId, licenseType: input.licenseType, totalCents: input.totalCents, provider: provider.provider, status: "pending", contractKey: null };
    isolatedOrders.push(order);
    return { id: order.id, status: order.status, provider: order.provider };
  }
  const db = await getDb();
  if (!db) return { id: 0, status: "pending" as const, provider: provider.provider };
  const orderResult = await db.insert(orders).values({ buyerEmail: input.buyerEmail, clientId: input.clientId, provider: provider.provider, totalCents: input.totalCents, status: "pending" });
  const orderId = Number(orderResult[0]?.insertId ?? 0);
  if (orderId) {
    await db.insert(orderItems).values({ orderId, beatId: input.beatId, licenseType: input.licenseType, unitPriceCents: input.totalCents });
    await recordActivity({ type: "order.created", title: "Novo pedido de beat", detail: input.buyerEmail, entityType: "order", entityId: orderId });
  }
  return { id: orderId, status: "pending" as const, provider: provider.provider };
}

export function paymentProviderStatus() {
  const config = resolvePaymentProvider({ requested: process.env.DUCK_PAYMENT_PROVIDER ?? "test", mercadoPagoAccessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });
  return { ...config, ready: isProductionPaymentReady(config) };
}


const orderTransitions: Record<string, string[]> = {
  pending: ["paid", "failed", "cancelled"],
  paid: ["refunded"],
  failed: [],
  cancelled: [],
  refunded: [],
};

export async function getOrder(orderId: number) {
  if (isTestWithoutDatabase()) return isolatedOrders.find(order => order.id === orderId);
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  return rows[0];
}

export async function transitionOrder(orderId: number, nextStatus: "paid" | "failed" | "cancelled" | "refunded") {
  if (isTestWithoutDatabase()) {
    const current = isolatedOrders.find(order => order.id === orderId);
    if (!current) throw new Error("Pedido não encontrado");
    if (!canTransitionOrder(current.status, nextStatus)) throw new Error(`Transição inválida: ${current.status} para ${nextStatus}`);
    current.status = nextStatus;
    return { id: current.id, status: current.status };
  }
  const db = await getDb();
  if (!db) return { id: orderId, status: nextStatus };
  const current = await getOrder(orderId);
  if (!current) throw new Error("Pedido não encontrado");
  if (!canTransitionOrder(current.status, nextStatus)) throw new Error(`Transição inválida: ${current.status} para ${nextStatus}`);
  await db.update(orders).set({ status: nextStatus }).where(eq(orders.id, orderId));

  if (current.status === "pending" && nextStatus === "paid") {
    await executeAutomationEvent({ type: "order.paid", entityType: "order", entityId: orderId, actorId: undefined, approvalGranted: true });
    const item = await db
      .select({ beatTitle: beats.title, licenseType: orderItems.licenseType, buyerEmail: orders.buyerEmail, totalCents: orders.totalCents, provider: orders.provider, createdAt: orders.createdAt })
      .from(orderItems)
      .innerJoin(orders, eq(orderItems.orderId, orders.id))
      .innerJoin(beats, eq(orderItems.beatId, beats.id))
      .where(eq(orderItems.orderId, orderId))
      .limit(1);

    if (contractEffect(current.contractKey) === "generate" && item[0]) {
      try {
        const contract = await storeContractPdf({ orderId, ...item[0] });
        await db.update(orders).set({ contractKey: contract.key }).where(eq(orders.id, orderId));
        await recordActivity({ type: "order.contract.generated", title: "Contrato PDF gerado", detail: contract.key, entityType: "order", entityId: orderId });
      } catch (error) {
        await recordActivity({ type: "order.contract.retryable", title: "Contrato PDF pendente de reprocessamento", detail: JSON.stringify({ orderId, error: String(error) }), entityType: "order", entityId: orderId });
      }
    } else if (current.contractKey) {
      await recordActivity({ type: "order.contract.idempotent", title: "Contrato PDF já existente", detail: current.contractKey, entityType: "order", entityId: orderId });
    }

    try {
      const delivered = await notifyOwner({ title: "Compra confirmada no Duck Hub", content: `Pedido #${orderId} pago para ${current.buyerEmail}.` });
      if (notificationEffect(delivered) === "retryable") {
        await recordActivity({ type: "order.notification.retryable", title: "Notificação do produtor pendente", detail: `Pedido #${orderId}`, entityType: "order", entityId: orderId });
      } else {
        await recordActivity({ type: "order.notification.sent", title: "Produtor notificado", detail: `Pedido #${orderId}`, entityType: "order", entityId: orderId });
      }
    } catch (error) {
      await recordActivity({ type: "order.notification.retryable", title: "Falha ao notificar produtor", detail: JSON.stringify({ orderId, error: String(error) }), entityType: "order", entityId: orderId });
    }
  }
  return { id: orderId, status: nextStatus };
}


export function canTransitionOrder(current: string, next: string) {
  return orderTransitions[current]?.includes(next) ?? false;
}


export async function listDeliverables(projectId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(deliverables).where(eq(deliverables.projectId, projectId)).orderBy(desc(deliverables.createdAt));
}

export async function createDeliverable(input: typeof deliverables.$inferInsert) {
  const db = await getDb();
  if (!db) return undefined;
  const project = await getProject(input.projectId);
  if (!project) throw new Error("Projeto não encontrado");
  const result = await db.insert(deliverables).values(input);
  const id = result[0]?.insertId ? Number(result[0].insertId) : undefined;
  if (id) { await recordActivity({ type: "deliverable.created", title: "Novo entregável criado", detail: input.title, entityType: "project", entityId: input.projectId }); await executeAutomationEvent({ type: "revision.approved", entityType: "deliverable", entityId: id, actorId: undefined, approvalGranted: false }); }
  return id;
}

export async function updateDeliverableStatus(input: { deliverableId: number; status: "pending" | "in_progress" | "review" | "approved"; dueDate?: Date }) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(deliverables).where(eq(deliverables.id, input.deliverableId)).limit(1);
  const current = rows[0];
  if (!current) throw new Error("Entregável não encontrado");
  await db.update(deliverables).set({ status: input.status, dueDate: input.dueDate }).where(eq(deliverables.id, input.deliverableId));
  await recordActivity({ type: "deliverable.updated", title: "Estado do entregável atualizado", detail: `${current.title}: ${input.status}`, entityType: "project", entityId: current.projectId });
  await executeAutomationEvent({ type: input.status === "approved" ? "revision.approved" : "project.created", entityType: "deliverable", entityId: input.deliverableId, actorId: undefined, approvalGranted: input.status === "approved" });
  return { id: input.deliverableId, projectId: current.projectId, status: input.status, dueDate: input.dueDate };
}


export async function recordActivity(input: typeof activity.$inferInsert) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.insert(activity).values(input);
  return result[0]?.insertId ? Number(result[0].insertId) : undefined;
}

export async function executeAutomationEvent(input: { type: DuckAutomationEventType; entityType: string; entityId: number; actorId?: number; attempts?: number; approvalGranted?: boolean }) {
  const actions = planAutomationActions(input.type, input.attempts ?? 0, input.approvalGranted ?? false);
  for (const action of actions) {
    await recordActivity({ type: `automation.${action}`, title: `Automação: ${action}`, detail: JSON.stringify({ eventType: input.type, attempts: input.attempts ?? 0, approvalGranted: input.approvalGranted ?? false }), entityType: input.entityType, entityId: input.entityId, actorId: input.actorId });
  }
  return { type: input.type, actions, exception: actions.includes("open_exception") };
}


export async function getMissionProgress(userId: number) {
  if (isTestWithoutDatabase()) return isolatedMissionProgress.find(progress => progress.userId === userId) ?? { userId, currentStep: 1, started: 0, unlocked: 0 };
  const db = await getDb();
  if (!db) return { userId, currentStep: 1, started: 0, unlocked: 0 };
  const rows = await db.select().from(missionProgress).where(eq(missionProgress.userId, userId)).limit(1);
  return rows[0] ?? { userId, currentStep: 1, started: 0, unlocked: 0 };
}

export async function advanceMission(userId: number, currentStep: number) {
  if (isTestWithoutDatabase()) {
    const existing = isolatedMissionProgress.find(progress => progress.userId === userId);
    if (!existing) isolatedMissionProgress.push({ userId, currentStep, started: 0, unlocked: 0 });
    else if (currentStep > existing.currentStep) existing.currentStep = currentStep;
    return getMissionProgress(userId);
  }
  const db = await getDb();
  if (!db) return { userId, currentStep };
  const existing = await db.select().from(missionProgress).where(eq(missionProgress.userId, userId)).limit(1);
  if (!existing[0]) {
    await db.insert(missionProgress).values({ userId, currentStep });
  } else if (currentStep > existing[0].currentStep) {
    await db.update(missionProgress).set({ currentStep }).where(eq(missionProgress.userId, userId));
  }
  return getMissionProgress(userId);
}


export async function startMission(userId: number) {
  if (isTestWithoutDatabase()) {
    const existing = isolatedMissionProgress.find(progress => progress.userId === userId);
    if (!existing) isolatedMissionProgress.push({ userId, currentStep: 1, started: 1, unlocked: 0 });
    else existing.started = 1;
    return getMissionProgress(userId);
  }
  const db = await getDb();
  if (!db) return { userId, currentStep: 1, started: 1, unlocked: 0 };
  const existing = await db.select().from(missionProgress).where(eq(missionProgress.userId, userId)).limit(1);
  if (!existing[0]) await db.insert(missionProgress).values({ userId, currentStep: 1, started: 1, unlocked: 0 });
  else await db.update(missionProgress).set({ started: 1 }).where(eq(missionProgress.userId, userId));
  return getMissionProgress(userId);
}

export async function unlockMission(userId: number) {
  if (isTestWithoutDatabase()) {
    const existing = isolatedMissionProgress.find(progress => progress.userId === userId);
    if (!existing) throw new Error("Inicie e complete a missão antes de desbloquear o núcleo");
    if (existing.currentStep < 5) throw new Error("Complete todas as etapas da missão antes de desbloquear o núcleo");
    existing.started = 1;
    existing.currentStep = 5;
    existing.unlocked = 1;
    return getMissionProgress(userId);
  }
  const db = await getDb();
  if (!db) throw new Error("A persistência da missão está indisponível; o núcleo não pode ser desbloqueado");
  const existing = await db.select().from(missionProgress).where(eq(missionProgress.userId, userId)).limit(1);
  if (!existing[0]) throw new Error("Inicie e complete a missão antes de desbloquear o núcleo");
  if (existing[0].currentStep < 5) throw new Error("Complete todas as etapas da missão antes de desbloquear o núcleo");
  await db.update(missionProgress).set({ started: 1, currentStep: 5, unlocked: 1 }).where(eq(missionProgress.userId, userId));
  return getMissionProgress(userId);
}
