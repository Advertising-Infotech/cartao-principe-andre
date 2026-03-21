import json
import subprocess
import webbrowser
import time
import os
import sys

def carregar_configuracao(caminho_config="antigravity_chrome_config.json"):
    """Lê as instruções e portas do arquivo de configuração JSON."""
    try:
        with open(caminho_config, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"ERRO: Arquivo de configuração '{caminho_config}' não encontrado no diretório atual.")
        print("Certifique-se de que o arquivo .json está na mesma pasta desse script.")
        sys.exit(1)

def checar_dependencias():
    """Verifica se o Node.js/npm está instalado na máquina atual."""
    try:
        resultado = subprocess.run(["npx", "--version"], capture_output=True, text=True, shell=True)
        if resultado.returncode != 0:
            print("AVISO: 'npx' não parece estar disponível no PATH desta máquina.")
            print("Se o servidor não iniciar, instale o Node.js (https://nodejs.org).")
    except Exception:
        pass

def iniciar_sincronizacao():
    print("======================================================")
    print("INICIANDO Sincronização: Antigravity <-> Chrome")
    print("======================================================")
    
    config = carregar_configuracao()
    checar_dependencias()
    
    dir_projeto = config.get("projeto", {}).get("diretorio_padrao", ".")
    os.chdir(dir_projeto)
    print(f"Diretório de Trabalho definido: {os.getcwd()}")
    
    cmd_start = config.get("servidor", {}).get("comando_start", "npx vite . --port 3000 --host 0.0.0.0")
    url_local = config.get("servidor", {}).get("url_local", "http://localhost:3000")
    tempo_boot = config.get("servidor", {}).get("tempo_boot_segundos", 4)
    
    # Inicia o servidor de desenvolvimento que monitora as pastas
    # Forçamos o NODE_OPTIONS para evitar o erro de memória
    env = os.environ.copy()
    env["NODE_OPTIONS"] = "--max-old-space-size=4096"
    
    # Comando via npx: evita problemas com o script 'dev' do npm em caminhos com '&'
    cmd_start = f'npx vite . --port 3001 --host 0.0.0.0'

    print(f"\n[HOT RELOAD] Levantando servidor Vite com Monitoramento (HMR)...")
    print(f"Comando sendo executado: {cmd_start}\n")
    
    # Adicionamos o diretório atual ao PATH para garantir que o npx encontre os binários
    env["PATH"] = os.path.dirname(sys.executable) + os.pathsep + env.get("PATH", "")
    
    processo_servidor = subprocess.Popen(cmd_start, shell=True, env=env)
    
    # Aguarda alguns segundos para o pacote Node compilar e a porta abrir
    print(f"[AGUARDANDO] Aguardando {tempo_boot} segundos pro servidor compilar o código...")
    time.sleep(tempo_boot)
    
    # Prepara para abrir o Chrome
    preferencia = config.get("navegador", {}).get("preferencia", "chrome")
    caminho_chrome = config.get("navegador", {}).get("caminho_executavel_windows")
    
    print(f"\n[NAVEGADOR] Abrindo projeto no navegador em: {url_local}")
    
    try:
        if preferencia == "chrome" and caminho_chrome and os.path.exists(caminho_chrome):
            webbrowser.register('chrome', None, webbrowser.BackgroundBrowser(caminho_chrome))
            webbrowser.get('chrome').open(url_local)
        else:
            # Fallback para o navegador padrão da máquina
            webbrowser.open(url_local)
    except Exception as e:
        print(f"Aviso: Não consegui focar num navegador específico, abrindo o padrão. ({e})")
        webbrowser.open(url_local)
        
    print("\n[OK] A SINCRONIZAÇÃO ESTÁ ATIVA E ROLANDO!")
    print("DICA: A partir de agora, qualquer alteração que eu (Antigravity) ou você fizer no código")
    print("   vai aparecer instantaneamente no seu Google Chrome, antes mesmo do commit!")
    print("\n[STOP] Pressione [Ctrl+C] nesta janela quando quiser fechar essa conexão.\n")
    
    try:
        # Mantém o script rodando e segurando o processo do Vite
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n\n[OFF] Desligando o link Antigravity <-> Chrome...")
        processo_servidor.terminate()
        print("Servidor desligado com sucesso. Até a próxima!")

if __name__ == "__main__":
    iniciar_sincronizacao()
