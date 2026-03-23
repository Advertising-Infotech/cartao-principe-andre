# SKILL: Atualizar Carrossel via Titulos.xls

## Conceito

O arquivo `Titulos.xls` é o **roteiro mestre** do carrossel. Ele determina:
- A sequência exata dos arquivos (coluna A = nome do arquivo)
- Os textos em português (colunas B, C, D, E)
- A ordem de aparição no carrossel é a mesma ordem das linhas no Excel

O script `atualizar_carrossel.py` lê o `.xls` e gera o `carouselData` em todos os 7 idiomas.

---

## Quando Usar

Usar quando o usuário avisar que adicionou novos itens ao `Titulos.xls` ou inseriu linhas no meio do arquivo.

---

## Antes de Executar

1. Ler o `Titulos.xls` com `xlrd` para ver o conteúdo atual
2. Verificar quantas linhas existem e quais são os novos itens
3. Perguntar ao usuário se os textos estão corretos

---

## Como Executar

### Passo 1: Ler o Titulos.xls

```python
import xlrd

wb = xlrd.open_workbook('Titulos.xls')
ws = wb.sheet_by_index(0)

for i in range(ws.nrows):
    row = [ws.cell_value(i, j) for j in range(ws.ncols)]
    print(row)
```

Colunas:
- `row[0]` = nome do arquivo (ex: `01.jpeg`, `homenagem_em_video.mp4`)
- `row[1]` = badge (ex: "Reconhecimento")
- `row[2]` = title (ex: "Honra literária internacional")
- `row[3]` = description (ex: "Embajadores Culturales & de Paz")
- `row[4]` = tag (ex: "Homenagem")

### Passo 2: Gerar carouselData em Português

Montar o `carouselData` seguindo o padrão existente nos arquivos HTML:

```python
items = []
for i in range(ws.nrows):
    filename = ws.cell_value(i, 0)
    item_type = 'video' if filename.endswith('.mp4') else 'image'
    badge = ws.cell_value(i, 1)
    title = ws.cell_value(i, 2)
    desc = ws.cell_value(i, 3)
    tag = ws.cell_value(i, 4)
    
    if item_type == 'video':
        items.append(f"      {{ type: 'video', src: '{filename}', badge: '{badge}', title: '{title}', desc: '{desc}', tag: '{tag}' }}")
    else:
        items.append(f"      {{ type: 'image', src: '{filename}', badge: '{badge}', title: '{title}', desc: '{desc}', tag: '{tag}' }}")

carousel_data = "[\n" + ",\n".join(items) + "\n    ]"
```

### Passo 3: Traduzir para os 6 outros idiomas

Usar o mapeamento de textos existentes nos arquivos HTML para traduzir. **IMPORTANTE**: não usar tradutor automático — usar os textos que já existem nos arquivos HTML correspondentes, ajustando apenas o que for novo.

Se o item novo não tiver tradução pronta, informar ao usuário que a tradução ainda não existe e perguntar como proceder.

### Passo 4: Substituir carouselData nos 7 arquivos

Encontrar o bloco `const carouselData = [...]` em cada arquivo HTML e substituir pelo novo.

```python
old_pattern = b'const carouselData = ['
# Encontrar início e fim do bloco carouselData
# Substituir apenas o array, mantendo todo o resto do arquivo intacto
```

### Passo 5: Atualizar o contador

Mudar `1 / N` para `1 / [total de itens]` em cada página.

---

## Estrutura dos Arquivos Gerados

### index.html (Português)
```javascript
const carouselData = [
      { type: 'video', src: 'homenagem_em_video.mp4', badge: 'Prova social mundial', title: 'Homenageado por deputados', desc: 'Assembleia Legislativa do Estado de Goiás', tag: 'Honra Solene' },
      { type: 'image', src: '01.jpeg', badge: 'Reconhecimento', title: 'Honra literária internacional', desc: 'Embajadores Culturales & de Paz', tag: 'Homenagem' },
      ...
];
```

### index-en.html (Inglês)
Mesma estrutura, textos em inglês.

### index-he.html (Hebraico com RTL)
Mesma estrutura, textos em hebraico.

### index-ar.html (Árabe com RTL)
Mesma estrutura, textos em árabe.

### index-ru.html (Russo)
Mesma estrutura, textos em russo.

### index-zh.html (Chinês)
Mesma estrutura, textos em chinês.

### index-es.html (Espanhol)
Mesma estrutura, textos em espanhol.

---

## Regras Importantes

1. **A ordem no Excel = a ordem no carrossel** — sempre respeitar
2. **Sempre manter `homenagem_em_video.mp4` como primeiro item** se existir no Excel
3. **Nunca usar tradutor automático** — usar textos já existentes nos arquivos
4. **Perguntar ao usuário** se houver textos novos sem tradução pronta
5. **Cada arquivo HTML mantém sua estrutura CSS/JS intacta** — só替换 o `carouselData`
6. **Contador deve refletir o número total de itens** em cada idioma

---

## Exemplo de Novo Item

Se o usuário adicionar após a linha 46 (último item atual):

**Titulos.xls linha 47:**
- A: `53.jpg`
- B: `Certificado Especial`
- C: `Reconhecimento Extraordinário`
- D: `Nova Organização Internacional`
- E: `Medalha`

O script deve:
1. Adicionar item 47 em PT no `index.html`
2. Traduzir para EN/HE/AR/RU/ZH/ES usando textos existentes
3. Se não existir tradução, perguntar ao usuário
4. Atualizar contador de `1 / 46` para `1 / 47` em todas as páginas

---

## Arquivos Relacionados

- `Titulos.xls` — roteiro mestre (nunca editar manualmente)
- `atualizar_carrossel.py` — script que faz a atualização automática
- `index.html` — versão em português
- `index-en.html` — versão em inglês
- `index-he.html` — versão em hebraico
- `index-ar.html` — versão em árabe
- `index-ru.html` — versão em russo
- `index-zh.html` — versão em chinês
- `index-es.html` — versão em espanhol
