import type { VisaoSemaforo, VisaoVia } from "@/tipos/trafego";
import { CartaoVia } from "./cartao-via";

interface PropriedadesVisaoCruzamento {
  vias: VisaoVia[];
  semaforo: VisaoSemaforo;
  viaMaiorFluxoId: string | null;
}

export function VisaoCruzamento({
  vias,
  semaforo,
  viaMaiorFluxoId,
}: PropriedadesVisaoCruzamento) {
  return (
    <section className="space-y-5">
      <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
              Fluxo das Vias
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Cards numericos para comparar congestionamento por via
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Cada card mostra a quantidade de veiculos, o estado do semaforo e
              o sentido monitorado, facilitando a identificacao da via com maior
              fluxo.
            </p>
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Status do semaforo
            </p>
            <p className="mt-2 text-base font-semibold text-slate-900">
              {semaforo.statusTexto}
            </p>
          </div>
        </div>
      </article>

      <div className="grid gap-4 xl:grid-cols-3">
        {vias.map((via) => (
          <CartaoVia
            key={via.id}
            via={via}
            possuiMaiorFluxo={via.id === viaMaiorFluxoId}
          />
        ))}
      </div>
    </section>
  );
}
