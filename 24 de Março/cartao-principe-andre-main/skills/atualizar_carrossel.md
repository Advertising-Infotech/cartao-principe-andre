# SKILL: Atualizar Carrossel (Incremental)

## Conceito

O script detecta **mudanças incrementais** no `Titulos.xls` e atualiza os JSONs e HTMLs de forma segura:
1. Detecta **linhas novas** e **linhas alteradas** comparando XLS vs JSON
2. **Pausa** e pede ao usuário para inserir traduções manualmente nos JSONs
3. Depois de editar os JSONs, atualiza todos os 7 HTMLs

Se não houver mudanças, apenas atualiza os HTMLs com os dados existentes.

---

## Arquivos de Dados

### Titulos.xls (colunas)
| Coluna | Conteúdo |
|--------|----------|
| A | Nome do arquivo (`01.jpeg`, `homenagem_em_video.mp4`) |
| B | Badge |
| C | Title |
| D | Description |
| E | Tag |

### Titulos_XX.json (formato)
```json
[
  ["01.jpeg", "Badge", "Title", "Description", "Tag"],
  ["02.jpeg", "Badge2", "Title2", "Description2", "Tag2"]
]
```

Arquivos JSON:
- `Titulos_pt.json` — Português
- `Titulos_en.json` — Inglês
- `Titulos_he.json` — Hebraico
- `Titulos_ar.json` — Árabe
- `Titulos_ru.json` — Russo
- `Titulos_zh.json` — Chinês
- `Titulos_es.json` — Espanhol

---

## Como Executar

```bash
python atualizar_carrossel.py
```

### Fluxo:
1. Script lê XLS + todos os JSONs
2. Compara por **nome de arquivo** (coluna A do XLS)
3. Se encontrar linhas novas no XLS:
   - Insere **placeholders `[PT]`** nos JSONs que faltam
   - **Pausa** e pede para o usuário editar os JSONs manualmente
   - **Roda novamente** após editar
4. Se encontrar linhas alteradas no XLS:
   - Mostra quais itens mudaram
   - Atualiza os HTMLs com os novos textos PT nos JSONs afetados
5. Atualiza `carouselData` em todos os 7 HTMLs
6. Corrige `imgEl` automaticamente em todas as páginas

---

## Regras

1. **Nome do arquivo (coluna A) = chave primária** — não mudar nomes no XLS
2. **Ordem do Excel = ordem do carrossel** — não reordenar linhas no XLS
3. **Sempre 46 itens** (1 vídeo + 45 imagens) — se mudar quantidade, avisar
4. **Traduzir manualmente nos JSONs** — o script não faz tradução automática
5. **Validar após rodar** — verificar textos em cada idioma

---

## Adicionar Novo Item (passo a passo)

1. Adicionar linha em `Titulos.xls` com textos PT
2. Rodar `python atualizar_carrossel.py`
3. Script insere placeholders `[PT]` nos JSONs
4. Editar cada JSON (`en`, `he`, `ar`, `ru`, `zh`, `es`) com as traduções
5. Rodar novamente: `python atualizar_carrossel.py`
6. Colocar o novo arquivo de mídia na raiz do projeto
7. Commit e push

---

## Bug: imgEl não definido

O script corrige automaticamente se `const imgEl` não estiver no início de `updateCarousel()`.
Se o carrossel de alguma página não funcionar após rodar o script, verificar manualmente.
