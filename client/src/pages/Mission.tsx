import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Check, ChevronDown, LockKeyhole, Music2, Radio, Shield, Terminal, Unlock, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { resolveMissionState } from "@shared/missionState";

const phases = [
  { id: "signal", tag: "01 / SINAL", title: "O sinal foi encontrado", text: "Duck Hub é o núcleo operacional de um produtor: clientes, projetos, arquivos, beats e pagamentos deixam de viver em ilhas separadas.", icon: Radio },
  { id: "studio", tag: "02 / ESTÚDIO", title: "A sessão precisa de memória", text: "O legado do Studio OS vive aqui: cada entrega recebe versão, hash, tipo MIME, histórico e contexto. O som continua sendo seu; o sistema apenas protege o caminho.", icon: Waves },
  { id: "portal", tag: "03 / PORTAL", title: "O cliente entra sem tocar no núcleo", text: "O Portal de Clientes transforma o material recebido em projetos, comentários por timestamp, aprovações e limites de revisão em uma superfície clara, com permissões reais.", icon: Shield },
  { id: "catalog", tag: "04 / CATÁLOGO", title: "A batida vira um contrato", text: "A Gema 01 entra pelo catálogo: previews com watermark, licenças exclusiva e não exclusiva, checkout de teste e entrega assinada.", icon: Music2 },
  { id: "command", tag: "05 / COMANDO", title: "A decisão volta para Duck", text: "Quality gates, atividade, receita, saúde dos clientes e entregas voltam para Duck; o assistente interno ajuda sem substituir a decisão do produtor.", icon: Terminal },
];

