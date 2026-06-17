"""
Atualizador Automático de Carrossel v2.0
 Lê Titulos.xlsx, traduz automaticamente para 6 idiomas,
 atualiza os 7 JSONs e os 7 HTMLs — zero trabalho manual.

 FONTES DE DADOS:
 - Titulos.xlsx        → sequência + textos PT (colunas A-E)
 - Titulos_XX.json      → textos traduzidos (mantém traduções existentes)

 Uso: python atualizar_carrossel.py
"""

import openpyxl
import json
import os
import re
import sys
import time

sys.stdout.reconfigure(encoding="utf-8")

# ── Configuração de idiomas ──────────────────────────────────────────────────
LANGS = {
    "pt": {"html": "index.html",    "json": "Titulos_pt.json", "gt": "pt",     "name": "Português"},
    "en": {"html": "index-en.html", "json": "Titulos_en.json", "gt": "en",     "name": "English"},
    "he": {"html": "index-he.html", "json": "Titulos_he.json", "gt": "iw",     "name": "עברית"},
    "ar": {"html": "index-ar.html", "json": "Titulos_ar.json", "gt": "ar",     "name": "العربية"},
    "ru": {"html": "index-ru.html", "json": "Titulos_ru.json", "gt": "ru",     "name": "Русский"},
    "zh": {"html": "index-zh.html", "json": "Titulos_zh.json", "gt": "zh-CN",  "name": "中文"},
    "es": {"html": "index-es.html", "json": "Titulos_es.json", "gt": "es",     "name": "Español"},
}

# ── Cache de tradução para não traduzir o mesmo texto duas vezes ─────────────
_translation_cache = {}


def translate_text(text, target_lang, source_lang="pt"):
    """Traduz texto usando Google Translate (deep-translator)."""
    if not text or not text.strip():
        return text

    cache_key = f"{source_lang}:{target_lang}:{text}"
    if cache_key in _translation_cache:
        return _translation_cache[cache_key]

    # Se o idioma alvo é PT, retorna o texto original
    if target_lang == "pt":
        _translation_cache[cache_key] = text
        return text

    try:
        from deep_translator import GoogleTranslator
        translator = GoogleTranslator(source=source_lang, target=target_lang)
        result = translator.translate(text)
        if result:
            _translation_cache[cache_key] = result
            return result
    except Exception as e:
        print(f"    AVISO: Falha ao traduzir '{text[:40]}...' para {target_lang}: {e}")

    # Em caso de erro, retorna o texto original
    _translation_cache[cache_key] = text
    return text


def translate_item(item, gt_code):
    """Traduz todos os campos de um item para o idioma alvo (usando código Google Translate)."""
    if gt_code == "pt":
        return {
            "badge": item["badge"],
            "title": item["title"],
            "desc": item["desc"],
            "tag": item["tag"],
        }

    return {
        "badge": translate_text(item["badge"], gt_code),
        "title": translate_text(item["title"], gt_code),
        "desc": translate_text(item["desc"], gt_code),
        "tag": translate_text(item["tag"], gt_code),
    }


# ── Leitura do Excel ────────────────────────────────────────────────────────
def load_xls(xls_path):
    """Lê Titulos.xlsx e retorna lista de itens na ordem do Excel."""
    wb = openpyxl.load_workbook(xls_path)
    ws = wb.active
    items = []
    for i, row in enumerate(ws.iter_rows(values_only=True)):
        if i == 0:  # pular cabeçalho
            continue
        filename = str(row[0]).strip() if row[0] else ""
        if not filename:
            continue
        item_type = "video" if filename.endswith(".mp4") else "image"
        items.append({
            "filename": filename,
            "type": item_type,
            "badge": str(row[1]).strip() if row[1] else "",
            "title": str(row[2]).strip() if row[2] else "",
            "desc":  str(row[3]).strip() if row[3] else "",
            "tag":   str(row[4]).strip() if row[4] else "",
        })
    return items


# ── Leitura/escrita de JSON ─────────────────────────────────────────────────
def load_json(json_path):
    """Lê JSON existente e retorna dict {filename: {badge, title, desc, tag}}."""
    if not os.path.exists(json_path):
        return {}
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    result = {}
    for row in data:
        if isinstance(row, dict):
            fn = row.get("filename", "")
            if fn:
                result[fn] = {
                    "badge": row.get("badge", ""),
                    "title": row.get("title", ""),
                    "desc":  row.get("desc", ""),
                    "tag":   row.get("tag", ""),
                }
        elif isinstance(row, list) and len(row) >= 2:
            fn = str(row[0]).strip()
            if fn:
                result[fn] = {
                    "badge": str(row[1]).strip() if len(row) > 1 else "",
                    "title": str(row[2]).strip() if len(row) > 2 else "",
                    "desc":  str(row[3]).strip() if len(row) > 3 else "",
                    "tag":   str(row[4]).strip() if len(row) > 4 else "",
                }
    return result


