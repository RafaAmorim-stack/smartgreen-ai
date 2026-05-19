# SmartGreen

Projeto academico do SmartGreen AI, uma solucao web para validacao e
monitoramento inteligente de fluxo em cruzamentos urbanos.

## Escopo da Sprint 1

- Tela de login
- Tela de cadastro
- Integracao frontend + backend
- Persistencia de usuarios no banco de dados
- Validacao de credenciais
- Painel MVP de monitoramento de fluxo de veiculos

## Escopo da Sprint 2

- RF1: monitorar o fluxo de veiculos nas vias do cruzamento
- RF3: exibir o status atual de cada semaforo no painel
- Tela de login como entrada principal do aplicativo
- Menu principal com status dos semaforos no topo
- Simulacao de atualizacao do fluxo e da prioridade semaforica

## Tecnologias

- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: NestJS + TypeScript
- Banco de dados: MySQL
- ORM: Prisma

## Estrutura do projeto

```text
SmartGreen/
|-- backend/
|-- frontend/
|-- docker-compose.yml
|-- .gitignore
`-- README.md
```

## Backend

Principais arquivos:

- `backend/src/autenticacao/autenticacao.controller.ts`
- `backend/src/autenticacao/autenticacao.service.ts`
- `backend/src/autenticacao/autenticacao.module.ts`
- `backend/src/autenticacao/dto/cadastrar.dto.ts`
- `backend/src/autenticacao/dto/entrar.dto.ts`
- `backend/src/trafego/trafego.controller.ts`
- `backend/src/trafego/trafego.service.ts`
- `backend/src/trafego/engenharia-trafego.ts`
- `backend/prisma/schema.prisma`
- `backend/prisma/seed.ts`

Rotas principais:

- `POST /api/autenticacao/cadastrar`
- `POST /api/autenticacao/entrar`
- `GET /api/controle-trafego/visao-geral`
- `POST /api/controle-trafego/simular`

## Frontend

Principais arquivos:

- `frontend/app/page.tsx`
- `frontend/app/acesso/page.tsx`
- `frontend/app/layout.tsx`
- `frontend/app/globals.css`
- `frontend/components/autenticacao/formulario-acesso.tsx`
- `frontend/components/autenticacao/palco-controle-urbano.tsx`
- `frontend/components/sistema/painel-sistema.tsx`
- `frontend/components/sistema/status-semaforos.tsx`
- `frontend/components/sistema/visao-cruzamento.tsx`

Rotas principais:

- `/`: tela de login e cadastro
- `/sistema`: menu principal autenticado com RF1 e RF3
- `/acesso`: rota alternativa de login e cadastro

Variaveis publicas relevantes:

- `NEXT_PUBLIC_API_URL`: URL base da API
- `NEXT_PUBLIC_API_DOCS_URL`: URL da documentacao Swagger
- `NEXT_PUBLIC_MVP_URL`: URL de acesso ao MVP funcional
- `NEXT_PUBLIC_FORMULARIO_VALIDACAO_URL`: link publico do Google Forms

Checklist para entrega publicada:

- Publicar o aplicativo/frontend em Vercel ou GitHub Pages
- Publicar o backend/API e o banco em um ambiente acessivel pela internet
- Configurar `NEXT_PUBLIC_API_URL` com a URL publica da API
- Configurar `NEXT_PUBLIC_MVP_URL` com a URL publica da rota de acesso ao MVP
- Criar/publicar o Google Forms e configurar `NEXT_PUBLIC_FORMULARIO_VALIDACAO_URL`
- Testar o fluxo: login -> menu principal -> status dos semaforos -> fluxo de veiculos

## Banco de dados

Entidades principais:

- `User`
- `Lane`
- `TrafficFlowReading`
- `TrafficLight`

Campos:

- `id`
- `name`
- `email`
- `passwordHash`
- `createdAt`
- `updatedAt`

## Como rodar o backend

1. Entre na pasta `backend`
2. Copie `.env.example` para `.env`
3. Configure a conexao com o MySQL
4. Rode:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run start:dev
```

Backend disponivel em:

```text
http://localhost:4000/api
```

## Como rodar o frontend

1. Entre na pasta `frontend`
2. Copie `.env.example` para `.env.local`
3. Rode:

```bash
npm install
npm run dev
```

Frontend disponivel em:

```text
http://localhost:3000
```

## Credenciais de demonstracao

- E-mail: `professor@smartgreen.ai`
- Senha: `smartgreen123`

## Observacoes

- Todos os textos visiveis da interface estao em portugues
- O backend segue estrutura orientada a objetos com classes, modulos, controllers e services
- O frontend foi organizado em componentes reutilizaveis
- O roteiro do formulario de validacao esta em `docs/formulario-validacao-smartgreen.md`
- O script de apoio para criar o Google Forms esta em `docs/google-forms-validacao-smartgreen.gs`
- Os diagramas da Sprint 2 estao em `docs/diagramas/diagramas-sprint-2.md`
- O passo a passo de deploy do frontend na Vercel esta em `docs/deploy-vercel.md`
- O passo a passo de deploy da API e banco no Railway esta em `docs/deploy-api-railway.md`
- A documentacao da Sprint 2 esta em `docs/sprint-2-rf1-rf3.md`
- O mapeamento de usabilidade e Nielsen esta em `docs/usabilidade-nielsen.md`
- O roteiro de Review/Retro da Release esta em `docs/release-review-retro.md`
- O exemplo aplicado de ISP do SOLID esta em `docs/solid-interface-segregation.html`
- O roteiro de Tech Lead, SOLID, Strategy e UX/UI esta em `docs/tech-lead-solid-strategy-ux-ui.md`
- O roteiro final para apresentar esta em `docs/roteiro-apresentacao-final.md`
- O script adaptado para Review/Retro da Sprint 2 esta em `docs/script-apresentacao-sprint-2.md`
