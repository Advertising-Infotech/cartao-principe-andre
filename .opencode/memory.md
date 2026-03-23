# MEMÓRIA DO PROJETO

## Identidade do Projeto

- **Site**: https://advertising-infotech.github.io/cartao-principe-andre/
- **Repositório**: https://github.com/Advertising-Infotech/cartao-principe-andre
- **Dono**: Príncipe André Luís / Advertising Infotech
- **Hosting**: GitHub Pages (migrado do Vercel)

---

## Arquitetura Atual

### Tecnologias
- **HTML5 puro** (7 arquivos separados, um por idioma)
- **CSS inline** em cada arquivo (glassmorphism, responsivo)
- **JavaScript vanilla** (carousel, vCard)
- **Sem frameworks** — 100% estático

### Arquivos Principais

| Arquivo | Idioma | Observação |
|---------|--------|------------|
| `index.html` | Português (padrão) | Landing page |
| `index-en.html` | Inglês | |
| `index-he.html` | Hebraico | RTL |
| `index-ar.html` | Árabe | RTL |
| `index-ru.html` | Russo | |
| `index-zh.html` | Chinês | |
| `index-es.html` | Espanhol | |

### Ordem das Bandeiras (flags)
1. Português (BR) → `index.html`
2. Hebraico (IL) → `index-he.html`
3. Inglês (GB) → `index-en.html`
4. Árabe (SA) → `index-ar.html`
5. Russo (RU) → `index-ru.html`
6. Chinês (CN) → `index-zh.html`
7. Espanhol (ES) → `index-es.html`

### Arquivos de Mídia (raiz do projeto — sem subpastas)
- `foto_oficial.jpg` — foto de perfil
- `homenagem_em_video.mp4` — primeiro item do carrossel (vídeo)
- `01.jpeg` a `52.png` — imagens do carrossel (diplomas, certificados, honrarias)

---

## Estrutura do Carrossel

### Fonte Mestre: `Titulos.xls`

O arquivo `Titulos.xls` é a **fonte mestra** de todo o carrossel. Ele determina:
- A **sequência** dos arquivos (coluna A)
- Os **textos em português** (colunas B, C, D, E)

**Colunas:**
- A = nome do arquivo (ex: `01.jpeg`, `homenagem_em_video.mp4`)
- B = badge (ex: "Reconhecimento")
- C = title (ex: "Honra literária internacional")
- D = description (ex: "Embajadores Culturales & de Paz")
- E = tag (ex: "Homenagem")

**O `Titulos.xls` controla TUDO.** A ordem das linhas no Excel é a ordem de aparição no carrossel. Qualquer alteração no XLS atualiza todos os 7 idiomas.

### Fontes de Dados

O sistema usa **duas fontes de dados**:

**1. `Titulos.xls` (sequência + textos PT)**
- Coluna A = nome do arquivo (ordem de aparição)
- Colunas B-E = textos em português (badge, title, description, tag)

**2. `Titulos_XX.json` (textos por idioma)**
Cada idioma tem seu próprio arquivo JSON com as traduções na mesma ordem:

| Arquivo JSON | Idioma |
|-------------|--------|
| `Titulos_pt.json` | Português |
| `Titulos_en.json` | Inglês |
| `Titulos_he.json` | Hebraico |
| `Titulos_ar.json` | Árabe |
| `Titulos_ru.json` | Russo |
| `Titulos_zh.json` | Chinês |
| `Titulos_es.json` | Espanhol |

Formato do JSON (cada linha = um item do carrossel):
```json
["nome_arquivo", "badge", "title", "description", "tag"]
```

### Script de Atualização: `atualizar_carrossel.py`

O script lê **ambas** as fontes e atualiza todos os 7 HTMLs automaticamente.

**Como funciona:**
1. Lê `Titulos.xls` → obtém a **sequência** dos arquivos e textos em PT
2. Lê `Titulos_XX.json` → obtém as **traduções** para cada idioma
3. Faz correspondência **posicional** (item N do XLS → tradução da posição N no JSON)
4. Se um idioma não tiver JSON, usa PT como fallback
5. Gera o `carouselData` atualizado em cada idioma
6. Atualiza o contador `1 / N`
7. **Corrige automaticamente** o bug do `imgEl` na página EN

**Uso:**
```bash
python atualizar_carrossel.py
```

---

## Regras de Negócio

### Vídeo Inicial
- O vídeo `homenagem_em_video.mp4` é **SEMPRE** o primeiro item do carrossel
- **PROIBIDO** alterar as configurações de CSS do vídeo
- O vídeo deve ocupar 100% da largura horizontal (`object-fit: cover`)
- O vídeo deve ter alinhamento vertical 9% abaixo do centro (`object-position: center 41%`)
- O vídeo não deve ter controles (`controls` removido)
- O vídeo deve ter `autoplay loop muted playsinline`

### Imagens do Carrossel (itens 2 em diante)
- Usar `<img id="carousel-image">` com `display: none/block`
- **NÃO** usar `poster` do vídeo para imagens
- Usar `object-fit: contain` + `object-position: center`
- Imagens horizontais preenchem o máximo possível
- Imagens verticais ficam com barras nas laterais

### CSS das Classes do Carrossel
```css
.carousel-media {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
}
.carousel-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 41%;
}
```

