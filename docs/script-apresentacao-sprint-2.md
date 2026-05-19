# Script de Apresentacao - Sprint 2 / Release SmartGreen

Este roteiro adapta o script anterior da Sprint 1 para a **Sprint 2**, com foco
em RF1, RF3, Review, Retrospectiva, UX/UI, Nielsen, Jira, SOLID, ISP e Strategy.

Onde aparecer **[PREENCHER]**, substitua pelos dados reais do Jira da Sprint 2.

---

# PARTE 1 - REVIEW DA SPRINT 2 / RELEASE

## Abertura

**Beatriz:**

"Ola, pessoal. Vamos comecar a Review da Sprint 2 do projeto SmartGreen.
Eu sou a Beatriz, Product Owner, e comigo estao o Matheus, nosso Scrum Master,
o Rafael, que atuou no desenvolvimento back-end, banco de dados e refatoracoes
tecnicas, e a Anna, que ficou no front-end, experiencia do usuario e prototipo
visual.

Hoje a ideia e mostrar a evolucao do SmartGreen na Sprint 2, destacando os
requisitos RF1 e RF3, a solucao funcional, as melhorias de UX/UI e as
refatoracoes aplicadas na Release."

## Contexto da Sprint 2

**Beatriz:**

"Na Sprint 1, a equipe construiu a base do sistema: login, cadastro, integracao
entre front-end e back-end, persistencia de usuarios e validacao de credenciais.

Na Sprint 2, o foco foi evoluir o MVP para o funcionamento principal do
SmartGreen. Os requisitos centrais foram o RF1 e o RF3.

O RF1 corresponde ao monitoramento do fluxo de veiculos nas vias do cruzamento.
O RF3 corresponde a exibicao do status atual de cada semaforo no painel.

Entao, nesta Sprint, o objetivo deixou de ser apenas autenticar o usuario e
passou a ser entregar o painel funcional do SmartGreen, permitindo que o usuario
acesse o sistema, acompanhe os semaforos e teste a simulacao de trafego."

## Planejamento dos requisitos

**Beatriz:**

"Agora eu vou mostrar rapidamente como organizamos o planejamento da Sprint 2.
Nos usamos o Product Backlog para registrar os requisitos funcionais e nao
funcionais do SmartGreen, mantendo a rastreabilidade das entregas no Jira.

Os requisitos principais desta Sprint foram:

RF1: monitorar o fluxo de veiculos nas vias do cruzamento.
RF3: exibir o status atual de cada semaforo no painel.

Alem disso, entraram tarefas tecnicas e de qualidade, como melhoria de UX/UI
com base nas heuristicas de Nielsen, ajustes de simulacao, refatoracao com SOLID
e aplicacao de Strategy no back-end.

Ao todo, planejamos [PREENCHER] tickets no Jira do PO, considerando itens de
produto, tarefas tecnicas, documentacao e validacao da Release."

**Tela:** mostrar Product Backlog, requisitos RF1/RF3 e planejamento da Sprint 2.

## Jira do PO e Sprint Backlog

**Beatriz:**

"Aqui no Jira do PO da para ver o Sprint Backlog da Sprint 2.
Tivemos tickets ligados diretamente aos requisitos RF1 e RF3, alem de tarefas
relacionadas a UX/UI, deploy, documentacao e refatoracao tecnica.

Na Sprint 2, concluimos [PREENCHER] pontos de historia no Jira do PO.
Diferente da Sprint 1, que focou na base de autenticacao, a Sprint 2 aumentou o
valor entregue ao usuario final, porque trouxe a funcionalidade principal do
SmartGreen: o acompanhamento do fluxo de veiculos e o status dos semaforos."

**Beatriz:**

"O grafico de burnup e burndown da Sprint 2 mostra como o escopo evoluiu durante
o ciclo. Se houve aumento de escopo, conseguimos observar isso no burnup. Ja no
burndown, acompanhamos a reducao do trabalho restante ao longo da Sprint.

O ponto mais importante e que a Sprint 2 manteve a evolucao em relacao a Sprint
1, pois alem de funcionalidades novas, tambem entregamos melhorias de usabilidade
e refatoracoes tecnicas para sustentar a evolucao do projeto."

**Tela:** mostrar Jira do PO, quadro Kanban, Burndown e Burnup da Sprint 2.

