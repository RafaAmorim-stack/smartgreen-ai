import { Controller, Get } from "@nestjs/common";

@Controller("saude")
export class ControladorSaude {
  @Get()
  verificar() {
    return {
      status: "ok",
      servico: "SmartGreen AI API",
      verificadoEm: new Date().toISOString(),
    };
  }
}
