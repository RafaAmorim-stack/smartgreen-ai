import {
  ChaveVia,
  type ChaveVia as TipoChaveVia,
  type RegistroVia,
  type ResultadoProcessamento,
  type ViaSimulada,
} from "./dominio-trafego";

class PerfilOperacional {
  constructor(
    readonly chave: TipoChaveVia,
    readonly minimo: number,
    readonly maximo: number,
    readonly chegadaMinima: number,
    readonly chegadaMaxima: number,
  ) {}
}

class CorredorOperacional {
  constructor(
    readonly rotulo: string,
    readonly vias: ViaSimulada[],
  ) {}

  obterIdsViasAbertas(): string[] {
    return this.vias.map((via) => via.id);
  }

  obterViaDominante(): ViaSimulada {
    return [...this.vias].sort((viaA, viaB) => {
      if (viaB.quantidadeSimulada !== viaA.quantidadeSimulada) {
        return viaB.quantidadeSimulada - viaA.quantidadeSimulada;
      }

      return viaA.ordemExibicao - viaB.ordemExibicao;
    })[0];
  }

  obterCargaComparativa(): number {
    const maiorFila = this.obterViaDominante().quantidadeSimulada;

    if (this.vias.length === 1) {
      return maiorFila;
    }

    const menorFila = [...this.vias]
      .sort((viaA, viaB) => viaA.quantidadeSimulada - viaB.quantidadeSimulada)[0]
      .quantidadeSimulada;

    return maiorFila + Math.round(menorFila * 0.35);
  }
}

export class EngenhariaDeTrafego {
  private readonly tempoMinimoVerdeSegundos = 18;
  private readonly tempoMaximoVerdeSegundos = 44;
  private readonly diferencaUrgente = 10;
  private readonly diferencaEstavel = 4;
  private readonly perfis = new Map<TipoChaveVia, PerfilOperacional>([
    [ChaveVia.NORTE, new PerfilOperacional(ChaveVia.NORTE, 8, 46, 2, 5)],
    [ChaveVia.LESTE, new PerfilOperacional(ChaveVia.LESTE, 9, 52, 3, 6)],
    [ChaveVia.SUL, new PerfilOperacional(ChaveVia.SUL, 8, 48, 2, 5)],
  ]);

  processarCenarioAtual(
    vias: RegistroVia[],
    viaPrioritariaAtual: RegistroVia | null,
  ): ResultadoProcessamento {
    const instanteAtual = new Date();
    const viasSimuladas = vias.map((via) => this.criarViaSimuladaAtual(via));
    const corredorSelecionado = this.selecionarCorredorPrioritario(
      viasSimuladas,
      viaPrioritariaAtual,
      instanteAtual,
    );
    const viaPrioritaria = corredorSelecionado.obterViaDominante();
    const tempoVerdeSegundos =
      viaPrioritariaAtual &&
      corredorSelecionado.obterIdsViasAbertas().includes(viaPrioritariaAtual.id)
        ? this.calcularTempoVerdeSegundos(viaPrioritariaAtual, instanteAtual)
        : 0;

    return {
      instanteAtual,
      viasSimuladas,
      viaPrioritaria,
      idsViasAbertas: corredorSelecionado.obterIdsViasAbertas(),
      rotuloPrioridade: corredorSelecionado.rotulo,
      duracaoCicloSegundos: this.calcularDuracaoCicloSegundos(
        viaPrioritaria.quantidadeSimulada,
      ),
      tempoVerdeSegundos,
      textoStatus: this.criarTextoStatus(
        corredorSelecionado.rotulo,
        tempoVerdeSegundos,
      ),
      mensagem: this.criarMensagemOperacional(
        vias,
        corredorSelecionado.rotulo,
        viaPrioritaria,
        tempoVerdeSegundos,
      ),
    };
  }