## Demonstracao do sistema

**Anna:**

"Agora vou mostrar a parte visual e funcional do sistema.
O usuario acessa a tela inicial, realiza login ou cadastro e, depois da
autenticacao, entra no Menu SmartGreen.

No Menu SmartGreen, organizamos a tela para que o usuario veja primeiro o status
dos semaforos e, em seguida, o fluxo de veiculos nas vias monitoradas.
Essa ordem foi pensada para facilitar a leitura e reduzir a carga cognitiva."

**Tela:** mostrar login, cadastro e Menu SmartGreen.

**Anna:**

"No topo do painel, temos a secao de status dos semaforos. Aqui atendemos ao
RF3, mostrando o estado atual de cada semaforo, quais vias estao liberadas,
quais estao aguardando e qual e o tempo de verde do ciclo.

Logo abaixo, temos a visao geral do sistema e os cards de fluxo por via. Aqui
atendemos ao RF1, mostrando a quantidade atual de veiculos em cada via do
cruzamento."

**Tela:** mostrar secao Status dos Semaforos e cards de fluxo.

**Anna:**

"Tambem temos o botao Atualizar, que permite simular uma nova leitura do
cruzamento. A simulacao foi ajustada para trabalhar com no maximo 20 veiculos,
deixando a demonstracao mais controlada e coerente."

**Tela:** clicar em Atualizar e mostrar mudanca dos dados.

## UX/UI com Nielsen, Fitts, Hick e Consistencia

**Anna:**

"Na Sprint 2, tambem melhoramos a UX e UI do front-end com base nas 10
heuristicas de Nielsen e em padroes como Fitts, Hick e consistencia visual.

Aplicamos visibilidade do status do sistema mostrando carregamento, atualizacao,
tempo da proxima leitura e status dos semaforos.

Aplicamos correspondencia com o mundo real usando termos do dominio, como via,
cruzamento, semaforo, fluxo, veiculos e prioridade.

Aplicamos prevencao de erros no formulario de login e cadastro, validando e-mail,
senha e nome antes do envio.

Aplicamos reconhecimento em vez de memorizacao, porque os dados aparecem
diretamente nos cards, com rotulos, cores e indicadores visuais.

E aplicamos design minimalista, organizando a interface em blocos claros:
status dos semaforos, visao geral e fluxo das vias."

**Anna:**

"Pela Lei de Fitts, os botoes principais possuem area de clique adequada.
Pela Lei de Hick, reduzimos a quantidade de decisoes na tela, deixando poucas
acoes principais.
E pela consistencia, mantivemos o mesmo padrao de botoes, cards, cores e icones
em toda a aplicacao."

**Tela:** mostrar login validado, botao mostrar/ocultar senha, cards e botoes.

## Swagger - API da Sprint 2

**Rafael:**

"O Swagger foi utilizado no back-end para documentar e testar a API.
Na Sprint 1, ele foi usado principalmente nas rotas de autenticacao, como
cadastro e login.

Na Sprint 2, o Swagger tambem passou a apoiar as rotas de controle de trafego,
que sao as rotas usadas pelo painel funcional do SmartGreen."

**Rafael:**

"As principais rotas da Sprint 2 sao:

GET /api/controle-trafego/visao-geral, que retorna a visao atual do cruzamento,
incluindo vias, quantidade de veiculos e status dos semaforos.

POST /api/controle-trafego/simular, que executa uma nova simulacao do fluxo de
veiculos e atualiza o estado operacional do cruzamento.

Essas rotas sao protegidas por autenticacao JWT, garantindo que apenas usuarios
autenticados acessem o painel funcional."

**Tela:** mostrar Swagger com rotas de autenticacao e controle de trafego.

## Modelo de dados e CRUD do SmartGreen

**Rafael:**

"Na Sprint 1, o CRUD principal estava relacionado a entidade Usuario, com
cadastro, consulta, atualizacao e remocao de usuarios.

Na Sprint 2, o dominio do sistema foi expandido para representar o funcionamento
do cruzamento. Passamos a trabalhar tambem com entidades relacionadas ao trafego,
como Via, Semaforo e Leituras de Fluxo."

**Rafael:**

"A entidade Usuario continua sendo importante para autenticacao.
Mas agora tambem temos:

