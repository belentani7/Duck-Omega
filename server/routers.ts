import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { invokeLLM } from "./_core/llm";
import { getSessionCookieOptions } from "./_core/cookies";
import type { TrpcContext } from "./_core/context";
import { COOKIE_NAME } from "@shared/const";
import { clientProcedure, ownerProcedure, producerProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  createClient,
  addRevisionComment,
  createProject,
  createRevision,
  createTestOrder,
  dashboardStats,
  getOrder,
  transitionOrder,
  listActivity,
  listBeats,
  listClients,
  listClientHistory,
  listProjects,
  listDeliverables,
  createDeliverable,
  updateDeliverableStatus,
  listRevisionComments,
  getMissionProgress,
  advanceMission,
  startMission,
  unlockMission,
  recentChatMessages,
  saveChatMessage,
  paymentProviderStatus,
  getRevisionAccessContext,
  listResourceMetadata,
  executeAutomationEvent,
  updateClientNotes,
  updateProjectSchedule,
} from "./db";
import { clients, projects, revisions } from "../drizzle/schema";
import { getAutomationBudget, planAutomationActions, type DuckAutomationEventType } from "../shared/automation";
import { canAccessProjectResource } from "../shared/resourceAuth";

const roleProcedure = producerProcedure;

async function assertRevisionAccess(ctx: { user: NonNullable<TrpcContext["user"]> }, revisionId: number) {
  const resource = await getRevisionAccessContext(revisionId);
  if (!resource) throw new TRPCError({ code: "NOT_FOUND", message: "Revisão não encontrada." });
  if (!canAccessProjectResource(ctx.user.role, ctx.user.id, resource)) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Você não tem acesso a esta revisão." });
  }
  return resource;
}