### Header do Carrossel (todas as 7 páginas)
Formato: `"Títulos, /n **[palavra],** /n certificações e honrarias"`
- Linha 1: "Títulos,"
- Linha 2: "**[palavra],**" ← vírgula após a palavra do meio
- Linha 3: "certificações e honrarias"

Cada idioma tem sua tradução, mas a estrutura (vírgula após a palavra do meio) é igual.

---

## Histórico de Correções (Cronologia)

### 1. Migração Vercel → GitHub Pages
O site estava no Vercel mas tinha problemas para servir arquivos de mídia. Migrado para GitHub Pages.

### 2. Restauração de Arquivos Corrompidos
Todos os 54 arquivos de mídia (JPEG, PNG, MP4) estavam corrompidos por um LLM que salvou binários como texto. Restaurados do commit Git `7f87fe8`.

### 3. Reestruturação de Caminhos
Os arquivos de mídia foram movidos de `public/carrossel/` para a **raiz do projeto**. Todos os caminhos nos HTMLs foram simplificados para nomes relativos (ex: `01.jpeg` em vez de `public/carrossel/01.jpeg`).

### 4. Correção da Estrutura do Carrossel (vídeo/imagem)
- 6 páginas tinham JS com caminho quebrado: `sourceEl.src = '' + item.src` (string vazia + nome)
- Corrigido para: `sourceEl.src = item.src`
- A página EN tinha estrutura HTML diferente (separava `<img>` e `<video>`) — normalizada

### 5. Adição do Vídeo ao Carrossel
O vídeo `homenagem_em_video.mp4` foi inserido como **primeiro item** do carouselData em todas as 7 páginas (47 itens totais).

### 6. Correção do Frase do Header
- Corrigido plural: "homenagem" → "**homenagens**" em PT/ES
- Adicionada **vírgula** após a palavra do meio em todas as 7 páginas

### 7. Correções de CSS do Vídeo
- `object-fit: cover` + `object-position: center 41%` (9% abaixo do centro)
- **NUNCA** alterar as configurações do vídeo novamente

### 8. Correção de CSS Inválido (Regras na Mesma Linha)
`.carousel-media` e `.carousel-video` estavam na mesma linha CSS, invalidando as regras. Separadas em linhas próprias.

### 9. Correção das Imagens (Tela Preta)
O JS usava `sourceEl.src` + `.load()` num elemento `<video>` para imagens — não funciona. Corrigido com `<img id="carousel-image">` separado, usando `display: none/block`.

### 10. Script de Atualização Automática
Criado `atualizar_carrossel.py` — lia `Titulos.xls` e buscava traduções nos HTMLs por correspondência posicional.

### 11. Adição dos JSONs de Tradução e Bug Fix na Página EN
- Adicionados os arquivos `Titulos_XX.json` como fonte oficial de traduções por idioma
- O script `atualizar_carrossel.py` foi reescrito para usar os JSONs
- **Bug corrigido na página EN**: a função `updateCarousel()` usava `imgEl` sem defini-lo, causando erro e impedindo o carrossel de funcionar. Corrigido com `const imgEl = document.getElementById('carousel-image')`

---

## Configurações do Projeto

### Cores
- **Gold**: `#D4AF37`
- **Gold Dark**: `#b5952f`
- **Background**: `#000` (preto)
- **Glassmorphism**: `backdrop-filter: blur(20px)`

### Estrutura HTML do Carrossel
```html
<div class="carousel-image-container" id="media-container">
    <video id="carousel-media" class="carousel-video" autoplay loop muted playsinline>
        <source id="media-source" src="homenagem_em_video.mp4" type="video/mp4">
    </video>
    <img id="carousel-image" class="carousel-media" style="display:none" alt="">
    <div class="carousel-gradient"></div>
    <div class="carousel-badge" id="carousel-badge">...</div>
    <div class="carousel-title"><h4 id="carousel-title">...</h4></div>
</div>
```

### JavaScript do Carrossel
```javascript
function updateCarousel() {
    const item = carouselData[currentIndex];
    const imgEl = document.getElementById('carousel-image');
    const mediaEl = document.getElementById('carousel-media');
    const sourceEl = document.getElementById('media-source');

    if (item.type === 'video') {
        mediaEl.style.display = 'block';
        imgEl.style.display = 'none';
        sourceEl.src = item.src;
        sourceEl.type = 'video/mp4';
        mediaEl.load();
    } else {
        mediaEl.style.display = 'none';
        imgEl.style.display = 'block';
        imgEl.src = item.src;
    }
    // ... atualiza badge, title, desc, tag, counter
}
```

---

## Regras de Operação (modo_de_operacao.md)

- **NÃO FAZER NADA além do que foi expressamente ordenado**
- **SEMPRE perguntar permissão** antes de alterar arquivos
- **NUNCA mexer nas configurações do vídeo inicial**
- O `Titulos.xls` é a fonte mestra — nunca editar manualmente os textos nos HTMLs

---

## Arquivos Especiais

| Arquivo | Descrição |
|---------|-----------|
| `Titulos.xls` | Sequência + textos PT (fonte mestra) |
| `Titulos_XX.json` | Traduções por idioma (XX = pt, en, he, ar, ru, zh, es) |
| `atualizar_carrossel.py` | Script Python que sincroniza XLS + JSONs com os 7 HTMLs |
| `skills/modo_de_operacao.md` | Regras de operação |
| `skills/atualizar_carrossel.md` | Documentação da skill de atualização |
