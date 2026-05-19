import { CircleDot, TimerReset } from "lucide-react";
import type { VisaoSemaforo, VisaoVia } from "@/tipos/trafego";

const mapaStatusSemaforo: Record<
  VisaoVia["corSemaforo"],
  {
    rotulo: string;
    descricao: string;
    ponto: string;
    destaque: string;
  }
> = {
  GREEN: {
    rotulo: "Verde",
    descricao: "Via liberada para passagem",
    ponto: "bg-emerald-500",
    destaque: "border-emerald-200 bg-emerald-50 text-emerald-900",
  },
  YELLOW: {
    rotulo: "Amarelo",
    descricao: "Transicao de prioridade",
    ponto: "bg-amber-400",
    destaque: "border-amber-200 bg-amber-50 text-amber-900",
  },
  RED: {
    rotulo: "Vermelho",
    descricao: "Via aguardando liberacao",
    ponto: "bg-rose-500",
    destaque: "border-rose-200 bg-rose-50 text-rose-900",
  },
};

interface PropriedadesStatusSemaforos {
  vias: VisaoVia[];
  semaforo: VisaoSemaforo;
}

function formatarAtualizacao(dataIso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(dataIso));
}

export function StatusSemaforos({
  vias,
  semaforo,
}: PropriedadesStatusSemaforos) {
  const totalViasLiberadas = vias.filter(
    (via) => via.corSemaforo === "GREEN",
  ).length;

  return (
    <section className="space-y-5">
      <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
              Status dos Semaforos
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Estado atual de cada semaforo no cruzamento
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Acompanhe quais vias estao liberadas e quais aguardam nova janela
              de prioridade no ciclo automatico.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Vias liberadas
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalViasLiberadas}/{vias.length}
              </p>
            </div>

            <div className="rounded-[20px] border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Atualizado
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatarAtualizacao(semaforo.atualizadoEm)}
              </p>
            </div>
          </div>
        </div>
      </article>

      <div className="grid gap-4 lg:grid-cols-3">
        {vias.map((via) => {
          const status = mapaStatusSemaforo[via.corSemaforo];

          return (
            <article
              key={via.id}
              className={`rounded-[24px] border p-6 shadow-sm ${status.destaque}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {via.nome}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">
                    Semaforo {status.rotulo}
                  </h3>
                </div>
                <span className={`h-4 w-4 rounded-full ${status.ponto}`} />
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-700">
                {status.descricao}. Sentido monitorado: {via.sentido}.
              </p>

              <div className="mt-5 grid gap-3 border-t border-slate-200 pt-5 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CircleDot className="h-4 w-4" />
                  {via.estaPrioritaria ? "Prioridade atual" : "Aguardando"}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <TimerReset className="h-4 w-4" />
                  {semaforo.tempoVerdeSegundos}s de verde
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