def save_json(json_path, data_dict, order):
    """Salva JSON mantendo a ordem do Excel."""
    result = []
    for fn in order:
        if fn in data_dict:
            entry = {"filename": fn}
            entry.update(data_dict[fn])
            result.append(entry)
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)


# ── Atualização de HTML ─────────────────────────────────────────────────────
def escape_js(text):
    return text.replace("\\", "\\\\").replace("'", "\\'")


def generate_carousel_item(item):
    return (
        "      {{ type: '{type}', src: '{src}', badge: '{badge}', "
        "title: '{title}', desc: '{desc}', tag: '{tag}' }}"
    ).format(
        type=item["type"],
        src=item["filename"],
        badge=escape_js(item["badge"]),
        title=escape_js(item["title"]),
        desc=escape_js(item["desc"]),
        tag=escape_js(item["tag"]),
    )


def update_html(html_path, xls_items, texts_map):
    """Substitui carouselData e counter no HTML."""
    carousel_lines = []
    for item in xls_items:
        fn = item["filename"]
        if fn in texts_map:
            combined = dict(item)
            combined.update(texts_map[fn])
        else:
            combined = dict(item)
        carousel_lines.append(generate_carousel_item(combined))

    new_carousel_data = "[\n" + ",\n".join(carousel_lines) + "\n    ]"

    with open(html_path, "rb") as f:
        content = f.read()

    # Substituir carouselData
    idx_start = content.find(b"const carouselData = [")
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

    new_bytes = ("const carouselData = " + new_carousel_data).encode("utf-8")
    new_content = content[:idx_start] + new_bytes + content[idx_end:]

    # Atualizar counter
    total = len(xls_items)
    counter_pat = re.compile(rb"\d+ / \d+")
    m = counter_pat.search(new_content)
    if m:
        old_counter = m.group(0).decode("ascii")
        new_counter = old_counter.split(" / ")[0] + " / " + str(total)
        new_content = new_content.replace(m.group(0), new_counter.encode("ascii"))

    with open(html_path, "wb") as f:
        f.write(new_content)

    return True


# ── Função principal ─────────────────────────────────────────────────────────
def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    xls_path = os.path.join(script_dir, "Titulos.xlsx")

    if not os.path.exists(xls_path):
        print("ERRO: Titulos.xlsx nao encontrado")
        return

    print("=" * 60)
    print("ATUALIZADOR AUTOMATICO DE CARROSSEL v2.0")
    print("Traducao automatica para 6 idiomas")
    print("=" * 60)
    print()

    # 1. Ler Excel
    xls_items = load_xls(xls_path)
    xls_order = [item["filename"] for item in xls_items]
    print(f"Excel: {len(xls_items)} itens na ordem")
    print()

    # 2. Para cada idioma: ler JSON, sincronizar com Excel, traduzir, salvar
    for lang, info in LANGS.items():
        print(f"[{info['name']}] {info['json']}")
        json_path = os.path.join(script_dir, info["json"])
        existing = load_json(json_path)

        new_data = {}
        new_count = 0
        kept_count = 0

        for item in xls_items:
            fn = item["filename"]
            if fn in existing:
                # Item já existe — manter tradução existente
                new_data[fn] = existing[fn]
                kept_count += 1
            else:
                # Item novo — traduzir do PT
                if lang == "pt":
                    new_data[fn] = {
                        "badge": item["badge"],
                        "title": item["title"],
                        "desc":  item["desc"],
                        "tag":   item["tag"],
                    }
                else:
                    print(f"  Traduzindo {fn} → {lang}...")
                    new_data[fn] = translate_item(item, info["gt"])
                    time.sleep(0.3)  # rate limit do Google Translate
                new_count += 1

        save_json(json_path, new_data, xls_order)
        print(f"  Salvo: {kept_count} existentes + {new_count} novos = {len(xls_order)} total")
        print()

    # 3. Atualizar os 7 HTMLs
    print("-" * 60)
    print("Atualizando HTMLs...")
    print()

    # Usar PT como base dos textos para os HTMLs
    pt_json_path = os.path.join(script_dir, LANGS["pt"]["json"])
    pt_data = load_json(pt_json_path)

    for lang, info in LANGS.items():
        json_path = os.path.join(script_dir, info["json"])
        lang_data = load_json(json_path)

        html_path = os.path.join(script_dir, info["html"])
        if update_html(html_path, xls_items, lang_data):
            print(f"  OK: {info['html']} ({lang})")
        else:
            print(f"  ERRO: {info['html']}")

    print()
    print("=" * 60)
    print("Concluido! Todos os 7 JSONs e 7 HTMLs atualizados.")
    print("=" * 60)


if __name__ == "__main__":
    main()
