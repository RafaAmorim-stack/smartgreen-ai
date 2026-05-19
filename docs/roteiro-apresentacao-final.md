# Roteiro Final de Apresentacao - SmartGreen

Use este documento como cola principal para apresentar a Release do SmartGreen.
Ele junta Review, Retro, UX/UI, Nielsen, Jira, SOLID, ISP, Strategy e o papel do
Tech Lead/time.

## 1. Abertura

### O que mostrar

- Nome do projeto.
- Repositorio ou tela inicial do sistema.
- URL publicada na Vercel, se ja estiver disponivel.

### Fala pronta

> Nosso projeto se chama SmartGreen. Ele e uma solucao web para monitoramento
> inteligente de fluxo de veiculos em cruzamentos urbanos. A ideia e permitir
> que um usuario acompanhe o fluxo das vias e veja o status atual dos semaforos
> em um painel simples, funcional e facil de testar.

> Nesta Release, vamos apresentar as entregas da Sprint 1 e da Sprint 2, mostrar
> a solucao funcionando, explicar as melhorias de UX/UI com as heuristicas de
> Nielsen e, no final, abordar as refatoracoes tecnicas feitas com SOLID, ISP e
> Strategy.

## 2. Contexto das Sprints

### O que mostrar

- Jira com as Sprints.
- Cards da Sprint 1.
- Cards da Sprint 2.

### Fala pronta

> A Sprint 1 foi responsavel pela base do sistema. Nela, a equipe trabalhou em
> login, cadastro, integracao entre frontend e backend, persistencia de usuarios
> no banco de dados e validacao de credenciais.

> A Sprint 2 foi responsavel por evoluir o MVP funcional. Nela entraram os
> requisitos RF1 e RF3. O RF1 e monitorar o fluxo de veiculos nas vias do
> cruzamento. O RF3 e exibir o status atual de cada semaforo no painel.

### Resumo para falar

| Sprint | Entregas principais |
| --- | --- |
| Sprint 1 | Login, cadastro, API, banco de dados, autenticacao e integracao front/back. |
| Sprint 2 | RF1, RF3, Menu SmartGreen, simulacao de fluxo, UX/UI, ISP e Strategy. |

## 3. Review da Release

### Objetivo

Mostrar a solucao hospedada e os requisitos implementados.

### O que mostrar

1. Abrir a URL do sistema.
2. Mostrar tela de login.
3. Fazer login.
4. Entrar no Menu SmartGreen.
5. Mostrar status dos semaforos.
6. Mostrar fluxo de veiculos por via.
7. Clicar em **Atualizar**.
8. Mostrar que os dados mudam e continuam com limite maximo de 20 veiculos.
9. Clicar em **Sair** e mostrar confirmacao.

### Fala pronta

> Agora vamos fazer a Review da Release. A solucao esta hospedada para que
> usuarios finais possam acessar e testar o MVP. O fluxo comeca na tela de
> login. Depois que o usuario entra, ele acessa o Menu SmartGreen.

> No topo do painel, mostramos o status atual dos semaforos. Essa parte atende
> ao RF3 da Sprint 2. Em seguida, mostramos os dados de fluxo das vias, com a
> quantidade de veiculos em cada via monitorada. Essa parte atende ao RF1 da
> Sprint 2.

> O botao Atualizar simula uma nova leitura do cruzamento. A simulacao foi
> ajustada para trabalhar com um limite maximo de 20 veiculos, deixando o cenario
> mais realista e mais facil de demonstrar.

### Requisitos para citar

| Requisito | Sprint | Como aparece no sistema |
| --- | --- | --- |
| Login | Sprint 1 | Tela inicial de acesso. |
| Cadastro | Sprint 1 | Alternancia entre entrar e cadastrar. |
| Validacao de credenciais | Sprint 1 | Login integrado ao backend. |
| RF1 - Monitorar fluxo de veiculos | Sprint 2 | Cards com quantidade de veiculos por via. |
| RF3 - Status dos semaforos | Sprint 2 | Secao de status dos semaforos no topo do painel. |
| Simulacao do cruzamento | Sprint 2 | Botao Atualizar e atualizacao automatica. |

## 4. UX/UI com Nielsen, Fitts, Hick e Consistencia

### O que mostrar