  processarSimulacao(
    vias: RegistroVia[],
    viaPrioritariaAtual: RegistroVia | null,
    ultimaAtualizacao: Date | null,
  ): ResultadoProcessamento {
    const instanteAtual = new Date();
    const segundosPassados = this.calcularSegundosPassados(
      ultimaAtualizacao,
      instanteAtual,
    );
    const idsAbertosAtuais = this.obterIdsAbertosAtuais(vias, viaPrioritariaAtual);
    const viasSimuladas = vias.map((via) =>
      this.simularVia(via, idsAbertosAtuais, segundosPassados),
    );
    const corredorSelecionado = this.selecionarCorredorPrioritario(
      viasSimuladas,
      viaPrioritariaAtual,
      instanteAtual,
    );
    const viaPrioritaria = corredorSelecionado.obterViaDominante();
    const tempoVerdeSegundos =
      viaPrioritariaAtual &&
      corredorSelecionado.obterIdsViasAbertas().includes(viaPrioritariaAtual.id)
        ? this.calcularTempoVerdeSegundos(viaPrioritariaAtual, instanteAtual)
        : 0;

    return {
      instanteAtual,
      viasSimuladas,
      viaPrioritaria,
      idsViasAbertas: corredorSelecionado.obterIdsViasAbertas(),
      rotuloPrioridade: corredorSelecionado.rotulo,
      duracaoCicloSegundos: this.calcularDuracaoCicloSegundos(
        viaPrioritaria.quantidadeSimulada,
      ),
      tempoVerdeSegundos,
      textoStatus: this.criarTextoStatus(
        corredorSelecionado.rotulo,
        tempoVerdeSegundos,
      ),
      mensagem: this.criarMensagemOperacional(
        viasSimuladas.map((viaSimulada) => ({
          chave: viaSimulada.chave,
          nome: viaSimulada.nome,
          quantidadeVeiculosAtual: viaSimulada.quantidadeSimulada,
        })),
        corredorSelecionado.rotulo,
        viaPrioritaria,
        tempoVerdeSegundos,
      ),
    };
  }

  calcularTempoVerdeSegundos(
    viaPrioritariaAtual: Pick<RegistroVia, "prioridadeDesde"> | null,
    instanteAtual: Date,
  ): number {
    if (!viaPrioritariaAtual?.prioridadeDesde) {
      return 0;
    }

    return Math.max(
      0,
      Math.floor(
        (instanteAtual.getTime() - viaPrioritariaAtual.prioridadeDesde.getTime()) /
          1000,
      ),
    );
  }

  criarMensagemOperacional(
    vias: Array<
      Pick<RegistroVia, "chave" | "nome" | "quantidadeVeiculosAtual">
    >,
    rotuloPrioridade: string,
    viaDominante:
      | Pick<RegistroVia, "nome" | "quantidadeVeiculosAtual">
      | Pick<ViaSimulada, "nome" | "quantidadeSimulada">,
    tempoVerdeSegundos: number,
  ): string {
    const viaLeste = vias.find((via) => via.chave === ChaveVia.LESTE) ?? null;
    const viaNorte = vias.find((via) => via.chave === ChaveVia.NORTE) ?? null;
    const viaSul = vias.find((via) => via.chave === ChaveVia.SUL) ?? null;
    const cargaVertical =
      (viaNorte?.quantidadeVeiculosAtual ?? 0) +
      (viaSul?.quantidadeVeiculosAtual ?? 0);

    if (rotuloPrioridade === "Corredor Norte-Sul") {
      return `O corredor Norte-Sul esta aberto em conjunto para aliviar ${cargaVertical} veiculos acumulados, mantendo ${tempoVerdeSegundos}s de verde sem interromper a fluidez do eixo vertical.`;
    }

    const quantidadeDominante =
      "quantidadeVeiculosAtual" in viaDominante
        ? viaDominante.quantidadeVeiculosAtual
        : viaDominante.quantidadeSimulada;

    return `A Via Leste segue priorizada para escoar ${quantidadeDominante} veiculos em direcao ao Oeste, enquanto o corredor vertical aguarda uma janela mais adequada.`;
  }

