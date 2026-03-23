# SKILL: Atualizar Carrossel via Titulos.xls + Titulos_XX.json

## Conceito

O sistema de atualização do carrossel usa **duas fontes de dados**:

1. **`Titulos.xls`** — controla a **sequência** dos arquivos e os **textos em português**
2. **`Titulos_XX.json`** — controla os **textos traduzidos** para cada idioma

A ordem de aparição no Excel é **sempre** a ordem de aparição no carrossel.

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
  ["02.jpeg", "Badge2", "Title2", "Description2", "Tag2"],
  ...
]
```

Arquivos JSON existentes:
- `Titulos_pt.json` — Português
- `Titulos_en.json` — Inglês
- `Titulos_he.json` — Hebraico
- `Titulos_ar.json` — Árabe
- `Titulos_ru.json` — Russo
- `Titulos_zh.json` — Chinês
- `Titulos_es.json` — Espanhol

---

## Quando Usar

Usar quando o usuário avisar que adicionou novos itens ao `Titulos.xls` ou inseriu/removeu linhas.

---

## Como Executar

### Passo 1: Rodar o script

```bash
python atualizar_carrossel.py
```

O script faz **tudo** automaticamente:
1. Lê `Titulos.xls` → sequência + textos PT
2. Lê `Titulos_XX.json` para cada idioma
3. Corresponde por **posição** (item N do Excel → tradução da posição N)
4. Fallback: se JSON não existir, usa textos PT
5. Atualiza `carouselData` em cada HTML
6. Atualiza contador `1 / N`
7. Corrige automaticamente o bug do `imgEl` na página EN

### Passo 2: Verificar

Após rodar, verificar que cada HTML tem os textos corretos para o seu idioma.

---

## Regras Importantes

1. **A ordem no Excel = a ordem no carrossel** — sempre respeitar
2. **Sempre manter `homenagem_em_video.mp4` como primeiro item** se existir no Excel
3. **Adicionar textos novos em TODOS os JSONs** quando o usuário adicionar novos itens
4. **Nunca editar manualmente o `carouselData`** nos arquivos HTML
5. **Cada JSON deve ter a mesma quantidade de itens** que o XLS e na mesma ordem
6. **Perguntar ao usuário** se houver dúvidas sobre tradução

---

## Exemplo: Adicionar Novo Item

O usuário adiciona `53.jpg` no `Titulos.xls` depois da linha 46:

1. Adicionar linha em `Titulos.xls` com textos PT
2. Adicionar linha em `Titulos_en.json` com textos EN
3. Adicionar linha em `Titulos_he.json` com textos HE
4. Adicionar linha em `Titulos_ar.json` com textos AR
5. Adicionar linha em `Titulos_ru.json` com textos RU
6. Adicionar linha em `Titulos_zh.json` com textos ZH
7. Adicionar linha em `Titulos_es.json` com textos ES
8. Colocar o arquivo `53.jpg` na raiz do projeto
9. Rodar `python atualizar_carrossel.py`

---

## Bug Conhecido: Página EN

A página em inglês tinha um bug onde `imgEl` não estava definido na função `updateCarousel()`. O script corrige isso automaticamente. Se o carrossel da página EN não funcionar, verificar se `const imgEl = document.getElementById('carousel-image')` existe no início da função `updateCarousel()`.
