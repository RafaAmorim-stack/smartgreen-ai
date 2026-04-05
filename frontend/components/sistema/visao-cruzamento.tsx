import {
  Clock3,
  LocateFixed,
  ShieldCheck,
  TrafficCone,
  Waypoints,
} from "lucide-react";
import {
  diretorioDeVias,
  type VisaoSemaforo,
  type VisaoVia,
} from "@/tipos/trafego";

const mapaStatusSemaforo = {
  GREEN: {
    rotulo: "Sinal verde",
    detalhe: "fluxo liberado neste ciclo",
    classeBorda: "border-emerald-300/20",
    classeFundo: "bg-emerald-300/10",
    classeIcone: "text-emerald-100",
    classePonto: "bg-emerald-300",
  },
  YELLOW: {
    rotulo: "Sinal amarelo",
    detalhe: "transicao de prioridade em andamento",
    classeBorda: "border-amber-300/20",
    classeFundo: "bg-amber-300/10",
    classeIcone: "text-amber-100",
    classePonto: "bg-amber-300",
  },
  RED: {
    rotulo: "Sinal vermelho",
    detalhe: "aguardando nova janela verde",
    classeBorda: "border-rose-300/20",
    classeFundo: "bg-rose-300/10",
    classeIcone: "text-rose-100",
    classePonto: "bg-rose-300",
  },
} as const;

interface PropriedadesVisaoCruzamento {
  vias: VisaoVia[];
  semaforo: VisaoSemaforo;
  enderecoCruzamento: string;
}

export function VisaoCruzamento({
  vias,
  semaforo,
  enderecoCruzamento,
}: PropriedadesVisaoCruzamento) {
  return (
    <section id="simulacao" className="control-panel overflow-hidden p-6 sm:p-8">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
              Status do Semaforo
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white">
              Leitura compacta das vias monitoradas
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
            <LocateFixed className="h-3.5 w-3.5" />
            {enderecoCruzamento}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="panel-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.34em] text-slate-500">
                  Prioridade
                </p>
                <p className="mt-3 font-display text-2xl font-semibold text-white">
                  {semaforo.nomeViaPrioritariaAtual ?? "Aguardando leitura"}
                </p>
              </div>
              <div className="rounded-[22px] border border-emerald-300/20 bg-emerald-300/10 p-3 text-emerald-100">
                <Waypoints className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              {semaforo.statusTexto}
            </p>
          </article>

          <article className="panel-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.34em] text-slate-500">
                  Janela verde
                </p>
                <p className="mt-3 font-display text-2xl font-semibold text-white">
                  {semaforo.tempoVerdeSegundos}s
                </p>
              </div>
              <div className="rounded-[22px] border border-sky-300/20 bg-sky-300/10 p-3 text-sky-100">
                <Clock3 className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              janela acumulada do corredor priorizado
            </p>
          </article>

          <article className="panel-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.34em] text-slate-500">
                  Operacao
                </p>
                <p className="mt-3 font-display text-2xl font-semibold text-white">
                  Automatica
                </p>
              </div>
              <div className="rounded-[22px] border border-amber-300/20 bg-amber-300/10 p-3 text-amber-100">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              ciclo total de {semaforo.duracaoCicloSegundos}s com decisao em
              tempo real
            </p>
          </article>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {vias.map((via) => {
            const statusAtual = mapaStatusSemaforo[via.corSemaforo];

            return (
              <article
                key={via.id}
                className={`panel-surface p-5 ${statusAtual.classeBorda} ${statusAtual.classeFundo}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.34em] text-slate-500">
                      Via {diretorioDeVias.obterRotuloCardinal(via.chave)}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                      {via.quantidadeVeiculos}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">
                      veiculos no momento
                    </p>
                  </div>
                  <div
                    className={`rounded-[22px] border border-white/10 p-3 ${statusAtual.classeIcone}`}
                  >
                    <TrafficCone className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <span className={`signal-dot ${statusAtual.classePonto}`} />
                  <p className="text-sm font-medium text-white">
                    {statusAtual.rotulo}
                  </p>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {via.estaPrioritaria
                    ? "Fluxo liberado no ciclo atual."
                    : statusAtual.detalhe}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                    Sentido
                  </span>
                  <span className="text-sm text-slate-200">{via.sentido}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