  obterSentidoDaVia(chaveVia: TipoChaveVia): string {
    const mapaSentidos: Record<TipoChaveVia, string> = {
      [ChaveVia.NORTE]: "Norte para Sul",
      [ChaveVia.LESTE]: "Leste para Oeste",
      [ChaveVia.SUL]: "Sul para Norte",
      [ChaveVia.OESTE]: "Saida do corredor Leste-Oeste",
    };

    return mapaSentidos[chaveVia];
  }

  obterIdsAbertosAtuais(
    vias: Pick<RegistroVia, "id" | "chave">[],
    viaPrioritariaAtual: Pick<RegistroVia, "id" | "chave"> | null,
  ): string[] {
    if (!viaPrioritariaAtual) {
      return [];
    }

    if (
      viaPrioritariaAtual.chave === ChaveVia.NORTE ||
      viaPrioritariaAtual.chave === ChaveVia.SUL
    ) {
      return vias
        .filter(
          (via) =>
            via.chave === ChaveVia.NORTE || via.chave === ChaveVia.SUL,
        )
        .map((via) => via.id);
    }

    return [viaPrioritariaAtual.id];
  }

  private criarViaSimuladaAtual(via: RegistroVia): ViaSimulada {
    return {
      id: via.id,
      chave: via.chave,
      nome: via.nome,
      descricao: via.descricao,
      ordemExibicao: via.ordemExibicao,
      prioridadeDesde: via.prioridadeDesde,
      quantidadeOriginal: via.quantidadeVeiculosAtual,
      quantidadeSimulada: via.quantidadeVeiculosAtual,
    };
  }

  private simularVia(
    via: RegistroVia,
    idsAbertosAtuais: string[],
    segundosPassados: number,
  ): ViaSimulada {
    const perfil = this.obterPerfil(via.chave);
    const estaAberta = idsAbertosAtuais.includes(via.id);
    const multiplicadorDeTempo = Math.max(
      0.9,
      Math.min(1.2, segundosPassados / 5),
    );

    let quantidadeSimulada = via.quantidadeVeiculosAtual;

    if (estaAberta) {
      const percentualReducao = Math.min(
        0.24,
        0.08 + multiplicadorDeTempo * 0.05 + this.sortearDecimal(0.01, 0.03),
      );
      const quantidadeSaindo = Math.max(
        1,
        Math.round(via.quantidadeVeiculosAtual * percentualReducao),
      );
      const novasChegadas = Math.round(
        this.sortearInteiro(perfil.chegadaMinima, perfil.chegadaMaxima) * 0.65,
      );

      quantidadeSimulada =
        via.quantidadeVeiculosAtual - quantidadeSaindo + novasChegadas;
    } else {
      const novasChegadas =
        Math.round(
          this.sortearInteiro(perfil.chegadaMinima, perfil.chegadaMaxima) *
            multiplicadorDeTempo,
        ) + this.sortearInteiro(0, 1);

      quantidadeSimulada = via.quantidadeVeiculosAtual + novasChegadas;
    }

    return {
      id: via.id,
      chave: via.chave,
      nome: via.nome,
      descricao: via.descricao,
      ordemExibicao: via.ordemExibicao,
      prioridadeDesde: via.prioridadeDesde,
      quantidadeOriginal: via.quantidadeVeiculosAtual,
      quantidadeSimulada: this.limitar(
        quantidadeSimulada,
        perfil.minimo,
        perfil.maximo,
      ),
    };
  }

