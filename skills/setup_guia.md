# Guia de Inicialização do Projeto - Cartão Príncipe André


subst X: "C:\Users\lagar\OneDrive\Área de Trabalho 2024\BackUp\Advertising TI & CS\Projetos\cartao-principe-andre"
X:
python antigravity_chrome_sync.py



Siga estes passos exatamente na ordem abaixo para configurar seu ambiente e sincronizar o Chrome com o Antigravity.

## Passo 1: Mapear a Rede para o Disco Z:
Se você ainda não tiver o disco Z: mapeado, rode este comando:
```powershell
net use Z: "\\adv01\BackUp\Advertising TI & CS\Projetos\cartao-principe-andre" /persistent:yes
```

## Passo 2: Entrar no Projeto
```powershell
Z:
```

## Passo 3: Garantir o Backup dos Idiomas (Skill)
Antes de começar a editar, garanta que seus arquivos de tradução estão seguros:
```powershell
python skills/backup_titulos.py
```

## Passo 4: Instalar/Atualizar Dependências
Necessário apenas se houver mudanças no `package.json` ou se a pasta `node_modules` sumir:
```powershell
npm install
```

## Passo 5: Sincronizar Chrome e Antigravity
Este comando abre o servidor Vite e o Google Chrome com Hot Reload (HMR) ativo:
```powershell
python antigravity_chrome_sync.py
```

---
### Dicas de Ouro:
- **Se o servidor travar ou der 404:** Pressione `Ctrl+C` e rode o Passo 5 novamente.
- **Se os ícones ou fotos não aparecerem:** Verifique se o Passo 4 (npm install) foi concluído sem erros.
- **Autoridade:** Lembre-se que você está no Disco Z, operando com permissão total sobre a rede.
