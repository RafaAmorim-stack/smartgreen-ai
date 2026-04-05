import { Module } from "@nestjs/common";
import { ModuloAutenticacao } from "../autenticacao/autenticacao.module";
import { GuardaJwt } from "../comum/guards/guarda-jwt";
import { ControladorTrafego } from "./trafego.controller";
import { ServicoTrafego } from "./trafego.service";

@Module({
  imports: [ModuloAutenticacao],
  controllers: [ControladorTrafego],
  providers: [ServicoTrafego, GuardaJwt],
})
export class ModuloTrafego {}
