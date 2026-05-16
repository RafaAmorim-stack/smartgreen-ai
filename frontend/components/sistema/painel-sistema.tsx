"use client";

import { AlertTriangle, LogOut, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { armazenamentoSessao } from "@/servicos/armazenamento-sessao";
import { ClienteTrafego } from "@/servicos/interfaces/cliente-trafego";
import { clienteTrafego } from "@/servicos/cliente-trafego";
import { ErroApi } from "@/servicos/cliente-http";
import type { UsuarioSessao, VisaoSistema, VisaoVia } from "@/tipos/trafego";
import { ResumoSistema } from "./resumo-sistema";
import { VisaoCruzamento } from "./visao-cruzamento";

const INTERVALO_ATUALIZACAO_AUTOMATICA = 5;
const INTERVALO_ANIMACAO_CONTADORES = 900;

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

export function PainelSistema() {
  const servicoTrafego: ClienteTrafego = clienteTrafego;
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
      roteador.replace("/acesso");
      return;
    }

    setTokenAcesso(tokenSalvo);
    setUsuario(armazenamentoSessao.obterUsuario());
  }, [roteador]);

  useEffect(() => {
    if (!tokenAcesso) {
      return;
    }

    const tokenAtual = tokenAcesso;
    let componenteAtivo = true;

    async function carregarVisaoInicial() {
      try {
        setErro(null);
        const resposta = await servicoTrafego.obterVisaoGeral(tokenAtual);

        if (componenteAtivo) {
          setVisaoSistema(resposta);
        }
      } catch (erroCarregamento) {
        if (!componenteAtivo) {
          return;
        }

        if (
          erroCarregamento instanceof ErroApi &&
          (erroCarregamento.statusCode === 401 ||
            erroCarregamento.statusCode === 403)
        ) {
          armazenamentoSessao.limparSessao();
          roteador.replace("/acesso");
          return;
        }

        setErro(
          erroCarregamento instanceof Error
            ? erroCarregamento.message
            : "Nao foi possivel carregar o painel de monitoramento.",
        );
      } finally {
        if (componenteAtivo) {
          setCarregando(false);
        }
      }
    }

    void carregarVisaoInicial();

    return () => {
      componenteAtivo = false;
    };
  }, [roteador, servicoTrafego, tokenAcesso]);

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
      return;
    }

    try {
      setAtualizando(true);
      setErro(null);
      const resposta = await servicoTrafego.simular(tokenAcesso);
      setVisaoSistema(resposta);
      setSegundosRestantes(INTERVALO_ATUALIZACAO_AUTOMATICA);
    } catch (erroSimulacao) {
      if (
        erroSimulacao instanceof ErroApi &&
        (erroSimulacao.statusCode === 401 ||
          erroSimulacao.statusCode === 403)
      ) {
        armazenamentoSessao.limparSessao();
        roteador.replace("/acesso");
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
  }, [roteador, servicoTrafego, tokenAcesso]);

  useEffect(() => {
    if (!tokenAcesso) {
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
  }, [tokenAcesso, simularAgora]);

  function sair() {
    armazenamentoSessao.limparSessao();
    roteador.push("/");
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
            <button
              type="button"
              onClick={() => roteador.push("/")}
              className="mt-6 rounded-[16px] bg-[var(--smartgreen-green)] px-5 py-3 text-sm font-semibold text-white"
            >
              Voltar para o acesso
            </button>
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
              <div className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
                RF1 · Monitoramento do Fluxo
              </div>

              <div>
                <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Painel de fluxo de veiculos por via
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                  Visualize as quantidades de veiculos nas vias monitoradas,
                  identifique rapidamente o maior congestionamento e acompanhe as
                  mudancas automaticas do cruzamento.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                  {visaoSistemaAoVivo.enderecoCruzamento}
                </span>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-700">
                  Atualizacao automatica a cada {INTERVALO_ATUALIZACAO_AUTOMATICA}
                  s
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

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => void simularAgora()}
                  disabled={atualizando}
                  className="inline-flex items-center justify-center gap-2 rounded-[16px] bg-[var(--smartgreen-green)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--smartgreen-green-soft)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <RefreshCcw
                    className={`h-4 w-4 ${atualizando ? "animate-spin" : ""}`}
                  />
                  {atualizando ? "Atualizando" : "Atualizar"}
                </button>

                <button
                  type="button"
                  onClick={sair}
                  className="inline-flex items-center justify-center gap-2 rounded-[16px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              </div>
            </div>
          </div>
        </header>

        {erro ? (
          <div className="flex items-start gap-3 rounded-[20px] border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-none" />
            <span>{erro}</span>
          </div>
        ) : null}

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