- Tela de login.
- Mensagem de validacao.
- Botao de mostrar/ocultar senha.
- Menu SmartGreen.
- Cards de status dos semaforos.
- Cards de fluxo por via.

### Fala pronta

> Para o front-end, aplicamos as 10 heuristicas de Nielsen e outros padroes de
> usabilidade, como Fitts, Hick e consistencia. O objetivo foi deixar a
> interface mais clara, previsivel e facil de usar.

### Como explicar as 10 heuristicas

| Heuristica | Fala curta |
| --- | --- |
| 1. Visibilidade do status do sistema | O sistema mostra carregamento, atualizacao, tempo da proxima leitura e status dos semaforos. |
| 2. Correspondencia com o mundo real | Usamos termos do dominio real: cruzamento, via, semaforo, veiculos, fluxo e prioridade. |
| 3. Controle e liberdade do usuario | O usuario pode atualizar manualmente, tentar novamente em erro e confirmar antes de sair. |
| 4. Consistencia e padroes | Os botoes, cards, cores, icones e secoes seguem o mesmo padrao visual. |
| 5. Prevencao de erros | O formulario valida e-mail, senha e nome antes de enviar. |
| 6. Reconhecimento em vez de memorizacao | Os dados aparecem diretamente nos cards, sem o usuario precisar memorizar informacoes. |
| 7. Flexibilidade e eficiencia | O painel atualiza automaticamente e tambem permite atualizacao manual. |
| 8. Design estetico e minimalista | A tela foi organizada em blocos claros: semaforos, resumo e fluxo das vias. |
| 9. Reconhecimento e recuperacao de erros | Erros aparecem em alertas e oferecem acao de tentar novamente. |
| 10. Ajuda e documentacao | Criamos documentos de requisitos, deploy, UX/UI, SOLID e roteiro da Release. |

### Fitts, Hick e Consistencia

> Pela Lei de Fitts, os botoes principais possuem tamanho adequado e ficam em
> areas faceis de acessar. Pela Lei de Hick, reduzimos a quantidade de decisoes
> na tela, deixando poucas acoes principais: atualizar e sair. Pela consistencia,
> usamos o mesmo padrao visual em botoes, cards e cores. Verde representa via
> liberada, vermelho representa via bloqueada e amarelo representa transicao.

## 5. Retro da Release

### Objetivo

Mostrar licoes aprendidas, metricas e organizacao da equipe.

### O que mostrar no Jira

- Board da Sprint 1.
- Board da Sprint 2.
- Burndown.
- Burnup.
- Cards concluidos.
- Pontos de historia.
- Velocidade dos cards.

### Fala pronta

> Na Retro da Release, usamos o Jira para analisar a produtividade e a
> previsibilidade da equipe. Observamos os cards planejados, os cards concluidos,
> os pontos de historia e os graficos de burndown e burnup.

> O burndown mostra a reducao do trabalho restante ao longo da Sprint. O burnup
> mostra o crescimento do trabalho concluido e tambem ajuda a visualizar aumento
> de escopo. A velocidade dos cards mostra a capacidade da equipe em concluir
> tarefas dentro da Sprint.

### Como falar dos pontos

Preencha com os dados reais do Jira:

| Sprint | Pontos planejados | Pontos entregues | Cards concluidos |
| --- | ---: | ---: | ---: |
| Sprint 1 | preencher | preencher | preencher |
| Sprint 2 | preencher | preencher | preencher |

### Fala para previsibilidade

> A previsibilidade foi avaliada comparando o que foi planejado com o que foi
> entregue. Tambem avaliamos se a Sprint 2 manteve ou aumentou os requisitos em
> relacao a Sprint 1. Como a Sprint 2 adicionou RF1, RF3, melhorias de UX/UI e
> refatoracoes tecnicas, ela representa uma evolucao do MVP construido na Sprint
> 1.

## 6. SWOT

### O que mostrar

- Pode mostrar este quadro ou falar diretamente.

| SWOT | Pontos para explicar |
| --- | --- |
| Forcas | A equipe integrou frontend, backend, banco, autenticacao e painel funcional. |
| Fraquezas | Houve mudancas de escopo e retrabalho durante a evolucao da entrega. |
| Oportunidades | O sistema pode evoluir para sensores reais, historico, relatorios e alertas. |
| Ameacas | Servicos gratuitos de hospedagem e API podem ter instabilidade ou limitacoes. |

