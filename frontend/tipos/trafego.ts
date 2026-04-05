export type ChaveVia = "NORTH" | "EAST" | "SOUTH";
export type CorSemaforo = "GREEN" | "YELLOW" | "RED";
export type ModoSemaforo = "AUTOMATIC";

export interface UsuarioSessao {
  id: string;
  nome: string;
  email: string;
}

export interface RespostaAutenticacao {
  tokenAcesso: string;
  usuario: UsuarioSessao;
}

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

class DiretorioDeVias {
  private readonly rotulosCardinais = new Map<ChaveVia, string>([
    ["NORTH", "Norte"],
    ["EAST", "Leste"],
    ["SOUTH", "Sul"],
  ]);

  private readonly sentidos = new Map<ChaveVia, string>([
    ["NORTH", "Norte para Sul"],
    ["EAST", "Leste para Oeste"],
    ["SOUTH", "Sul para Norte"],
  ]);

  obterRotuloCardinal(chaveVia: ChaveVia): string {
    return this.rotulosCardinais.get(chaveVia) ?? "Via";
  }

  obterSentido(chaveVia: ChaveVia): string {
    return this.sentidos.get(chaveVia) ?? "Sentido indefinido";
  }
}

export const diretorioDeVias = new DiretorioDeVias();
