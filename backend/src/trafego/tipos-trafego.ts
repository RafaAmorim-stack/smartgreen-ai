import type {
  ChaveVia,
  CorSemaforo,
  ModoSemaforo,
} from "./dominio-trafego";

export interface VisaoVia {
  id: string;
  chave: ChaveVia;
  nome: string;
  descricao: string;
  quantidadeVeiculos: number;
  corSemaforo: CorSemaforo;
  estaPrioritaria: boolean;
  sentido: string;
}

export interface VisaoSemaforo {
  id: string;
  modo: ModoSemaforo;
  statusTexto: string;
  chaveViaPrioritariaAtual: ChaveVia | null;
  nomeViaPrioritariaAtual: string | null;
  duracaoCicloSegundos: number;
  tempoVerdeSegundos: number;
  atualizadoEm: string;
}

export interface VisaoSistema {
  geradoEm: string;
  enderecoCruzamento: string;
  idViaPrioritaria: string | null;
  nomeViaPrioritaria: string | null;
  mensagem: string;
  vias: VisaoVia[];
  semaforo: VisaoSemaforo;
}
