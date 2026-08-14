import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["owner", "producer", "client", "user"]).default("client").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const clients = mysqlTable("clients", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  name: varchar("name", { length: 160 }).notNull(),
  company: varchar("company", { length: 160 }),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 48 }),
  notes: text("notes"),
  healthScore: int("healthScore").default(80).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  description: text("description"),
  status: mysqlEnum("status", ["discovery", "in_progress", "review", "delivered"]).default("discovery").notNull(),
  progress: int("progress").default(0).notNull(),
  revisionLimit: int("revisionLimit").default(2).notNull(),
  revisionCount: int("revisionCount").default(0).notNull(),
  startDate: timestamp("startDate"),
  dueDate: timestamp("dueDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const deliverables = mysqlTable("deliverables", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  status: mysqlEnum("status", ["pending", "in_progress", "review", "approved"]).default("pending").notNull(),
  dueDate: timestamp("dueDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const files = mysqlTable("files", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId"),
  clientId: int("clientId"),
  uploadedBy: int("uploadedBy").notNull(),
  version: int("version").default(1).notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  storageKey: varchar("storageKey", { length: 512 }).notNull(),
  mimeType: varchar("mimeType", { length: 160 }).notNull(),
  sizeBytes: int("sizeBytes").default(0).notNull(),
  sha256: varchar("sha256", { length: 64 }).notNull(),
  visibility: mysqlEnum("visibility", ["private", "client"]).default("private").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const revisions = mysqlTable("revisions", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  fileId: int("fileId"),
  requestedBy: int("requestedBy").notNull(),
  status: mysqlEnum("status", ["requested", "in_progress", "approved", "rejected"]).default("requested").notNull(),
  summary: text("summary"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const revisionComments = mysqlTable("revisionComments", {
  id: int("id").autoincrement().primaryKey(),
  revisionId: int("revisionId").notNull(),
  authorId: int("authorId").notNull(),
  body: text("body").notNull(),
  timestampMs: int("timestampMs"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const beats = mysqlTable("beats", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 180 }).notNull(),
  genre: varchar("genre", { length: 80 }),
  bpm: int("bpm"),
  musicalKey: varchar("musicalKey", { length: 16 }),
  previewKey: varchar("previewKey", { length: 512 }),
  masterKey: varchar("masterKey", { length: 512 }),
  description: text("description"),
  exclusivePriceCents: int("exclusivePriceCents").default(0).notNull(),
  nonExclusivePriceCents: int("nonExclusivePriceCents").default(0).notNull(),
  availability: mysqlEnum("availability", ["available", "reserved", "sold"]).default("available").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId"),
  buyerEmail: varchar("buyerEmail", { length: 320 }).notNull(),
  status: mysqlEnum("status", ["pending", "paid", "failed", "refunded", "cancelled"]).default("pending").notNull(),
  provider: varchar("provider", { length: 48 }).default("test").notNull(),
  providerPaymentId: varchar("providerPaymentId", { length: 160 }),
  totalCents: int("totalCents").default(0).notNull(),
  contractKey: varchar("contractKey", { length: 512 }),
  downloadExpiresAt: timestamp("downloadExpiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const orderItems = mysqlTable("orderItems", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  beatId: int("beatId").notNull(),
  licenseType: mysqlEnum("licenseType", ["exclusive", "non_exclusive"]).notNull(),
  unitPriceCents: int("unitPriceCents").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const paymentEvents = mysqlTable("paymentEvents", {
  id: int("id").autoincrement().primaryKey(),
  provider: varchar("provider", { length: 48 }).notNull(),
  eventId: varchar("eventId", { length: 160 }).notNull().unique(),
  orderId: int("orderId"),
  payload: text("payload").notNull(),
  signatureValid: int("signatureValid").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const activity = mysqlTable("activity", {
  id: int("id").autoincrement().primaryKey(),
  actorId: int("actorId"),
  type: varchar("type", { length: 80 }).notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  detail: text("detail"),
  entityType: varchar("entityType", { length: 48 }),
  entityId: int("entityId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const chatMessages = mysqlTable("chatMessages", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Client = typeof clients.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Beat = typeof beats.$inferSelect;
export type Order = typeof orders.$inferSelect;