Via, que representa uma via monitorada do cruzamento.
Semaforo, que representa o controle semaforico atual.
Leitura de Fluxo, que registra a quantidade de veiculos em cada simulacao.

Com isso, o SmartGreen passa a ter uma base de dados mais conectada ao problema
real que queremos resolver."

**Exemplo de entidades:**

**Usuario**

- id
- name
- email
- passwordHash
- createdAt
- updatedAt

**Via**

- id
- key
- name
- description
- currentVehicleCount
- signalColor
- lastPriorityAt

**Semaforo**

- id
- name
- mode
- statusText
- cycleSeconds
- currentPriorityLaneId
- updatedAt

**Leitura de fluxo**

- id
- laneId
- vehicleCount
- recordedAt

## Menu SmartGreen

**Matheus:**

"Na Sprint 2, a tela principal deixou de ser uma landing page e passou a ser o
aplicativo funcional em si.

O Menu SmartGreen e a tela principal apos o login. Ele permite que o usuario
acompanhe os semaforos, veja o fluxo de veiculos e teste a simulacao do
cruzamento.

Essa decisao foi importante porque o objetivo da entrega era permitir que o
usuario final testasse uma versao funcional do produto, e nao apenas uma pagina
de apresentacao."

**Tela:** mostrar Menu SmartGreen.

## SOLID, ISP e Strategy

**Rafael:**

"Na Sprint 2, tambem fizemos melhorias tecnicas no codigo.
Aplicamos o principio ISP do SOLID, que significa Interface Segregation
Principle.

A ideia do ISP e evitar que uma parte do sistema dependa de metodos que ela nao
utiliza. Por isso, no front-end, separamos interfaces maiores em contratos
menores."

**Rafael:**

"Na autenticacao, separamos:

ClienteEntradaAutenticacao, usado para login.
ClienteCadastroAutenticacao, usado para cadastro.

No trafego, separamos:

ClienteConsultaTrafego, usado para buscar a visao geral do painel.
ClienteSimulacaoTrafego, usado para executar a simulacao.

Com isso, cada fluxo depende apenas da interface que realmente precisa."

**Rafael:**

"Tambem aplicamos Strategy Pattern no back-end, dentro da engenharia de trafego.
A simulacao de uma via aberta e diferente da simulacao de uma via fechada.

Quando a via esta aberta, a tendencia e reduzir a fila.
Quando a via esta fechada, a tendencia e acumular veiculos.

Para organizar isso, criamos estrategias separadas: EstrategiaViaAberta e
EstrategiaViaFechada.

Assim, se no futuro tivermos uma nova regra, como via em manutencao ou prioridade
para emergencia, podemos criar uma nova estrategia sem misturar todas as regras
no mesmo metodo."

**Tela:** mostrar arquivos de interfaces e `backend/src/trafego/engenharia-trafego.ts`.

## Encerramento da Review

**Beatriz:**

"Entao, na Sprint 2, conseguimos evoluir o SmartGreen de uma base de
autenticacao para um MVP funcional de monitoramento.

Entregamos RF1, RF3, melhorias de UX/UI, simulacao de trafego, documentacao da
API e refatoracoes tecnicas com SOLID e Strategy.

Agora vamos para a Retrospectiva, olhando mais para o processo da equipe, as
metricas do Jira e os aprendizados da Sprint."

---

# PARTE 2 - RETROSPECTIVA DA SPRINT 2 / RELEASE

## Abertura

**Beatriz:**

"Agora vamos iniciar a Retrospectiva da Sprint 2.
Aqui a ideia e refletir sobre como a Sprint aconteceu: o que funcionou bem, o
que atrapalhou, quais riscos apareceram, quais metricas analisamos e como a
equipe evoluiu em relacao a Sprint 1."

## Fluxo de trabalho

**Matheus:**

"Vou mostrar o Jira do Scrum Master com o fluxo de trabalho que usamos na Sprint
2.

Nosso processo foi dividido em etapas como Backlog, Desenvolvimento, Revisao de
codigo, Pull Request, Testes, Merge e Producao.

Esse fluxo ajudou a dar visibilidade do andamento das tarefas e tambem a
identificar gargalos."

## Etapas do fluxo

**Matheus:**

"No Backlog, ficaram as tarefas planejadas que ainda nao tinham sido iniciadas.

