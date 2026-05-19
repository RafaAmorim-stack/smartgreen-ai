# Usabilidade, UX e UI - SmartGreen

Este documento resume como o front-end do SmartGreen aplica as 10 heuristicas
de Nielsen e outros padroes de usabilidade, como Fitts, Hick e consistencia.

## 10 heuristicas de Nielsen aplicadas

| Heuristica | Implementacao no SmartGreen |
| --- | --- |
| 1. Visibilidade do status do sistema | A tela informa carregamento, atualizacao em andamento, tempo da proxima atualizacao e status dos semaforos. |
| 2. Correspondencia com o mundo real | A interface usa termos do dominio: cruzamento, vias, semaforos, fluxo, prioridade atual, sentido monitorado e veiculos. |
| 3. Controle e liberdade do usuario | O usuario pode atualizar manualmente, tentar novamente em caso de falha e confirmar antes de sair. |
| 4. Consistencia e padroes | Botoes, cards, cores, rotulos, icones e secoes seguem o mesmo padrao visual nas telas de login e menu principal. |
| 5. Prevencao de erros | O formulario so permite envio quando e-mail, senha e nome estao validos. A senha exige minimo de 6 caracteres e a saida do sistema pede confirmacao. |
| 6. Reconhecimento em vez de memorizacao | Cards exibem informacoes ja agrupadas por via, com rotulos, icones, status textual e cor do semaforo. O usuario nao precisa lembrar valores de outra tela. |
| 7. Flexibilidade e eficiencia de uso | O painel atualiza automaticamente a cada 5 segundos, mas tambem permite atualizacao manual para usuarios que querem testar rapidamente. |
| 8. Design estetico e minimalista | A interface foi mantida limpa, com hierarquia clara: status dos semaforos primeiro, visao geral depois e fluxo por via em seguida. |
| 9. Reconhecimento, diagnostico e recuperacao de erros | Erros aparecem em alertas destacados e oferecem acao de tentar novamente ou voltar para o acesso. |
| 10. Ajuda e documentacao | A documentacao do projeto registra rotas, requisitos, deploy e este mapeamento de usabilidade para apoiar apresentacao e avaliacao academica. |

## Outros padroes de usabilidade

### Lei de Fitts

- Botoes principais possuem area de clique alta (`min-h-12`).
- Acoes importantes ficam agrupadas no painel do usuario.
- Atualizar e sair usam icones e texto para facilitar o alvo.

### Lei de Hick

- A tela principal evita muitas opcoes simultaneas.
- O usuario escolhe entre poucas acoes: atualizar ou sair.
- As informacoes sao separadas por blocos: status dos semaforos, visao geral e fluxo.

### Consistencia

- Cores semanticas foram mantidas: verde para liberado, amarelo para transicao e vermelho para bloqueado.
- Os cards usam a mesma estrutura de rotulo, valor e detalhe.
- Os botoes mantem estilo, tamanho, borda e comportamento visual consistentes.

## Evidencias implementadas no codigo

- `frontend/components/autenticacao/formulario-acesso.tsx`
  - validacao preventiva;
  - feedback de erro/sucesso;
  - botao de mostrar/ocultar senha;
  - estados de carregamento.

- `frontend/components/sistema/painel-sistema.tsx`
  - feedback de carregamento e erro;
  - atualizacao manual;
  - confirmacao antes de sair;
  - tentativa de recuperacao em caso de falha.

- `frontend/components/sistema/status-semaforos.tsx`
  - status textual e visual dos semaforos;
  - vias liberadas;
  - horario da ultima atualizacao.

- `frontend/components/sistema/cartao-via.tsx`
  - quantidade de veiculos por via;
  - barra de ocupacao com limite visual de 20 veiculos;
  - destaque para maior fluxo e prioridade atual.
