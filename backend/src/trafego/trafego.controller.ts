import { Controller, Get, Post } from "@nestjs/common";
import { ServicoTrafego } from "./trafego.service";

@Controller("controle-trafego")
export class ControladorTrafego {
  constructor(private readonly servicoTrafego: ServicoTrafego) {}

  @Get("visao-geral")
  obterVisaoGeral() {
    return this.servicoTrafego.obterVisaoGeral();
  }

  @Post("simular")
  simular() {
    return this.servicoTrafego.simular();
  }
}
