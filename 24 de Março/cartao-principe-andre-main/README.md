# Cartão Digital — Príncipe André Luís

![Version](https://img.shields.io/badge/version-4.0%20(HTML5)-gold)
![Languages](https://img.shields.io/badge/languages-7-blue)
![Hosting](https://img.shields.io/badge/hosting-GitHub%20Pages-brightgreen)

> Cartão de visitas digital multilíngue com carrossel de títulos, honrarias e certificações.

🔗 **Site ao vivo**: https://advertising-infotech.github.io/cartao-principe-andre/

---

## 🌍 Idiomas

7 versões em um único site:

| Idioma | Arquivo | Sentido |
|--------|---------|---------|
| Português (Brasil) | `index.html` | LTR |
| Hebraico (Israel) | `index-he.html` | RTL |
| Inglês (Reino Unido) | `index-en.html` | LTR |
| Árabe (Arábia Saudita) | `index-ar.html` | RTL |
| Russo (Rússia) | `index-ru.html` | LTR |
| Chinês (China) | `index-zh.html` | LTR |
| Espanhol (Espanha) | `index-es.html` | LTR |

Troque de idioma clicando nas bandeiras no topo da página.

---

## 🎨 Design

- **Gold**: `#D4AF37`
- **Background**: `#000000`
- **Glassmorphism** com `backdrop-filter: blur(20px)`
- **Responsivo** — otimizado para mobile (max-width: 448px)
- **Efeitos**: animação de piscar no nome, glow dourado na foto

---

## 📁 Estrutura de Arquivos

```
/
├── index.html              # Português (padrão)
├── index-en.html           # Inglês
├── index-he.html           # Hebraico (RTL)
├── index-ar.html           # Árabe (RTL)
├── index-ru.html           # Russo
├── index-zh.html           # Chinês
├── index-es.html           # Espanhol
├── foto_oficial.jpg        # Foto de perfil
├── homenagem_em_video.mp4   # Vídeo de abertura do carrossel
├── 01.jpeg ~ 52.png        # Diplomas e certificados
├── Titulos.xls             # 📋 FONTE MESTRA DO CARROSSEL
├── atualizar_carrossel.py   # Script de atualização
├── README.md               # Este arquivo
└── skills/
    ├── modo_de_operacao.md  # Regras de operação
    └── atualizar_carrossel.md # Documentação da skill
```

---

## 📋 Atualizando o Carrossel

### O arquivo `Titulos.xls` é a fonte mestra

O `Titulos.xls` controla **toda** a sequência do carrossel. Para adicionar, remover ou reordenar itens:

1. **Edite o `Titulos.xls`** (nunca os arquivos HTML manualmente):

| Coluna | Conteúdo | Exemplo |
|--------|----------|---------|
| A | Nome do arquivo | `53.jpg` |
| B | Badge | `Certificado Especial` |
| C | Título | `Reconhecimento Extraordinário` |
| D | Descrição | `Nova Organização Internacional` |
| E | Tag | `Medalha` |

2. **Coloque o arquivo de mídia** na raiz do projeto (ex: `53.jpg`)

3. **Me avise** que os arquivos estão prontos — eu executo o script que atualiza todos os 7 idiomas automaticamente

### Execução manual

```bash
python atualizar_carrossel.py
```

O script:
- Lê o `Titulos.xls`
- Carrega as traduções existentes (correspondência posicional)
- Atualiza o `carouselData` nos 7 arquivos HTML
- Atualiza o contador `1 / N`

### Ordem

A ordem de aparição no Excel = ordem de aparição no carrossel. Se você inserir uma linha no meio, todos os itens seguintes são empurrados.

---

## 🔧 Carrossel — Detalhes Técnicos

### Vídeo (primeiro item)
- Arquivo: `homenagem_em_video.mp4`
- Ocupa 100% da largura (`object-fit: cover`)
- Alinhamento vertical 9% abaixo do centro
- `autoplay loop muted playsinline` (sem controles)

### Imagens (itens 2+)
- Usam elemento `<img>` separado do vídeo
- `object-fit: contain` + `object-position: center`
- Imagens horizontais preenchem o máximo possível
- Imagens verticais ficam centralizadas com barras nas laterais

### Header do Carrossel
Formato padrão (cada idioma com sua tradução):
```
Títulos,
[homenagens,]
certificações e honrarias
```

---

## 🚀 Como Funciona

- **100% estático** — HTML5, CSS e JavaScript vanilla
- **Sem dependências** — não precisa de Node.js, npm, React, Next.js
- **Hospedagem** — GitHub Pages
- **vCard** — botão "Salvar Contato" baixa um `.vcf` com os dados

---

## 📝 Regras de Operação

1. **NÃO edite os textos do carousel nos arquivos HTML manualmente** — use sempre o `Titulos.xls`
2. **Rode o script `atualizar_carrossel.py`** após qualquer alteração no XLS
3. **Nunca altere as configurações CSS do vídeo inicial**
4. **SEMPRE pergunte permissão** antes de alterar arquivos

---

## 📜 Changelog

- **v4.0 (HTML5)** — Reescrito do zero em HTML5 puro, 7 idiomas, GitHub Pages
- Script de atualização automática via `Titulos.xls`
- Carrossel com vídeo + imagens funcionando corretamente
- Glassmorphism responsivo

---

## 👤 Dono

**Príncipe André Luís** — Advertising Infotech
- WhatsApp: [+55 62 99159-9031](https://wa.me/5562991599031)
- Email: [advertisingpropaganda@gmail.com](mailto:advertisingpropaganda@gmail.com)
- Site: [advertisinginfotech.com.br](https://advertisinginfotech.com.br)
