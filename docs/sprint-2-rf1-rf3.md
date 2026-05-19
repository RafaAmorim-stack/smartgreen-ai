# Sprint 2 - RF1 e RF3

Esta sprint foca no painel funcional do SmartGreen AI para acompanhamento do
cruzamento monitorado.

## Requisitos atendidos

### RF1 - Monitorar o fluxo de veiculos nas vias do cruzamento

O sistema exibe a quantidade atual de veiculos em cada via monitorada:

- Via Norte
- Via Leste
- Via Sul

No frontend, o requisito aparece em:

- `frontend/components/sistema/resumo-sistema.tsx`
- `frontend/components/sistema/visao-cruzamento.tsx`
- `frontend/components/sistema/cartao-via.tsx`

No backend, os dados sao fornecidos por:

- `GET /api/controle-trafego/visao-geral`
- `POST /api/controle-trafego/simular`

Campos principais da resposta:

```text
vias[].nome
vias[].quantidadeVeiculos
vias[].sentido
vias[].descricao
```

### RF3 - Exibir o status atual de cada semaforo no painel

O painel exibe uma secao propria para o estado atual dos semaforos de cada via.
Cada item informa:

- nome da via
- cor atual do semaforo
- descricao operacional do status
- se a via esta com prioridade atual
- tempo de verde do ciclo

No frontend, o requisito aparece em:

- `frontend/components/sistema/status-semaforos.tsx`
- `frontend/components/sistema/cartao-via.tsx`

No backend, os dados sao fornecidos por:

```text
vias[].corSemaforo
vias[].estaPrioritaria
semaforo.statusTexto
semaforo.tempoVerdeSegundos
semaforo.atualizadoEm
```

## Fluxo de teste como usuario final

1. Abrir o aplicativo na rota `/`.
2. Entrar com usuario de demonstracao ou realizar cadastro.
3. Acessar o menu principal em `/sistema`.
4. Verificar no topo a secao **Status dos Semaforos**.
5. Verificar o resumo e os cards de fluxo de veiculos.
6. Clicar em **Atualizar** para simular nova leitura.
7. Conferir se quantidades e status sao atualizados.

## Criterios de aceite

- O painel mostra pelo menos tres vias monitoradas.
- Cada via apresenta quantidade de veiculos.
- O sistema destaca a via com maior fluxo.
- Cada via apresenta o status atual do semaforo.
- O painel informa se a via esta prioritaria ou aguardando.
- O botao **Atualizar** executa nova simulacao.
- O usuario acessa o menu principal depois da tela de login.
