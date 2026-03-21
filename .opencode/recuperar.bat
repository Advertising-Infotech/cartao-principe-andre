@echo off
REM ============================================
REM Script de Contexto para Recuperação OpenCode
REM Cartão Príncipe André Luís
REM ============================================

echo ===============================================
echo RECUPERACAO DE CONTEXTO - OPENCODE
echo ===============================================
echo.

echo [INFO] Pasta do projeto:
echo C:\Users\lagar\OneDrive\Área de Trabalho 2024\BackUp\Advertising TI ^& CS\Projetos\cartao-principe-andre
echo.

echo [INFO] Projeto: Cartao Principe Andre
echo [INFO] Stack: Next.js 15 (App Router)
echo [INFO] Hosting: Vercel
echo.

echo [INFO] Arquivo de contexto completo:
echo .opencode\SESSAO_21_03_2026.md
echo.

echo [INFO] Repositorio GitHub:
echo https://github.com/Advertising-Infotech/cartao-principe-andre
echo.

echo [INFO] Comandos para continuar:
echo   npm install
echo   npm run dev
echo.

echo ===============================================
echo Para iniciar nova sessao, cole este conteudo
echo no inicio da conversa com o OpenCode:
echo ===============================================
echo.

type "%~dp0CONTEXTO_PROMPT.txt"

pause
