@echo off
chcp 65001 >nul 2>&1
setlocal EnableDelayedExpansion

REM ================================================
REM SISTEMA DE RECUPERAÇÃO DE SESSÃO - OPENCODE
REM Projeto: Cartão Príncipe André Luís
REM Atualizado: 21/03/2026
REM ================================================

set "PROJECT_DIR=C:\Users\lagar\OneDrive\Área de Trabalho 2024\BackUp\Advertising TI & CS\Projetos\cartao-principe-andre"
set "HISTORY_FILE=.opencode\HISTORICO.md"
set "CONTEXT_FILE=.opencode\CONTEXTO.txt"

title ===============================================
title  RECUPERACAO DE SESSAO - Cartao Principe Andre
title ===============================================

echo.
echo  *********************************************
echo  *     SISTEMA DE RECUPERACAO DE SESSAO     *
echo  *     Cartao Principe Andre Luis           *
echo  *********************************************
echo.

REM Verificar pasta
cd /d "%PROJECT_DIR%" 2>nul
if errorlevel 1 (
    echo [ERRO] Pasta do projeto NAO encontrada!
    echo.
    echo Pasta esperada:
    echo %PROJECT_DIR%
    echo.
    echo Pressione ENTER para sair...
    pause >nul
    exit /b 1
)

echo [OK] Projeto encontrado: %PROJECT_DIR%
echo.

REM ================================================
REM MENU PRINCIPAL
REM ================================================

:menu
cls
echo.
echo  *********************************************
echo  *     SISTEMA DE RECUPERACAO DE SESSAO     *
echo  *     Cartao Principe Andre Luis           *
echo  *********************************************
echo.
echo  Ultimo commit:
for /f "tokens=1* delims=:" %%a in ('git log --oneline -1 2^>nul') do (
    echo  %%a:%%b
)
echo.

echo  ----------------------------------------------
echo  MENU DE OPCOES:
echo  ----------------------------------------------
echo.
echo  [1] Ver Historico Completo de Sessoes
echo  [2] Ver Contexto para Nova Sessao
echo  [3] Copiar PROMPT para OpenCode (CLIPBOARD)
echo  [4] Verificar Status Git
echo  [5] Ver Ultimo Commit
echo  [6] Ver Commits Recentes
echo.
echo  [7] npm install
echo  [8] npm run build
echo  [9] npm run dev
echo.
echo  [A] Abrir Vercel Dashboard
echo  [B] Abrir GitHub
echo  [C] Abrir Pasta do Projeto
echo  [D] Abrir Pasta .opencode
echo.
echo  [S] Atualizar Historico (Nova Sessao)
echo  [L] Ver Logs Build Local
echo.
echo  [0] SAIR
echo.
echo  ----------------------------------------------

set /p choice="Escolha uma opcao: "

if /i "%choice%"=="1" goto ver_historico
if /i "%choice%"=="2" goto ver_contexto
if /i "%choice%"=="3" goto copiar_prompt
if /i "%choice%"=="4" goto git_status
if /i "%choice%"=="5" goto git_last
if /i "%choice%"=="6" goto git_log
if /i "%choice%"=="7" goto npm_install
if /i "%choice%"=="8" goto npm_build
if /i "%choice%"=="9" goto npm_dev
if /i "%choice%"=="A" goto vercel_dash
if /i "%choice%"=="B" goto github
if /i "%choice%"=="C" goto explorer_proj
if /i "%choice%"=="D" goto explorer_open
if /i "%choice%"=="S" goto atualizar
if /i "%choice%"=="L" goto ver_logs
if /i "%choice%"=="0" goto fim

echo.
echo [ERRO] Opcao invalida!
timeout /t 2 >nul
goto menu

REM ================================================
REM FUNCOES
REM ================================================

:ver_historico
cls
echo.
echo  *********************************************
echo  *       HISTORICO DE SESSOES               *
echo  *********************************************
echo.
type "%HISTORY_FILE%"
echo.
echo.
echo Pressione ENTER para voltar...
pause >nul
goto menu

:ver_contexto
cls
echo.
echo  *********************************************
echo  *    CONTEXTO PARA NOVA SESSAO             *
echo  *********************************************
echo.
type "%CONTEXT_FILE%"
echo.
echo.
echo Pressione ENTER para voltar...
pause >nul
goto menu

