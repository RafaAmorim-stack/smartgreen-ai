"use client";
import {
  LockKeyhole,
  LogIn,
  Mail,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { armazenamentoSessao } from "@/servicos/armazenamento-sessao";
import { clienteApi } from "@/servicos/cliente-api";
import type { UsuarioSessao } from "@/tipos/trafego";

type ModoAcesso = "entrar" | "cadastrar";

const conteudoModo = {
  entrar: {
    acao: "Entrar",
    carregando: "Validando acesso...",
  },
  cadastrar: {
    acao: "Cadastrar",
    carregando: "Criando acesso...",
  },
} as const;

export function FormularioAcesso() {
  const [modoAcesso, setModoAcesso] = useState<ModoAcesso>("entrar");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [usuarioAutenticado, setUsuarioAutenticado] =
    useState<UsuarioSessao | null>(null);

  useEffect(() => {
    const token = armazenamentoSessao.obterToken();
    const usuarioSalvo = armazenamentoSessao.obterUsuario();

    if (token && usuarioSalvo) {
      setUsuarioAutenticado(usuarioSalvo);
    }
  }, []);

  const painelAtual = useMemo(() => conteudoModo[modoAcesso], [modoAcesso]);

  async function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      if (modoAcesso === "entrar") {
        const resposta = await clienteApi.entrar({ email, senha });
        armazenamentoSessao.salvarSessao(resposta);
        setUsuarioAutenticado(resposta.usuario);
        return;
      }

      await clienteApi.cadastrar({
        nomeCompleto,
        email,
        senha,
      });

      setModoAcesso("entrar");
      setNomeCompleto("");
      setEmail("");
      setSenha("");
    } catch (erroEnvio) {
      setErro(
        erroEnvio instanceof Error
          ? erroEnvio.message
          : "Nao foi possivel concluir a operacao.",
      );
    } finally {
      setCarregando(false);
    }
  }

  function alterarModo(novoModo: ModoAcesso) {
    setModoAcesso(novoModo);
    setNomeCompleto("");
    setEmail("");
    setSenha("");
    setErro("");
  }

  function mostrarMensagemRecuperacao() {
    setErro("Recuperacao de senha sera disponibilizada na proxima sprint.");
  }

  function encerrarSessao() {
    armazenamentoSessao.limparSessao();
    setUsuarioAutenticado(null);
    setModoAcesso("entrar");
    setNomeCompleto("");
    setEmail("");
    setSenha("");
    setErro("");
  }

  if (usuarioAutenticado) {
    return (
      <div className="w-full max-w-[540px] rounded-[28px] border border-[var(--smartgreen-line)] bg-white p-6 shadow-[0_10px_32px_rgba(16,24,35,0.04)] sm:p-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="h-1 w-16 bg-[var(--smartgreen-green)]" />

            <button
              type="button"
              onClick={encerrarSessao}
              className="border border-[var(--smartgreen-green)] px-4 py-2 text-sm font-medium text-[var(--smartgreen-green)]"
            >
              Encerrar sessao
            </button>
          </div>

          <div className="space-y-6">
            <div className="border-b border-[var(--smartgreen-line)] pb-4">
              <p className="text-lg font-semibold text-slate-900">
                {usuarioAutenticado.nome}
              </p>
            </div>

            <div className="border-b border-[var(--smartgreen-line)] pb-4">
              <p className="text-base text-slate-700">
                {usuarioAutenticado.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[540px] rounded-[28px] border border-[var(--smartgreen-line)] bg-white p-6 shadow-[0_10px_32px_rgba(16,24,35,0.04)] sm:p-8">
      <div className="space-y-8">
        <div className="text-center">
          <p className="text-[1.9rem] font-bold tracking-[0.06em] text-[var(--smartgreen-green)]">
            Bem vindo
          </p>
        </div>

        <div className="grid gap-2 rounded-[18px] border border-[var(--smartgreen-line)] bg-white p-1 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => alterarModo("entrar")}
            className={`rounded-[14px] px-3 py-3 text-left text-sm font-semibold transition ${
              modoAcesso === "entrar"
                ? "bg-[var(--smartgreen-green)] text-white"
                : "text-slate-500"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Entrar
            </span>
          </button>
          <button
            type="button"
            onClick={() => alterarModo("cadastrar")}
            className={`rounded-[14px] px-3 py-3 text-left text-sm font-semibold transition ${
              modoAcesso === "cadastrar"
                ? "bg-[var(--smartgreen-green)] text-white"
                : "text-slate-500"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <UserRoundPlus className="h-4 w-4" />
              Cadastro
            </span>
          </button>
        </div>

        <form className="space-y-4" onSubmit={enviarFormulario}>
          {modoAcesso === "cadastrar" ? (
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Nome Completo
              </span>
              <div className="flex items-center gap-2 rounded-[14px] border border-[var(--smartgreen-line)] px-4 py-3">
                <UserRound className="h-4 w-4 text-[var(--smartgreen-green)]" />
                <input
                  type="text"
                  value={nomeCompleto}
                  onChange={(evento) => setNomeCompleto(evento.target.value)}
                  placeholder="Digite seu nome completo"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  autoComplete="name"
                  required
                />
              </div>
            </label>
          ) : null}

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              E-mail
            </span>
            <div className="flex items-center gap-2 rounded-[14px] border border-[var(--smartgreen-line)] px-4 py-3">
              <Mail className="h-4 w-4 text-[var(--smartgreen-green)]" />
              <input
                type="email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                placeholder="Digite seu e-mail"
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                autoComplete="email"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Senha
            </span>
            <div className="flex items-center gap-2 rounded-[14px] border border-[var(--smartgreen-line)] px-4 py-3">
              <LockKeyhole className="h-4 w-4 text-[var(--smartgreen-green)]" />
              <input
                type="password"
                value={senha}
                onChange={(evento) => setSenha(evento.target.value)}
                placeholder="Digite sua senha"
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                autoComplete={
                  modoAcesso === "entrar" ? "current-password" : "new-password"
                }
                required
              />
            </div>
          </label>

          {erro ? (
            <div className="border-l-2 border-[var(--smartgreen-green)] pl-4 text-sm text-[var(--smartgreen-green)]">
              <span>{erro}</span>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={carregando}
            className="flex w-full items-center justify-center rounded-[14px] bg-[var(--smartgreen-green)] px-4 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {carregando ? painelAtual.carregando : painelAtual.acao}
          </button>

          {modoAcesso === "entrar" ? (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={mostrarMensagemRecuperacao}
                className="text-xs text-[var(--smartgreen-green)] underline underline-offset-4"
              >
                Esqueceu a senha?
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
