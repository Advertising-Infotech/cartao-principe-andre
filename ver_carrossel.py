# -*- coding: cp1252 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')

def show_carousel_titles(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    start = content.find('carouselData = [')
    end = content.find('];', start) + 2
    data = content[start:end]
    
    print(f"\n=== {filepath} - carouselData ===")
    # Print line by line for each item
    import re
    items = re.findall(r"title:\s*'([^']*)'", data)
    for i, title in enumerate(items, 1):
        print(f"  {i}. {title}")

if __name__ == '__main__':
    files = ['index.html', 'index-en.html', 'index-he.html', 'index-ar.html', 
             'index-ru.html', 'index-zh.html', 'index-es.html']
    for f in files:
        try:
            show_carousel_titles(f)
        except Exception as e:
            print(f"Erro em {f}: {e}")
