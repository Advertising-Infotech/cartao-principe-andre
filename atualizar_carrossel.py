"""
Atualizador de Carrossel - Lê Titulos.xls (sequência) + Titulos_XX.json (textos por idioma)
e atualiza os 7 arquivos HTML.

FONTES DE DADOS:
- Titulos.xls       → sequência dos arquivos (coluna A) e textos em PT (colunas B-E)
- Titulos_pt.json   → textos em português (já estão no XLS, redundante)
- Titulos_en.json   → textos em inglês
- Titulos_he.json   → textos em hebraico
- Titulos_ar.json   → textos em árabe
- Titulos_ru.json   → textos em russo
- Titulos_zh.json   → textos em chinês
- Titulos_es.json   → textos em espanhol

Uso: python atualizar_carrossel.py
"""

import xlrd
import json
import os
import re

# =====================
# MAPEAMENTO DE IDIOMAS
# =====================
LANGS = {
    'pt': {'html': 'index.html',           'json': 'Titulos_pt.json', 'name': 'Português'},
    'en': {'html': 'index-en.html',        'json': 'Titulos_en.json', 'name': 'English'},
    'he': {'html': 'index-he.html',        'json': 'Titulos_he.json', 'name': 'עברית'},
    'ar': {'html': 'index-ar.html',        'json': 'Titulos_ar.json', 'name': 'العربية'},
    'ru': {'html': 'index-ru.html',        'json': 'Titulos_ru.json', 'name': 'Русский'},
    'zh': {'html': 'index-zh.html',        'json': 'Titulos_zh.json', 'name': '中文'},
    'es': {'html': 'index-es.html',         'json': 'Titulos_es.json', 'name': 'Español'},
}


def load_xls(xls_path):
    """Lê Titulos.xls — retorna lista de filenames na ordem."""
    wb = xlrd.open_workbook(xls_path)
    ws = wb.sheet_by_index(0)
    items = []
    for i in range(ws.nrows):
        row = [ws.cell_value(i, j) for j in range(ws.ncols)]
        filename = str(row[0]).strip()
        item_type = 'video' if filename.endswith('.mp4') else 'image'
        items.append({
            'filename': filename,
            'type': item_type,
            'pt': {
                'badge': str(row[1]).strip(),
                'title': str(row[2]).strip(),
                'desc': str(row[3]).strip(),
                'tag': str(row[4]).strip(),
            }
        })
    return items


def load_json_translations(json_path):
    """Lê Titulos_XX.json — retorna lista de textos na ordem."""
    if not os.path.exists(json_path):
        return []
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    translations = []
    for row in data:
        if isinstance(row, list) and len(row) >= 5:
            translations.append({
                'badge': row[1].strip(),
                'title': row[2].strip(),
                'desc': row[3].strip(),
                'tag': row[4].strip(),
            })
    return translations


def generate_carousel_item(item, texts):
    """Gera uma linha de carouselData."""
    return (
        "      {{ type: '{type}', src: '{src}', badge: '{badge}', "
        "title: '{title}', desc: '{desc}', tag: '{tag}' }}"
    ).format(
        type=item['type'],
        src=item['filename'],
        badge=texts['badge'],
        title=texts['title'],
        desc=texts['desc'],
        tag=texts['tag'],
    )


def update_html_file(html_path, items, texts):
    """Substitui o carouselData e o contador em um HTML."""
    carousel_items = [generate_carousel_item(item, texts[i]) for i, item in enumerate(items)]
    new_carousel_data = "[\n" + ",\n".join(carousel_items) + "\n    ]"

    with open(html_path, 'rb') as f:
        content = f.read()

    # Encontrar carouselData
    idx_start = content.find(b'const carouselData = [')
    if idx_start < 0:
        print(f"  ERRO: carouselData não encontrado")
        return False

    # Encontrar fim do array
    depth = 0
    idx_end = idx_start
    found_open = False
    while idx_end < len(content):
        if content[idx_end] == ord('['):
            depth += 1
            found_open = True
        elif content[idx_end] == ord(']'):
            depth -= 1
            if found_open and depth == 0:
                idx_end += 1
                break
        idx_end += 1

    new_carousel_bytes = ('const carouselData = ' + new_carousel_data).encode('utf-8')
    new_content = content[:idx_start] + new_carousel_bytes + content[idx_end:]

    # Atualizar contador
    total = len(items)
    counter_pat = re.compile(rb'\d+ / \d+')
    m = counter_pat.search(new_content)
    if m:
        old_counter = m.group(0).decode('ascii')
        new_counter = old_counter.split(' / ')[0] + ' / ' + str(total)
        new_content = new_content.replace(m.group(0), new_counter.encode('ascii'))

    with open(html_path, 'wb') as f:
        f.write(new_content)

    return True


