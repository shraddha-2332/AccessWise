# BiasAudit Platform - Installation & Deployment Guide

## 🎯 Local Development Setup

### Prerequisites
- Node.js v18+
- npm or yarn
- Google Gemini API key (free)

### Quick Setup (Windows)
```bash
setup.bat
```

### Quick Setup (Mac/Linux)
```bash
chmod +x setup.sh
./setup.sh
```

### Manual Setup

#### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
npm run dev  # Runs on http://localhost:5000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

---

## 🔑 Getting Gemini API Key

1. Go to https://ai.google.dev/
2. Click "Get API Key"
3. Create new project or select existing
4. Copy API key
5. Paste into `backend/.env` as `GEMINI_API_KEY=your_key_here`

---

## 🚀 Production Deployment

### Option 1: Vercel + Railway (Recommended)

#### Frontend → Vercel
```bash
cd frontend
npm run build
# Drag dist folder to Vercel OR
vercel deploy
```

#### Backend → Railway
1. Go to https://railway.app/
2. Create new project
3. Connect GitHub repository
4. Add environment variables:
   - `GEMINI_API_KEY=...`
   - `NODE_ENV=production`
5. Deploy

### Option 2: Heroku (Alternative)
```bash
# Backend
cd backend
heroku create bias-audit-backend
heroku config:set GEMINI_API_KEY=your_key
git push heroku main

# Frontend
cd frontend
npm run build
heroku create bias-audit-frontend
git push heroku main
```

---

## 📋 Pre-Submission Checklist

- [ ] Backend running locally
- [ ] Frontend running locally
- [ ] API calls working
- [ ] GitHub repo created and public
- [ ] README.md complete
- [ ] PROJECT_REPORT.md filled out
- [ ] .env.example provided (NO sensitive keys!)
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] Demo video recorded (3-5 mins)
- [ ] All code pushed to GitHub

---

## 🧪 Testing

### Backend Health Check
```bash
curl http://localhost:5000/api/health
```

### Test Analysis
```bash
curl -X POST http://localhost:5000/api/bias/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "We need an aggressive salesman", "contentType": "job-posting"}'
```

---

## 🐛 Troubleshooting

### Backend won't start
- Check Node.js version: `node --version`
- Check port 5000 is available
- Ensure .env has GEMINI_API_KEY

### Frontend shows "Cannot reach backend"
- Verify backend is running on port 5000
- Check CORS is enabled in Express
- Browser console for errors

### Gemini API errors
- Verify API key is correct
- Check API quota at https://ai.google.dev/
- Ensure text is < 5000 characters

---

## 📞 Support

For issues, refer to:
- Backend: `backend/README.md`
- Frontend: `frontend/README.md`
- Main: `README.md`

---

Built for Frontend Development using AI 2026 Hackathon
