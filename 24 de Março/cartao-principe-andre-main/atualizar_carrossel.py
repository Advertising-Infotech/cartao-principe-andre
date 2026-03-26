"""
Atualizador Incremental de Carrossel
Detecta linhas novas/mudadas no Titulos.xls, insere em cada JSON
na posicao correta, e atualiza os 7 arquivos HTML.

FONTES DE DADOS:
- Titulos.xls         → sequência + textos PT (colunas A-E)
- Titulos_XX.json      → textos traduzidos por idioma

Uso: python atualizar_carrossel.py
"""

import xlrd
import json
import os
import re

LANGS = {
    'pt': {'html': 'index.html',      'json': 'Titulos_pt.json', 'name': 'Português'},
    'en': {'html': 'index-en.html',   'json': 'Titulos_en.json', 'name': 'English'},
    'he': {'html': 'index-he.html',   'json': 'Titulos_he.json', 'name': 'עברית'},
    'ar': {'html': 'index-ar.html',   'json': 'Titulos_ar.json', 'name': 'العربية'},
    'ru': {'html': 'index-ru.html',   'json': 'Titulos_ru.json', 'name': 'Русский'},
    'zh': {'html': 'index-zh.html',  'json': 'Titulos_zh.json', 'name': '中文'},
    'es': {'html': 'index-es.html',   'json': 'Titulos_es.json', 'name': 'Español'},
}

FLAG_ORDER = ['pt', 'he', 'en', 'ar', 'ru', 'zh', 'es']


def load_xls(xls_path):
    wb = xlrd.open_workbook(xls_path)
    ws = wb.sheet_by_index(0)
    items = []
    for i in range(ws.nrows):
        row = [ws.cell_value(i, j) for j in range(ws.ncols)]
        filename = str(row[0]).strip()
        if not filename:
            continue
        item_type = 'video' if filename.endswith('.mp4') else 'image'
        items.append({
            'filename': filename,
            'type': item_type,
            'badge': str(row[1]).strip(),
            'title': str(row[2]).strip(),
            'desc': str(row[3]).strip(),
            'tag': str(row[4]).strip(),
        })
    return items


def load_json(json_path):
    if not os.path.exists(json_path):
        return []
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    result = []
    for row in data:
        if isinstance(row, list) and len(row) >= 2:
            result.append({
                'filename': str(row[0]).strip(),
                'badge': str(row[1]).strip() if len(row) > 1 else '',
                'title': str(row[2]).strip() if len(row) > 2 else '',
                'desc': str(row[3]).strip() if len(row) > 3 else '',
                'tag': str(row[4]).strip() if len(row) > 4 else '',
            })
        elif isinstance(row, dict):
            result.append(row)
    return result


def save_json(json_path, data):
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def detect_changes(xls_items, json_items):
    xls_filenames = [i['filename'] for i in xls_items]
    json_filenames = [i.get('filename', '') for i in json_items]

    new_indices = []
    for idx, fn in enumerate(xls_filenames):
        if fn not in json_filenames:
            new_indices.append(idx)

    changed_indices = []
    for idx, fn in enumerate(xls_filenames):
        if fn in json_filenames:
            ji = json_filenames.index(fn)
            if ji < len(json_items):
                j = json_items[ji]
                x = xls_items[idx]
                if (j.get('badge') != x['badge'] or
                        j.get('title') != x['title'] or
                        j.get('desc') != x['desc'] or
                        j.get('tag') != x['tag']):
                    changed_indices.append(idx)

    return new_indices, changed_indices


def insert_into_json(json_items, xls_items, new_indices):
    for idx in new_indices:
        pt_item = xls_items[idx]
        placeholder = [
            pt_item['filename'],
            f"[PT] {pt_item['badge']}",
            f"[PT] {pt_item['title']}",
            f"[PT] {pt_item['desc']}",
            f"[PT] {pt_item['tag']}",
        ]
        json_items.insert(idx, placeholder)
    return json_items


def escape_js(text):
    return text.replace("'", "\\'")


def generate_carousel_item(item, lang='pt'):
    return (
        "      {{ type: '{type}', src: '{src}', badge: '{badge}', "
        "title: '{title}', desc: '{desc}', tag: '{tag}' }}"
    ).format(
        type=item['type'],
        src=item['filename'],
        badge=escape_js(item['badge']),
        title=escape_js(item['title']),
        desc=escape_js(item['desc']),
        tag=escape_js(item['tag']),
    )


