import type { RespostaAutenticacao } from "@/tipos/trafego";

export interface DadosEntradaAutenticacao {
  email: string;
  senha: string;
}

export interface DadosCadastroAutenticacao {
  nomeCompleto: string;
  email: string;
  senha: string;
}

export interface ClienteAutenticacao {
  entrar(dadosEntrada: DadosEntradaAutenticacao): Promise<RespostaAutenticacao>;
  cadastrar(
    dadosCadastro: DadosCadastroAutenticacao,
  ): Promise<RespostaAutenticacao>;
}