Em Desenvolvimento, a equipe trabalhou na implementacao das funcionalidades,
como RF1, RF3, ajustes de front-end, back-end e simulacao.

Na Revisao de Codigo, avaliamos qualidade, padroes de implementacao e possiveis
erros.

No Pull Request, o codigo desenvolvido foi preparado para integracao ao projeto.

Na etapa de Testes, validamos se as funcionalidades estavam funcionando de
acordo com o esperado.

Em Merge, consolidamos o codigo aprovado no projeto principal.

E em Producao ficaram as entregas finalizadas da Sprint."

**Tela:** mostrar Jira do Scrum Master.

## Organizacao da equipe

**Matheus:**

"Durante a Sprint 2, organizamos as tasks no Jira e distribuimos as atividades
conforme o papel de cada integrante da equipe.

A Beatriz, como Product Owner, ficou responsavel pela priorizacao dos requisitos,
organizacao do backlog e validacao do valor entregue ao usuario.

Eu atuei como Scrum Master, estruturando o fluxo de trabalho no Jira,
acompanhando o andamento das atividades e ajudando a manter a Sprint organizada.

O Rafael atuou na parte de desenvolvimento back-end, banco, integracao,
simulacao de trafego e refatoracoes tecnicas.

A Anna ficou responsavel pela parte visual, UX/UI, prototipo e organizacao da
experiencia no front-end."

**Matheus:**

"Para estimar o esforco das tarefas, utilizamos story points.
Na Sprint 2, trabalhamos com [PREENCHER] pontos de historia distribuidos em
[PREENCHER] tickets.

Essa organizacao foi importante para acompanhar a evolucao da Sprint e comparar
o desempenho com a Sprint 1."

## Artefatos visuais e UX/UI

**Anna:**

"Agora eu vou mostrar os artefatos visuais e as melhorias de UX/UI.

Na Sprint 2, a interface foi ajustada para destacar o uso real do sistema.
O foco deixou de ser apenas login e cadastro, e passou a ser o painel funcional
do SmartGreen.

Organizamos a tela para que o usuario veja primeiro o status dos semaforos,
depois a visao geral e, por fim, o fluxo por via.

Essa organizacao esta alinhada com as heuristicas de Nielsen e com principios de
usabilidade como Fitts, Hick e consistencia."

**Tela:** mostrar Figma ou tela implementada.

## Stack tecnica

**Rafael:**

"Para o desenvolvimento do SmartGreen, continuamos utilizando uma stack moderna e
bem estruturada.

No front-end, utilizamos Next.js com TypeScript e Tailwind CSS, o que permitiu
criar uma interface responsiva, organizada e componentizada.

No back-end, utilizamos NestJS com TypeScript, garantindo uma arquitetura
escalavel e orientada a boas praticas.

Para o banco de dados, utilizamos MySQL, responsavel por armazenar usuarios,
vias, semaforos e leituras de fluxo.

E utilizamos Prisma como ORM, facilitando a comunicacao entre back-end e banco
de dados."

## Diagramas

**Rafael:**

"Alem da implementacao, tambem representamos a estrutura e o comportamento do
sistema por meio de diagramas.

Na Sprint 1, os diagramas estavam mais focados no fluxo de autenticacao e na
entidade User.

Na Sprint 2, a modelagem passa a considerar tambem o dominio de trafego, com
entidades como Via, Semaforo e Leitura de Fluxo.

Esses diagramas ajudam a visualizar como o sistema evoluiu de uma base de login
para um MVP funcional de monitoramento de cruzamento."

**Tela:** mostrar diagramas ou documentacao.

**Arquivos de apoio:**

- `docs/diagramas/diagramas-sprint-2.md`
- `docs/diagramas/diagrama-classes-sprint-2.mmd`
- `docs/diagramas/diagrama-er-sprint-2.mmd`
- `docs/diagramas/diagrama-estados-sprint-2.mmd`

## Burndown

**Matheus:**

"O grafico de Burndown representa o trabalho restante ao longo da Sprint.

Na Sprint 2, trabalhamos com [PREENCHER] pontos de historia distribuidos em
[PREENCHER] tickets.

Ao longo do desenvolvimento, esse volume foi sendo reduzido ate a conclusao das
entregas planejadas.

O Burndown tambem ajudou a acompanhar o WIP, ou seja, as tarefas em andamento, e
a identificar possiveis impedimentos que poderiam impactar o ritmo das
entregas."

