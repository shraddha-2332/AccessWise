@echo off
REM BiasAudit Platform - Quick Setup Script (Windows)

echo.
echo 🚀 BiasAudit Platform Setup
echo =================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found. Please install Node.js v18+ from https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% detected
echo.

REM Setup Backend
echo 📦 Setting up Backend...
cd backend
call npm install
if exist .env (
    echo .env already exists
) else (
    copy .env.example .env
    echo ✅ Created .env (add your GEMINI_API_KEY)
)

cd ..

REM Setup Frontend
echo 📦 Setting up Frontend...
cd frontend
call npm install
cd ..

echo.
echo ✅ Setup Complete!
echo.
echo 🎯 Next Steps:
echo 1. Add GEMINI_API_KEY to backend/.env
echo 2. Start backend: cd backend ^&^& npm run dev
echo 3. Start frontend (new terminal): cd frontend ^&^& npm run dev
echo 4. Open http://localhost:5173
echo.
echo Happy coding! 🎉
echo.
pause
