"use client";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  LogIn,
  Mail,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { armazenamentoSessao } from "@/servicos/armazenamento-sessao";
import {
  clienteCadastroAutenticacao,
  clienteEntradaAutenticacao,
} from "@/servicos/cliente-autenticacao";

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
  const roteador = useRouter();
  const [modoAcesso, setModoAcesso] = useState<ModoAcesso>("entrar");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [exibirSenha, setExibirSenha] = useState(false);

  useEffect(() => {
    const token = armazenamentoSessao.obterToken();
    const usuarioSalvo = armazenamentoSessao.obterUsuario();

    if (token && usuarioSalvo) {
      roteador.replace("/sistema");
    }
  }, [roteador]);

  const painelAtual = useMemo(() => conteudoModo[modoAcesso], [modoAcesso]);
  const emailNormalizado = email.trim();
  const formularioValido = useMemo(() => {
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalizado);
    const senhaValida = senha.length >= 6;
    const nomeValido =
      modoAcesso === "entrar" || nomeCompleto.trim().length >= 3;

    return emailValido && senhaValida && nomeValido;
  }, [emailNormalizado, modoAcesso, nomeCompleto, senha]);

  async function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro("");
    setMensagemSucesso("");

    if (!formularioValido) {
      setErro("Revise os campos destacados antes de continuar.");
      return;
    }

    setCarregando(true);

    try {
      if (modoAcesso === "entrar") {
        const resposta = await clienteEntradaAutenticacao.entrar({
          email: emailNormalizado,
          senha,
        });
        armazenamentoSessao.salvarSessao(resposta);
        roteador.replace("/sistema");
        return;
      }

      await clienteCadastroAutenticacao.cadastrar({
        nomeCompleto,
        email: emailNormalizado,
        senha,
      });

      setModoAcesso("entrar");
      setNomeCompleto("");
      setEmail("");
      setSenha("");
      setMensagemSucesso("Cadastro criado. Entre com seu e-mail e senha.");
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
    setMensagemSucesso("");
  }

  function mostrarMensagemRecuperacao() {
    setErro("Recuperacao de senha sera disponibilizada na proxima sprint.");
  }

  function limparFormulario() {
    setModoAcesso("entrar");
    setNomeCompleto("");
    setEmail("");
    setSenha("");
    setErro("");
    setMensagemSucesso("");
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

        <form
          className="space-y-4"
          onSubmit={enviarFormulario}
          aria-busy={carregando}
        >
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
                  minLength={3}
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
                aria-invalid={Boolean(email) && !emailNormalizado.includes("@")}
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
                type={exibirSenha ? "text" : "password"}
                value={senha}
                onChange={(evento) => setSenha(evento.target.value)}
                placeholder="Digite sua senha"
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                autoComplete={
                  modoAcesso === "entrar" ? "current-password" : "new-password"
                }
                minLength={6}
                aria-describedby="senha-ajuda"
                required
              />
              <button
                type="button"
                onClick={() => setExibirSenha((valorAtual) => !valorAtual)}
                className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--smartgreen-green)]"
                aria-label={exibirSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {exibirSenha ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p id="senha-ajuda" className="mt-2 text-xs text-slate-500">
              Use no minimo 6 caracteres.
            </p>
          </label>

          {mensagemSucesso ? (
            <div
              role="status"
              aria-live="polite"
              className="flex items-start gap-2 rounded-[14px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none" />
              <span>{mensagemSucesso}</span>
            </div>
          ) : null}

          {erro ? (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-[14px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
              <span>{erro}</span>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={carregando || !formularioValido}
            className="flex min-h-12 w-full items-center justify-center rounded-[14px] bg-[var(--smartgreen-green)] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--smartgreen-green-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--smartgreen-green)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {carregando ? painelAtual.carregando : painelAtual.acao}
          </button>

          {modoAcesso === "entrar" ? (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={mostrarMensagemRecuperacao}
                className="rounded px-1 py-1 text-xs text-[var(--smartgreen-green)] underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-[var(--smartgreen-green)]"
              >
                Esqueceu a senha?
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={limparFormulario}
                className="rounded px-1 py-1 text-xs text-slate-500 underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-[var(--smartgreen-green)]"
              >
                Limpar campos
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
