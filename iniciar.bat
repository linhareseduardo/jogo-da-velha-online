@echo off
echo ========================================
echo  JOGO DA VELHA ONLINE - INICIALIZACAO
echo ========================================
echo.

REM Verifica se Node está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Por favor, instale Node.js de: https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Node.js encontrado
echo.

REM Verifica se node_modules existe
if not exist "node_modules\" (
    echo [AVISO] Dependencias nao instaladas
    echo Instalando dependencias...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERRO] Falha ao instalar dependencias
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencias instaladas
    echo.
)

echo ========================================
echo  INICIANDO SERVIDOR E FRONTEND
echo ========================================
echo.
echo Servidor: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Pressione Ctrl+C para parar
echo ========================================
echo.

REM Inicia servidor e frontend simultaneamente
call npm run dev:all

pause
