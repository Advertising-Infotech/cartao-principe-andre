# Regra Obrigatória: History por Prompt

## Fluxo (SEM exceções)

Para **cada prompt** do usuário:

1. **Executar** — rodar o serviço/prompt até completar
2. **Gravar history/** — criar `history/NNNNNN.md` com:
   - Data e hora
   - O que foi pedido (prompt do usuário)
   - O que foi feito (etapas, arquivos, resultados)
   - Commits realizados
3. **Congelar** — tornar o arquivo somente leitura (`attrib +R` no Windows)
4. **Commit & push** — commitar history + arquivos modificados com mensagem descritiva

## Formato do history/

```markdown
# History NNNNNN — Título Descritivo

**Data:** YYYY-MM-DD HH:MM:SS
**Status:** Concluído

---

## Prompt do Usuário
> [prompt original]

## O que foi feito
1. [etapa 1]
2. [etapa 2]

## Arquivos modificados
- `arquivo1.py` — descrição
- `arquivo2.md` — descrição

## Commit
- **Mensagem:** "mensagem"
- **Hash:** XXXXXXX
```

## Regras

- **Sequência:** sempre o próximo número (000007, 000008, 000009...)
- **Nunca pular** números
- **Nunca editar** um history já congelado
- **Commit message** deve ser descritiva (não apenas "Rei de Israel")
- **TODOS** os arquivos modificados devem ser commitados junto com o history