def fix_en_page(html_path):
    """Corrige o bug do imgEl não definido na página EN."""
    with open(html_path, 'rb') as f:
        content = f.read()

    # Verificar se imgEl já está definido
    if b"const imgEl = document.getElementById('carousel-image')" in content:
        return False  # já está corrigido

    # Adicionar imgEl no início da função updateCarousel
    old = b"      const container = document.getElementById('media-container');\n"
    new = (
        b"      const container = document.getElementById('media-container');\n"
        b"      const imgEl = document.getElementById('carousel-image');\n"
    )
    if old in content:
        content = content.replace(old, new)
        with open(html_path, 'wb') as f:
            f.write(content)
        return True

    # Alternativa: procurar o padrão existente
    old2 = b"const mediaEl = document.getElementById('carousel-media');\n"
    new2 = (
        b"const mediaEl = document.getElementById('carousel-media');\n"
        b"      const imgEl = document.getElementById('carousel-image');\n"
    )
    if old2 in content:
        content = content.replace(old2, new2)
        with open(html_path, 'wb') as f:
            f.write(content)
        return True

    return False


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    xls_path = os.path.join(script_dir, 'Titulos.xls')

    if not os.path.exists(xls_path):
        print(f"ERRO: Titulos.xls não encontrado em {xls_path}")
        return

    print("=" * 60)
    print("ATUALIZADOR DE CARROSSEL")
    print("=" * 60)
    print()

    # 1. Carregar sequência e textos PT do XLS
    print("Lendo Titulos.xls...")
    items = load_xls(xls_path)
    print(f"  {len(items)} itens encontrados (ordem do Excel = ordem do carrossel)")
    print()

    # 2. Carregar traduções de cada JSON
    print("Carregando traduções dos arquivos JSON...")
    json_translations = {}
    for lang, info in LANGS.items():
        json_path = os.path.join(script_dir, info['json'])
        translations = load_json_translations(json_path)
        json_translations[lang] = translations
        if translations:
            print(f"  {lang}: {len(translations)} traduções carregadas de {info['json']}")
        else:
            print(f"  {lang}: {info['json']} NÃO ENCONTRADO ou vazio")
    print()

    # 3. Atualizar cada HTML
    print("Atualizando arquivos HTML...")
    for lang, info in LANGS.items():
        html_path = os.path.join(script_dir, info['html'])
        if not os.path.exists(html_path):
            print(f"  IGNORADO: {info['html']} (não encontrado)")
            continue

        # Usar traduções do JSON ou PT como fallback
        translations = json_translations.get(lang, [])
        texts = []
        for i, item in enumerate(items):
            if i < len(translations):
                texts.append(translations[i])
            else:
                texts.append(item['pt'])  # fallback para PT

        # Gerar carouselData
        carousel_items = [generate_carousel_item(items[i], texts[i]) for i in range(len(items))]
        new_carousel_data = "[\n" + ",\n".join(carousel_items) + "\n    ]"

        with open(html_path, 'rb') as f:
            content = f.read()

        # Substituir carouselData
        idx_start = content.find(b'const carouselData = [')
        if idx_start < 0:
            print(f"  ERRO: carouselData não encontrado em {info['html']}")
            continue

        depth = 0
        idx_end = idx_start
        found_open = False
        while idx_end < len(content):
            if content[idx_end] == ord('['):
                depth += 1
                found_open = True
            elif content[idx_end] == ord(']'):
                depth -= 1
                if found_open and depth == 0:
                    idx_end += 1
                    break
            idx_end += 1

        new_carousel_bytes = ('const carouselData = ' + new_carousel_data).encode('utf-8')
        new_content = content[:idx_start] + new_carousel_bytes + content[idx_end:]

        # Atualizar contador
        total = len(items)
        counter_pat = re.compile(rb'\d+ / \d+')
        m = counter_pat.search(new_content)
        if m:
            old_counter = m.group(0).decode('ascii')
            new_counter = old_counter.split(' / ')[0] + ' / ' + str(total)
            new_content = new_content.replace(m.group(0), new_counter.encode('ascii'))

        # Corrigir imgEl na página EN se necessário
        if lang == 'en':
            if b"const imgEl = document.getElementById('carousel-image')" not in new_content:
                old_fn = b"const mediaEl = document.getElementById('carousel-media');\n      "
                new_fn = b"const mediaEl = document.getElementById('carousel-media');\n      const imgEl = document.getElementById('carousel-image');\n      "
                if old_fn in new_content:
                    new_content = new_content.replace(old_fn, new_fn)

        with open(html_path, 'wb') as f:
            f.write(new_content)

        print(f"  OK: {info['html']} ({lang}) - {len(items)} itens")

    print()
    print("=" * 60)
    print("Atualização concluída!")
    print("=" * 60)


if __name__ == '__main__':
    main()
