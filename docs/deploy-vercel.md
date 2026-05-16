# Deploy da Landing Page na Vercel

Este projeto e um monorepo. Na Vercel, publique apenas a pasta `frontend`.

## 1. Antes de publicar

Confirme que as alteracoes estao no GitHub:

```bash
git status
git add .
git commit -m "Prepara landing page para deploy na Vercel"
git push origin codex/sm12-24-TELA_LOGIN
```

Se a branch de producao do repositorio for `main`, abra um pull request e faca
merge antes de importar na Vercel.

## 2. Criar o projeto na Vercel

1. Acesse `https://vercel.com`.
2. Clique em **Add New... > Project**.
3. Importe o repositorio `RafaAmorim-stack/smartgreen-ai`.
4. Em **Root Directory**, selecione:

```text
frontend
```

5. Confira as configuracoes:

```text
Framework Preset: Next.js
Install Command: npm ci
Build Command: npm run build
Output Directory: deixar automatico
```

## 3. Variaveis de ambiente

Configure em **Settings > Environment Variables** para Production e Preview:

```text
NEXT_PUBLIC_API_URL=https://sua-api-publica.com/api
NEXT_PUBLIC_API_DOCS_URL=https://sua-api-publica.com/api/docs
NEXT_PUBLIC_MVP_URL=/acesso
NEXT_PUBLIC_FORMULARIO_VALIDACAO_URL=https://docs.google.com/forms/d/e/1FAIpQLSfsX2KAt-usKDsvfRZ2zAClX_Sa9IzO31eJCtXft-KeTLkujQ/viewform?usp=header
```

Enquanto a API publica nao existir, a landing abre normalmente, mas o login e o
painel funcional nao vao funcionar para usuarios externos. O passo a passo para
publicar a API e o banco esta em `docs/deploy-api-railway.md`.

## 4. Deploy

Clique em **Deploy**. Ao final, a Vercel vai gerar uma URL parecida com:

```text
https://smartgreen-ai.vercel.app
```

## 5. Checklist de validacao publica

Abra a URL final e teste:

- A landing carrega em `/`
- O botao de validacao abre o Google Forms
- O botao do MVP abre `/acesso`
- Login/cadastro funcionam com a API publica configurada
- O painel `/sistema` carrega os dados do backend hospedado
