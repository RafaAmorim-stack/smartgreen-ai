import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  MapPinned,
  RefreshCcw,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function obterUrlAmbiente(valor: string | undefined, fallback: string) {
  return valor?.trim() || fallback;
}

const urlFormularioValidacaoPadrao =
  "https://docs.google.com/forms/d/e/1FAIpQLSfsX2KAt-usKDsvfRZ2zAClX_Sa9IzO31eJCtXft-KeTLkujQ/viewform?usp=header";

const urlFormularioValidacao = obterUrlAmbiente(
  process.env.NEXT_PUBLIC_FORMULARIO_VALIDACAO_URL,
  urlFormularioValidacaoPadrao,
);
const urlMvp = obterUrlAmbiente(process.env.NEXT_PUBLIC_MVP_URL, "/sistema");
const urlDocumentacaoApi = obterUrlAmbiente(
  process.env.NEXT_PUBLIC_API_DOCS_URL,
  "http://localhost:4000/api/docs",
);

const formularioConfigurado = Boolean(urlFormularioValidacao);

const indicadores = [
  { valor: "3", rotulo: "vias monitoradas" },
  { valor: "5s", rotulo: "atualizacao do MVP" },
  { valor: "4", rotulo: "grupos de validacao" },
] as const;

const funcionalidades = [
  {
    titulo: "Monitoramento por via",
    descricao:
      "Visualizacao objetiva da quantidade de veiculos em cada sentido do cruzamento.",
    Icone: BarChart3,
  },
  {
    titulo: "Prioridade inteligente",
    descricao:
      "Comparacao do fluxo para indicar qual corredor deve receber prioridade semaforica.",
    Icone: Gauge,
  },
  {
    titulo: "Simulacao automatica",
    descricao:
      "Atualizacoes periodicas demonstram a chegada e a saida de veiculos no MVP.",
    Icone: RefreshCcw,
  },
  {
    titulo: "Acesso direto",
    descricao:
      "O usuario abre o painel principal pela landing e testa a solucao sem etapa de login.",
    Icone: ArrowRight,
  },
] as const;

const itensEntrega = [
  "Proposito da solucao explicado na primeira dobra.",
  "Funcionalidades principais apresentadas em linguagem simples.",
  "Botao para acessar a home funcional do MVP.",
  "Formulario de validacao preparado para usuarios finais.",
] as const;

const etapasTeste = [
  "Acesse o MVP pela landing page.",
  "Observe diretamente a via com maior fluxo no painel.",
  "Use o botao de atualizacao para simular novas leituras.",
  "Responda ao formulario com sua avaliacao.",
] as const;

const gruposFormulario = [
  {
    titulo: "Perfil do publico",
    texto:
      "Genero, idade, renda, regiao, escolaridade e relacao com o transito urbano.",
    Icone: UsersRound,
  },
  {
    titulo: "Valor da solucao",
    texto:
      "Perguntas sobre o problema, clareza da proposta e utilidade das funcionalidades.",
    Icone: MapPinned,
  },
  {
    titulo: "Teste do MVP",
    texto:
      "Interesse em testar agora, continuar testando e recomendar a solucao.",
    Icone: ClipboardCheck,
  },
  {
    titulo: "Sugestoes",
    texto:
      "Espaco para criticas, ideias de backlog e percepcao real das personas.",
    Icone: ShieldCheck,
  },
] as const;

