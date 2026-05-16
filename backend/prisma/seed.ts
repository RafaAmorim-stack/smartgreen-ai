import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import {
  ChaveVia,
  CorSemaforo,
  ModoSemaforo,
} from "../src/trafego/dominio-trafego";

const prisma = new PrismaClient();

async function main() {
  const senhaCriptografada = await hash("smartgreen123", 10);

  await prisma.user.upsert({
    where: { email: "professor@smartgreen.ai" },
    update: {
      name: "Equipe SmartGreen",
      passwordHash: senhaCriptografada,
    },
    create: {
      name: "Equipe SmartGreen",
      email: "professor@smartgreen.ai",
      passwordHash: senhaCriptografada,
    },
  });

  const instanteAtual = new Date();
  const definicoesDeVia = [
    {
      key: ChaveVia.NORTE,
      name: "Via Norte",
      description: "Fluxo descendente em direcao ao eixo central",
      displayOrder: 1,
      currentVehicleCount: 24,
      signalColor: CorSemaforo.VERDE,
      lastPriorityAt: new Date(instanteAtual.getTime() - 20_000),
    },
    {
      key: ChaveVia.LESTE,
      name: "Via Leste",
      description: "Corredor leste-oeste com faixa unica de deslocamento",
      displayOrder: 2,
      currentVehicleCount: 21,
      signalColor: CorSemaforo.VERMELHO,
      lastPriorityAt: null,
    },
    {
      key: ChaveVia.SUL,
      name: "Via Sul",
      description: "Fluxo ascendente com maior demanda inicial",
      displayOrder: 3,
      currentVehicleCount: 27,
      signalColor: CorSemaforo.VERDE,
      lastPriorityAt: new Date(instanteAtual.getTime() - 20_000),
    },
  ] as const;

  const viasMonitoradas = [];

  for (const definicaoDeVia of definicoesDeVia) {
    const via = await prisma.lane.upsert({
      where: { key: definicaoDeVia.key },
      update: {
        name: definicaoDeVia.name,
        description: definicaoDeVia.description,
        displayOrder: definicaoDeVia.displayOrder,
      },
      create: definicaoDeVia,
    });

    viasMonitoradas.push(via);
  }

  await prisma.trafficFlowReading.createMany({
    data: viasMonitoradas.map((via) => ({
      laneId: via.id,
      vehicleCount: via.currentVehicleCount,
      recordedAt: instanteAtual,
    })),
  });

  const viaPrioritaria =
    viasMonitoradas.find((via) => via.key === ChaveVia.SUL) ??
    viasMonitoradas[0];
  const textoStatus = `${viaPrioritaria.name} liberada com verde inteligente por 20s.`;
  const semaforoExistente = await prisma.trafficLight.findFirst({
    where: { name: "Semaforo Central" },
  });

  if (semaforoExistente) {
    await prisma.trafficLight.update({
      where: { id: semaforoExistente.id },
      data: {
        mode: ModoSemaforo.AUTOMATICO,
        statusText: textoStatus,
        cycleSeconds: 36,
        currentPriorityLaneId: viaPrioritaria.id,
      },
    });
  } else {
    await prisma.trafficLight.create({
      data: {
        name: "Semaforo Central",
        mode: ModoSemaforo.AUTOMATICO,
        statusText: textoStatus,
        cycleSeconds: 36,
        currentPriorityLaneId: viaPrioritaria.id,
      },
    });
  }

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
