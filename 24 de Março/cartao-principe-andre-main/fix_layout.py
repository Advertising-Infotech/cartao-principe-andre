import os
import re

base = os.path.dirname(os.path.abspath(__file__))

files = [
    'index.html',
    'index-he.html',
    'index-en.html',
    'index-ar.html',
    'index-ru.html',
    'index-zh.html',
    'index-es.html',
]

for fname in files:
    fpath = os.path.join(base, fname)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the action-grid div block
    ag_start_marker = 'class="action-grid"'
    ag_idx = content.find(ag_start_marker)
    if ag_idx == -1:
        print(f"[SKIP] {fname}: action-grid not found")
        continue

    # Go back to find the opening < of the div
    div_open = content.rfind('<', 0, ag_idx)
    
    # Find matching closing </div> by counting depth
    pos = div_open
    depth = 0
    ag_end = -1
    i = pos
    while i < len(content):
        if content[i:i+4] == '<div':
            depth += 1
            i += 4
        elif content[i:i+6] == '</div>':
            depth -= 1
            if depth == 0:
                ag_end = i + 6
                break
            i += 6
        else:
            i += 1

    if ag_end == -1:
        print(f"[SKIP] {fname}: could not find closing div for action-grid")
        continue

    action_grid_block = content[div_open:ag_end]
    
    # Find the carousel div
    car_marker = 'class="carousel"'
    car_idx = content.find(car_marker)
    if car_idx == -1:
        print(f"[SKIP] {fname}: carousel not found")
        continue
    
    car_div_open = content.rfind('<', 0, car_idx)
    
    # Find matching closing </div> for carousel
    pos2 = car_div_open
    depth2 = 0
    car_end = -1
    j = pos2
    while j < len(content):
        if content[j:j+4] == '<div':
            depth2 += 1
            j += 4
        elif content[j:j+6] == '</div>':
            depth2 -= 1
            if depth2 == 0:
                car_end = j + 6
                break
            j += 6
        else:
            j += 1

    if car_end == -1:
        print(f"[SKIP] {fname}: could not find closing div for carousel")
        continue

    # Verify action-grid is BEFORE carousel
    if div_open > car_div_open:
        print(f"[SKIP] {fname}: action-grid is already after carousel")
        continue

    # Remove action-grid from its current position (and any surrounding whitespace/newlines)
    # Find the start of the line for action-grid
    line_start = content.rfind('\n', 0, div_open)
    if line_start == -1:
        line_start = 0
    else:
        line_start += 1  # skip the newline itself
    
    # Find the end (skip trailing newline)
    after_ag = ag_end
    if after_ag < len(content) and content[after_ag] == '\n':
        after_ag += 1

    removed_block = content[line_start:after_ag]
    
    # Remove the block
    new_content = content[:line_start] + content[after_ag:]
    
    # Now find the carousel end position in the NEW content
    car_marker_idx_new = new_content.find(car_marker)
    car_div_open_new = new_content.rfind('<', 0, car_marker_idx_new)
    
    depth3 = 0
    car_end_new = -1
    k = car_div_open_new
    while k < len(new_content):
        if new_content[k:k+4] == '<div':
            depth3 += 1
            k += 4
        elif new_content[k:k+6] == '</div>':
            depth3 -= 1
            if depth3 == 0:
                car_end_new = k + 6
                break
            k += 6
        else:
            k += 1

    if car_end_new == -1:
        print(f"[ERROR] {fname}: could not find carousel end in new content")
        continue

    # Insert action-grid block after carousel
    new_content = new_content[:car_end_new] + '\n' + removed_block + new_content[car_end_new:]
    
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"[OK] {fname}: moved action-grid below carousel")

print("\nDone!")
