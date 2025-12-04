@echo off
REM Birthday Website - Development Startup Script
REM This script automatically starts the development server

echo.
echo ========================================
echo   Birthday Website - Dev Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    echo.
    call npm install
    echo.
)

REM Start the development server
echo Starting development server on http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
