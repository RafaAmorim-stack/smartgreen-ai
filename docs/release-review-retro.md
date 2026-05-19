# Release Review e Retro - SmartGreen

Este roteiro ajuda a gravar os videos solicitados para a entrega da Release.
Use os dados reais do Jira ao apresentar burndown, burnup, velocidade e cards.

## Video 1 - Review da Release

Objetivo: mostrar a solucao funcionando, onde esta hospedada e quais requisitos
foram entregues.

### Roteiro sugerido

1. Apresentacao rapida
   - Nome do projeto: SmartGreen.
   - Problema: monitorar fluxo de veiculos em cruzamentos urbanos.
   - Publico-alvo: gestores de transito, equipes de mobilidade urbana e usuarios interessados em melhoria de trafego.

2. Solucao hospedada
   - Mostrar a URL publica do front-end na Vercel.
   - Mostrar a URL publica da API ou Swagger, se estiver disponivel.
   - Explicar que o usuario acessa a aplicacao, faz login e testa o MVP.

3. Requisitos entregues
   - Sprint 1:
     - Tela de login.
     - Tela de cadastro.
     - Integracao frontend + backend.
     - Persistencia de usuarios.
     - Validacao de credenciais.
   - Sprint 2:
     - RF1: monitorar o fluxo de veiculos nas vias do cruzamento.
     - RF3: exibir o status atual de cada semaforo no painel.
     - Simulacao limitada a no maximo 20 carros por via.
     - Menu SmartGreen como tela principal do aplicativo.
     - Melhorias de UX/UI baseadas nas heuristicas de Nielsen.

4. Demonstracao do produto
   - Acessar a tela de login.
   - Entrar com usuario valido.
   - Mostrar o Menu SmartGreen.
   - Mostrar status atual dos semaforos.
   - Mostrar quantidade de veiculos por via.
   - Clicar em Atualizar.
   - Mostrar a confirmacao ao sair.

5. Fechamento
   - Reforcar que a Release permite teste do usuario final.
   - Citar que a interface foi ajustada para usabilidade e avaliacao academica.

## Video 2 - Retro da Release

Objetivo: refletir sobre processo, produtividade, previsibilidade e organizacao
da equipe.

### Pontos obrigatorios

- Licoes aprendidas usando SWOT.
- Metricas de produtividade: burndown, burnup e velocidade dos cards.
- Pontos de historia como parametro.
- Previsibilidade e auto-organizacao da equipe.
- Uso do Jira para explicar os cards e o andamento das Sprints.

## SWOT

| Categoria | Pontos para apresentar |
| --- | --- |
| Strengths - Forcas | Equipe conseguiu integrar frontend, backend, banco e deploy; MVP funcional para teste; interface organizada para usuario final. |
| Weaknesses - Fraquezas | Ajustes de escopo durante a Sprint exigiram retrabalho; dependencias de deploy e ambiente consumiram tempo. |
| Opportunities - Oportunidades | Evoluir para dados reais de sensores, relatorios historicos, alertas e painel administrativo. |
| Threats - Ameacas | Instabilidade de servicos gratuitos, dificuldade de acesso a API publica e risco de requisitos mudarem perto da entrega. |

## Metricas para apresentar no Jira

Preencha com os dados reais da equipe.

### Story points por Sprint

| Sprint | Planejado | Entregue | Observacao |
| --- | ---: | ---: | --- |
| Sprint 1 | preencher | preencher | Login, cadastro, integracao e persistencia. |
| Sprint 2 | preencher | preencher | RF1, RF3, menu principal, simulacao e UX/UI. |

### Velocidade dos cards

| Sprint | Cards planejados | Cards concluidos | Velocidade |
| --- | ---: | ---: | ---: |
| Sprint 1 | preencher | preencher | preencher |
| Sprint 2 | preencher | preencher | preencher |

### Burndown

Mostre no Jira:

- total de pontos planejados no inicio da Sprint;
- pontos restantes por dia;
- queda da curva ate o final;
- itens que ficaram pendentes, se houver.

### Burnup

Mostre no Jira:

- pontos concluidos acumulados ao longo da Sprint;
- aumento do escopo quando novos requisitos entraram;
- comparacao entre escopo planejado e escopo entregue.

## Previsibilidade

Explique:

- o quanto a equipe conseguiu entregar do planejado;
- quais cards mudaram de prioridade;
- se a Sprint 2 manteve ou aumentou a entrega em relacao a Sprint 1;
- quais riscos foram percebidos antes e quais apareceram durante a execucao.

## Auto-organizacao

Pontos para falar no video:

- divisao de responsabilidades entre frontend, backend, banco, deploy e documentacao;
- revisao coletiva dos requisitos;
- comunicacao sobre mudancas de escopo;
- validacao local antes de publicar.

## Bloco final da Retro - Tech Lead e time

Use este bloco no final do video da Retro para atender ao item de Tech Lead,
refatoracao, SOLID, Strategy, UX e UI.

### Roteiro de fala

> Como Tech Lead, a equipe organizou a Release em duas frentes: entregar os
> requisitos funcionais e refatorar os pontos mais importantes do codigo. Na
> Sprint 1, criamos a base de login, cadastro, persistencia e integracao com a
> API. Na Sprint 2, evoluimos o produto com RF1, RF3, melhorias de UX/UI e
> refatoracoes tecnicas.

> Em SOLID, aplicamos principalmente ISP, separando interfaces grandes em
> contratos menores. Login, cadastro, consulta do painel e simulacao de trafego
> passaram a depender apenas dos metodos que realmente usam.

> Tambem aplicamos Strategy no backend, separando a regra de simulacao de uma via
> aberta da regra de uma via fechada. Isso deixa o codigo mais preparado para
> novas regras no futuro.

> Na estrategia de UX/UI, usamos Nielsen, Fitts, Hick e consistencia. A tela
> passou a mostrar status do sistema, validacao preventiva, feedback de erro,
> botoes com bom tamanho, poucas acoes por tela e uma hierarquia visual mais
> clara.

### O que mostrar no Jira

- Cards de Sprint 1: login, cadastro, API de autenticacao, banco e integracao.
- Cards de Sprint 2: RF1, RF3, UX/UI Nielsen, ISP, Strategy e documentacao.
- Comparar pontos planejados x concluidos.
- Mostrar se a Sprint 2 manteve ou aumentou a entrega em relacao a Sprint 1.
- Explicar cards que foram refinados ou quebrados durante a Sprint.

### Documentos de apoio

- `docs/usabilidade-nielsen.md`
- `docs/solid-interface-segregation.html`
- `docs/tech-lead-solid-strategy-ux-ui.md`

## Checklist final para a Release

- Front-end publicado na Vercel.
- API publicada em ambiente acessivel pela internet.
- Variavel `NEXT_PUBLIC_API_URL` configurada na Vercel.
- Login testado em producao.
- Menu SmartGreen testado em producao.
- RF1 demonstrado: fluxo de veiculos por via.
- RF3 demonstrado: status atual dos semaforos.
- UX/UI revisada com base nas 10 heuristicas de Nielsen.
- Refatoracao SOLID/ISP explicada.
- Strategy Pattern explicado.
- Melhorias de UX/UI por Sprint explicadas.
- Jira com cards fechados e metricas visiveis.
- Video Review gravado.
- Video Retro gravado.
