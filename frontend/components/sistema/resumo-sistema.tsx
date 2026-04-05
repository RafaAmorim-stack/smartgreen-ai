import { Clock3, MapPinned, RadioTower, TimerReset } from "lucide-react";
import type { VisaoSistema } from "@/tipos/trafego";

const rotulosModo = {
  AUTOMATIC: "Operacao automatica",
} as const;

function formatarHorario(dataIso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(dataIso));
}

interface PropriedadesResumoSistema {
  visaoSistema: VisaoSistema;
  segundosRestantes: number;
  atualizando: boolean;
}

export function ResumoSistema({
  visaoSistema,
  segundosRestantes,
  atualizando,
}: PropriedadesResumoSistema) {
  const cartoes = [
    {
      rotulo: "Prioridade atual",
      valor: visaoSistema.nomeViaPrioritaria ?? "Indefinida",
      detalhe: visaoSistema.semaforo.statusTexto,
      icone: RadioTower,
      classeDestaque:
        "text-emerald-100 bg-emerald-300/10 border-emerald-300/20",
    },
    {
      rotulo: "Tempo de verde",
      valor: `${visaoSistema.semaforo.tempoVerdeSegundos}s`,
      detalhe: "janela aberta da prioridade atual",
      icone: TimerReset,
      classeDestaque: "text-sky-100 bg-sky-300/10 border-sky-300/20",
    },
    {
      rotulo: "Proxima leitura",
      valor: `${segundosRestantes}s`,
      detalhe: atualizando
        ? "simulacao em andamento"
        : `ultima leitura as ${formatarHorario(visaoSistema.semaforo.atualizadoEm)}`,
      icone: MapPinned,
      classeDestaque: "text-fuchsia-100 bg-fuchsia-300/10 border-fuchsia-300/20",
    },
  ];

  return (
    <section id="visao-geral" className="space-y-5">
      <article className="control-panel overflow-hidden p-6 sm:p-7">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
              Visao Geral do Sistema
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white">
              {visaoSistema.nomeViaPrioritaria ?? "Aguardando definicao"} conduz
              o ciclo atual.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              {visaoSistema.mensagem}
            </p>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/[0.03] px-6 py-5">
            <p className="text-[11px] uppercase tracking-[0.34em] text-slate-500">
              Resumo do ciclo
            </p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <p className="font-display text-4xl font-semibold text-white">
                {visaoSistema.semaforo.duracaoCicloSegundos}s
              </p>
              <div className="rounded-[20px] border border-amber-300/20 bg-amber-300/10 p-3 text-amber-100">
                <Clock3 className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              {rotulosModo[visaoSistema.semaforo.modo]} com atualizacao
              automatica ativa.
            </p>
          </div>
        </div>
      </article>

      <div className="grid gap-5 md:grid-cols-3">
        {cartoes.map(({ rotulo, valor, detalhe, icone: Icone, classeDestaque }) => (
          <article key={rotulo} className="control-panel p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.34em] text-slate-500">
                  {rotulo}
                </p>
                <p className="mt-4 font-display text-2xl font-semibold text-white">
                  {valor}
                </p>
              </div>
              <div className={`rounded-[22px] border p-3 ${classeDestaque}`}>
                <Icone className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-400">{detalhe}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
