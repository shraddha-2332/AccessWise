#!/bin/bash

# BiasAudit Platform - Quick Setup Script

echo "🚀 BiasAudit Platform Setup"
echo "================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js v18+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend
npm install
cp .env.example .env

echo ""
echo "⚠️  IMPORTANT: Add your Gemini API key to backend/.env"
echo "   Get free key at: https://ai.google.dev/"
echo ""

cd ..

# Setup Frontend
echo "📦 Setting up Frontend..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "🎯 Next Steps:"
echo "1. Add GEMINI_API_KEY to backend/.env"
echo "2. Start backend: cd backend && npm run dev"
echo "3. Start frontend (new terminal): cd frontend && npm run dev"
echo "4. Open http://localhost:5173"
echo ""
echo "Happy coding! 🎉"
