import type { VisaoSistema } from "@/tipos/trafego";
import { ClienteHttpSmartGreen } from "./cliente-http";
import type {
  ClienteConsultaTrafego,
  ClienteSimulacaoTrafego,
  ClienteTrafego,
} from "./interfaces/cliente-trafego";

class ClienteTrafegoHttp
  extends ClienteHttpSmartGreen
  implements ClienteConsultaTrafego, ClienteSimulacaoTrafego
{
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
}

const clienteTrafegoHttp = new ClienteTrafegoHttp();

export const clienteConsultaTrafego: ClienteConsultaTrafego =
  clienteTrafegoHttp;

export const clienteSimulacaoTrafego: ClienteSimulacaoTrafego =
  clienteTrafegoHttp;

export const clienteTrafego: ClienteTrafego = clienteTrafegoHttp;