### Fala pronta

> Como forca, conseguimos entregar uma solucao funcional integrada. Como
> fraqueza, tivemos retrabalho por mudancas de escopo. Como oportunidade, o
> SmartGreen pode evoluir para uso com sensores reais, historico e relatorios.
> Como ameaca, temos dependencia de servicos externos de hospedagem e possiveis
> limitacoes de ambiente.

## 7. Tech Lead, Time, SOLID, ISP e Strategy

### O que mostrar

- Arquivo `frontend/servicos/interfaces/cliente-autenticacao.ts`.
- Arquivo `frontend/servicos/interfaces/cliente-trafego.ts`.
- Arquivo `backend/src/trafego/engenharia-trafego.ts`.
- Documento `docs/tech-lead-solid-strategy-ux-ui.md`.
- Diagramas em `docs/diagramas/diagramas-sprint-2.md`.

### Fala pronta

> No final da Retro, tambem precisamos explicar o papel de Tech Lead e time nas
> refatoracoes. Como Tech Lead, a decisao foi organizar a Release em duas
> frentes: entregar os requisitos funcionais e reduzir o acoplamento do codigo.

> Na Sprint 1, a equipe construiu a base: login, cadastro, backend, banco e
> integracao. Na Sprint 2, alem de RF1 e RF3, fizemos melhorias de UX/UI e
> refatoracoes tecnicas.

### ISP

> Aplicamos ISP, que e o Interface Segregation Principle. Antes, uma interface
> podia concentrar mais de uma responsabilidade. Depois, separamos em contratos
> menores. O login usa `ClienteEntradaAutenticacao`, o cadastro usa
> `ClienteCadastroAutenticacao`, a leitura do painel usa `ClienteConsultaTrafego`
> e a atualizacao usa `ClienteSimulacaoTrafego`.

> Isso evita que uma parte do sistema dependa de metodos que nao utiliza. Ou
> seja, cada fluxo conhece apenas o contrato necessario.

### Strategy

> Tambem aplicamos Strategy Pattern no backend. A simulacao de trafego tem
> comportamentos diferentes para uma via aberta e uma via fechada. A via aberta
> tende a reduzir a fila, enquanto a via fechada tende a acumular veiculos.

> Para organizar isso, criamos estrategias separadas: `EstrategiaViaAberta` e
> `EstrategiaViaFechada`. Assim, se no futuro existir uma nova regra, como uma
> via em emergencia ou manutencao, podemos criar uma nova estrategia sem
> misturar tudo no mesmo metodo.

### UX/UI Strategy

> A estrategia de UX/UI foi organizar a tela conforme a prioridade do usuario.
> Primeiro mostramos o status dos semaforos, depois a visao geral do sistema e,
> por ultimo, o fluxo detalhado por via. Isso reduz a carga cognitiva e facilita
> a leitura durante o teste.

## 8. Fechamento

### Fala pronta

> Concluindo, a Release entrega um MVP funcional e testavel. A Sprint 1 criou a
> base de acesso e integracao. A Sprint 2 entregou RF1 e RF3, melhorou a
> experiencia do usuario com Nielsen, Fitts, Hick e consistencia, e tambem
> trouxe refatoracoes tecnicas com ISP e Strategy.

> Dessa forma, o SmartGreen nao e apenas uma tela funcional. Ele tambem tem uma
> estrutura mais organizada, uma interface mais clara e uma base tecnica mais
> preparada para evoluir nas proximas Sprints.

## Checklist antes de gravar

- [ ] Abrir sistema publicado ou local.
- [ ] Testar login.
- [ ] Testar Menu SmartGreen.
- [ ] Clicar em Atualizar.
- [ ] Conferir status dos semaforos.
- [ ] Conferir fluxo de veiculos por via.
- [ ] Abrir Jira com Sprint 1 e Sprint 2.
- [ ] Conferir burndown e burnup.
- [ ] Conferir pontos de historia.
- [ ] Conferir cards concluidos.
- [ ] Abrir arquivos/docs de apoio se quiser mostrar codigo.
- [ ] Encerrar falando de ISP, Strategy e UX/UI.
