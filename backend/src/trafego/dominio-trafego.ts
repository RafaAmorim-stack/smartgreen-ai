export const ChaveVia = {
  NORTE: "NORTH",
  LESTE: "EAST",
  SUL: "SOUTH",
  OESTE: "WEST",
} as const;

export type ChaveVia = (typeof ChaveVia)[keyof typeof ChaveVia];

export const CorSemaforo = {
  VERMELHO: "RED",
  AMARELO: "YELLOW",
  VERDE: "GREEN",
} as const;

export type CorSemaforo = (typeof CorSemaforo)[keyof typeof CorSemaforo];

export const ModoSemaforo = {
  AUTOMATICO: "AUTOMATIC",
} as const;

export type ModoSemaforo =
  (typeof ModoSemaforo)[keyof typeof ModoSemaforo];

export const ENDERECO_CRUZAMENTO =
  "Cruzamento Av. Afonso Vergueiro x R. Professor Toledo";

export interface RegistroVia {
  id: string;
  chave: ChaveVia;
  nome: string;
  descricao: string;
  ordemExibicao: number;
  quantidadeVeiculosAtual: number;
  corSemaforo: CorSemaforo;
  prioridadeDesde: Date | null;
}

export interface ViaPrioritariaAtual {
  id: string;
  chave: ChaveVia;
  nome: string;
}

export interface RegistroSemaforo {
  id: string;
  nome: string;
  modo: ModoSemaforo;
  textoStatus: string;
  duracaoCicloSegundos: number;
  idViaPrioritariaAtual: string | null;
  atualizadoEm: Date;
  viaPrioritariaAtual: ViaPrioritariaAtual | null;
}

export interface ViaSimulada {
  id: string;
  chave: ChaveVia;
  nome: string;
  descricao: string;
  ordemExibicao: number;
  prioridadeDesde: Date | null;
  quantidadeOriginal: number;
  quantidadeSimulada: number;
}

export interface ResultadoProcessamento {
  instanteAtual: Date;
  viasSimuladas: ViaSimulada[];
  viaPrioritaria: ViaSimulada;
  idsViasAbertas: string[];
  rotuloPrioridade: string;
  duracaoCicloSegundos: number;
  tempoVerdeSegundos: number;
  textoStatus: string;
  mensagem: string;
}
