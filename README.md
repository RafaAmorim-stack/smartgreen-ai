# SmartGreen AI

Aplicação acadêmica completa para controle inteligente de semáforos em um cruzamento de quatro vias. O sistema monitora o fluxo de veículos, identifica a via com maior volume e aplica prioridade semafórica em tempo real.

## Tecnologias

- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: NestJS + TypeScript
- Banco de dados: MySQL
- ORM: Prisma

## Estrutura do projeto

```text
SmartGreen/
|-- backend/
|   |-- prisma/
|   |   |-- schema.prisma
|   |   `-- seed.ts
|   |-- src/
|   |   |-- auth/
|   |   |   |-- dto/login.dto.ts
|   |   |   |-- interfaces/jwt-payload.interface.ts
|   |   |   |-- auth.controller.ts
|   |   |   |-- auth.module.ts
|   |   |   `-- auth.service.ts
|   |   |-- common/
|   |   |   `-- guards/jwt-auth.guard.ts
|   |   |-- prisma/
|   |   |   |-- prisma.module.ts
|   |   |   `-- prisma.service.ts
|   |   |-- traffic/
|   |   |   |-- traffic.controller.ts
|   |   |   |-- traffic.module.ts
|   |   |   |-- traffic.service.ts
|   |   |   `-- traffic.types.ts
|   |   |-- app.module.ts
|   |   `-- main.ts
|   |-- .env.example
|   |-- nest-cli.json
|   |-- package.json
|   |-- tsconfig.build.json
|   `-- tsconfig.json
|-- frontend/
|   |-- app/
|   |   |-- sistema/page.tsx
|   |   |-- globals.css
|   |   |-- layout.tsx
|   |   `-- page.tsx
|   |-- components/
|   |   |-- auth/login-form.tsx
|   |   `-- system/
|   |       |-- intersection-view.tsx
|   |       |-- lane-card.tsx
|   |       |-- system-shell.tsx
|   |       `-- system-summary.tsx
|   |-- lib/
|   |   |-- api.ts
|   |   `-- auth-storage.ts
|   |-- types/traffic.ts
|   |-- .env.example
|   |-- next-env.d.ts
|   |-- next.config.ts
|   |-- package.json
|   |-- postcss.config.js
|   |-- tailwind.config.ts
|   `-- tsconfig.json
|-- .gitignore
|-- docker-compose.yml
`-- README.md
```

## Arquivos principais criados

- `frontend/app/page.tsx`: página de login.
- `frontend/app/sistema/page.tsx`: tela principal do sistema.
- `frontend/components/system/intersection-view.tsx`: visualização do cruzamento de quatro vias.
- `frontend/components/system/system-shell.tsx`: integração da tela principal com a API.
- `backend/src/auth/*`: autenticação e emissão de token JWT.
- `backend/src/traffic/*`: leitura do tráfego, simulação e priorização semafórica.
- `backend/prisma/schema.prisma`: modelagem do banco de dados.
- `backend/prisma/seed.ts`: dados de demonstração.
- `docker-compose.yml`: MySQL pronto para subir localmente.

## Configuração do MySQL

### Opção recomendada com Docker

Na raiz do projeto:

```bash
docker compose up -d mysql
```

O banco será iniciado com:

- Banco: `smartgreen_ai`
- Usuário: `smartgreen`
- Senha: `smartgreen`
- Usuário root: `root`
- Senha root: `root`
- Porta: `3306`

### String de conexão esperada

Use esta URL no backend:

```env
DATABASE_URL=mysql://smartgreen:smartgreen@localhost:3306/smartgreen_ai
```

## Como rodar o backend

1. Acesse a pasta `backend`.
2. Copie `.env.example` para `.env`.
3. Instale as dependências:

```bash
npm install
```

4. Gere o cliente Prisma:

```bash
npm run prisma:generate
```

5. Crie as tabelas no MySQL:

```bash
npm run prisma:migrate -- --name init
```

6. Popule os dados de demonstração:

```bash
npm run prisma:seed
```

7. Inicie a API:

```bash
npm run start:dev
```

O backend ficará disponível em `http://localhost:4000/api`.

## Como rodar o frontend

1. Acesse a pasta `frontend`.
2. Copie `.env.example` para `.env.local`.
3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor:

```bash
npm run dev
```

O frontend ficará disponível em `http://localhost:3000`.

## Credenciais de demonstração

- E-mail: `professor@smartgreen.ai`
- Senha: `smartgreen123`

## Rotas principais da API

- `POST /api/auth/login`
- `GET /api/traffic-control/overview`
- `POST /api/traffic-control/simulate`

## Entidades do banco

- `User`
- `Lane`
- `TrafficFlowReading`
- `TrafficLight`

## Como funciona a lógica de prioridade

1. O backend mantém as quatro vias cadastradas.
2. A cada simulação, o sistema gera um novo volume de veículos para cada via.
3. A via com maior quantidade de veículos recebe prioridade.
4. Em caso de empate, a prioridade vai para a via que ficou mais tempo sem ser priorizada.
5. A via prioritária recebe `GREEN` e as demais recebem `RED`.
6. O semáforo central atualiza a mensagem de status e o tempo do ciclo conforme o volume detectado.

## Experiência da interface

- Tela de login com autenticação via API.
- Tela principal com menu superior, cruzamento visual e atualização automática.
- Destaque visual para a via priorizada.
- Status atual do semáforo e volume por via.
- Botão para simular novos dados em tempo real.

## Observações finais

- Todos os textos visíveis da interface estão em português.
- Os nomes técnicos no código foram mantidos em inglês para facilitar manutenção.
- O projeto está pronto para demonstração local acadêmica com dados simulados.
