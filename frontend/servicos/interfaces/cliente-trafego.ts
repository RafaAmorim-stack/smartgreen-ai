import type { VisaoSistema } from "@/tipos/trafego";

export interface ClienteTrafego {
  obterVisaoGeral(tokenAcesso: string): Promise<VisaoSistema>;
  simular(tokenAcesso: string): Promise<VisaoSistema>;
}