:copiar_prompt
cls
echo.
echo  *********************************************
echo  *    COPIE O PROMPT ABAIXO                 *
echo  *    COLE NO OPENCODE                      *
echo  *********************************************
echo.
powershell -Command "Set-Clipboard -Value (Get-Content '%CONTEXT_FILE%' -Raw)"
echo [OK] Contexto copiado para CLIPBOARD!
echo.
echo Cole o conteudo no inicio de uma nova sessao.
echo.
echo Pressione ENTER para voltar...
pause >nul
goto menu

:git_status
cls
echo.
echo  *********************************************
echo  *       STATUS GIT                          *
echo  *********************************************
echo.
git status
echo.
echo Pressione ENTER para voltar...
pause >nul
goto menu

:git_last
cls
echo.
echo  *********************************************
echo  *       ULTIMO COMMIT                       *
echo  *********************************************
echo.
git log --oneline -1
echo.
echo Detalhes:
git show --stat --oneline -1
echo.
echo Pressione ENTER para voltar...
pause >nul
goto menu

:git_log
cls
echo.
echo  *********************************************
echo  *       COMMITS RECENTES                    *
echo  *********************************************
echo.
git log --oneline -10
echo.
echo Pressione ENTER para voltar...
pause >nul
goto menu

:npm_install
cls
echo.
echo  *********************************************
echo  *       NPM INSTALL                         *
echo  *********************************************
echo.
echo [INFO] Executando npm install...
echo.
call npm install
if errorlevel 1 (
    echo.
    echo [ERRO] npm install falhou!
) else (
    echo.
    echo [OK] npm install concluido!
)
echo.
echo Pressione ENTER para voltar...
pause >nul
goto menu

:npm_build
cls
echo.
echo  *********************************************
echo  *       NPM RUN BUILD                       *
echo  *********************************************
echo.
echo [INFO] Executando build...
echo.
call npm run build > build.log 2>&1
type build.log
echo.
echo [INFO] Build completo! Verifique acima.
echo.
echo Pressione ENTER para voltar...
pause >nul
goto menu

:npm_dev
cls
echo.
echo  *********************************************
echo  *       NPM RUN DEV                         *
echo  *********************************************
echo.
echo [INFO] Iniciando servidor de desenvolvimento...
echo Acesse: http://localhost:3000
echo.
echo Pressione CTRL+C para parar.
echo.
call npm run dev
goto menu

:vercel_dash
start https://vercel.com/Advertising-Infotech/cartao-principe-andre
echo [OK] Vercel Dashboard aberto!
goto menu

:github
start https://github.com/Advertising-Infotech/cartao-principe-andre
echo [OK] GitHub aberto!
goto menu

:explorer_proj
explorer "%PROJECT_DIR%"
goto menu

:explorer_open
explorer "%PROJECT_DIR%\.opencode"
goto menu

:ver_logs
cls
echo.
echo  *********************************************
echo  *       LOGS DO BUILD                       *
echo  *********************************************
echo.
if exist build.log (
    type build.log
) else (
    echo Nenhum log encontrado. Execute 'npm run build' primeiro.
)
echo.
echo Pressione ENTER para voltar...
pause >nul
goto menu

:atualizar
cls
echo.
echo  *********************************************
echo  *       ATUALIZAR HISTORICO                 *
echo  *********************************************
echo.
echo Informe o resumo da sessao:
echo.
set /p "session_note===> "

(
    echo.
    echo.>>"%HISTORY_FILE%"
    echo =============================================>>"%HISTORY_FILE%"
    echo NOVA SESSAO - %date% %time%>>"%HISTORY_FILE%"
    echo =============================================>>"%HISTORY_FILE%"
    echo.>>"%HISTORY_FILE%"
    echo %session_note%>>"%HISTORY_FILE%"
    echo.>>"%HISTORY_FILE%"
) 2>nul

echo.
echo [OK] Historico atualizado!
echo.
timeout /t 2 >nul
goto menu

:fim
endlocal
cls
echo.
echo  *********************************************
echo  *           ate a proxima!                  *
echo  *********************************************
echo.
exit /b 0
