import type { VisaoSistema } from "@/tipos/trafego";

export interface ClienteConsultaTrafego {
  obterVisaoGeral(tokenAcesso: string): Promise<VisaoSistema>;
}

export interface ClienteSimulacaoTrafego {
  simular(tokenAcesso: string): Promise<VisaoSistema>;
}

export type ClienteTrafego = ClienteConsultaTrafego & ClienteSimulacaoTrafego;
