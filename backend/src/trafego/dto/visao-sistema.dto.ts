import { ApiProperty } from "@nestjs/swagger";
import { ChaveVia, CorSemaforo, ModoSemaforo } from "../dominio-trafego";

export class VisaoViaDto {
  @ApiProperty({
    example: "clxvia-norte",
    description: "Identificador unico da via monitorada.",
  })
  id!: string;

  @ApiProperty({
    enum: Object.values(ChaveVia),
    example: ChaveVia.NORTE,
    description: "Chave cardinal usada para identificar a via no cruzamento.",
  })
  chave!: string;

  @ApiProperty({
    example: "Via Norte",
    description: "Nome exibido no painel do SmartGreen.",
  })
  nome!: string;

  @ApiProperty({
    example: "Fluxo monitorado no sentido Norte para Sul.",
    description: "Descricao operacional da via.",
  })
  descricao!: string;

  @ApiProperty({
    example: 14,
    minimum: 0,
    maximum: 20,
    description: "Quantidade atual de veiculos considerada na simulacao.",
  })
  quantidadeVeiculos!: number;

  @ApiProperty({
    enum: Object.values(CorSemaforo),
    example: CorSemaforo.VERDE,
    description: "Cor atual do semaforo da via.",
  })
  corSemaforo!: string;

  @ApiProperty({
    example: true,
    description: "Indica se a via esta com prioridade no ciclo atual.",
  })
  estaPrioritaria!: boolean;

  @ApiProperty({
    example: "Norte para Sul",
    description: "Sentido monitorado no cruzamento.",
  })
  sentido!: string;
}

export class VisaoSemaforoDto {
  @ApiProperty({
    example: "clxsemaforo-central",
    description: "Identificador do semaforo principal.",
  })
  id!: string;

  @ApiProperty({
    enum: Object.values(ModoSemaforo),
    example: ModoSemaforo.AUTOMATICO,
    description: "Modo de operacao do semaforo.",
  })
  modo!: string;

  @ApiProperty({
    example: "Corredor Norte-Sul liberado em modo automatico.",
    description: "Mensagem operacional exibida para o usuario.",
  })
  statusTexto!: string;

  @ApiProperty({
    enum: Object.values(ChaveVia),
    example: ChaveVia.NORTE,
    nullable: true,
    description: "Chave da via prioritaria atual.",
  })
  chaveViaPrioritariaAtual!: string | null;

  @ApiProperty({
    example: "Corredor Norte-Sul",
    nullable: true,
    description: "Nome da via ou corredor priorizado.",
  })
  nomeViaPrioritariaAtual!: string | null;

  @ApiProperty({
    example: 34,
    description: "Duracao total do ciclo automatico em segundos.",
  })
  duracaoCicloSegundos!: number;

  @ApiProperty({
    example: 14,
    description: "Tempo de verde restante ou calculado para a prioridade atual.",
  })
  tempoVerdeSegundos!: number;

  @ApiProperty({
    example: "2026-05-19T21:23:46.000Z",
    description: "Data e hora da ultima atualizacao do semaforo.",
  })
  atualizadoEm!: string;
}

export class VisaoSistemaDto {
  @ApiProperty({
    example: "2026-05-19T21:23:46.000Z",
    description: "Data e hora em que a visao geral foi gerada.",
  })
  geradoEm!: string;

  @ApiProperty({
    example: "Cruzamento Av. Afonso Vergueiro x R. Professor Toledo",
    description: "Endereco do cruzamento monitorado.",
  })
  enderecoCruzamento!: string;

  @ApiProperty({
    example: "clxvia-norte",
    nullable: true,
    description: "Identificador da via prioritaria atual.",
  })
  idViaPrioritaria!: string | null;

  @ApiProperty({
    example: "Corredor Norte-Sul",
    nullable: true,
    description: "Nome da via ou corredor priorizado no momento.",
  })
  nomeViaPrioritaria!: string | null;

  @ApiProperty({
    example:
      "Corredor Norte-Sul esta priorizado para aliviar 18 veiculos acumulados.",
    description: "Resumo operacional usado no painel do SmartGreen.",
  })
  mensagem!: string;

  @ApiProperty({
    type: [VisaoViaDto],
    description: "Lista de vias monitoradas no cruzamento.",
  })
  vias!: VisaoViaDto[];

  @ApiProperty({
    type: VisaoSemaforoDto,
    description: "Estado atual do semaforo principal.",
  })
  semaforo!: VisaoSemaforoDto;
}