export default function Mission() {
  const [, navigate] = useLocation();
  const health = trpc.system.health.useQuery();
  const me = trpc.auth.me.useQuery();
  const missionProgress = trpc.mission.progress.useQuery(undefined, { enabled: Boolean(me.data) });
  const saveMission = trpc.mission.advance.useMutation();
  const startMission = trpc.mission.start.useMutation();
  const unlockMission = trpc.mission.unlock.useMutation();
  const [active, setActive] = useState(0);
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const state = resolveMissionState({
      authenticated: Boolean(me.data),
      localStarted: localStorage.getItem("duck-mission-started") === "true",
      localUnlocked: localStorage.getItem("duck-mission-unlocked") === "true",
      persisted: missionProgress.data,
    });
    setStarted(state.started);
    setUnlocked(state.unlocked);
    if (me.data && missionProgress.data) {
      setActive(Math.min(state.currentStep - 1, phases.length - 1));
      if (!state.unlocked) localStorage.removeItem("duck-mission-unlocked");
    }
  }, [me.data, missionProgress.data]);

  const progress = useMemo(() => Math.round(((active + 1) / phases.length) * 100), [active]);
  const phase = phases[active];
  const isLast = active === phases.length - 1;

  function begin() {
    setStarted(true);
    localStorage.setItem("duck-mission-started", "true");
    if (me.data) startMission.mutate();
  }

  function advance() {
    if (isLast) return;
    setActive(value => {
      const next = Math.min(value + 1, phases.length - 1);
      if (me.data) saveMission.mutate({ currentStep: next + 1 });
      return next;
    });
  }

  function unlock() {
    if (code.trim().toUpperCase() !== "DUCK-OMEGA" || !me.data) return;
    unlockMission.mutate(undefined, {
      onSuccess: () => {
        setUnlocked(true);
        localStorage.setItem("duck-mission-unlocked", "true");
      },
    });
  }

  return <div className="min-h-screen overflow-hidden bg-[#050907] text-[#dcece3] selection:bg-emerald-400/30"><div className="fixed inset-0 opacity-50 [background-image:linear-gradient(rgba(52,211,153,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,.035)_1px,transparent_1px)] [background-size:52px_52px]" /><div className="fixed left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/10 shadow-[0_0_180px_rgba(16,185,129,.09),inset_0_0_90px_rgba(16,185,129,.05)]" /><header className="relative z-10 flex items-center justify-between border-b border-white/[.06] px-5 py-5 md:px-10"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"><Music2 size={16} /></div><div><div className="font-mono text-xs tracking-[.3em] text-emerald-300">DUCK / OMEGA</div><div className="text-[10px] uppercase tracking-[.2em] text-slate-600">Sistema de missão</div></div></div><div className="flex items-center gap-4 text-xs text-slate-500"><span className="hidden sm:inline">API {health.data?.ok ? "ONLINE" : "SYNC"}</span><Link href="/hub" className="text-emerald-300 hover:text-emerald-200">Acessar Hub <ArrowRight className="ml-1 inline" size={13} /></Link></div></header><main className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col justify-center px-5 py-12 md:px-10"><div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:items-center"><section><Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-300">TRANSMISSÃO RESTRITA · {progress}%</Badge><h1 className="mt-7 max-w-xl text-5xl font-semibold leading-[.98] tracking-[-.04em] md:text-7xl">A produção é o segredo. <span className="text-emerald-300">O sistema é a chave.</span></h1><p className="mt-7 max-w-lg text-base leading-7 text-slate-400 md:text-lg">Uma missão para transformar o caos invisível de um estúdio em um fluxo que pode ser entendido, protegido e entregue.</p><div className="mt-9 flex flex-wrap gap-3">{!started && <Button onClick={begin} className="bg-emerald-400 text-[#04100a] hover:bg-emerald-300">Iniciar transmissão <ArrowRight size={16} /></Button>}{started && <Button onClick={isLast ? () => navigate("/hub") : advance} className="bg-emerald-400 text-[#04100a] hover:bg-emerald-300">{isLast ? "Entrar no Duck Hub" : "Continuar missão"} <ArrowRight size={16} /></Button>}<Button variant="outline" className="border-white/10 bg-white/[.03] text-slate-300 hover:bg-white/[.07]" onClick={() => document.getElementById("protocol")?.scrollIntoView({ behavior: "smooth" })}>Ver protocolo <ChevronDown size={16} /></Button></div></section><section className="relative"><div className="absolute -inset-8 rounded-[40px] bg-emerald-500/5 blur-3xl" /><div className="relative rounded-[28px] border border-emerald-900/70 bg-[#0a1410]/90 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl md:p-7"><div className="flex items-center justify-between border-b border-white/[.07] pb-5"><div className="flex items-center gap-2 text-xs uppercase tracking-[.2em] text-slate-500"><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(52,211,153,.9)]" /> Canal seguro</div><div className="font-mono text-xs text-emerald-300">0{active + 1} / 0{phases.length}</div></div><div className="py-10 md:py-14"><div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"><phase.icon size={24} /></div><div className="font-mono text-xs tracking-[.25em] text-emerald-400">{phase.tag}</div><h2 className="mt-4 max-w-xl text-3xl font-medium tracking-tight md:text-4xl">{phase.title}</h2><p className="mt-5 max-w-xl text-base leading-7 text-slate-400">{phase.text}</p></div><div className="flex gap-2">{phases.map((item, index) => <button key={item.id} aria-label={`Ir para fase ${index + 1}`} onClick={() => setActive(index)} className={`h-1.5 flex-1 rounded-full ${index <= active ? "bg-emerald-400" : "bg-white/10"}`} />)}</div></div></section></div><section id="protocol" className="mt-24 grid gap-5 border-t border-white/[.06] pt-8 md:grid-cols-3"><Protocol title="Núcleo real" text="Banco de dados, autenticação e regras de acesso não são decorativos." /><Protocol title="Arquivos protegidos" text="Cada entrega pode ser versionada e distribuída por URL assinada." /><Protocol title="Missão persistente" text="Seu progresso fica persistido para usuários autenticados e o Hub continua disponível no comando." /><Protocol title="Gema 01" text="O catálogo, a entrega e a proteção de ativos transformam uma batida em uma operação rastreável." /></section><section className="mt-12 rounded-[28px] border border-white/[.07] bg-white/[.02] p-6 md:p-8"><div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div><div className="flex items-center gap-2 text-xs uppercase tracking-[.22em] text-slate-500"><LockKeyhole size={14} className="text-emerald-300" /> Terminal de autorização</div><h2 className="mt-3 text-2xl font-medium">Desbloqueie o acesso ao núcleo</h2><p className="mt-2 text-sm text-slate-500">Use o código de ativação para abrir a interface operacional real.</p></div>{unlocked ? <Link href="/hub"><Button className="bg-emerald-400 text-[#04100a] hover:bg-emerald-300"><Unlock size={16} /> Núcleo desbloqueado</Button></Link> : <div className="flex w-full max-w-md gap-2"><Input value={code} onChange={event => setCode(event.target.value)} onKeyDown={event => event.key === "Enter" && unlock()} placeholder="DUCK-OMEGA" className="border-white/10 bg-black/20 font-mono uppercase tracking-widest" /><Button onClick={unlock} variant="outline" className="border-emerald-400/30 text-emerald-300 hover:bg-emerald-400/10"><Check size={16} /></Button></div>}</div></section></main></div>;
}

function Protocol({ title, text }: { title: string; text: string }) { return <div className="rounded-2xl border border-white/[.06] bg-white/[.02] p-5"><div className="mb-4 h-1 w-10 bg-emerald-400" /><h3 className="font-medium">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>; }
