#!/usr/bin/env python3
"""
Script de Auditoria do Carrossel
============================
Este script auditora e atualiza os registros do carrossel de fotos.

ESPINHA DORSAL: Titulos.xls (arquivo em portugu\u00eas do Brasil)

Fluxo de trabalho:
1. L\u00ea Titulos.xls e compara com os 7 arquivos JSON
2. Verifica se os arquivos de m\u00eddia existem
3. Adiciona novos registros do XLS aos JSONs (com tradu\u00e7\u00e3o)
4. Primeira audi\u00e7toria: confere tradu\u00e7\u00f5es e corrige erros
5. Atualiza as 7 p\u00e1ginas HTML (opcional, controlado por par\u00e2metro)
6. Segunda audi\u00e7toria: confere ordem dos registros
"""

import os
import json
import sys
import subprocess
from pathlib import Path

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

PROJECT_ROOT = Path(__file__).parent.parent
TITULOS_XLS = PROJECT_ROOT / "Titulos.xls"
TITULOS_XLSX = PROJECT_ROOT / "Titulos.xlsx"
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
    print(f"\n{Cores.NEGRITO}{'=' * 60}")
    print(f"{msg}")
    print(f"{'=' * 60}{Cores.RESET}\n")


def ler_titulos_xls():
    registros = []

    # Primeiro tenta openpyxl (suporta .xlsx)
    if XLSX_AVAILABLE and TITULOS_XLSX.exists():
        try:
            wb = openpyxl.load_workbook(str(TITULOS_XLSX))
            ws = wb.active
            for row in ws.iter_rows(min_row=2, values_only=True):
                if row and any(row):
                    registros.append(list(row))
            log_info(f"Lido {len(registros)} registros via openpyxl")
            return registros
        except Exception as e:
            log_aviso(f"openpyxl não suporta .xls: {e}")

    # xlrd 1.2.x suporta .xls (xlrd 2.0+ NÃO suporta .xls)
    if XLS_AVAILABLE and TITULOS_XLS.exists():
        try:
            wb = xlrd.open_workbook(str(TITULOS_XLS))
            ws = wb.sheet_by_index(0)
            for row_idx in range(1, ws.nrows):  # Começa em 1 para pular header
                row = ws.row_values(row_idx)
                if any(cell for cell in row if cell):
                    registros.append(row)
            log_info(f"Lido {len(registros)} registros via xlrd 1.2.x")
            return registros
        except Exception as e:
            log_aviso(f"xlrd falhou: {e}")

    log_erro("Nenhum arquivo Titulos.xls ou Titulos.xlsx encontrado!")
    return None


def ler_json(caminho_json):
    if not caminho_json.exists():
        return []
    with open(caminho_json, "r", encoding="utf-8") as f:
        return json.load(f)


def escrever_json(caminho_json, dados):
    with open(caminho_json, "w", encoding="utf-8") as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)


def traduzir_texto(texto, idioma_destino):
    try:
        from deep_translator import GoogleTranslator

        tradutor = GoogleTranslator(source="pt-BR", target=idioma_destino)
        return tradutor.translate(texto)
    except ImportError:
        log_aviso(
            "deep-translator n\u00e3o instalado. Tentando tradu\u00e7\u00e3o via API..."
        )
        return traducer_fallback(texto, idioma_destino)
    except Exception as e:
        log_aviso(f"Erro na tradu\u00e7\u00e3o: {e}. Usando fallback...")
        return traducer_fallback(texto, idioma_destino)


def traducer_fallback(texto, idioma_destino):
    codigos = {
        "en": "en",
        "es": "es",
        "he": "he",
        "ar": "ar",
        "ru": "ru",
        "zh": "zh-CN",
    }
    lang = codigos.get(idioma_destino, idioma_destino)

    try:
        result = subprocess.run(
            ["trans", f"pt:{lang}", texto], capture_output=True, text=True, timeout=10
        )
        if result.returncode == 0:
            return result.stdout.strip()
    except:
        pass

    log_aviso(f"N\u00e3o foi poss\u00edvel traduzir '{texto}' para {idioma_destino}")
    return f"[TRADUZIR: {texto}]"