function atributosLink(url: string) {
  return url.startsWith("http")
    ? { target: "_blank", rel: "noreferrer" }
    : {};
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-smartgreen.png"
              alt="SmartGreen AI"
              width={152}
              height={64}
              priority
              className="h-10 w-auto"
            />
          </Link>

          <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#proposito" className="hover:text-slate-950">
              Proposito
            </a>
            <a href="#funcionalidades" className="hover:text-slate-950">
              Funcionalidades
            </a>
            <a href="#mvp" className="hover:text-slate-950">
              MVP
            </a>
            <a href="#validacao" className="hover:text-slate-950">
              Validacao
            </a>
          </div>

          <Link
            href="/sistema"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--smartgreen-green)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--smartgreen-green-soft)]"
          >
            Testar MVP
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </header>

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid min-h-[calc(100vh-68px)] max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
          <div>
            <p className="inline-flex rounded-md border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--smartgreen-green)]">
              Landing page de validacao academica
            </p>

            <h1 className="mt-7 max-w-4xl text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              SmartGreen AI
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Sistema inteligente de controle semaforico para cruzamentos
              urbanos. O MVP permite testar o monitoramento de fluxo por via e
              avaliar se a priorizacao automatica resolve uma dor real dos
              usuarios.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={urlMvp}
                {...atributosLink(urlMvp)}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--smartgreen-green)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--smartgreen-green-soft)]"
              >
                Acessar solucao funcional
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={urlFormularioValidacao}
                {...atributosLink(urlFormularioValidacao)}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
              >
                Responder validacao
                <ClipboardCheck className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
              {indicadores.map((indicador) => (
                <div
                  key={indicador.rotulo}
                  className="rounded-lg border border-slate-200 bg-white p-4"
                >
                  <p className="text-3xl font-bold text-slate-950">
                    {indicador.valor}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    {indicador.rotulo}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  MVP web
                </p>
                <h2 className="mt-2 text-xl font-bold text-slate-950">
                  Painel de fluxo urbano
                </h2>
              </div>
              <span className="rounded-md bg-emerald-50 px-3 py-2 text-xs font-bold text-[var(--smartgreen-green)]">
                Online
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {["Via Norte", "Via Leste", "Via Sul"].map((via, indice) => (
                <div
                  key={via}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-md border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {via}
                    </p>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-[var(--smartgreen-green)]"
                        style={{ width: `${indice === 1 ? 82 : 64}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-slate-950">
                    {indice === 0 ? 24 : indice === 1 ? 31 : 27}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-[var(--smartgreen-green)]">
                Corredor priorizado: Norte-Sul
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Exemplo visual do painel que o usuario acessa para testar a
                solucao funcional.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section id="proposito" className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--smartgreen-green)]">
              Proposito
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              Tornar a espera no semaforo mais inteligente.
            </h2>
          </div>

          <div className="grid gap-5 text-base leading-8 text-slate-600">
            <p>
              O SmartGreen AI simula uma abordagem em que o semaforo considera
              a quantidade de veiculos nas vias antes de definir a prioridade de
              passagem. A proposta busca reduzir filas, melhorar a fluidez e
              apoiar decisoes sobre mobilidade urbana.
            </p>
            <p>
              Nesta entrega, a landing page apresenta a ideia ao publico-alvo,
              direciona para o MVP funcional e coleta respostas para validar
              interesse, experiencia e necessidades reais.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {itensEntrega.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[var(--smartgreen-green)]" />
                <p className="text-sm leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="funcionalidades" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--smartgreen-green)]">
              Funcionalidades
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              O que pode ser avaliado no MVP.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {funcionalidades.map(({ titulo, descricao, Icone }) => (
              <article
                key={titulo}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 text-[var(--smartgreen-green)]">
                  <Icone className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  {titulo}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {descricao}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="mvp" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--smartgreen-green)]">
              Acesso ao MVP
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              A versao funcional e web.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Nao ha APK nesta versao. O usuario final acessa a home funcional
              pelo navegador e testa diretamente o painel principal de
              monitoramento de trafego, sem precisar passar por login.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={urlMvp}
                {...atributosLink(urlMvp)}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--smartgreen-green)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--smartgreen-green-soft)]"
              >
                Abrir MVP
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={urlDocumentacaoApi}
                {...atributosLink(urlDocumentacaoApi)}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
              >
                Ver API
                <ShieldCheck className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-3">
            {etapasTeste.map((etapa, indice) => (
              <div
                key={etapa}
                className="grid grid-cols-[auto_1fr] gap-4 rounded-lg border border-slate-200 bg-white p-4"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-50 text-sm font-bold text-[var(--smartgreen-green)]">
                  {indice + 1}
                </span>
                <p className="self-center text-sm leading-6 text-slate-700">
                  {etapa}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="validacao" className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
          <div id="formulario-validacao">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--smartgreen-green)]">
              Validacao com usuarios
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              Formulario para medir interesse e experiencia.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              O formulario inclui briefing com logo, descricao da solucao, aviso
              de uso academico dos dados, anonimato e questao final de
              consentimento.
            </p>

            {!formularioConfigurado ? (
              <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                Configure NEXT_PUBLIC_FORMULARIO_VALIDACAO_URL com o link
                publico do Google Forms antes de publicar a landing para
                usuarios finais.
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {gruposFormulario.map(({ titulo, texto, Icone }) => (
              <article
                key={titulo}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-[var(--smartgreen-green)] shadow-sm">
                  <Icone className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-bold text-slate-950">{titulo}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{texto}</p>
              </article>
            ))}

            <a
              href={urlFormularioValidacao}
              {...atributosLink(urlFormularioValidacao)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--smartgreen-green)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--smartgreen-green-soft)] sm:col-span-2"
            >
              Responder formulario de validacao
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
