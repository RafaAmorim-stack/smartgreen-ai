import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  CircleAlert,
  Lightbulb,
  Route,
} from "lucide-react";
import { diretorioDeVias, type ChaveVia, type VisaoVia } from "@/tipos/trafego";

const mapaCores = {
  GREEN: {
    rotulo: "Sinal verde",
    ponto: "bg-emerald-300 shadow-[0_0_24px_rgba(110,231,183,0.55)]",
  },
  YELLOW: {
    rotulo: "Sinal amarelo",
    ponto: "bg-amber-400 shadow-[0_0_24px_rgba(251,191,36,0.55)]",
  },
  RED: {
    rotulo: "Sinal vermelho",
    ponto: "bg-rose-400 shadow-[0_0_24px_rgba(251,113,133,0.45)]",
  },
} as const;

function IconeSentido({ chaveVia }: { chaveVia: ChaveVia }) {
  if (chaveVia === "EAST") {
    return <ArrowLeft className="h-4 w-4" />;
  }

  if (chaveVia === "NORTH") {
    return <ArrowDown className="h-4 w-4" />;
  }

  if (chaveVia === "SOUTH") {
    return <ArrowUp className="h-4 w-4" />;
  }

  return <Route className="h-4 w-4" />;
}

interface PropriedadesCartaoVia {
  via: VisaoVia;
}

export function CartaoVia({ via }: PropriedadesCartaoVia) {
  const semaforo = mapaCores[via.corSemaforo];

  return (
    <article
      className={`control-panel overflow-hidden p-6 transition ${
        via.estaPrioritaria
          ? "border-emerald-300/25 bg-emerald-300/10 shadow-glow"
          : "border-white/10"
      }`}
    >
      <div className="grid gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`rounded-[24px] border p-3 ${
                via.estaPrioritaria
                  ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
                  : "border-white/10 bg-white/5 text-slate-200"
              }`}
            >
              {via.estaPrioritaria ? (
                <CircleAlert className="h-5 w-5" />
              ) : (
                <Route className="h-5 w-5" />
              )}
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.34em] text-slate-500">
                Via {diretorioDeVias.obterRotuloCardinal(via.chave)}
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold text-white">
                {via.nome}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-7 text-slate-300">
                {via.descricao}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/55 px-3 py-2 text-xs uppercase tracking-[0.26em] text-slate-300">
            <IconeSentido chaveVia={via.chave} />
            {via.sentido}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="panel-surface p-5">
            <p className="text-[11px] uppercase tracking-[0.34em] text-slate-500">
              Fluxo de Veiculos
            </p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="font-display text-5xl font-semibold text-white">
                {via.quantidadeVeiculos}
              </p>
              <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-500">
                <IconeSentido chaveVia={via.chave} />
                leitura atual
              </div>
            </div>
          </div>

          <div className="panel-surface p-5">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.34em] text-slate-500">
              <Lightbulb className="h-4 w-4" />
              Status do Semaforo
            </div>
            <div className="mt-5 flex items-center gap-3">
              <span className={`signal-dot ${semaforo.ponto}`} />
              <div>
                <p className="text-base font-semibold text-white">
                  {semaforo.rotulo}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  {via.estaPrioritaria
                    ? "faixa liberada no ciclo atual"
                    : "aguardando nova janela verde"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
