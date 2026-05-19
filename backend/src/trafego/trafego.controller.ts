import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { GuardaJwt } from "../comum/guards/guarda-jwt";
import { VisaoSistemaDto } from "./dto/visao-sistema.dto";
import { ServicoTrafego } from "./trafego.service";

@ApiTags("Controle de trafego")
@ApiBearerAuth("jwt")
@Controller("controle-trafego")
@UseGuards(GuardaJwt)
export class ControladorTrafego {
  constructor(private readonly servicoTrafego: ServicoTrafego) {}

  @Get("visao-geral")
  @ApiOperation({
    summary: "Consultar fluxo de veiculos e status dos semaforos",
    description:
      "Atende RF1 e RF3 retornando as vias monitoradas, quantidade de veiculos, prioridade atual e cor de cada semaforo.",
  })
  @ApiOkResponse({
    description: "Visao geral do cruzamento carregada com sucesso.",
    type: VisaoSistemaDto,
  })
  @ApiUnauthorizedResponse({
    description: "Token JWT ausente, invalido ou expirado.",
  })
  @ApiServiceUnavailableResponse({
    description: "Vias ou semaforo principal ainda nao configurados.",
  })
  obterVisaoGeral() {
    return this.servicoTrafego.obterVisaoGeral();
  }

  @Post("simular")
  @ApiOperation({
    summary: "Simular novo ciclo de trafego",
    description:
      "Atualiza a quantidade de veiculos, recalcula a prioridade das vias e registra uma nova leitura historica do fluxo.",
  })
  @ApiOkResponse({
    description: "Simulacao processada e painel atualizado com sucesso.",
    type: VisaoSistemaDto,
  })
  @ApiUnauthorizedResponse({
    description: "Token JWT ausente, invalido ou expirado.",
  })
  @ApiServiceUnavailableResponse({
    description: "Vias ou semaforo principal ainda nao configurados.",
  })
  simular() {
    return this.servicoTrafego.simular();
  }
}
