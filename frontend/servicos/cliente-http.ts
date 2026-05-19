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

export abstract class ClienteHttpSmartGreen {
  protected readonly urlBase =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

  protected async solicitar<T>(
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
