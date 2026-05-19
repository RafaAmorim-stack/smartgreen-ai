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

export interface ClienteEntradaAutenticacao {
  entrar(dadosEntrada: DadosEntradaAutenticacao): Promise<RespostaAutenticacao>;
}

export interface ClienteCadastroAutenticacao {
  cadastrar(
    dadosCadastro: DadosCadastroAutenticacao,
  ): Promise<RespostaAutenticacao>;
}

export type ClienteAutenticacao = ClienteEntradaAutenticacao &
  ClienteCadastroAutenticacao;
