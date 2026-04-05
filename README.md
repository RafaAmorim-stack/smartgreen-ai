# SmartGreen

Projeto academico da Sprint 1 focado em autenticacao de usuarios para o sistema SmartGreen.

## Escopo da Sprint 1

- Tela de login
- Tela de cadastro
- Integracao frontend + backend
- Persistencia de usuarios no banco de dados
- Validacao de credenciais

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
- `frontend/app/layout.tsx`
- `frontend/app/globals.css`
- `frontend/components/autenticacao/formulario-acesso.tsx`
- `frontend/components/autenticacao/palco-controle-urbano.tsx`

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
