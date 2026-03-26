import os
import zipfile
import glob
import sys

def criar_backup_titulos():
    """
    Skill: Backup de Títulos
    Cria o arquivo Titulos.zip na raiz do projeto contendo todos os arquivos JSON de tradução.
    """
    # Define caminhos absolutos baseados na localização deste script (Z:\skills\)
    # O diretório raiz é um nível acima do script
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    json_dir = os.path.join(root_dir, "public", "carrossel")
    dest_zip = os.path.join(root_dir, "Titulos.zip")
    
    print(f"[BUSCANDO] Arquivos para backup em: {json_dir}")
    
    try:
        arquivos = glob.glob(os.path.join(json_dir, "Titulos_*.json"))
        
        if not arquivos:
            print("ERRO: Nenhum arquivo Titulos_*.json encontrado para backup.")
            return

        with zipfile.ZipFile(dest_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for arq in arquivos:
                nome_arquivo = os.path.basename(arq)
                zipf.write(arq, nome_arquivo)
                print(f"   [+] Adicionado: {nome_arquivo}")
        
        print(f"\n[OK] [ORDEM SUPERIOR] Backup '{dest_zip}' criado com sucesso.")
    except Exception as e:
        print(f"[ERRO] Erro crítico ao criar backup: {e}")

if __name__ == "__main__":
    criar_backup_titulos()
