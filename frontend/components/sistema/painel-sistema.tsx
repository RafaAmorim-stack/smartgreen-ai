"use client";

import {
  AlertTriangle,
  LogOut,
  RefreshCcw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { armazenamentoSessao } from "@/servicos/armazenamento-sessao";
import {
  clienteConsultaTrafego,
  clienteSimulacaoTrafego,
} from "@/servicos/cliente-trafego";
import { ErroApi } from "@/servicos/cliente-http";
import type {
  ClienteConsultaTrafego,
  ClienteSimulacaoTrafego,
} from "@/servicos/interfaces/cliente-trafego";
import type { UsuarioSessao, VisaoSistema, VisaoVia } from "@/tipos/trafego";
import { ResumoSistema } from "./resumo-sistema";
import { StatusSemaforos } from "./status-semaforos";
import { VisaoCruzamento } from "./visao-cruzamento";

const INTERVALO_ATUALIZACAO_AUTOMATICA = 5;
const INTERVALO_ANIMACAO_CONTADORES = 900;
const LIMITE_DEMONSTRACAO = 20;

interface PropriedadesPainelSistema {
  modoDemonstracao?: boolean;
}

const usuarioDemonstracao: UsuarioSessao = {
  id: "demo-smartgreen",
  nome: "Equipe SmartGreen",
  email: "demo@smartgreen.ai",
};

function calcularPassoSuave(valorAtual: number, valorDestino: number): number {
  const diferenca = valorDestino - valorAtual;

  if (diferenca === 0) {
    return 0;
  }

  if (Math.abs(diferenca) <= 2) {
    return Math.sign(diferenca);
  }

  return Math.sign(diferenca) * Math.min(3, Math.ceil(Math.abs(diferenca) / 4));
}

function encontrarViaMaiorFluxo(vias: VisaoVia[]): VisaoVia | null {
  if (!vias.length) {
    return null;
  }

  return [...vias].sort((viaA, viaB) => {
    if (viaB.quantidadeVeiculos !== viaA.quantidadeVeiculos) {
      return viaB.quantidadeVeiculos - viaA.quantidadeVeiculos;
    }

    return viaA.nome.localeCompare(viaB.nome);
  })[0];
}

function limitarQuantidade(valor: number): number {
  return Math.max(4, Math.min(LIMITE_DEMONSTRACAO, valor));
}

function selecionarPrioridade(vias: VisaoVia[]): "vertical" | "leste" {
  const viaNorte = vias.find((via) => via.chave === "NORTH");
  const viaSul = vias.find((via) => via.chave === "SOUTH");
  const viaLeste = vias.find((via) => via.chave === "EAST");
  const fluxoVertical =
    (viaNorte?.quantidadeVeiculos ?? 0) + (viaSul?.quantidadeVeiculos ?? 0);

  return fluxoVertical > (viaLeste?.quantidadeVeiculos ?? 0) + 6
    ? "vertical"
    : "leste";
}

function montarVisaoDemonstracao(viasBase?: VisaoVia[]): VisaoSistema {
  const vias: VisaoVia[] =
    viasBase ?? [
      {
        id: "via-norte-demo",
        chave: "NORTH",
        nome: "Via Norte",
        descricao: "Fluxo monitorado no sentido Norte para Sul.",
        quantidadeVeiculos: 14,
        corSemaforo: "GREEN",
        estaPrioritaria: true,
        sentido: "Norte para Sul",
      },
      {
        id: "via-leste-demo",
        chave: "EAST",
        nome: "Via Leste",
        descricao: "Fluxo monitorado no sentido Leste para Oeste.",
        quantidadeVeiculos: 18,
        corSemaforo: "RED",
        estaPrioritaria: false,
        sentido: "Leste para Oeste",
      },
      {
        id: "via-sul-demo",
        chave: "SOUTH",
        nome: "Via Sul",
        descricao: "Fluxo monitorado no sentido Sul para Norte.",
        quantidadeVeiculos: 12,
        corSemaforo: "GREEN",
        estaPrioritaria: true,
        sentido: "Sul para Norte",
      },
    ];
  const prioridade = selecionarPrioridade(vias);
  const viasComSemaforo = vias.map((via) => {
    const estaPrioritaria =
      prioridade === "vertical"
        ? via.chave === "NORTH" || via.chave === "SOUTH"
        : via.chave === "EAST";

    return {
      ...via,
      corSemaforo: estaPrioritaria ? "GREEN" : "RED",
      estaPrioritaria,
    } satisfies VisaoVia;
  });
  const nomePrioridade =
    prioridade === "vertical" ? "Corredor Norte-Sul" : "Via Leste";
  const maiorFluxo = encontrarViaMaiorFluxo(viasComSemaforo);
  const atualizadoEm = new Date().toISOString();

  return {
    geradoEm: atualizadoEm,
    enderecoCruzamento: "Cruzamento Av. Afonso Vergueiro x R. Professor Toledo",
    idViaPrioritaria:
      prioridade === "vertical"
        ? viasComSemaforo.find((via) => via.chave === "NORTH")?.id ?? null
        : viasComSemaforo.find((via) => via.chave === "EAST")?.id ?? null,
    nomeViaPrioritaria: nomePrioridade,
    mensagem: `${nomePrioridade} esta priorizado no modo demonstracao para aliviar o fluxo de ${maiorFluxo?.quantidadeVeiculos ?? 0} veiculos na via mais carregada.`,
    vias: viasComSemaforo,
    semaforo: {
      id: "semaforo-demo",
      modo: "AUTOMATIC",
      statusTexto: `${nomePrioridade} liberado em modo demonstracao.`,
      chaveViaPrioritariaAtual: prioridade === "vertical" ? "NORTH" : "EAST",
      nomeViaPrioritariaAtual: nomePrioridade,
      duracaoCicloSegundos: 34,
      tempoVerdeSegundos: 14,
      atualizadoEm,
    },
  };
}

function simularVisaoDemonstracao(visaoAtual: VisaoSistema): VisaoSistema {
  const proximasVias = visaoAtual.vias.map((via) => {
    const variacao = via.estaPrioritaria
      ? -Math.floor(Math.random() * 3)
      : Math.floor(Math.random() * 3) + 1;

    return {
      ...via,
      quantidadeVeiculos: limitarQuantidade(via.quantidadeVeiculos + variacao),
    };
  });

  return montarVisaoDemonstracao(proximasVias);
}

export function PainelSistema({
  modoDemonstracao = false,
}: PropriedadesPainelSistema) {
  const servicoConsultaTrafego: ClienteConsultaTrafego = clienteConsultaTrafego;
  const servicoSimulacaoTrafego: ClienteSimulacaoTrafego =
    clienteSimulacaoTrafego;
  const roteador = useRouter();
  const [tokenAcesso, setTokenAcesso] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<UsuarioSessao | null>(null);
  const [visaoSistema, setVisaoSistema] = useState<VisaoSistema | null>(null);
  const [quantidadesAnimadas, setQuantidadesAnimadas] = useState<
    Record<string, number>
  >({});
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [segundosRestantes, setSegundosRestantes] = useState(
    INTERVALO_ATUALIZACAO_AUTOMATICA,
  );

  useEffect(() => {
    const tokenSalvo = armazenamentoSessao.obterToken();

    if (!tokenSalvo) {
      if (modoDemonstracao) {
        setUsuario(usuarioDemonstracao);
        return;
      }

      roteador.replace("/");
      return;
    }

    setTokenAcesso(tokenSalvo);
    setUsuario(armazenamentoSessao.obterUsuario());
  }, [modoDemonstracao, roteador]);

  const carregarVisao = useCallback(async () => {
    if (!tokenAcesso) {
      if (modoDemonstracao) {
        setErro(null);
        setVisaoSistema(montarVisaoDemonstracao());
        setCarregando(false);
      }

      return;
    }

    const tokenAtual = tokenAcesso;

    try {
      setErro(null);
      const resposta = await servicoConsultaTrafego.obterVisaoGeral(tokenAtual);
      setVisaoSistema(resposta);
    } catch (erroCarregamento) {
      if (
        erroCarregamento instanceof ErroApi &&
        (erroCarregamento.statusCode === 401 ||
          erroCarregamento.statusCode === 403)
      ) {
        armazenamentoSessao.limparSessao();
        roteador.replace("/");
        return;
      }

      setErro(
        erroCarregamento instanceof Error
          ? erroCarregamento.message
          : "Nao foi possivel carregar o painel de monitoramento.",
      );
    } finally {
      setCarregando(false);
    }
  }, [modoDemonstracao, roteador, servicoConsultaTrafego, tokenAcesso]);

  useEffect(() => {
    void carregarVisao();
  }, [carregarVisao]);

  useEffect(() => {
    if (!visaoSistema) {
      return;
    }

    setQuantidadesAnimadas((quantidadesAtuais) => {
      const proximasQuantidades = { ...quantidadesAtuais };

      for (const via of visaoSistema.vias) {
        if (proximasQuantidades[via.id] === undefined) {
          proximasQuantidades[via.id] = via.quantidadeVeiculos;
        }
      }

      return proximasQuantidades;
    });
  }, [visaoSistema]);

  useEffect(() => {
    if (!visaoSistema) {
      return;
    }

    const animacao = window.setInterval(() => {
      setQuantidadesAnimadas((quantidadesAtuais) => {
        let houveMudanca = false;
        const proximasQuantidades = { ...quantidadesAtuais };

        for (const via of visaoSistema.vias) {
          const valorAtual =
            proximasQuantidades[via.id] ?? via.quantidadeVeiculos;
          const passo = calcularPassoSuave(valorAtual, via.quantidadeVeiculos);

          if (passo !== 0) {
            proximasQuantidades[via.id] = valorAtual + passo;
            houveMudanca = true;
          }
        }

        return houveMudanca ? proximasQuantidades : quantidadesAtuais;
      });
    }, INTERVALO_ANIMACAO_CONTADORES);

    return () => {
      window.clearInterval(animacao);
    };
  }, [visaoSistema]);

  const simularAgora = useCallback(async () => {
    if (!tokenAcesso) {
      if (modoDemonstracao) {
        setAtualizando(true);
        setErro(null);
        setVisaoSistema((visaoAtual) =>
          simularVisaoDemonstracao(visaoAtual ?? montarVisaoDemonstracao()),
        );
        setSegundosRestantes(INTERVALO_ATUALIZACAO_AUTOMATICA);
        setAtualizando(false);
      }

      return;
    }

    try {
      setAtualizando(true);
      setErro(null);
      const resposta = await servicoSimulacaoTrafego.simular(tokenAcesso);
      setVisaoSistema(resposta);
      setSegundosRestantes(INTERVALO_ATUALIZACAO_AUTOMATICA);
    } catch (erroSimulacao) {
      if (
        erroSimulacao instanceof ErroApi &&
        (erroSimulacao.statusCode === 401 ||
          erroSimulacao.statusCode === 403)
      ) {
        armazenamentoSessao.limparSessao();
        roteador.replace("/");
        return;
      }

      setErro(
        erroSimulacao instanceof Error
          ? erroSimulacao.message
          : "Nao foi possivel atualizar os dados do trafego.",
      );
    } finally {
      setAtualizando(false);
    }
  }, [modoDemonstracao, roteador, servicoSimulacaoTrafego, tokenAcesso]);

  useEffect(() => {
    if (!tokenAcesso && !modoDemonstracao) {
      return;
    }

    const contador = window.setInterval(() => {
      setSegundosRestantes((valorAtual) =>
        valorAtual <= 1 ? INTERVALO_ATUALIZACAO_AUTOMATICA : valorAtual - 1,
      );
    }, 1000);

    const atualizacaoAutomatica = window.setInterval(() => {
      void simularAgora();
    }, INTERVALO_ATUALIZACAO_AUTOMATICA * 1000);

    return () => {
      window.clearInterval(contador);
      window.clearInterval(atualizacaoAutomatica);
    };
  }, [modoDemonstracao, tokenAcesso, simularAgora]);

  function sair() {
    const confirmouSaida = window.confirm("Deseja sair do SmartGreen?");

    if (!confirmouSaida) {
      return;
    }

    armazenamentoSessao.limparSessao();
    roteador.push(modoDemonstracao ? "/acesso" : "/");
  }

  const visaoSistemaAoVivo = useMemo(() => {
    if (!visaoSistema) {
      return null;
    }

    return {
      ...visaoSistema,
      vias: visaoSistema.vias.map((via) => ({
        ...via,
        quantidadeVeiculos:
          quantidadesAnimadas[via.id] ?? via.quantidadeVeiculos,
      })),
    };
  }, [visaoSistema, quantidadesAnimadas]);

  const viaMaiorFluxo = useMemo(
    () => encontrarViaMaiorFluxo(visaoSistemaAoVivo?.vias ?? []),
    [visaoSistemaAoVivo],
  );

  const totalVeiculosMonitorados = useMemo(
    () =>
      (visaoSistemaAoVivo?.vias ?? []).reduce(
        (acumulador, via) => acumulador + via.quantidadeVeiculos,
        0,
      ),
    [visaoSistemaAoVivo],
  );

  if (carregando && !visaoSistemaAoVivo) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-center">
          <div className="w-full rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
              Carregando
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900">
              Preparando o painel de fluxo de veiculos
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              O sistema esta sincronizando as vias monitoradas para exibir as
              quantidades em tempo real.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!visaoSistemaAoVivo) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-8">
        <div className="mx-auto flex max-w-3xl items-center justify-center">
          <div className="w-full rounded-[28px] border border-rose-200 bg-white p-10 text-center shadow-sm">
            <p className="text-base text-rose-600">
              {erro ?? "Nao foi possivel carregar os dados principais do sistema."}
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => void carregarVisao()}
                className="rounded-[16px] bg-[var(--smartgreen-green)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--smartgreen-green-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--smartgreen-green)] focus:ring-offset-2"
              >
                Tentar novamente
              </button>
              <button
                type="button"
                onClick={() => roteador.push("/")}
                className="rounded-[16px] border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[var(--smartgreen-green)] focus:ring-offset-2"
              >
                Voltar para o acesso
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Menu SmartGreen
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                  Acompanhe primeiro o status atual dos semaforos e, em seguida,
                  monitore o fluxo de veiculos nas vias do cruzamento.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                  {visaoSistemaAoVivo.enderecoCruzamento}
                </span>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-700">
                  Atualizacao automatica a cada {INTERVALO_ATUALIZACAO_AUTOMATICA}s
                </span>
              </div>
            </div>

            <div className="flex w-full max-w-sm flex-col gap-3">
              <div className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Usuario conectado
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {usuario?.nome ?? "Gestor de transito"}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {usuario?.email ?? "ambiente local"}
                </p>
              </div>

              <div className="grid gap-3">
                <button
                  type="button"
                  onClick={() => void simularAgora()}
                  disabled={atualizando}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[16px] bg-[var(--smartgreen-green)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--smartgreen-green-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--smartgreen-green)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <RefreshCcw
                    className={`h-4 w-4 ${atualizando ? "animate-spin" : ""}`}
                  />
                  {atualizando ? "Atualizando" : "Atualizar"}
                </button>

                <button
                  type="button"
                  onClick={sair}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[16px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[var(--smartgreen-green)] focus:ring-offset-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              </div>
            </div>
          </div>
        </header>

        {erro ? (
          <div
            role="alert"
            className="flex flex-col gap-3 rounded-[20px] border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-800 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-none" />
              <span>{erro}</span>
            </div>
            <button
              type="button"
              onClick={() => void carregarVisao()}
              className="inline-flex min-h-10 items-center justify-center rounded-[14px] border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Tentar novamente
            </button>
          </div>
        ) : null}

        <StatusSemaforos
          vias={visaoSistemaAoVivo.vias}
          semaforo={visaoSistemaAoVivo.semaforo}
        />

        <ResumoSistema
          visaoSistema={visaoSistemaAoVivo}
          viaMaiorFluxo={viaMaiorFluxo}
          totalVeiculosMonitorados={totalVeiculosMonitorados}
          segundosRestantes={segundosRestantes}
          atualizando={atualizando}
        />

        <VisaoCruzamento
          vias={visaoSistemaAoVivo.vias}
          semaforo={visaoSistemaAoVivo.semaforo}
          viaMaiorFluxoId={viaMaiorFluxo?.id ?? null}
        />
      </div>
    </main>
  );
}
