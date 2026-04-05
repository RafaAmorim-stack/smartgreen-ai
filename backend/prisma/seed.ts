import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import {
  ChaveVia,
  CorSemaforo,
  ModoSemaforo,
} from "../src/trafego/dominio-trafego";

const prisma = new PrismaClient();

async function main() {
  await prisma.trafficFlowReading.deleteMany();
  await prisma.trafficLight.deleteMany();
  await prisma.lane.deleteMany();
  await prisma.user.deleteMany();

  const senhaCriptografada = await hash("smartgreen123", 10);

  await prisma.user.create({
    data: {
      name: "Equipe SmartGreen",
      email: "professor@smartgreen.ai",
      passwordHash: senhaCriptografada,
    },
  });

  const definicoesDeVia = [
    {
      key: ChaveVia.NORTE,
      name: "Via Norte",
      description: "Fluxo descendente em direcao ao eixo central",
      displayOrder: 1,
      currentVehicleCount: 24,
      signalColor: CorSemaforo.VERDE,
    },
    {
      key: ChaveVia.LESTE,
      name: "Via Leste",
      description: "Corredor leste-oeste com faixa unica de deslocamento",
      displayOrder: 2,
      currentVehicleCount: 21,
      signalColor: CorSemaforo.VERMELHO,
    },
    {
      key: ChaveVia.SUL,
      name: "Via Sul",
      description: "Fluxo ascendente com maior demanda inicial",
      displayOrder: 3,
      currentVehicleCount: 27,
      signalColor: CorSemaforo.VERDE,
    },
  ] as const;

  const instanteAtual = new Date();
  const viasCriadas = [];

  for (const definicaoDeVia of definicoesDeVia) {
    const viaCriada = await prisma.lane.create({
      data: {
        ...definicaoDeVia,
        lastPriorityAt:
          definicaoDeVia.key === ChaveVia.NORTE ||
          definicaoDeVia.key === ChaveVia.SUL
            ? new Date(instanteAtual.getTime() - 20_000)
            : null,
      },
    });

    viasCriadas.push(viaCriada);
  }

  await prisma.trafficFlowReading.createMany({
    data: viasCriadas.map((viaCriada) => ({
      laneId: viaCriada.id,
      vehicleCount: viaCriada.currentVehicleCount,
      recordedAt: instanteAtual,
    })),
  });

  const viaPrioritaria = viasCriadas.find(
    (viaCriada) => viaCriada.key === ChaveVia.SUL,
  );

  await prisma.trafficLight.create({
    data: {
      name: "Semaforo Central",
      mode: ModoSemaforo.AUTOMATICO,
      statusText: `${viaPrioritaria?.name ?? "Via Sul"} liberada com verde inteligente por 20s.`,
      cycleSeconds: 36,
      currentPriorityLaneId: viaPrioritaria?.id,
    },
  });

  console.log("Seed concluido com usuario, vias e semaforo inicial.");
}

main()
  .catch((erro) => {
    console.error("Falha ao executar seed:", erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
