import type {
  RespostaAutenticacao,
  VisaoSistema,
} from "@/tipos/trafego";

interface OpcoesDeSolicitacao {
  metodo?: "GET" | "POST";
  tokenAcesso?: string;
  corpo?: unknown;
}

export class ErroApi extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
  ) {
    super(message);
    this.name = "ErroApi";
  }
}

class ClienteApiSmartGreen {
  private readonly urlBase =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

  async entrar(dadosEntrada: {
    email: string;
    senha: string;
  }): Promise<RespostaAutenticacao> {
    return this.solicitar<RespostaAutenticacao>("/autenticacao/entrar", {
      metodo: "POST",
      corpo: dadosEntrada,
    });
  }

  async cadastrar(dadosCadastro: {
    nomeCompleto: string;
    email: string;
    senha: string;
  }): Promise<RespostaAutenticacao> {
    return this.solicitar<RespostaAutenticacao>("/autenticacao/cadastrar", {
      metodo: "POST",
      corpo: dadosCadastro,
    });
  }

  async obterVisaoGeral(tokenAcesso: string): Promise<VisaoSistema> {
    return this.solicitar<VisaoSistema>("/controle-trafego/visao-geral", {
      tokenAcesso,
    });
  }

  async simular(tokenAcesso: string): Promise<VisaoSistema> {
    return this.solicitar<VisaoSistema>("/controle-trafego/simular", {
      metodo: "POST",
      tokenAcesso,
    });
  }

  private async solicitar<T>(
    caminho: string,
    {
      metodo = "GET",
      tokenAcesso,
      corpo,
    }: OpcoesDeSolicitacao = {},
  ): Promise<T> {
    const resposta = await fetch(`${this.urlBase}${caminho}`, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
        ...(tokenAcesso
          ? { Authorization: `Bearer ${tokenAcesso}` }
          : {}),
      },
      body: corpo ? JSON.stringify(corpo) : undefined,
      cache: "no-store",
    });

    if (!resposta.ok) {
      const corpoErro = (await resposta.json().catch(() => null)) as
        | { message?: string | string[] }
        | null;

      const mensagem = Array.isArray(corpoErro?.message)
        ? corpoErro.message.join(", ")
        : corpoErro?.message;

      throw new ErroApi(
        mensagem ?? "Nao foi possivel concluir a solicitacao.",
        resposta.status,
      );
    }

    return (await resposta.json()) as T;
  }
}

export const clienteApi = new ClienteApiSmartGreen();
