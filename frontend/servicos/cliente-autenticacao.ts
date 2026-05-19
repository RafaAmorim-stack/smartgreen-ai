import type { RespostaAutenticacao } from "@/tipos/trafego";
import { ClienteHttpSmartGreen } from "./cliente-http";
import type {
  ClienteAutenticacao,
  ClienteCadastroAutenticacao,
  ClienteEntradaAutenticacao,
  DadosCadastroAutenticacao,
  DadosEntradaAutenticacao,
} from "./interfaces/cliente-autenticacao";

class ClienteAutenticacaoHttp
  extends ClienteHttpSmartGreen
  implements ClienteEntradaAutenticacao, ClienteCadastroAutenticacao
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

const clienteAutenticacaoHttp = new ClienteAutenticacaoHttp();

export const clienteEntradaAutenticacao: ClienteEntradaAutenticacao =
  clienteAutenticacaoHttp;

export const clienteCadastroAutenticacao: ClienteCadastroAutenticacao =
  clienteAutenticacaoHttp;

export const clienteAutenticacao: ClienteAutenticacao = clienteAutenticacaoHttp;
