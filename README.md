# SmartGreen

Projeto academico da Sprint 1 focado em autenticacao de usuarios para o sistema SmartGreen.

## Escopo da Sprint 1

- Landing page publica para validacao com usuarios finais
- Tela de login
- Tela de cadastro
- Integracao frontend + backend
- Persistencia de usuarios no banco de dados
- Validacao de credenciais
- Painel MVP de monitoramento de fluxo de veiculos

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
- `backend/prisma/schema.prisma`
- `backend/prisma/seed.ts`

Rotas principais:

- `POST /api/autenticacao/cadastrar`
- `POST /api/autenticacao/entrar`

## Frontend

Principais arquivos:

- `frontend/app/page.tsx`
- `frontend/app/acesso/page.tsx`
- `frontend/app/layout.tsx`
- `frontend/app/globals.css`
- `frontend/components/autenticacao/formulario-acesso.tsx`
- `frontend/components/autenticacao/palco-controle-urbano.tsx`
- `frontend/components/sistema/painel-sistema.tsx`

Rotas principais:

- `/`: landing page publica do projeto
- `/acesso`: login e cadastro para testar o MVP
- `/sistema`: painel autenticado de monitoramento de trafego

Variaveis publicas relevantes:

- `NEXT_PUBLIC_API_URL`: URL base da API
- `NEXT_PUBLIC_API_DOCS_URL`: URL da documentacao Swagger
- `NEXT_PUBLIC_MVP_URL`: URL de acesso ao MVP funcional
- `NEXT_PUBLIC_FORMULARIO_VALIDACAO_URL`: link publico do Google Forms

Checklist para entrega publicada:

- Publicar a landing/frontend em Vercel ou GitHub Pages
- Publicar o backend/API e o banco em um ambiente acessivel pela internet
- Configurar `NEXT_PUBLIC_API_URL` com a URL publica da API
- Configurar `NEXT_PUBLIC_MVP_URL` com a URL publica da rota de acesso ao MVP
- Criar/publicar o Google Forms e configurar `NEXT_PUBLIC_FORMULARIO_VALIDACAO_URL`
- Testar o fluxo publico: landing -> MVP -> login/cadastro -> painel -> formulario

## Banco de dados

Entidade principal da Sprint 1:

- `User`

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
- O passo a passo de deploy da landing na Vercel esta em `docs/deploy-vercel.md`
