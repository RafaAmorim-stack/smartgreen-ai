import {
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  ChaveVia,
  CorSemaforo,
  ENDERECO_CRUZAMENTO,
  type RegistroSemaforo,
  type RegistroVia,
  type ViaPrioritariaAtual,
} from "./dominio-trafego";
import { EngenhariaDeTrafego } from "./engenharia-trafego";
import type { VisaoSistema } from "./tipos-trafego";

interface ViaBanco {
  id: string;
  key: RegistroVia["chave"];
  name: string;
  description: string;
  displayOrder: number;
  currentVehicleCount: number;
  signalColor: RegistroVia["corSemaforo"];
  lastPriorityAt: Date | null;
}

interface SemaforoBanco {
  id: string;
  name: string;
  mode: RegistroSemaforo["modo"];
  statusText: string;
  cycleSeconds: number;
  currentPriorityLaneId: string | null;
  updatedAt: Date;
  currentPriorityLane: ViaPrioritariaAtual | null;
}

interface TransacaoTrafego {
  lane: PrismaService["lane"];
  trafficLight: PrismaService["trafficLight"];
  trafficFlowReading: PrismaService["trafficFlowReading"];
}

@Injectable()
export class ServicoTrafego {
  private readonly engenharia = new EngenhariaDeTrafego();

  constructor(private readonly prisma: PrismaService) {}

  async obterVisaoGeral(): Promise<VisaoSistema> {
    const vias = await this.buscarViasMonitoradas();
    let semaforo = await this.buscarSemaforo();

    if (!vias.length) {
      throw new ServiceUnavailableException(
        "As vias ainda nao foram configuradas. Execute o seed do Prisma.",
      );
    }

    const idsMonitorados = new Set(vias.map((via) => via.id));
    const prioridadeInvalida =
      !semaforo?.idViaPrioritariaAtual ||
      !idsMonitorados.has(semaforo.idViaPrioritariaAtual);

    if (!semaforo || prioridadeInvalida) {
      const processamento = this.engenharia.processarCenarioAtual(vias, null);

      await this.prisma.$transaction(async (transacao: TransacaoTrafego) => {
        for (const via of vias) {
          const viaAberta = processamento.idsViasAbertas.includes(via.id);

          await transacao.lane.update({
            where: { id: via.id },
            data: {
              signalColor: viaAberta
                ? CorSemaforo.VERDE
                : CorSemaforo.VERMELHO,
              lastPriorityAt: viaAberta ? processamento.instanteAtual : via.prioridadeDesde,
            },
          });
        }

        if (semaforo) {
          await transacao.trafficLight.update({
            where: { id: semaforo.id },
            data: {
              currentPriorityLaneId: processamento.viaPrioritaria.id,
              cycleSeconds: processamento.duracaoCicloSegundos,
              statusText: processamento.textoStatus,
            },
          });
        } else {
          await transacao.trafficLight.create({
            data: {
              name: "Semaforo Central",
              mode: "AUTOMATIC",
              statusText: processamento.textoStatus,
              cycleSeconds: processamento.duracaoCicloSegundos,
              currentPriorityLaneId: processamento.viaPrioritaria.id,
            },
          });
        }
      });

      semaforo = await this.buscarSemaforo();
    }

    if (!semaforo) {
      throw new ServiceUnavailableException(
        "O semaforo principal nao foi configurado corretamente.",
      );
    }

    const viaPrioritariaAtual =
      vias.find((via) => via.id === semaforo.idViaPrioritariaAtual) ?? null;
    const idsAbertosAtuais = this.engenharia.obterIdsAbertosAtuais(
      vias,
      viaPrioritariaAtual,
    );
    const tempoVerdeSegundos = this.engenharia.calcularTempoVerdeSegundos(
      viaPrioritariaAtual,
      new Date(),
    );
    const rotuloPrioridade =
      idsAbertosAtuais.length > 1 ? "Corredor Norte-Sul" : "Via Leste";
    const mensagem = this.engenharia.criarMensagemOperacional(
      vias,
      rotuloPrioridade,
      viaPrioritariaAtual ?? {
        nome: "Via Leste",
        quantidadeVeiculosAtual: 0,
      },
      tempoVerdeSegundos,
    );

    return {
      geradoEm: new Date().toISOString(),
      enderecoCruzamento: ENDERECO_CRUZAMENTO,
      idViaPrioritaria: semaforo.idViaPrioritariaAtual,
      nomeViaPrioritaria: rotuloPrioridade,
      mensagem,
      vias: vias.map((via) => ({
        id: via.id,
        chave: via.chave,
        nome: via.nome,
        descricao: via.descricao,
        quantidadeVeiculos: via.quantidadeVeiculosAtual,
        corSemaforo: idsAbertosAtuais.includes(via.id)
          ? CorSemaforo.VERDE
          : CorSemaforo.VERMELHO,
        estaPrioritaria: idsAbertosAtuais.includes(via.id),
        sentido: this.engenharia.obterSentidoDaVia(via.chave),
      })),
      semaforo: {
        id: semaforo.id,
        modo: semaforo.modo,
        statusTexto: semaforo.textoStatus,
        chaveViaPrioritariaAtual: semaforo.viaPrioritariaAtual?.chave ?? null,
        nomeViaPrioritariaAtual: rotuloPrioridade,
        duracaoCicloSegundos: semaforo.duracaoCicloSegundos,
        tempoVerdeSegundos,
        atualizadoEm: semaforo.atualizadoEm.toISOString(),
      },
    };
  }

