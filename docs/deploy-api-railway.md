# Deploy da API e Banco no Railway

O frontend pode ficar na Vercel, mas o MVP so funciona para usuarios finais se a
API NestJS e o MySQL tambem estiverem publicos. Um caminho simples e usar
Railway para hospedar `backend` + MySQL.

## 1. Criar projeto no Railway

1. Acesse `https://railway.com`.
2. Crie um novo projeto.
3. Adicione um servico **MySQL**.
4. Adicione um servico a partir do GitHub usando o repositorio
   `RafaAmorim-stack/smartgreen-ai`.
5. No servico da API, configure o **Root Directory** como:

```text
backend
```

## 2. Comandos do servico da API

Configure:

```text
Build Command: npm ci && npm run build
Start Command: npm run deploy:start
```

O `deploy:start` executa as migrations de producao e inicia a API.

## 3. Variaveis de ambiente da API

No servico da API, configure:

```text
DATABASE_URL=${{MySQL.MYSQL_URL}}
JWT_SECRET=troque-por-uma-chave-grande-e-segura
CORS_ORIGINS=https://seu-frontend.vercel.app
```

Depois que a Vercel gerar a URL real do frontend, volte no Railway e substitua
`https://seu-frontend.vercel.app` pela URL final.

## 4. Gerar dominio publico da API

No servico da API, abra **Settings > Networking** e gere um dominio publico.
Ele sera parecido com:

```text
https://smartgreen-api-production.up.railway.app
```

Teste:

```text
https://smartgreen-api-production.up.railway.app/api/saude
https://smartgreen-api-production.up.railway.app/api/docs
```

## 5. Popular dados iniciais

Depois do primeiro deploy e das migrations, execute uma vez no Railway:

```bash
npm run prisma:seed
```

Esse seed cria ou atualiza o usuario de demonstracao, as vias e o semaforo
inicial sem apagar dados existentes.

Credenciais de demonstracao:

```text
E-mail: professor@smartgreen.ai
Senha: smartgreen123
```

## 6. Atualizar variaveis da Vercel

Na Vercel, abra o projeto do frontend e configure:

```text
NEXT_PUBLIC_API_URL=https://smartgreen-api-production.up.railway.app/api
NEXT_PUBLIC_API_DOCS_URL=https://smartgreen-api-production.up.railway.app/api/docs
NEXT_PUBLIC_MVP_URL=/sistema
NEXT_PUBLIC_FORMULARIO_VALIDACAO_URL=https://docs.google.com/forms/d/e/1FAIpQLSfsX2KAt-usKDsvfRZ2zAClX_Sa9IzO31eJCtXft-KeTLkujQ/viewform?usp=header
```

Depois clique em **Redeploy** na Vercel.

## 7. Checklist final

- Tela de login abre em `/`
- Login ou cadastro abre `/sistema`
- Secao de status dos semaforos aparece no topo
- Painel `/sistema` carrega vias e semaforo
- Swagger abre em `/api/docs`
- Saude da API abre em `/api/saude`
