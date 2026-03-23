"""
Atualizador de Carrossel - Lê Titulos.xls e atualiza os 7 arquivos HTML.
Uso: python atualizar_carrossel.py

Este script:
1. Lê Titulos.xls (coluna A = arquivo, B = badge, C = title, D = desc, E = tag)
2. Gera carouselData em português para index.html
3. Traduz para os 6 outros idiomas usando correspondência POSICIONAL
4. Atualiza o carouselData e o contador em cada página

CORRESPONDÊNCIA POSICIONAL: O item na posição N do Excel busca a tradução
da posição N no arquivo HTML correspondente.
"""

import xlrd
import os
import re

def load_xls(xls_path):
    """Lê o arquivo Titulos.xls e retorna lista de dicionários."""
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

def load_carousel_from_html(html_path):
    """Lê o carouselData de um arquivo HTML e retorna lista de traduções."""
    with open(html_path, 'rb') as f:
        content = f.read()
    
    # Encontrar o início do carouselData
    idx_start = content.find(b'const carouselData = [')
    if idx_start < 0:
        return []
    
    # Encontrar o fim do array
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
    
    carousel_block = content[idx_start:idx_end]
    
    # Extrair cada item individualmente
    translations = []
    # Dividir por }{ para pegar cada item
    text = carousel_block.decode('utf-8', errors='replace')
    
    # Usar regex para extrair todos os itens
    pattern = re.compile(
        r"\{\s*type:\s*'([^']+)',\s*src:\s*'([^']+)',\s*badge:\s*'([^']*)',\s*title:\s*'([^']*)',\s*desc:\s*'([^']*)',\s*tag:\s*'([^']*)'\s*\}",
        re.MULTILINE
    )
    
    for match in pattern.finditer(text):
        translations.append({
            'type': match.group(1),
            'src': match.group(2),
            'badge': match.group(3),
            'title': match.group(4),
            'desc': match.group(5),
            'tag': match.group(6),
        })
    
    return translations

def get_translation_positional(items, lang, html_path):
    """Busca tradução posicional: item N do Excel -> tradução da posição N no HTML."""
    translations = load_carousel_from_html(html_path)
    
    result = []
    for i, item in enumerate(items):
        if i < len(translations):
            t = translations[i]
        else:
            # Não existe tradução — usar PT
            t = item['pt']
            t = {'badge': t['badge'], 'title': t['title'], 'desc': t['desc'], 'tag': t['tag']}
        result.append(t)
    
    return result

def generate_carousel_item(item, texts):
    """Gera uma linha de carouselData para um item."""
    return ("      {{ type: '{type}', src: '{src}', badge: '{badge}', "
            "title: '{title}', desc: '{desc}', tag: '{tag}' }}").format(
        type=item['type'],
        src=item['filename'],
        badge=texts['badge'],
        title=texts['title'],
        desc=texts['desc'],
        tag=texts['tag'],
    )

def update_html_file(html_path, items, texts, lang):
    """Atualiza o carouselData e o contador em um arquivo HTML."""
    # Gerar novo carouselData
    carousel_items = [generate_carousel_item(item, texts[i]) for i, item in enumerate(items)]
    new_carousel_data = "[\n" + ",\n".join(carousel_items) + "\n    ]"
    
    with open(html_path, 'rb') as f:
        content = f.read()
    
    # Encontrar e substituir carouselData
    old_pattern = b'const carouselData = ['
    idx_start = content.find(old_pattern)
    if idx_start < 0:
        print(f"  ERRO: carouselData não encontrado em {html_path}")
        return False
    
    # Encontrar o fim do array ]
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
    
    # Substituir
    new_carousel_data_bytes = ('const carouselData = ' + new_carousel_data).encode('utf-8')
    new_content = content[:idx_start] + new_carousel_data_bytes + content[idx_end:]
    
    # Atualizar contador
    total = len(items)
    old_counter_pattern = re.compile(rb'\d+ / \d+')
    counter_match = old_counter_pattern.search(new_content)
    if counter_match:
        old_counter = counter_match.group(0).decode('ascii')
        parts = old_counter.split(' / ')
        new_counter = parts[0] + ' / ' + str(total)
        new_content = new_content.replace(
            counter_match.group(0),
            new_counter.encode('ascii')
        )
    
    with open(html_path, 'wb') as f:
        f.write(new_content)
    
    return True

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
    
    print("Lendo Titulos.xls...")
    items = load_xls(xls_path)
    print(f"Encontrados {len(items)} itens no Excel.")
    print()
    
    # Mostrar os itens
    print("Itens encontrados:")
    for i, item in enumerate(items):
        print(f"  {i+1:2d}. [{item['type']:5s}] {item['filename']:25s} - {item['pt']['badge']}")
    print()
    
    # Mapear arquivos HTML
    html_files = {
        'pt': 'index.html',
        'en': 'index-en.html',
        'he': 'index-he.html',
        'ar': 'index-ar.html',
        'ru': 'index-ru.html',
        'zh': 'index-zh.html',
        'es': 'index-es.html',
    }
    
    # Carregar traduções de cada idioma
    print("Carregando traduções dos arquivos HTML...")
    all_translations = {}
    for lang, filename in html_files.items():
        if lang == 'pt':
            all_translations[lang] = [item['pt'] for item in items]
        else:
            html_path = os.path.join(script_dir, filename)
            if os.path.exists(html_path):
                translations = load_carousel_from_html(html_path)
                # Verificar se tem traduções suficientes
                if len(translations) == len(items):
                    all_translations[lang] = translations
                    print(f"  {lang} ({filename}): {len(translations)} traduções carregadas")
                elif len(translations) > 0:
                    print(f"  {lang} ({filename}): ATENÇÃO - {len(translations)} traduções (esperado {len(items)})")
                    # Preencher com PT os que faltam
                    while len(translations) < len(items):
                        translations.append(items[len(translations)]['pt'])
                    all_translations[lang] = translations
                else:
                    print(f"  {lang} ({filename}): Nenhuma tradução encontrada, usando PT")
                    all_translations[lang] = [item['pt'] for item in items]
            else:
                print(f"  {lang} ({filename}): ARQUIVO NÃO ENCONTRADO, usando PT")
                all_translations[lang] = [item['pt'] for item in items]
    print()
    
    # Atualizar cada arquivo HTML
    print("Atualizando arquivos HTML...")
    for lang, filename in html_files.items():
        html_path = os.path.join(script_dir, filename)
        if os.path.exists(html_path):
            texts = all_translations[lang]
            success = update_html_file(html_path, items, texts, lang)
            if success:
                print(f"  OK: {filename} ({lang}) - {len(items)} itens")
            else:
                print(f"  FALHA: {filename}")
        else:
            print(f"  IGNORADO: {filename} (não encontrado)")
    
    print()
    print("=" * 60)
    print("Atualização concluída!")
    print("=" * 60)

if __name__ == '__main__':
    main()
