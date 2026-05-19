import { CircleDot, TrendingUp } from "lucide-react";
import { diretorioDeVias, type VisaoVia } from "@/tipos/trafego";

const LIMITE_VISUAL_VEICULOS = 20;

const mapaSemaforo = {
  GREEN: {
    rotulo: "Semaforo verde",
    ponto: "bg-emerald-500",
  },
  YELLOW: {
    rotulo: "Semaforo amarelo",
    ponto: "bg-amber-400",
  },
  RED: {
    rotulo: "Semaforo vermelho",
    ponto: "bg-rose-500",
  },
} as const;

function calcularPercentualOcupacao(quantidadeVeiculos: number): number {
  return Math.min(
    100,
    Math.round((quantidadeVeiculos / LIMITE_VISUAL_VEICULOS) * 100),
  );
}

interface PropriedadesCartaoVia {
  via: VisaoVia;
  possuiMaiorFluxo: boolean;
}

export function CartaoVia({
  via,
  possuiMaiorFluxo,
}: PropriedadesCartaoVia) {
  const semaforo = mapaSemaforo[via.corSemaforo];
  const percentualOcupacao = calcularPercentualOcupacao(via.quantidadeVeiculos);

  return (
    <article
      className={`rounded-[24px] border bg-white p-6 shadow-sm transition ${
        possuiMaiorFluxo
          ? "border-emerald-300 bg-emerald-50/70"
          : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Via {diretorioDeVias.obterRotuloCardinal(via.chave)}
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">
            {via.nome}
          </h3>
        </div>

        <div className="flex flex-col items-end gap-2">
          {possuiMaiorFluxo ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              <TrendingUp className="h-3.5 w-3.5" />
              Maior fluxo
            </span>
          ) : null}

          {via.estaPrioritaria ? (
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
              Prioridade atual
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-6 rounded-[20px] border border-slate-200 bg-white px-5 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Quantidade de veiculos
        </p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <p className="text-5xl font-bold tracking-tight text-slate-900">
            {via.quantidadeVeiculos}
          </p>
          <p className="pb-1 text-sm font-semibold text-slate-500">
            max. {LIMITE_VISUAL_VEICULOS}
          </p>
        </div>

        <div
          className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100"
          role="meter"
          aria-label={`Ocupacao da ${via.nome}`}
          aria-valuemin={0}
          aria-valuemax={LIMITE_VISUAL_VEICULOS}
          aria-valuenow={via.quantidadeVeiculos}
        >
          <div
            className="h-full rounded-full bg-[var(--smartgreen-green)] transition-all duration-500"
            style={{ width: `${percentualOcupacao}%` }}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span className={`h-3 w-3 rounded-full ${semaforo.ponto}`} />
        <p className="text-sm font-medium text-slate-700">{semaforo.rotulo}</p>
      </div>

      <div className="mt-5 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Sentido monitorado
          </p>
          <p className="mt-2 text-sm text-slate-700">{via.sentido}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Leitura da via
          </p>
          <p className="mt-2 text-sm text-slate-700">{via.descricao}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-[16px] bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <CircleDot className="h-4 w-4 text-[var(--smartgreen-green)]" />
        {possuiMaiorFluxo
          ? "Esta via concentra o maior nivel de congestionamento no momento."
          : "A via segue sendo acompanhada para identificar novas variacoes."}
      </div>
    </article>
  );
}
