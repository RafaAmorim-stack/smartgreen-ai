import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { GuardaJwt } from "../comum/guards/guarda-jwt";
import { ServicoTrafego } from "./trafego.service";

@Controller("controle-trafego")
@UseGuards(GuardaJwt)
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
