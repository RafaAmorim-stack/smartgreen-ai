import type { RespostaAutenticacao } from "@/tipos/trafego";
import { ClienteHttpSmartGreen } from "./cliente-http";
import type {
  ClienteAutenticacao,
  DadosCadastroAutenticacao,
  DadosEntradaAutenticacao,
} from "./interfaces/cliente-autenticacao";

class ClienteAutenticacaoHttp
  extends ClienteHttpSmartGreen
  implements ClienteAutenticacao
{
  async entrar(
    dadosEntrada: DadosEntradaAutenticacao,
  ): Promise<RespostaAutenticacao> {
    return this.solicitar<RespostaAutenticacao>("/autenticacao/entrar", {
      metodo: "POST",
      corpo: dadosEntrada,
    });
  }

  async cadastrar(
    dadosCadastro: DadosCadastroAutenticacao,
  ): Promise<RespostaAutenticacao> {
    return this.solicitar<RespostaAutenticacao>("/autenticacao/cadastrar", {
      metodo: "POST",
      corpo: dadosCadastro,
    });
  }
}

export const clienteAutenticacao: ClienteAutenticacao =
  new ClienteAutenticacaoHttp();
