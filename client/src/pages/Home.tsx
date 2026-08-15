import { useMemo, useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { ArrowUpRight, Bot, BriefcaseBusiness, CheckCircle2, ChevronRight, CircleDollarSign, FileAudio, LayoutDashboard, LogIn, Menu, MessageSquare, Music2, Plus, Search, ShieldCheck, Sparkles, Users, Wand2, X } from "lucide-react";
import { toast } from "sonner";

const navItems = [
  { id: "overview", label: "Visão geral", icon: LayoutDashboard },
  { id: "clients", label: "Clientes", icon: Users },
  { id: "projects", label: "Projetos", icon: BriefcaseBusiness },
  { id: "catalog", label: "Catálogo", icon: Music2 },
  { id: "tools", label: "Ferramentas", icon: Wand2 },
];

const statusLabel: Record<string, string> = {
  discovery: "Descoberta",
  in_progress: "Em andamento",
  review: "Revisão",
  delivered: "Entregue",
};

function formatMoney(cents = 0) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(cents / 100);
}

function formatDate(value?: Date | string | null) {
  return value ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(value)) : "Sem prazo definido";
}

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [section, setSection] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const stats = trpc.dashboard.stats.useQuery(undefined, { enabled: isAuthenticated });
  const activity = trpc.dashboard.activity.useQuery(undefined, { enabled: isAuthenticated });
  const projects = trpc.projects.list.useQuery(undefined, { enabled: isAuthenticated });
  const clients = trpc.clients.list.useQuery(undefined, { enabled: isAuthenticated });
  const beats = trpc.catalog.publicList.useQuery();
  const ask = trpc.chat.ask.useMutation({
    onSuccess: data => setChatMessages(current => [...current, { role: "assistant", content: data.answer }]),
    onError: error => toast.error(error.message || "Não foi possível consultar o assistente."),
  });

  const currentTitle = useMemo(() => navItems.find(item => item.id === section)?.label ?? "Visão geral", [section]);

  function submitChat() {
    const message = chatInput.trim();
    if (!message || ask.isPending) return;
    setChatMessages(current => [...current, { role: "user", content: message }]);
    setChatInput("");
    if (!isAuthenticated) {
      toast.info("Entre para usar o Duck Assistant.");
      return;
    }
    ask.mutate({ message });
  }

  if (loading) return <div className="min-h-screen grid place-items-center bg-[#070b0a] text-emerald-200">Carregando Duck Hub…</div>;

  return (
    <div className="min-h-screen bg-[#070b0a] text-[#e8f3ed] selection:bg-emerald-400/30">
      <div className="pointer-events-none fixed inset-0 opacity-40 [background-image:radial-gradient(circle_at_15%_10%,rgba(16,185,129,.18),transparent_26%),radial-gradient(circle_at_90%_80%,rgba(20,83,45,.18),transparent_30%)]" />
      <div className="relative flex min-h-screen">
        <aside className={`${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} fixed inset-y-0 left-0 z-30 flex w-72 flex-col border-r border-emerald-950/70 bg-[#09110f]/95 p-5 backdrop-blur-xl transition-transform md:static`}>
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-2xl border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,.15)]"><Music2 size={19} /></div><div><div className="font-mono text-sm tracking-[.2em] text-emerald-300">DUCK</div><div className="text-xs text-slate-500">STUDIO HUB</div></div></div>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(false)}><X size={18} /></Button>
          </div>
          <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.25em] text-slate-600">Estúdio</div>
          <nav className="space-y-1">
            {navItems.map(item => <button key={item.id} onClick={() => { if (item.id === "tools") window.location.assign("/ferramentas"); else setSection(item.id); setMobileOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${section === item.id ? "bg-emerald-400/12 text-emerald-200 shadow-inner shadow-emerald-900/30" : "text-slate-400 hover:bg-white/[.04] hover:text-white"}`}><item.icon size={17} /><span>{item.label}</span>{section === item.id && <ChevronRight size={15} className="ml-auto text-emerald-400" />}</button>)}
          </nav>
          <div className="mt-10 mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.25em] text-slate-600">Ecossistema</div>
          <Link href="/ferramentas" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/[.04] hover:text-white"><Wand2 size={17} /> Ferramentas <ArrowUpRight size={14} className="ml-auto" /></Link>
          <Link href="/catalog" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/[.04] hover:text-white"><Sparkles size={17} /> Loja de Beats <ArrowUpRight size={14} className="ml-auto" /></Link>
          <div className="mt-auto rounded-2xl border border-emerald-900/60 bg-emerald-950/20 p-4"><div className="mb-2 flex items-center gap-2 text-xs text-emerald-300"><ShieldCheck size={14} /> Ambiente protegido</div><p className="text-xs leading-5 text-slate-500">Arquivos privados, atividade e permissões controlados em um único núcleo.</p></div>
        </aside>
        {mobileOpen && <button aria-label="Fechar menu" className="fixed inset-0 z-20 bg-black/60 md:hidden" onClick={() => setMobileOpen(false)} />}
        <main className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-white/[.06] px-5 py-4 md:px-10"><div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(true)}><Menu size={20} /></Button><div><div className="text-xs uppercase tracking-[.25em] text-slate-600">Duck / Estúdio</div><h1 className="mt-1 text-xl font-semibold tracking-tight">{currentTitle}</h1></div></div><div className="flex items-center gap-3">{isAuthenticated ? <><div className="hidden text-right sm:block"><div className="text-sm font-medium">{user?.name || "Duck"}</div><div className="text-xs capitalize text-emerald-400">{user?.role || "produtor"}</div></div><Button variant="outline" className="border-white/10 bg-white/[.03] text-slate-300 hover:bg-white/[.07]" onClick={() => logout()}>Sair</Button></> : <Button className="bg-emerald-400 text-[#06120d] hover:bg-emerald-300" onClick={() => startLogin()}><LogIn size={16} /> Entrar</Button>}</div></header>
          <div className="mx-auto max-w-[1480px] space-y-8 p-5 md:p-10">
            <section className="relative overflow-hidden rounded-[28px] border border-emerald-900/60 bg-gradient-to-br from-[#0d2119] via-[#0b1713] to-[#08100e] p-7 md:p-10"><div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" /><div className="relative max-w-3xl"><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> Sistema pronto para criar</div><h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">Transforme cada sessão em um projeto que <span className="text-emerald-300">avança.</span></h2><p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 md:text-base">Clientes, entregas, beats e pagamentos em um espaço criado para o fluxo real do Duck.</p><div className="mt-7 flex flex-wrap gap-3"><Button onClick={() => setSection("projects")} className="bg-emerald-400 text-[#06120d] hover:bg-emerald-300"><Plus size={16} /> Novo projeto</Button><Link href="/catalog"><Button variant="outline" className="border-white/10 bg-white/[.03] text-slate-200 hover:bg-white/[.07]"><Music2 size={16} /> Ver catálogo</Button></Link></div></div></section>
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric icon={Users} label="Clientes ativos" value={String(stats.data?.clients ?? 0)} detail="CRM conectado" /><Metric icon={BriefcaseBusiness} label="Projetos em andamento" value={String(stats.data?.activeProjects ?? 0)} detail="Sincronizados em tempo real" /><Metric icon={CircleDollarSign} label="Receita confirmada" value={formatMoney(stats.data?.revenueCents ?? 0)} detail="Pagamentos conciliados" /><Metric icon={FileAudio} label="Pedidos registrados" value={String(stats.data?.recentOrders ?? 0)} detail="Checkout preparado" /></section>
            <div className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
              <Card className="border-white/[.07] bg-[#0b1210]/80"><CardHeader className="flex-row items-center justify-between"><div><CardTitle>Projetos recentes</CardTitle><p className="mt-1 text-sm text-slate-500">Acompanhe produção e revisões.</p></div><Button variant="ghost" className="text-emerald-300 hover:bg-emerald-400/10" onClick={() => setSection("projects")}>Ver todos <ArrowUpRight size={15} /></Button></CardHeader><CardContent className="space-y-3">{projects.data?.length ? projects.data.slice(0, 4).map(project => <div key={project.id} className="rounded-2xl border border-white/[.06] bg-white/[.02] p-4"><div className="flex items-start justify-between gap-4"><div><div className="font-medium">{project.title}</div><div className="mt-1 text-xs text-slate-500">Cliente #{project.clientId} · Prazo: {formatDate(project.dueDate)}</div></div><Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-300">{statusLabel[project.status]}</Badge></div><div className="mt-4 flex items-center gap-3"><Progress value={project.progress} className="h-1.5 bg-white/10" /><span className="text-xs text-slate-500">{project.progress}%</span></div></div>) : <EmptyState icon={BriefcaseBusiness} title="Seu primeiro projeto começa aqui" detail="Crie um projeto para registrar entregas, revisões e avanços." action="Criar projeto" onClick={() => setSection("projects")} />}</CardContent></Card>
              <Card className="border-white/[.07] bg-[#0b1210]/80"><CardHeader><CardTitle>Atividade recente</CardTitle><p className="mt-1 text-sm text-slate-500">Eventos do estúdio.</p></CardHeader><CardContent className="space-y-5">{activity.data?.length ? activity.data.map(item => <div key={item.id} className="flex gap-3"><div className="mt-1 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.7)]" /><div><div className="text-sm">{item.title}</div><div className="mt-1 text-xs text-slate-500">{item.detail || item.type}</div></div></div>) : <EmptyState icon={CheckCircle2} title="Ainda não há atividade" detail="As ações importantes aparecerão aqui." />}</CardContent></Card>
            </div>
            <div className="grid gap-6 lg:grid-cols-2"><Card className="border-white/[.07] bg-[#0b1210]/80"><CardHeader><CardTitle>Atalhos operacionais</CardTitle></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2"><QuickAction icon={Users} title="Adicionar cliente" detail="Criar ficha no CRM" onClick={() => setSection("clients")} /><QuickAction icon={FileAudio} title="Enviar entrega" detail="Hash e versão" onClick={() => toast.info("Fluxo de arquivos preparado para a próxima iteração.")} /><QuickAction icon={MessageSquare} title="Abrir revisões" detail="Comentários com timestamp" onClick={() => setSection("projects")} /><QuickAction icon={Music2} title="Novo beat" detail="Publicar no catálogo" onClick={() => setSection("catalog")} /></CardContent></Card><Card className="border-emerald-900/50 bg-gradient-to-br from-emerald-950/40 to-[#0b1210]"><CardHeader><CardTitle className="flex items-center gap-2"><Bot size={18} className="text-emerald-300" /> Duck Assistant</CardTitle><p className="mt-1 text-sm text-slate-500">Consulte projetos, redija mensagens e explore ideias.</p></CardHeader><CardContent><Button className="w-full bg-emerald-400 text-[#06120d] hover:bg-emerald-300" onClick={() => setChatOpen(true)}>Abrir assistente <ArrowUpRight size={16} /></Button></CardContent></Card></div>
            {section === "clients" && <DataSection title="Clientes" detail="Saúde do relacionamento, dados de contato e histórico." count={clients.data?.length ?? 0}>{clients.data?.length ? clients.data.map(client => <div key={client.id} className="flex items-center justify-between rounded-xl border border-white/[.06] bg-white/[.02] p-4"><div><div className="font-medium">{client.name}</div><div className="text-sm text-slate-500">{client.email}{client.company ? ` · ${client.company}` : ""}</div>{client.notes && <div className="mt-1 max-w-xl text-xs text-slate-600">{client.notes}</div>}</div><div className="text-right"><div className="text-sm text-emerald-300">{client.healthScore}/100</div><div className="text-xs text-slate-600">índice de saúde</div></div></div>) : <EmptyState icon={Users} title="Ainda não há clientes cadastrados" detail="O CRM está pronto para receber sua primeira ficha." action="Adicionar cliente" onClick={() => toast.info("Formulário de CRM na próxima iteração.")} />}</DataSection>}
            {section === "projects" && <DataSection title="Projetos" detail="Status, entregas, progresso e revisões validadas no servidor." count={projects.data?.length ?? 0}>{projects.data?.length ? projects.data.map(project => <div key={project.id} className="rounded-xl border border-white/[.06] bg-white/[.02] p-4"><div className="flex justify-between"><div className="font-medium">{project.title}</div><Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-300">{statusLabel[project.status]}</Badge></div><div className="mt-3 flex items-center gap-3"><Progress value={project.progress} className="h-1.5 bg-white/10" /><span className="text-xs text-slate-500">{project.progress}%</span></div><div className="mt-2 text-xs text-slate-600">Prazo: {formatDate(project.dueDate)}</div></div>) : <EmptyState icon={BriefcaseBusiness} title="Ainda não há projetos" detail="Crie o primeiro projeto e controle o ciclo completo." action="Criar projeto" onClick={() => toast.info("Formulário de projeto na próxima iteração.")} />}</DataSection>}
            {section === "catalog" && <DataSection title="Catálogo" detail="Beats disponíveis para compra e licenciamento." count={beats.data?.length ?? 0}>{beats.data?.length ? beats.data.map(beat => <div key={beat.id} className="flex items-center justify-between rounded-xl border border-white/[.06] bg-white/[.02] p-4"><div><div className="font-medium">{beat.title}</div><div className="text-sm text-slate-500">{beat.genre || "Sem gênero"} · {beat.bpm || "—"} BPM</div></div><div className="text-right text-sm text-emerald-300">{formatMoney(beat.nonExclusivePriceCents)}</div></div>) : <EmptyState icon={Music2} title="Catálogo pronto para seu primeiro beat" detail="Publique previews com watermark e defina licenças." action="Ir para a Loja de Beats" onClick={() => window.location.assign("/catalog")} />}</DataSection>}
          </div>
        </main>
      </div>
      {chatOpen && <div className="fixed bottom-5 right-5 z-40 flex w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-emerald-800/70 bg-[#0c1512] shadow-2xl shadow-black/60"><div className="flex items-center justify-between border-b border-white/[.07] p-4"><div className="flex items-center gap-2"><Bot size={17} className="text-emerald-300" /><span className="font-medium">Duck Assistant</span></div><Button variant="ghost" size="icon" onClick={() => setChatOpen(false)}><X size={17} /></Button></div><div className="max-h-80 space-y-3 overflow-y-auto p-4">{chatMessages.length === 0 && <div className="rounded-xl bg-emerald-400/10 p-3 text-sm leading-6 text-emerald-100">Posso ajudar a resumir projetos, redigir mensagens ou transformar uma ideia de beat em uma descrição.</div>}{chatMessages.map((message, index) => <div key={index} className={`rounded-xl p-3 text-sm leading-6 ${message.role === "user" ? "ml-8 bg-white/[.06] text-slate-200" : "mr-4 bg-emerald-400/10 text-emerald-100"}`}>{message.content}</div>)}</div><div className="border-t border-white/[.07] p-3"><div className="flex gap-2"><Textarea value={chatInput} onChange={event => setChatInput(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); submitChat(); } }} placeholder="Pergunte ao Duck Assistant…" className="min-h-11 resize-none border-white/10 bg-white/[.03]" /><Button size="icon" className="shrink-0 self-end bg-emerald-400 text-[#06120d] hover:bg-emerald-300" onClick={submitChat} disabled={ask.isPending}><ArrowUpRight size={17} /></Button></div></div></div>}
    </div>
  );
}

function Metric({ icon: Icon, label, value, detail }: { icon: typeof Users; label: string; value: string; detail: string }) { return <Card className="border-white/[.07] bg-[#0b1210]/80"><CardContent className="p-5"><div className="flex items-center justify-between"><div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300"><Icon size={17} /></div><span className="text-[10px] uppercase tracking-[.2em] text-slate-600">Live</span></div><div className="mt-5 text-2xl font-semibold tracking-tight">{value}</div><div className="mt-1 text-sm text-slate-400">{label}</div><div className="mt-3 text-xs text-slate-600">{detail}</div></CardContent></Card>; }
function QuickAction({ icon: Icon, title, detail, onClick }: { icon: typeof Users; title: string; detail: string; onClick: () => void }) { return <button onClick={onClick} className="group flex items-center gap-3 rounded-xl border border-white/[.06] bg-white/[.02] p-3 text-left transition hover:border-emerald-400/30 hover:bg-emerald-400/[.05]"><div className="grid h-9 w-9 place-items-center rounded-lg bg-white/[.05] text-emerald-300 group-hover:bg-emerald-400/10"><Icon size={16} /></div><div><div className="text-sm font-medium">{title}</div><div className="text-xs text-slate-600">{detail}</div></div><ChevronRight size={15} className="ml-auto text-slate-700 group-hover:text-emerald-300" /></button>; }
function EmptyState({ icon: Icon, title, detail, action, onClick }: { icon: typeof Users; title: string; detail: string; action?: string; onClick?: () => void }) { return <div className="rounded-2xl border border-dashed border-white/10 bg-white/[.015] p-8 text-center"><div className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-300"><Icon size={19} /></div><div className="mt-4 font-medium">{title}</div><p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">{detail}</p>{action && <Button className="mt-5 bg-white/[.07] text-slate-200 hover:bg-emerald-400/10 hover:text-emerald-200" onClick={onClick}>{action}</Button>}</div>; }
function DataSection({ title, detail, count, children }: { title: string; detail: string; count: number; children: React.ReactNode }) { return <Card className="border-white/[.07] bg-[#0b1210]/80"><CardHeader><div className="flex items-start justify-between"><div><CardTitle>{title}</CardTitle><p className="mt-1 text-sm text-slate-500">{detail}</p></div><Badge variant="outline" className="border-white/10 text-slate-400">{count} registros</Badge></div></CardHeader><CardContent className="space-y-3">{children}</CardContent></Card>; }
