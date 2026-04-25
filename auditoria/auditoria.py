#!/usr/bin/env python3
"""
Script de Auditoria do Carrossel
============================
Este script audita, atualiza e faz git auto push.

ESPINHA DORSAL: Titulos.xlsx

Uso:
  python auditoria.py --skip-git      # Apenas audita, sem git
  python auditoria.py --auto-push   # Audita e faz commit+push
  python auditoria.py -m "mensagem"  # Audita e commita com mensagem
"""

import os
import sys
import json
import subprocess
import argparse
from pathlib import Path
from datetime import datetime

try:
    import xlrd

    XLS_AVAILABLE = True
except ImportError:
    XLS_AVAILABLE = False

try:
    import openpyxl

    XLSX_AVAILABLE = True
except ImportError:
    XLSX_AVAILABLE = False

# ==================== CONFIG ====================
PROJECT_ROOT = Path(__file__).parent.parent
JSON_DIR = PROJECT_ROOT
JSON_FILES = {
    "pt": PROJECT_ROOT / "Titulos_pt.json",
    "en": PROJECT_ROOT / "Titulos_en.json",
    "es": PROJECT_ROOT / "Titulos_es.json",
    "he": PROJECT_ROOT / "Titulos_he.json",
    "ar": PROJECT_ROOT / "Titulos_ar.json",
    "ru": PROJECT_ROOT / "Titulos_ru.json",
    "zh": PROJECT_ROOT / "Titulos_zh.json",
}

HTML_FILES = {
    "pt": PROJECT_ROOT / "index.html",
    "en": PROJECT_ROOT / "index-en.html",
    "es": PROJECT_ROOT / "index-es.html",
    "he": PROJECT_ROOT / "index-he.html",
    "ar": PROJECT_ROOT / "index-ar.html",
    "ru": PROJECT_ROOT / "index-ru.html",
    "zh": PROJECT_ROOT / "index-zh.html",
}

IDIOMAS = {
    "pt": "Português",
    "en": "Inglês",
    "es": "Espanhol",
    "he": "Hebraico",
    "ar": "Árabe",
    "ru": "Russo",
    "zh": "Chinês",
}


class Cores:
    VERDE = "\033[92m"
    AMARELO = "\033[93m"
    VERMELHO = "\033[91m"
    AZUL = "\033[94m"
    RESET = "\033[0m"
    NEGRITO = "\033[1m"


def log_info(msg):
    print(f"{Cores.AZUL}[INFO]{Cores.RESET} {msg}")


def log_sucesso(msg):
    print(f"{Cores.VERDE}[OK]{Cores.RESET} {msg}")


def log_aviso(msg):
    print(f"{Cores.AMARELO}[AVISO]{Cores.RESET} {msg}")


def log_erro(msg):
    print(f"{Cores.VERMELHO}[ERRO]{Cores.RESET} {msg}")


def log_titulo(msg):
    print(f"\n{Cores.NEGRITO}{'=' * 60}\n{msg}\n{'=' * 60}{Cores.RESET}\n")


# ==================== XLS FUNCTIONS ====================


def ler_titulos():
    registros = []
    xlsx_path = PROJECT_ROOT / "Titulos.xlsx"
    xls_path = PROJECT_ROOT / "Titulos.xls"

    if XLSX_AVAILABLE and xlsx_path.exists():
        try:
            wb = openpyxl.load_workbook(str(xlsx_path))
            ws = wb.active
            for row in ws.iter_rows(min_row=2, values_only=True):
                if row and any(row):
                    registros.append(list(row))
            log_info(f"Lido {len(registros)} registros de Titulos.xlsx")
            return registros
        except Exception as e:
            log_aviso(f"Erro ao ler xlsx: {e}")

    if XLS_AVAILABLE and xls_path.exists():
        try:
            wb = xlrd.open_workbook(str(xls_path))
            ws = wb.sheet_by_index(0)
            for row_idx in range(1, ws.nrows):
                row = ws.row_values(row_idx)
                if any(cell for cell in row if cell):
                    registros.append(row)
            log_info(f"Lido {len(registros)} registros de Titulos.xls")
            return registros
        except Exception as e:
            log_aviso(f"Erro ao ler xls: {e}")

    log_erro("Nenhum arquivo Titulos encontrado!")
    return None


def ler_json(path):
    if not path.exists():
        return []
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def escrever_json(path, dados):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)


# ==================== UPDATE HTML COUNTER ====================


def update_html_counter(html_path, total):
    """Atualiza o contador no HTML (ex: 1 / 46 para 1 / 47)."""
    if not html_path.exists():
        return False

    try:
        content = html_path.read_text(encoding="utf-8")

        # Busca padrão "1 / NUMERO"
        import re

        pattern = r"1\s*/\s*\d+"
        novo_valor = f"1 / {total}"

        nova_content = re.sub(pattern, novo_valor, content)

        if nova_content != content:
            html_path.write_text(nova_content, encoding="utf-8")
            log_sucesso(f"{html_path.name}: contador = {novo_valor}")
            return True
        else:
            log_aviso(f"{html_path.name}: contador já está correto")
            return False
    except Exception as e:
        log_erro(f"Erro ao atualizar {html_path.name}: {e}")
        return False


