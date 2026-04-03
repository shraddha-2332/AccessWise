# BiasAudit: Hidden Bias Detector Platform

## 🎯 Project Overview

**BiasAudit** is an AI-powered web platform that detects hidden biases in written content. It analyzes text for gender, age, racial, disability, and socioeconomic biases, provides actionable suggestions, and promotes inclusive communication.

### Why This Project Wins the Hackathon

✅ **Unique & Less Competition**: Focuses on bias detection (ethical AI), not generic misinformation  
✅ **Real-World Impact**: Practical for HR, journalism, content creation, marketing  
✅ **Frontend Excellence**: Beautiful UI with interactive dashboards, animations, highlighting  
✅ **AI Transparency**: Shows exactly WHY content is biased + suggests fixes  
✅ **SDG Alignment**: SDG 5 (Gender Equality), SDG 10 (Reduce Inequalities), SDG 16 (Peace & Justice)  
✅ **Demo Power**: Paste job posting → See hidden biases → Get fair rewrites  
✅ **Buildable**: 1-2 person team, 2 weeks, using free APIs

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+ & npm
- **Google Gemini API key** (free tier available)
- **Git**

### Installation

#### Step 1: Clone & Navigate
```bash
cd bias-audit-platform
```

#### Step 2: Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your Gemini API key to .env
# GEMINI_API_KEY=your_actual_api_key_here
# Get free key at: https://ai.google.dev/

# Start backend (runs on port 5000)
npm run dev
```

#### Step 3: Frontend Setup (New Terminal)
```bash
cd frontend

# Install dependencies
npm install

# Start frontend (runs on port 5173)
npm run dev
```

#### Step 4: Open App
Navigate to `http://localhost:5173`

---

## 📊 Key Features

### 1. Multi-Type Bias Detection
- **Gender Bias**: Gendered language, stereotypes
- **Age Bias**: Age discrimination, stereotyping
- **Racial Bias**: Ethnic discrimination
- **Disability Bias**: Ableist language, assumptions
- **Socioeconomic Bias**: Class-based language
- **Ability Bias**: Assumptions about physical/mental abilities

### 2. Interactive Analysis Dashboard
- **Bias Score**: 0-100 gauge showing overall bias level
- **Risk Level**: LOW / MEDIUM / HIGH classification
- **Category Breakdown**: Pie chart of bias types
- **Severity Distribution**: Bar chart showing low/medium/high instances

### 3. Detailed Bias Insights
- Exact biased phrases highlighted with context
- Clear explanation of WHY each phrase is biased
- **Suggested replacements** with one-click copy
- Educational tips tied to each bias type

### 4. Educational Module
- Learn about different bias types
- Real examples of biased vs. neutral language
- Tips for writing inclusively

### 5. Content Type Support
- Job Postings
- Articles / News
- Social Media Posts
- Marketing Copy
- General Text

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization
- **Axios** - HTTP client

### Backend
- **Node.js Express** - REST API server
- **Google Generative AI (Gemini)** - AI analysis
- **CORS** - Cross-origin support

### Deployment Ready
- GitHub Actions for CI/CD
- Vercel for frontend
- Railway/Render for backend

---

## 📁 Project Structure

```
bias-audit-platform/
│
├── backend/
│   ├── server.js                 # Express server entry
│   ├── package.json              # Backend dependencies
│   ├── .env.example              # Environment template
│   ├── controllers/
│   │   └── biasController.js     # AI analysis logic
│   ├── routes/
│   │   └── biasAnalysis.js       # API endpoints
│   └── middleware/               # Error handling, etc.
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # React entry point
│   │   ├── index.css             # Global styles
│   │   ├── components/
│   │   │   ├── TextInputForm.jsx      # Input & upload
│   │   │   ├── BiasAnalysisResult.jsx # Results dashboard
│   │   │   ├── LoadingSpinner.jsx     # Loading state
│   │   │   └── EducationalPanel.jsx   # Learning content
│   │   └── utils/
│   ├── index.html                # HTML template
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js        # Tailwind config
│   ├── package.json              # Frontend dependencies
│   └── postcss.config.js         # PostCSS config
│
└── README.md                     # This file
```

