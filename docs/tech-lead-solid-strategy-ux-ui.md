# Tech Lead, Refatoracao, SOLID, Strategy, UX e UI

Este roteiro cobre o item 3 da entrega: explicar as tarefas tecnicas de
refatoracao, as melhorias aplicadas via SOLID, o uso de Strategy e as melhorias
de UX/UI, indicando em qual Sprint cada item foi implementado.

## Como falar no final do video da Retro

> No final da Release, o Tech Lead e o time revisaram o codigo para reduzir
> acoplamento, melhorar manutencao e deixar a experiencia do usuario mais clara.
> As melhorias foram organizadas por Sprint: a Sprint 1 criou a base funcional
> de login, cadastro e integracao com API; a Sprint 2 evoluiu o produto com
> monitoramento de trafego, status dos semaforos, melhorias de UX/UI e
> refatoracoes usando SOLID e Strategy.

## Mapa por Sprint

| Sprint | Tarefa tecnica | Evidencia no projeto | Como explicar |
| --- | --- | --- | --- |
| Sprint 1 | Base de autenticacao e integracao front/back | `frontend/components/autenticacao/formulario-acesso.tsx`, `backend/src/autenticacao` | A equipe criou login, cadastro, validacao de credenciais e persistencia de usuarios. |
| Sprint 1 | Separacao inicial de camadas | `frontend/servicos`, `backend/src/autenticacao`, `backend/src/prisma` | A interface nao chama banco diretamente; o front usa clientes HTTP e o backend concentra regras nos services. |
| Sprint 2 | RF1 - Monitoramento do fluxo | `frontend/components/sistema/cartao-via.tsx`, `backend/src/trafego/trafego.service.ts` | O sistema exibe a quantidade de veiculos por via e permite simular nova leitura. |
| Sprint 2 | RF3 - Status dos semaforos | `frontend/components/sistema/status-semaforos.tsx` | O painel mostra cor atual, via prioritaria, tempo de verde e vias liberadas. |
| Sprint 2 | UX/UI com Nielsen, Fitts, Hick e consistencia | `docs/usabilidade-nielsen.md`, `frontend/components/sistema/painel-sistema.tsx` | A interface ganhou feedback de carregamento, erros, validacao, hierarquia visual e botoes consistentes. |
| Sprint 2 | SOLID - ISP | `frontend/servicos/interfaces/cliente-autenticacao.ts`, `frontend/servicos/interfaces/cliente-trafego.ts` | Interfaces grandes foram quebradas em contratos menores para login, cadastro, consulta e simulacao. |
| Sprint 2 | Strategy Pattern | `backend/src/trafego/engenharia-trafego.ts` | A simulacao de vias abertas e fechadas foi separada em estrategias independentes. |

## SOLID aplicado

### ISP - Interface Segregation Principle

Antes, existiam contratos mais amplos:

```ts
interface ClienteAutenticacao {
  entrar(): Promise<RespostaAutenticacao>;
  cadastrar(): Promise<RespostaAutenticacao>;
}

interface ClienteTrafego {
  obterVisaoGeral(): Promise<VisaoSistema>;
  simular(): Promise<VisaoSistema>;
}
```

Depois da refatoracao, os contratos foram segregados:

```ts
interface ClienteEntradaAutenticacao {
  entrar(): Promise<RespostaAutenticacao>;
}

interface ClienteCadastroAutenticacao {
  cadastrar(): Promise<RespostaAutenticacao>;
}

interface ClienteConsultaTrafego {
  obterVisaoGeral(): Promise<VisaoSistema>;
}

interface ClienteSimulacaoTrafego {
  simular(): Promise<VisaoSistema>;
}
```

Explicacao para o video:

> Aplicamos ISP para que cada parte do front-end dependa apenas dos metodos que
> usa. O fluxo de login depende do contrato de entrada, o cadastro depende do
> contrato de cadastro, a leitura do painel depende do contrato de consulta e a
> atualizacao do trafego depende do contrato de simulacao.

## Strategy Pattern aplicado

No backend, a simulacao de trafego possui comportamentos diferentes:

- via aberta: carros tendem a sair da fila;
- via fechada: carros tendem a acumular.

Para evitar um unico metodo com muitas regras condicionais, a Sprint 2 separou
esses comportamentos em estrategias:

```ts
interface EstrategiaSimulacaoVia {
  simular(contexto: ContextoSimulacaoVia): number;
}

class EstrategiaViaAberta implements EstrategiaSimulacaoVia {}

class EstrategiaViaFechada implements EstrategiaSimulacaoVia {}
```

Explicacao para o video:

> Usamos Strategy para separar o comportamento de simulacao de uma via aberta e
> de uma via fechada. Assim, se futuramente existir uma nova regra, como via em
> manutencao ou emergencia, podemos criar uma nova estrategia sem misturar tudo
> no mesmo metodo.

## Strategy de UX/UI

A estrategia de UX/UI da Sprint 2 foi:

1. Priorizar a leitura operacional: semaforos primeiro, resumo depois e fluxo por via em seguida.
2. Reduzir carga cognitiva: poucas acoes principais, textos curtos e dados agrupados por card.
3. Dar feedback constante: carregamento, erro, atualizacao e horario da ultima leitura.
4. Evitar erro do usuario: validacao de formulario, senha minima e confirmacao antes de sair.
5. Manter consistencia: mesmas cores, bordas, icones, botoes e estrutura visual.

## Fala curta para apresentar

> Como Tech Lead, a decisao foi organizar as entregas em duas frentes: primeiro,
> manter os requisitos funcionais funcionando; depois, refatorar os pontos de
> maior acoplamento. Na Sprint 2 aplicamos ISP no front-end, separando interfaces
> por responsabilidade, e Strategy no backend, separando a simulacao de vias
> abertas e fechadas. Tambem aplicamos uma estrategia de UX/UI baseada em
> Nielsen, Fitts, Hick e consistencia para tornar o painel mais claro para o
> usuario final.

## Sugestao de cards no Jira

Use ou adapte estes nomes de cards:

- `FE - Melhorar UX/UI com heuristicas de Nielsen`
- `FE - Validacao e feedback no login/cadastro`
- `FE - Painel com status dos semaforos`
- `FE - Painel com fluxo de veiculos por via`
- `FE - Refatorar clientes HTTP aplicando ISP`
- `BE - Refatorar simulacao de trafego com Strategy`
- `DOC - Roteiro Review e Retro da Release`
- `DOC - Documentar SOLID, Strategy e UX/UI`

