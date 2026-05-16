import type { VisaoSistema } from "@/tipos/trafego";
import { ClienteHttpSmartGreen } from "./cliente-http";
import type { ClienteTrafego } from "./interfaces/cliente-trafego";

class ClienteTrafegoHttp
  extends ClienteHttpSmartGreen
  implements ClienteTrafego
{
  async obterVisaoGeral(tokenAcesso?: string): Promise<VisaoSistema> {
    return this.solicitar<VisaoSistema>("/controle-trafego/visao-geral", {
      tokenAcesso,
    });
  }

  async simular(tokenAcesso?: string): Promise<VisaoSistema> {
    return this.solicitar<VisaoSistema>("/controle-trafego/simular", {
      metodo: "POST",
      tokenAcesso,
    });
  }
}

export const clienteTrafego: ClienteTrafego = new ClienteTrafegoHttp();
