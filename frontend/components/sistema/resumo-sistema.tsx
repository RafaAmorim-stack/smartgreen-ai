import type { VisaoSistema, VisaoVia } from "@/tipos/trafego";

interface PropriedadesResumoSistema {
  visaoSistema: VisaoSistema;
  viaMaiorFluxo: VisaoVia | null;
  totalVeiculosMonitorados: number;
  segundosRestantes: number;
  atualizando: boolean;
}

export function ResumoSistema({
  visaoSistema,
  viaMaiorFluxo,
  totalVeiculosMonitorados,
  segundosRestantes,
  atualizando,
}: PropriedadesResumoSistema) {
  const cartoes = [
    {
      rotulo: "Vias monitoradas",
      valor: visaoSistema.vias.length,
      detalhe: "vias analisadas continuamente no cruzamento",
      destaque:
        "border-slate-200 bg-white text-slate-900",
    },
    {
      rotulo: "Total de veiculos",
      valor: totalVeiculosMonitorados,
      detalhe: "soma atual de veiculos nas vias monitoradas",
      destaque:
        "border-slate-200 bg-white text-slate-900",
    },
    {
      rotulo: "Maior fluxo",
      valor: viaMaiorFluxo?.quantidadeVeiculos ?? 0,
      detalhe: viaMaiorFluxo
        ? `${viaMaiorFluxo.nome} concentra o maior congestionamento`
        : "aguardando leitura das vias",
      destaque:
        "border-emerald-200 bg-emerald-50 text-emerald-900",
    },
    {
      rotulo: "Proxima atualizacao",
      valor: atualizando ? 0 : segundosRestantes,
      detalhe: atualizando
        ? "novos dados sendo processados agora"
        : "segundos restantes para a proxima leitura automatica",
      destaque:
        "border-sky-200 bg-sky-50 text-sky-900",
    },
  ];

  return (
    <section className="space-y-5">
      <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
          Visao Geral do Sistema
        </p>
        <h2 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
          {viaMaiorFluxo?.nome ?? "Aguardando definicao"} esta no centro da
          atencao operacional.
        </h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
          {visaoSistema.mensagem}
        </p>
      </article>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cartoes.map((cartao) => (
          <article
            key={cartao.rotulo}
            className={`rounded-[24px] border p-6 shadow-sm ${cartao.destaque}`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              {cartao.rotulo}
            </p>
            <p className="mt-4 text-4xl font-bold tracking-tight">
              {cartao.valor}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {cartao.detalhe}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