  async simular(): Promise<VisaoSistema> {
    const vias = await this.buscarViasMonitoradas();
    const semaforo = await this.buscarSemaforo();

    if (!vias.length) {
      throw new ServiceUnavailableException(
        "As vias ainda nao foram configuradas. Execute o seed do Prisma.",
      );
    }

    const viaPrioritariaAtual =
      vias.find((via) => via.id === semaforo?.idViaPrioritariaAtual) ?? null;
    const idsAbertosAtuais = this.engenharia.obterIdsAbertosAtuais(
      vias,
      viaPrioritariaAtual,
    );
    const processamento = this.engenharia.processarSimulacao(
      vias,
      viaPrioritariaAtual,
      semaforo?.atualizadoEm ?? null,
    );
    const houveTrocaDeCorredor =
      idsAbertosAtuais.join("|") !== processamento.idsViasAbertas.join("|");

    await this.prisma.$transaction(async (transacao: TransacaoTrafego) => {
      for (const viaSimulada of processamento.viasSimuladas) {
        const viaAberta = processamento.idsViasAbertas.includes(viaSimulada.id);

        await transacao.lane.update({
          where: { id: viaSimulada.id },
          data: {
            currentVehicleCount: viaSimulada.quantidadeSimulada,
            signalColor: viaAberta
              ? CorSemaforo.VERDE
              : CorSemaforo.VERMELHO,
            lastPriorityAt:
              viaAberta && houveTrocaDeCorredor
                ? processamento.instanteAtual
                : undefined,
          },
        });
      }

      await transacao.trafficFlowReading.createMany({
        data: processamento.viasSimuladas.map((viaSimulada) => ({
          laneId: viaSimulada.id,
          vehicleCount: viaSimulada.quantidadeSimulada,
          recordedAt: processamento.instanteAtual,
        })),
      });

      const dadosSemaforo = {
        currentPriorityLaneId: processamento.viaPrioritaria.id,
        cycleSeconds: processamento.duracaoCicloSegundos,
        statusText: processamento.textoStatus,
      };

      if (semaforo) {
        await transacao.trafficLight.update({
          where: { id: semaforo.id },
          data: dadosSemaforo,
        });
      } else {
        await transacao.trafficLight.create({
          data: {
            name: "Semaforo Central",
            mode: "AUTOMATIC",
            ...dadosSemaforo,
          },
        });
      }
    });

    return this.obterVisaoGeral();
  }

  private async buscarViasMonitoradas(): Promise<RegistroVia[]> {
    const viasBanco = (await this.prisma.lane.findMany({
      where: {
        key: {
          in: [ChaveVia.NORTE, ChaveVia.LESTE, ChaveVia.SUL],
        },
      },
      orderBy: { displayOrder: "asc" },
    })) as ViaBanco[];

    return viasBanco.map((viaBanco) => ({
      id: viaBanco.id,
      chave: viaBanco.key,
      nome: viaBanco.name,
      descricao: viaBanco.description,
      ordemExibicao: viaBanco.displayOrder,
      quantidadeVeiculosAtual: viaBanco.currentVehicleCount,
      corSemaforo: viaBanco.signalColor,
      prioridadeDesde: viaBanco.lastPriorityAt,
    }));
  }

  private async buscarSemaforo(): Promise<RegistroSemaforo | null> {
    const semaforoBanco = (await this.prisma.trafficLight.findFirst({
      include: { currentPriorityLane: true },
    })) as SemaforoBanco | null;

    if (!semaforoBanco) {
      return null;
    }

    return {
      id: semaforoBanco.id,
      nome: semaforoBanco.name,
      modo: semaforoBanco.mode,
      textoStatus: semaforoBanco.statusText,
      duracaoCicloSegundos: semaforoBanco.cycleSeconds,
      idViaPrioritariaAtual: semaforoBanco.currentPriorityLaneId,
      atualizadoEm: semaforoBanco.updatedAt,
      viaPrioritariaAtual: semaforoBanco.currentPriorityLane,
    };
  }
}
