"use client";

import {
  AlertTriangle,
  LogOut,
  MapPinned,
  RefreshCcw,
  Radio,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { armazenamentoSessao } from "@/servicos/armazenamento-sessao";
import { clienteApi, ErroApi } from "@/servicos/cliente-api";
import type { UsuarioSessao, VisaoSistema } from "@/tipos/trafego";
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

export function PainelSistema() {
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
      roteador.replace("/");
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
        const resposta = await clienteApi.obterVisaoGeral(tokenAtual);

        if (componenteAtivo) {
          setVisaoSistema(resposta);
        }
      } catch (erroCarregamento) {
        if (componenteAtivo) {
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
              : "Nao foi possivel carregar o sistema.",
          );
        }
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
  }, [tokenAcesso, roteador]);

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
      const resposta = await clienteApi.simular(tokenAcesso);
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
  }, [tokenAcesso, roteador]);

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

  const visaoSistemaAoVivo = visaoSistema
    ? {
        ...visaoSistema,
        vias: visaoSistema.vias.map((via) => ({
          ...via,
          quantidadeVeiculos:
            quantidadesAnimadas[via.id] ?? via.quantidadeVeiculos,
        })),
      }
    : null;

  if (carregando && !visaoSistemaAoVivo) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="control-panel w-full max-w-2xl p-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
            Carregando
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-white">
            Organizando a operacao do cruzamento
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300">
            A leitura das vias esta sendo sincronizada com a API para montar o
            menu principal, o tempo de verde e a simulacao central.
          </p>
        </div>
      </main>
    );
  }

  if (!visaoSistemaAoVivo) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="control-panel w-full max-w-lg p-10 text-center">
          <p className="text-sm text-red-200">
            {erro ?? "Nao foi possivel carregar os dados principais do sistema."}
          </p>
          <button
            type="button"
            onClick={() => roteador.push("/")}
            className="mt-6 rounded-[24px] bg-emerald-300 px-4 py-3 text-sm font-semibold text-slate-950"
          >
            Voltar para o acesso
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-4 sm:px-6 sm:py-6">
      <div className="absolute inset-0 city-grid opacity-[0.06]" />
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-[1480px] space-y-7">
        <header className="control-panel overflow-hidden px-5 py-6 sm:px-7 sm:py-7">
          <div className="grid gap-6 xl:grid-cols-[1fr_auto] xl:items-start">
            <div>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-100">
                  <Radio className="h-3.5 w-3.5 animate-pulse" />
                  Leitura ao vivo
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-100">
                  <MapPinned className="h-3.5 w-3.5" />
                  {visaoSistemaAoVivo.enderecoCruzamento}
                </span>
              </div>

              <h1 className="mt-5 font-display text-4xl font-semibold text-white">
                Central SmartGreen AI
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Interface enxuta para acompanhar prioridade, ciclo e estado das
                vias sem excesso de informacao visual.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-[minmax(220px,1fr)_auto] sm:items-start">
              <div className="panel-surface px-5 py-5 text-sm text-slate-300">
                <p className="text-[11px] uppercase tracking-[0.34em] text-slate-500">
                  Usuario conectado
                </p>
                <p className="mt-3 font-semibold text-white">
                  {usuario?.nome ?? "Acesso academico"}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {usuario?.email ?? "ambiente local"}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => void simularAgora()}
                  disabled={atualizando}
                  className="inline-flex items-center justify-center gap-2 rounded-[24px] bg-gradient-to-r from-emerald-300 via-lime-300 to-emerald-200 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-75"
                >
                  <RefreshCcw
                    className={`h-4 w-4 ${atualizando ? "animate-spin" : ""}`}
                  />
                  {atualizando ? "Atualizando..." : "Atualizar dados"}
                </button>

                <button
                  type="button"
                  onClick={sair}
                  className="inline-flex items-center justify-center gap-2 rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              </div>
            </div>
          </div>
        </header>

        {erro ? (
          <div className="flex items-start gap-3 rounded-[24px] border border-amber-400/25 bg-amber-500/10 px-4 py-4 text-sm text-amber-100">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-none" />
            <span>{erro}</span>
          </div>
        ) : null}

        <ResumoSistema
          visaoSistema={visaoSistemaAoVivo}
          segundosRestantes={segundosRestantes}
          atualizando={atualizando}
        />

        <VisaoCruzamento
          vias={visaoSistemaAoVivo.vias}
          semaforo={visaoSistemaAoVivo.semaforo}
          enderecoCruzamento={visaoSistemaAoVivo.enderecoCruzamento}
        />
      </div>
    </main>
  );
}