def update_html_carousel(html_path, xls_items, json_items):
    texts_map = {}
    for item in json_items:
        fn = item.get('filename', '')
        texts_map[fn] = item

    items_with_texts = []
    for i, item in enumerate(xls_items):
        fn = item['filename']
        if fn in texts_map:
            t = texts_map[fn]
            combined = dict(item)
            combined['badge'] = t.get('badge', item['badge'])
            combined['title'] = t.get('title', item['title'])
            combined['desc'] = t.get('desc', item['desc'])
            combined['tag'] = t.get('tag', item['tag'])
        else:
            combined = dict(item)
        items_with_texts.append(combined)

    carousel_lines = [generate_carousel_item(it) for it in items_with_texts]
    new_carousel_data = "[\n" + ",\n".join(carousel_lines) + "\n    ]"

    with open(html_path, 'rb') as f:
        content = f.read()

    idx_start = content.find(b'const carouselData = [')
    if idx_start < 0:
        print(f"    ERRO: carouselData nao encontrado em {html_path}")
        return False

    depth = 0
    idx_end = idx_start
    found_open = False
    while idx_end < len(content):
        b = content[idx_end]
        if b == 91:  # [
            depth += 1
            found_open = True
        elif b == 93:  # ]
            depth -= 1
            if found_open and depth == 0:
                idx_end += 1
                break
        idx_end += 1

    new_bytes = ('const carouselData = ' + new_carousel_data).encode('utf-8')
    new_content = content[:idx_start] + new_bytes + content[idx_end:]

    total = len(xls_items)
    counter_pat = re.compile(rb'\d+ / \d+')
    m = counter_pat.search(new_content)
    if m:
        old_counter = m.group(0).decode('ascii')
        new_counter = old_counter.split(' / ')[0] + ' / ' + str(total)
        new_content = new_content.replace(m.group(0), new_counter.encode('ascii'))

    fix_img_el(new_content, html_path)

    with open(html_path, 'wb') as f:
        f.write(new_content)

    return True


def fix_img_el(content, html_path):
    img_el_check = b"const imgEl = document.getElementById('carousel-image')"
    if img_el_check in content:
        return

    old_pattern = b"const mediaEl = document.getElementById('carousel-media');\n      const sourceEl = document.getElementById('media-source');\n      \n      const imgEl = document.getElementById('carousel-image');"
    if old_pattern in content:
        return

    new_pattern = (
        b"const mediaEl = document.getElementById('carousel-media');\n"
        b"      const imgEl = document.getElementById('carousel-image');\n"
        b"      const sourceEl = document.getElementById('media-source');\n"
        b"      \n      if (item.type === 'video') {"
    )

    old_alt = (
        b"const mediaEl = document.getElementById('carousel-media');\n"
        b"      const sourceEl = document.getElementById('media-source');\n"
        b"      \n      const imgEl = document.getElementById('carousel-image');\n"
        b"      if (item.type === 'video') {"
    )

    old_alt2 = (
        b"const mediaEl = document.getElementById('carousel-media');\n"
        b"      const sourceEl = document.getElementById('media-source');\n"
        b"      \n      const imgEl = document.getElementById('carousel-image');"
    )

    if old_pattern in content:
        content = content.replace(old_pattern, new_pattern)
    elif old_alt in content:
        content = content.replace(old_alt, new_pattern)
    elif old_alt2 in content:
        content = content.replace(old_alt2, new_pattern)

    with open(html_path, 'wb') as f:
        f.write(content)


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    xls_path = os.path.join(script_dir, 'Titulos.xls')

    if not os.path.exists(xls_path):
        print("ERRO: Titulos.xls nao encontrado")
        return

    print("=" * 60)
    print("ATUALIZADOR INCREMENTAL DE CARROSSEL")
    print("=" * 60)
    print()

    xls_items = load_xls(xls_path)
    print(f"XLS: {len(xls_items)} itens")

    all_new = []
    all_changed = []

    for lang, info in LANGS.items():
        json_path = os.path.join(script_dir, info['json'])
        json_items = load_json(json_path)
        new_idx, changed_idx = detect_changes(xls_items, json_items)

        if new_idx:
            print(f"  {lang}: {len(new_idx)} novo(s) -> posicoes {new_idx}")
        if changed_idx:
            print(f"  {lang}: {len(changed_idx)} alterado(s) -> posicoes {changed_idx}")

        all_new.extend([(lang, i) for i in new_idx])
        all_changed.extend([(lang, i) for i in changed_idx])

    print()

    if not all_new and not all_changed:
        print("Nenhuma mudanca detectada. Atualizando todos os HTMLs apenas.")
    else:
        if all_new:
            print(f"Linhas novas detectadas em {len(set(l[0] for l in all_new))} idiomas:")
            for lang, idx in all_new:
                item = xls_items[idx]
                print(f"  [{lang}] posicao {idx}: {item['filename']}")
            print()
            print("  INSIRA as traducoes nos arquivos JSON correspondentes.")
            print("  Apos editar os JSONs, rode novamente: python atualizar_carrossel.py")
            print()

        if all_changed:
            print(f"Linhas alteradas detectadas:")
            for lang, idx in all_changed:
                item = xls_items[idx]
                print(f"  [{lang}] posicao {idx}: {item['filename']} - '{item['title']}'")

    print("-" * 60)
    print("Atualizando HTMLs...")

    for lang, info in LANGS.items():
        html_path = os.path.join(script_dir, info['html'])
        json_path = os.path.join(script_dir, info['json'])
        json_items = load_json(json_path)

        if len(json_items) != len(xls_items):
            print(f"  AVISO: {info['html']} - JSON tem {len(json_items)} itens, XLS tem {len(xls_items)}")
            if len(json_items) < len(xls_items):
                print(f"    -> Inserindo {len(xls_items) - len(json_items)} placeholder(s)...")
                json_items = insert_into_json(json_items, xls_items,
                    [i for i in range(len(xls_items)) if i >= len(json_items)])
                save_json(json_path, json_items)

        if update_html_carousel(html_path, xls_items, json_items):
            print(f"  OK: {info['html']} ({lang})")
        else:
            print(f"  ERRO: {info['html']}")

    print()
    print("=" * 60)
    print("Concluido!")
    print("=" * 60)


if __name__ == '__main__':
    main()
