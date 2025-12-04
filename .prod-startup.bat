@echo off
REM Birthday Website - Production Build & Start Script
REM This script builds and starts the production server

echo.
echo ========================================
echo   Birthday Website - Production Build
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    echo.
    call npm install
    echo.
)

REM Build the application
echo Building application for production...
echo.
call npm run build

if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo Build successful! Starting production server...
echo Server will run on http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

REM Start the production server
call npm start

pause