---

## 🔌 API Endpoints

### POST `/api/bias/analyze`
Analyzes text for biases.

**Request:**
```json
{
  "text": "We need an aggressive salesman",
  "contentType": "job-posting"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overallBiasScore": 72,
    "riskLevel": "MEDIUM",
    "biases": [
      {
        "category": "gender",
        "severity": "high",
        "biasedPhrase": "aggressive salesman",
        "explanation": "Uses gendered language ('salesman') and stereotypical adjective ('aggressive')...",
        "suggestedReplacement": "results-driven sales professional",
        "startIndex": 7,
        "endIndex": 26
      }
    ],
    "summary": "This text contains gender bias through gendered job titles and stereotypical language.",
    "educationalTip": "Use gender-neutral job titles and focus on required skills, not gendered stereotypes."
  }
}
```

### GET `/api/bias/education`
Returns educational content about bias types.

### GET `/api/bias/history`
Returns user's analysis history (database implementation pending).

---

## 🎨 UI/UX Highlights

### Design Philosophy
- **Dark theme** with blue accents (trust, fairness)
- **Smooth animations** (Framer Motion) for engagement
- **Color-coded biases** for quick pattern recognition
- **Interactive charts** showing data at a glance
- **Mobile-responsive** design

### Key Screens
1. **Home**: Hero + input form + educational panel
2. **Analysis Results**: Bias score gauge + charts + detailed breakdown
3. **Expanded Bias Details**: Why it's biased + suggestions + copy button
4. **Educational Guide**: Tips on inclusive writing

---

## 🚀 Deployment (For Submission)

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Drag 'dist' folder to Vercel
```

### Backend (Railway / Render)
```bash
# Link backend repository to Railway/Render
# Set environment variables (GEMINI_API_KEY)
# Auto-deploy on push
```

### GitHub Repository Setup
```bash
git init
git add .
git commit -m "Initial BiasAudit commit"
git remote add origin https://github.com/{your-username}/bias-audit-platform
git push -u origin main
```

---

## 📝 Hackathon Submission Checklist

- [ ] Backend deployed & API working
- [ ] Frontend deployed & responsive
- [ ] GitHub repo public with clean code
- [ ] Demo video (3-5 mins) showing:
  - Pasting job posting with gender bias
  - System detecting bias
  - Showing suggestions
  - Educational tips
- [ ] Project Report (PDF) including:
  - Problem statement: Bias in written content
  - Solution: BiasAudit AI detector
  - AI tools used: Google Gemini API
  - Features: Multi-type bias detection, suggestions, education
  - SDG alignment: 5, 10, 16
  - Future scope: Database, browser extension, API-as-a-service

---

## 🤝 Contributing

Pull requests welcome! Areas for contribution:
- Database integration for history
- Browser extension version
- Advanced NLP models
- Multi-language support
- API tier system

---

## 📄 License

MIT License - Open source for educational purposes.

---

## 🏆 Why BiasAudit Wins

| Aspect | Why We Win |
|--------|-----------|
| **Uniqueness** | Ethical AI focus, not generic AI chatbot |
| **Real Problem** | Bias exists everywhere; addresses real need |
| **Frontend Focus** | Beautiful UI, animations, adata viz = judges love |
| **AI Clarity** | Explainability built-in (judges want transparency) |
| **Impact** | Can help companies, journalists, educators |
| **Buildable** | Done in 2 weeks, scalable architecture |
| **Demo Quality** | Impressive 3-5 min demo with clear results |
| **Ethical Angle** | CSR judges appreciate fairness + inclusion |

---

## 📞 Support

For questions or issues:
- Check GitHub Issues
- Review documentation
- Test with provided examples

---

**Built with ❤️ for Frontend Development using AI 2026 Hackathon**