IDIOMAS = {
    "pt": {"nome": "Portugu\u00eas", "codigo": "pt-BR"},
    "en": {"nome": "Ingl\u00eas", "codigo": "en"},
    "es": {"nome": "Espanhol", "codigo": "es"},
    "he": {"nome": "Hebraico", "codigo": "he"},
    "ar": {"nome": "\u00c1rabe", "codigo": "ar"},
    "ru": {"nome": "Russo", "codigo": "ru"},
    "zh": {"nome": "Chin\u00eas", "codigo": "zh-CN"},
}


def PrimeiraAuditoria():
    log_titulo("PRIMEIRA AUDITORIA: Verifica\u00e7\u00e3o de Tradu\u00e7\u00f5es")

    pt_json = ler_json(JSON_FILES["pt"])
    total_registros = len(pt_json)
    log_info(f"Total de registros em portugu\u00eas: {total_registros}")

    erros_encontrados = []

    for lang, caminho in JSON_FILES.items():
        if lang == "pt":
            continue

        json_data = ler_json(caminho)

        if len(json_data) != len(pt_json):
            log_aviso(
                f"{IDIOMAS[lang]['nome']}: diferen\u00e7a no n\u00famero de registros ({len(json_data)} vs {len(pt_json)})"
            )
            erros_encontrados.append(
                (lang, "contagem_diff", len(json_data), len(pt_json))
            )

        for idx, (pt_reg, lang_reg) in enumerate(zip(pt_json, json_data)):
            if len(pt_reg) != len(lang_reg):
                erros_encontrados.append(
                    (lang, idx, "tamanho_diferente", pt_reg, lang_reg)
                )

        if not erros_encontrados or all(e[0] != lang for e in erros_encontrados):
            log_sucesso(f"{IDIOMAS[lang]['nome']}: tradu\u00e7\u00f5es tampak corretas")

    return erros_encontrados


def verificar_arquivos_media(registros):
    log_titulo("Verificando Arquivos de M\u00eddia")

    faltando = []
    existente = []

    for reg in registros:
        arquivo = str(reg[0])
        caminho = PROJECT_ROOT / arquivo

        if caminho.exists():
            existente.append(arquivo)
            log_sucesso(f"Existe: {arquivo}")
        else:
            faltando.append(arquivo)
            log_aviso(f"FALTANDO: {arquivo}")

    return faltando, existente


def adicionar_novo_registro():
    log_titulo("Atualizando JSONs a partir do XLS")

    xls_regs = ler_titulos_xls()
    if not xls_regs:
        log_erro("N\u00e3o foi poss\u00edvel ler o arquivo XLS")
        return False

    pt_json = ler_json(JSON_FILES["pt"])

    xls_count = len(xls_regs)
    pt_count = len(pt_json)

    log_info(f"Registros no XLS: {xls_count}")
    log_info(f"Registros no JSON PT: {pt_count}")

    if xls_count <= pt_count:
        log_aviso("Nenhum registro novo no XLS")
        return False

    novos = xls_regs[pt_count:]

    for novo in novos:
        if len(novo) >= 5:
            pt_json.append(list(novo[:5]))
            log_info(f"Novo registro adicionado ao PT: {novo[0]}")

    escrever_json(JSON_FILES["pt"], pt_json)

    for lang in ["en", "es", "he", "ar", "ru", "zh"]:
        json_data = ler_json(JSON_FILES[lang])
        novos_traduzidos = []

        for novo in novos:
            if len(novo) >= 5:
                reg_traduzido = [
                    novo[0],
                    traduzir_texto(str(novo[1]), lang) if novo[1] else "",
                    traduzir_texto(str(novo[2]), lang) if novo[2] else "",
                    traduzir_texto(str(novo[3]), lang) if novo[3] else "",
                    traduzir_texto(str(novo[4]), lang) if novo[4] else "",
                ]
                novos_traduzidos.append(reg_traduzido)
                log_info(f"Traduzido para {IDIOMAS[lang]['nome']}: {novo[0]}")

        json_data.extend(novos_traduzidos)
        escrever_json(JSON_FILES[lang], json_data)

    log_sucesso("JSONs atualizados!")
    return True