def atualizar_todos_contadores(total):
    """Atualiza o contador em todos os HTMLs."""
    log_titulo(f"ATUALIZANDO CONTADORES: 1 / {total}")

    atualizados = 0
    for lang, path in HTML_FILES.items():
        if update_html_counter(path, total):
            atualizados += 1

    if atualizados > 0:
        log_sucesso(f"{atualizados} contador(es) atualizado(s)")
        return True
    else:
        log_aviso("Nenhum contador precisou ser atualizado")
        return False


# ==================== GIT FUNCTIONS ====================


def git_status():
    """Mostra status do git."""
    try:
        result = subprocess.run(
            ["git", "status", "--porcelain"],
            cwd=str(PROJECT_ROOT),
            capture_output=True,
            text=True,
            timeout=30,
        )
        if result.returncode != 0:
            return []

        arquivos = []
        for line in result.stdout.strip().split("\n"):
            if line and line.strip():
                path = line[3:].strip()
                if path and not path.startswith(".") and not path.startswith('"'):
                    arquivos.append(path)
        return arquivos
    except Exception as e:
        log_aviso(f"Erro git: {e}")
        return []


def git_add_commit(msg=None):
    """Faz git add e commit."""
    if msg is None:
        msg = f"Atualização automática - {datetime.now().strftime('%Y-%m-%d %H:%M')}"

    # add
    try:
        subprocess.run(
            ["git", "add", "."], cwd=str(PROJECT_ROOT), check=True, timeout=30
        )
    except:
        log_erro("git add falhou")
        return False

    # commit
    try:
        result = subprocess.run(
            ["git", "commit", "-m", msg],
            cwd=str(PROJECT_ROOT),
            capture_output=True,
            text=True,
            timeout=30,
        )
        if result.returncode == 0:
            log_sucesso(f"Commit: {msg}")
            return True
        else:
            if "nothing to commit" in result.stdout.lower():
                log_aviso("Nada para commit")
            else:
                log_aviso(f"Commit: {result.stdout[:200]}")
            return False
    except Exception as e:
        log_erro(f"Erro commit: {e}")
        return False


def git_push():
    """Faz git push."""
    try:
        result = subprocess.run(
            ["git", "push"],
            cwd=str(PROJECT_ROOT),
            capture_output=True,
            text=True,
            timeout=120,
        )
        if result.returncode == 0:
            return True
        else:
            log_erro(f"Push: {result.stderr[:200]}")
            return False
    except Exception as e:
        log_erro(f"Erro push: {e}")
        return False


def git_pull():
    """Faz git pull."""
    try:
        subprocess.run(
            ["git", "pull", "origin", "main"],
            cwd=str(PROJECT_ROOT),
            capture_output=True,
            timeout=60,
        )
        return True
    except:
        return False


# ==================== MAIN ====================


def main():
    parser = argparse.ArgumentParser(description="Audita o carrossel")
    parser.add_argument("--skip-git", action="store_true", help="Pula git")
    parser.add_argument("--auto-push", action="store_true", help="Auto commit+push")
    parser.add_argument(
        "-m", "--msg", type=str, default=None, help="Mensagem de commit"
    )
    parser.add_argument(
        "--no-audit", action="store_true", help="Pula auditoria, só git"
    )
    args = parser.parse_args()

    print(f"\n{Cores.NEGRITO}{Cores.AZUL}{'=' * 60}")
    print("  AUDITORIA DO CARROSSEL")
    print(f"{'=' * 60}{Cores.RESET}\n")

    if not args.no_audit:
        # === AUDITORIA ===
        registros = ler_titulos()
        if registros:
            total = len(registros)
            log_info(f"Total no XLS: {total}")

            # Verifica JSONs
            for lang, path in JSON_FILES.items():
                if path.exists():
                    dados = ler_json(path)
                    log_info(f"{IDIOMAS[lang]}: {len(dados)} registros")

            # Atualiza contadores nos HTMLs
            atualizar_todos_contadores(total)

        # === VERIFICA GIT ===
        log_titulo("VERIFICAÇÃO GIT")

    alterations = git_status()

    if alterations:
        log_info(f"{len(alterations)} arquivo(s) alterado(s):")
        for f in alterations[:20]:
            print(f"  - {f}")
        if len(alterations) > 20:
            print(f"  ... e mais {len(alterations) - 20}")

        if args.auto_push or args.msg:
            # Pull primeiro
            log_aviso("Fazendo pull...")
            git_pull()

            # Commit
            if git_add_commit(args.msg):
                # Push
                if args.auto_push:
                    if git_push():
                        log_sucesso("PUSH CONCLUÍDO!")
                    else:
                        log_erro("PUSH FALHOU!")
                else:
                    log_aviso("Commit feito. Use --auto-push para fazer push")
            else:
                log_aviso("Nada para commit")
        else:
            print(f"\n{Cores.AMARELO}Use:{Cores.RESET}")
            print("  python auditoria.py --auto-push       #Audita + commit + push")
            print("  python auditoria.py -m 'mensagem'   #Audita + commit")
            print("  python auditoria.py --skip-git       #Só audita")
    else:
        log_aviso("Nenhuma alteração detectada")

    print(f"\n{Cores.NEGRITO}{Cores.VERDE}{'=' * 60}")
    print("  CONCLUÍDO")
    print(f"{'=' * 60}{Cores.RESET}\n")

    return 0


if __name__ == "__main__":
    sys.exit(main())
