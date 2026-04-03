# Deployment Guide

## 🚀 Quick Deployment (Recommended for Hackathon)

Both **Railway** (backend) and **Vercel** (frontend) offer **automatic deployments from GitHub**. Here's the simplest setup:

---

## Backend → Railway (Node.js)

### 1. Create Railway Project
1. Go to https://railway.app/
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub account
5. Select `bias-audit-platform` repository

### 2. Configure Environment
1. In Railway dashboard, go to "Variables"
2. Add: `GEMINI_API_KEY=your_actual_key_here`
3. Railway will auto-deploy on every push to `main` branch

### 3. Get Your Backend URL
- Railway gives you a URL automatically
- It will be something like: `https://bias-audit-backend.up.railway.app`
- This is your `REACT_APP_API_URL` for frontend

---

## Frontend → Vercel (React)

### 1. Add Vercel Configuration
Create `frontend/vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@vite_api_url"
  }
}
```

### 2. Create Vercel Project
1. Go to https://vercel.com/
2. Click "Add New" → "Project"
3. Select "Import Git Repository"
4. Select `bias-audit-platform`
5. Select `frontend` as root directory

### 3. Configure Environment
1. In Vercel project settings, go to "Environment Variables"
2. Add: `VITE_API_URL=https://your-railway-backend-url.com`
3. Vercel will auto-deploy on every push to `main` branch

### 4. Update Frontend Code
Edit `frontend/src/components/TextInputForm.jsx`:

Find this line:
```javascript
const response = await axios.post('http://localhost:5000/api/bias/analyze', {
```

Replace with:
```javascript
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const response = await axios.post(`${apiUrl}/api/bias/analyze`, {
```

---

## GitHub Actions CI/CD

The included `.github/workflows/verify.yml` will:
- ✅ Run on every push to `main`
- ✅ Verify backend dependencies install
- ✅ Verify frontend builds successfully
- ✅ If build fails, GitHub shows the error (prevents broken deploys)

**No secrets needed for this workflow!**

---

## Manual Deployment (If Needed)

### Deploy Backend Manually
```bash
cd backend
# Build/test locally first
npm install
npm run dev  # Test it works

# Then push to GitHub
git add .
git commit -m "Production ready"
git push origin main
# Railway will auto-deploy
```

### Deploy Frontend Manually
```bash
cd frontend
# Build locally first
npm install
npm run build

# Then push to GitHub
git add .
git commit -m "Production ready"
git push origin main
# Vercel will auto-deploy
```

---

## Testing Deployed Version

After deployment:

1. **Test Backend**
   ```bash
   curl https://your-railway-url.com/api/health
   # Should return: { "status": "Backend is running!" }
   ```

2. **Test Frontend**
   - Visit your Vercel URL
   - Try analyzing some text
   - Verify it connects to deployed backend

---

## Troubleshooting Deployments

### "Build failed on Railway"
- Check: Backend `.env` has `GEMINI_API_KEY`
- Check: No syntax errors in `server.js`
- Solution: Fix locally, test with `npm run dev`, push again

### "404 on Frontend"
- Check: `VITE_API_URL` environment variable is set correctly
- Check: Backend is actually deployed and running
- Solution: Open browser console (F12) to see actual API errors

### "CORS errors"
- Ensure backend `CORS` origin includes your Vercel domain
- Edit `backend/server.js`:
  ```javascript
  app.use(cors({
    origin: [
      'http://localhost:5173',
      'https://your-vercel-domain.vercel.app'
    ]
  }));
  ```

---

## Speed Up Deployments

### Railway Tips
- Deployments take 1-2 minutes
- Check logs in Railway dashboard
- Auto-redeploy on every push to `main`

### Vercel Tips
- Deployments take 30-60 seconds
- Creates preview deployments for pull requests
- Automatic rollback if build fails

---

## Production Checklist

Before final submission:

- [ ] Backend deployed on Railway with `GEMINI_API_KEY` set
- [ ] Frontend deployed on Vercel with `VITE_API_URL` set
- [ ] GitHub Actions workflow passing (green checkmark)
- [ ] Frontend connects to backend successfully
- [ ] Bias analysis works end-to-end
- [ ] Live URLs tested and working
- [ ] Demo video uses deployed URLs (optional but impressive)
- [ ] Update README with deployed URLs

---

## URLs for Submission

After deployment, provide these to judges:

```
Frontend (Live): https://your-project.vercel.app
Backend (API): https://your-backend.up.railway.app
GitHub: https://github.com/your-username/bias-audit-platform
Demo Video: https://youtube.com/watch?v=xxxxx
```

---

**That's it! Your app is deployed and auto-updating on every push!** 🎉
