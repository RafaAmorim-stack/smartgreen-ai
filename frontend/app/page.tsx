import { FormularioAcesso } from "@/components/autenticacao/formulario-acesso";
import { PalcoControleUrbano } from "@/components/autenticacao/palco-controle-urbano";

export default function PaginaInicial() {
  return (
    <main className="min-h-screen bg-white px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex min-h-[calc(100vh-3rem)] flex-col">
        <div className="mx-auto flex w-full max-w-[1260px] flex-1 items-center justify-center">
          <section className="grid min-h-[760px] w-full overflow-hidden rounded-[32px] border border-[var(--smartgreen-line)] bg-white shadow-[0_24px_70px_rgba(16,24,35,0.08)] lg:grid-cols-2">
            <PalcoControleUrbano />

            <aside className="relative flex min-h-[760px] items-center justify-center bg-white px-6 py-10 sm:px-10">
              <FormularioAcesso />
            </aside>
          </section>
        </div>
      </div>
    </main>
  );
}