**Tela:** mostrar Burndown da Sprint 2.

## Burnup

**Matheus:**

"Ja o grafico de Burnup mostra a evolucao das entregas realizadas pela equipe ao
longo da Sprint.

Partimos de zero e avancamos ate atingir [PREENCHER] pontos de historia
entregues.

Essa metrica foi importante para visualizar o crescimento das entregas
concluidas e tambem para observar se houve aumento de escopo durante a Sprint."

**Tela:** mostrar Burnup da Sprint 2.

## Velocidade dos Cards

**Matheus:**

"A velocidade dos cards mostra a capacidade da equipe de concluir tarefas dentro
da Sprint.

Na Sprint 1, a equipe entregou a base tecnica do sistema.
Na Sprint 2, a equipe aumentou o valor de produto entregue, porque adicionou RF1,
RF3, melhorias de UX/UI e refatoracoes tecnicas.

Essa comparacao ajuda a avaliar previsibilidade e maturidade do time."

**Tela:** mostrar relatorio de cards ou quadro Jira.

## SWOT

**Beatriz ou Matheus:**

"Vamos usar a abordagem SWOT para organizar a analise da Sprint 2."

**Forcas:**

"Como forca, identificamos que a equipe conseguiu evoluir o projeto para um MVP
funcional, integrando front-end, back-end, banco, autenticacao, painel de
trafego e simulacao."

**Fraquezas:**

"Como fraqueza, tivemos mudancas de escopo e retrabalho, principalmente por
ajustes entre landing page, aplicativo funcional e requisitos da Sprint 2."

**Oportunidades:**

"Como oportunidade, o SmartGreen pode evoluir para dados reais de sensores,
historico de fluxo, alertas, relatorios e um painel administrativo mais
completo."

**Ameacas:**

"Como ameaca, temos dependencia de servicos externos de hospedagem, possiveis
limitacoes de ambiente gratuito e risco de instabilidade na API publica."

**Tela:** mostrar imagem ou quadro SWOT.

## Previsibilidade e auto-organizacao

**Matheus:**

"Em relacao a previsibilidade, avaliamos o que foi planejado e o que foi
entregue na Sprint 2.

A equipe conseguiu manter a evolucao em relacao a Sprint 1, porque alem da base
de autenticacao, agora temos uma funcionalidade central do produto em
funcionamento.

Tambem tivemos auto-organizacao na divisao das tarefas, com cada integrante
atuando em uma frente: produto, processo, desenvolvimento, banco, UX/UI e
documentacao."

## Bloco final - Tech Lead e refatoracao

**Rafael:**

"Como parte final da Retrospectiva, vou explicar as refatoracoes e melhorias
tecnicas da Sprint 2.

Como Tech Lead na parte tecnica, a decisao foi organizar o codigo para reduzir
acoplamento e facilitar a evolucao do sistema.

Aplicamos ISP no front-end, separando interfaces por responsabilidade. Isso
deixa o codigo mais facil de manter e testar.

Tambem aplicamos Strategy no back-end, separando a regra de simulacao de vias
abertas e fechadas.

Essas melhorias foram implementadas na Sprint 2, junto com as melhorias de
UX/UI e os requisitos RF1 e RF3."

## Fechamento da Retrospectiva

**Matheus:**

"Entao, fechando a retrospectiva, a Sprint 2 foi importante para transformar o
SmartGreen em um MVP funcional, com monitoramento de trafego e status dos
semaforos."

**Beatriz:**

"Do ponto de vista de produto, a Sprint 2 agregou valor porque entregou os
requisitos RF1 e RF3, que estao diretamente ligados ao proposito principal do
SmartGreen."

**Rafael:**

"Do ponto de vista tecnico, a Sprint 2 tambem fortaleceu o projeto com
refatoracoes, separacao de responsabilidades, ISP e Strategy."

**Anna:**

"E do ponto de vista de experiencia do usuario, a interface ficou mais clara,
organizada e alinhada com as heuristicas de Nielsen."

**Matheus:**

"Perfeito. Entao encerramos a retrospectiva da Sprint 2 com a conclusao de que o
projeto evoluiu de forma consistente, entregando valor funcional, melhorias de
usabilidade e uma base tecnica mais preparada para as proximas releases.
Obrigado, pessoal."