  private selecionarCorredorPrioritario(
    viasSimuladas: ViaSimulada[],
    viaPrioritariaAtual: RegistroVia | null,
    instanteAtual: Date,
  ): CorredorOperacional {
    const viaNorte =
      viasSimuladas.find((via) => via.chave === ChaveVia.NORTE) ?? null;
    const viaLeste =
      viasSimuladas.find((via) => via.chave === ChaveVia.LESTE) ?? null;
    const viaSul =
      viasSimuladas.find((via) => via.chave === ChaveVia.SUL) ?? null;

    if (!viaNorte || !viaLeste || !viaSul) {
      throw new Error("As vias monitoradas do cruzamento nao foram encontradas.");
    }

    const corredorVertical = new CorredorOperacional("Corredor Norte-Sul", [
      viaNorte,
      viaSul,
    ]);
    const corredorLeste = new CorredorOperacional("Via Leste", [viaLeste]);

    const corredorCandidato =
      corredorVertical.obterCargaComparativa() > corredorLeste.obterCargaComparativa()
        ? corredorVertical
        : corredorLeste;

    if (!viaPrioritariaAtual) {
      return corredorCandidato;
    }

    const idsAbertosAtuais = this.obterIdsAbertosAtuais(
      viasSimuladas,
      viaPrioritariaAtual,
    );
    const corredorAtual = this.identificarCorredorPorIdsAbertos(
      idsAbertosAtuais,
      corredorVertical,
      corredorLeste,
    );

    if (corredorAtual.rotulo === corredorCandidato.rotulo) {
      return corredorAtual;
    }

    const tempoVerdeAtual = this.calcularTempoVerdeSegundos(
      viaPrioritariaAtual,
      instanteAtual,
    );
    const diferencaEntreCorredores =
      corredorCandidato.obterCargaComparativa() -
      corredorAtual.obterCargaComparativa();

    if (
      tempoVerdeAtual < this.tempoMinimoVerdeSegundos &&
      diferencaEntreCorredores < this.diferencaUrgente
    ) {
      return corredorAtual;
    }

    if (
      tempoVerdeAtual >= this.tempoMaximoVerdeSegundos &&
      diferencaEntreCorredores >= -2
    ) {
      return corredorCandidato;
    }

    if (diferencaEntreCorredores >= this.diferencaEstavel) {
      return corredorCandidato;
    }

    return corredorAtual;
  }

  private identificarCorredorPorIdsAbertos(
    idsAbertosAtuais: string[],
    corredorVertical: CorredorOperacional,
    corredorLeste: CorredorOperacional,
  ): CorredorOperacional {
    const idsVerticais = corredorVertical.obterIdsViasAbertas();

    if (idsVerticais.every((idVia) => idsAbertosAtuais.includes(idVia))) {
      return corredorVertical;
    }

    return corredorLeste;
  }

  private criarTextoStatus(
    rotuloPrioridade: string,
    tempoVerdeSegundos: number,
  ): string {
    return `${rotuloPrioridade} liberado com verde inteligente por ${tempoVerdeSegundos}s.`;
  }

  private calcularDuracaoCicloSegundos(quantidadeVeiculos: number): number {
    return Math.min(54, Math.max(26, 24 + Math.floor(quantidadeVeiculos / 2)));
  }

  private calcularSegundosPassados(
    ultimaAtualizacao: Date | null,
    instanteAtual: Date,
  ): number {
    if (!ultimaAtualizacao) {
      return 5;
    }

    return Math.max(
      3,
      Math.floor(
        (instanteAtual.getTime() - ultimaAtualizacao.getTime()) / 1000,
      ),
    );
  }

  private obterPerfil(chaveVia: TipoChaveVia): PerfilOperacional {
    const perfil = this.perfis.get(chaveVia);

    if (!perfil) {
      throw new Error(`Perfil operacional nao encontrado para ${chaveVia}.`);
    }

    return perfil;
  }

  private limitar(valor: number, minimo: number, maximo: number): number {
    return Math.max(minimo, Math.min(maximo, valor));
  }

  private sortearInteiro(minimo: number, maximo: number): number {
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
  }

  private sortearDecimal(minimo: number, maximo: number): number {
    return Math.random() * (maximo - minimo) + minimo;
  }
}