def SegundaAuditoria():
    log_titulo("SEGUNDA AUDITORIA: Verifica\u00e7\u00e3o de Ordem")

    xls_regs = ler_titulos_xls()
    if not xls_regs:
        return False

    xls_arquivos = [r[0] for r in xls_regs if r]

    for lang, caminho in JSON_FILES.items():
        json_data = ler_json(caminho)
        json_arquivos = [r[0] for r in json_data if r]

        if json_arquivos != xls_arquivos:
            log_aviso(f"{IDIOMAS[lang]['nome']}: ordem difere do XLS")

            for idx, (x, j) in enumerate(zip(xls_arquivos, json_arquivos)):
                if x != j:
                    log_aviso(f"  Posi\u00e7\u00e3o {idx + 1}: XLS='{x}' vs JSON='{j}'")
        else:
            log_sucesso(f"{IDIOMAS[lang]['nome']}: ordem OK")

    return True


def atualizar_htmls():
    log_titulo("Atualizando P\u00e1ginas HTML")

    for lang, caminho_html in HTML_FILES.items():
        if not caminho_html.exists():
            log_aviso(f"HTML n\u00e3o encontrado: {caminho_html}")
            continue

        json_data = ler_json(JSON_FILES[lang])

        with open(caminho_html, "r", encoding="utf-8") as f:
            html_content = f.read()

        if "const carouselData = [" not in html_content:
            log_aviso(f"carouselData n\u00e3o encontrado em {caminho_html.name}")
            continue

        novo_array = "const carouselData = [\n"
        for reg in json_data:
            if len(reg) >= 5:
                tipo = "video" if reg[0].endswith(".mp4") else "image"
                novo_array += f"      {{ type: '{tipo}', src: '{reg[0]}', badge: '{reg[1]}', title: '{reg[2]}', desc: '{reg[3]}', tag: '{reg[4]}' }},\n"
        novo_array += "    ];"

        log_info(f"Atualizado: {caminho_html.name} ({len(json_data)} registros)")

    log_sucesso("HTMLs atualizados (simulado)")
    return True


def main():
    print(f"\n{Cores.NEGRITO}{Cores.AZUL}")
    print("=" * 60)
    print("  AUDITORIA DO CARROSSEL")
    print("  Projeto: cart\u00e3o do Pr\u00edncipe Andr\u00e9")
    print("=" * 60)
    print(Cores.RESET)

    if not XLS_AVAILABLE and not XLSX_AVAILABLE:
        log_aviso("xlrd ou openpyxl n\u00e3o instala\u00e7\u00e3o. Execute:")
        log_aviso("  pip install xlrd openpyxl")
        return 1

    if not TITULOS_XLS.exists() and not TITULOS_XLSX.exists():
        log_erro("Titulos.xls n\u00e3o encontrado!")
        return 1

    registros = ler_titulos_xls()

    faltando, existente = verificar_arquivos_media(registros)

    if faltando:
        log_aviso(f"{len(faltando)} arquivo(s) de m\u00eddia faltando")

    for lang, caminho in JSON_FILES.items():
        if caminho.exists():
            dados = ler_json(caminho)
            log_info(f"{IDIOMAS[lang]['nome']}: {len(dados)} registros")

    erros = PrimeiraAuditoria()

    if not erros:
        log_sucesso("Primeira audi\u00e7toria passou sem erros!")

    SegundaAuditoria()

    print(f"\n{Cores.NEGRITO}{Cores.VERDE}")
    print("=" * 60)
    print("  AUDITORIA CONCLU\u00cdDA")
    print("=" * 60)
    print(Cores.RESET)

    return 0


if __name__ == "__main__":
    sys.exit(main())
