import type {
  RespostaAutenticacao,
  UsuarioSessao,
} from "@/tipos/trafego";

class ArmazenamentoSessao {
  private readonly chaveToken = "smartgreen-token";
  private readonly chaveUsuario = "smartgreen-usuario";

  salvarSessao(sessao: RespostaAutenticacao): void {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(this.chaveToken, sessao.tokenAcesso);
    window.localStorage.setItem(
      this.chaveUsuario,
      JSON.stringify(sessao.usuario),
    );
  }

  obterToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    return window.localStorage.getItem(this.chaveToken);
  }

  obterUsuario(): UsuarioSessao | null {
    if (typeof window === "undefined") {
      return null;
    }

    const usuarioCru = window.localStorage.getItem(this.chaveUsuario);

    if (!usuarioCru) {
      return null;
    }

    try {
      return JSON.parse(usuarioCru) as UsuarioSessao;
    } catch {
      return null;
    }
  }

  limparSessao(): void {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.removeItem(this.chaveToken);
    window.localStorage.removeItem(this.chaveUsuario);
  }
}

export const armazenamentoSessao = new ArmazenamentoSessao();