export const appRouter = router({
  system: router({
    health: publicProcedure.query(() => ({ ok: true, service: "duck-hub" })),
    paymentProvider: ownerProcedure.query(() => paymentProviderStatus()),
  }),
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  dashboard: router({
    stats: roleProcedure.query(() => dashboardStats()),
    activity: roleProcedure.query(() => listActivity()),
  }),
  clients: router({
    list: roleProcedure.query(() => listClients()),
    history: roleProcedure.input(z.object({ clientId: z.number().int().positive() })).query(({ input }) => listClientHistory(input.clientId)),
    create: roleProcedure.input(z.object({
      name: z.string().min(2).max(160),
      company: z.string().max(160).optional(),
      email: z.string().email(),
      phone: z.string().max(48).optional(),
      notes: z.string().max(5000).optional(),
      healthScore: z.number().int().min(0).max(100).default(80),
    })).mutation(({ input }) => createClient(input)),
    updateNotes: roleProcedure.input(z.object({ clientId: z.number().int().positive(), notes: z.string().max(5000) })).mutation(({ input }) => updateClientNotes(input)),
  }),
  projects: router({
    list: roleProcedure.input(z.object({ clientId: z.number().int().positive().optional() }).optional()).query(({ input }) => listProjects(input?.clientId)),
    create: roleProcedure.input(z.object({
      clientId: z.number().int().positive(),
      title: z.string().min(2).max(180),
      description: z.string().max(5000).optional(),
      revisionLimit: z.number().int().min(0).max(20).default(2),
      dueDate: z.coerce.date().optional(),
    })).mutation(({ input }) => createProject(input)),
    updateSchedule: roleProcedure.input(z.object({ projectId: z.number().int().positive(), status: z.enum(["discovery", "in_progress", "review", "delivered"]).optional(), dueDate: z.coerce.date().nullable().optional() })).mutation(({ input }) => updateProjectSchedule(input)),
    requestRevision: roleProcedure.input(z.object({
      projectId: z.number().int().positive(),
      fileId: z.number().int().positive().optional(),
      summary: z.string().min(2).max(4000),
    })).mutation(({ ctx, input }) => createRevision({ ...input, requestedBy: ctx.user.id })),
    addComment: clientProcedure.input(z.object({ revisionId: z.number().int().positive(), body: z.string().min(1).max(4000), timestampMs: z.number().int().min(0).optional() })).mutation(async ({ ctx, input }) => {
      await assertRevisionAccess(ctx, input.revisionId);
      return addRevisionComment({ ...input, authorId: ctx.user.id });
    }),
    comments: clientProcedure.input(z.object({ revisionId: z.number().int().positive() })).query(async ({ ctx, input }) => {
      await assertRevisionAccess(ctx, input.revisionId);
      return listRevisionComments(input.revisionId);
    }),
    deliverables: producerProcedure.input(z.object({ projectId: z.number().int().positive() })).query(({ input }) => listDeliverables(input.projectId)),
    createDeliverable: producerProcedure.input(z.object({ projectId: z.number().int().positive(), title: z.string().min(2).max(180), dueDate: z.date().optional() })).mutation(({ input }) => createDeliverable(input)),
    updateDeliverable: producerProcedure.input(z.object({ deliverableId: z.number().int().positive(), status: z.enum(["pending", "in_progress", "review", "approved"]), dueDate: z.date().optional() })).mutation(({ input }) => updateDeliverableStatus(input)),
  }),
  mission: router({
    progress: protectedProcedure.query(({ ctx }) => getMissionProgress(ctx.user.id)),
    start: protectedProcedure.mutation(({ ctx }) => startMission(ctx.user.id)),
    advance: protectedProcedure.input(z.object({ currentStep: z.number().int().min(1).max(20) })).mutation(({ ctx, input }) => advanceMission(ctx.user.id, input.currentStep)),
    unlock: protectedProcedure.mutation(({ ctx }) => unlockMission(ctx.user.id)),
  }),
  checkout: router({
    createTestOrder: publicProcedure.input(z.object({ buyerEmail: z.string().email(), clientId: z.number().int().positive().optional(), beatId: z.number().int().positive(), licenseType: z.enum(["exclusive", "non_exclusive"]), totalCents: z.number().int().positive(), provider: z.enum(["test", "mercado_pago"]).optional() })).mutation(({ input }) => createTestOrder(input)),
    status: publicProcedure.input(z.object({ orderId: z.number().int().positive() })).query(({ input }) => getOrder(input.orderId)),
    transition: producerProcedure.input(z.object({ orderId: z.number().int().positive(), status: z.enum(["paid", "failed", "cancelled", "refunded"]) })).mutation(({ input }) => transitionOrder(input.orderId, input.status)),
  }),
  catalog: router({
    publicList: publicProcedure.query(() => listBeats()),
    adminList: roleProcedure.query(() => listBeats()),
  }),
  resources: router({
    list: roleProcedure.query(() => listResourceMetadata()),
  }),
  automation: router({
    plan: producerProcedure.input(z.object({ type: z.enum(["lead.created", "project.created", "file.received", "revision.comment.created", "revision.approved", "order.created", "order.paid", "download.requested", "project.overdue"]), attempts: z.number().int().min(0).max(20).default(0), approvalGranted: z.boolean().default(false) })).query(({ input }) => {
      const type = input.type as DuckAutomationEventType;
      return { type, budget: getAutomationBudget(type), actions: planAutomationActions(type, input.attempts, input.approvalGranted) };
    }),
    execute: producerProcedure.input(z.object({ type: z.enum(["lead.created", "project.created", "file.received", "revision.comment.created", "revision.approved", "order.created", "order.paid", "download.requested", "project.overdue"]), entityType: z.string().min(1).max(64), entityId: z.number().int().positive(), attempts: z.number().int().min(0).max(20).default(0), approvalGranted: z.boolean().default(false) })).mutation(({ ctx, input }) => executeAutomationEvent({ ...input, type: input.type as DuckAutomationEventType, actorId: ctx.user.id })),
  }),
  chat: router({
    history: roleProcedure.query(({ ctx }) => recentChatMessages(ctx.user.id)),
    ask: roleProcedure.input(z.object({ message: z.string().min(2).max(4000) })).mutation(async ({ ctx, input }) => {
      await saveChatMessage({ userId: ctx.user.id, role: "user", content: input.message });
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: "Você é o Duck Assistant, um copiloto interno para um produtor musical. Responda em português brasileiro, com clareza e sem inventar dados. Você pode resumir projetos, redigir mensagens ou contratos preliminares e sugerir descrições ou preços como hipóteses. Nunca confirme pagamentos, direitos legais ou disponibilidade sem dados do sistema.",
          },
          { role: "user", content: input.message },
        ],
      });
      const content = response.choices?.[0]?.message?.content;
      const answer = typeof content === "string" ? content : "Não consegui gerar uma resposta neste momento.";
      await saveChatMessage({ userId: ctx.user.id, role: "assistant", content: answer });
      return { answer };
    }),
  }),
});

export type AppRouter = typeof appRouter;
