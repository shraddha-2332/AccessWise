# Deployment Guide

## Architecture

- `frontend/` is a Vite React application.
- `backend/` is an Express API.
- The platform works without external AI keys using the built-in rule engine.
- `GEMINI_API_KEY` is optional and only improves rewrite suggestions.

## Environment Variables

### Backend

- `PORT=5000`
- `FRONTEND_URL=https://your-frontend-domain.vercel.app`
- `GEMINI_API_KEY=your_key_here` optional

### Frontend

- `VITE_API_URL=https://your-backend-domain.up.railway.app`

## Local Run

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the API at `VITE_API_URL` and falls back to `http://localhost:5000`.

## Deploy Backend on Railway

1. Create a new Railway project from the GitHub repository.
2. Set the root directory to `backend` if Railway asks.
3. Add `FRONTEND_URL` and optionally `GEMINI_API_KEY`.
4. Confirm the health endpoint responds at `/api/health`.

Expected health response:

```json
{
  "status": "Language audit API is running",
  "aiEnhancementEnabled": false,
  "allowedOrigin": "http://localhost:5173"
}
```

## Deploy Frontend on Vercel

1. Import the same repository into Vercel.
2. Set the root directory to `frontend`.
3. Add `VITE_API_URL` pointing to the Railway backend.
4. Build command: `npm run build`
5. Output directory: `dist`

## CI Verification

The workflow at `.github/workflows/deploy.yml` installs dependencies and builds the frontend on every push to `main`.

## Production Checklist

- Frontend can load `/api/health` from the deployed backend.
- Running an audit returns a report from `/api/bias/analyze`.
- History loads from `/api/bias/history`.
- `FRONTEND_URL` matches the deployed frontend domain.
- If `GEMINI_API_KEY` is omitted, the product still works with rule-based analysis.

## Troubleshooting

### Frontend cannot reach backend

- Verify `VITE_API_URL` is correct.
- Verify the backend allows your deployed frontend via `FRONTEND_URL`.
- Open the browser network tab and confirm requests go to `/api/bias/analyze`.

### CORS errors

- Set `FRONTEND_URL` to the exact deployed frontend origin.
- Redeploy the backend after changing environment variables.

### No AI enhancement

- This is expected when `GEMINI_API_KEY` is missing.
- Core analysis still works because the rules engine is local.
