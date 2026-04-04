# AccessWise Quick Start

## What this project is

AccessWise is an inclusive service audit web application for essential digital services. It helps teams review scholarship portals, healthcare booking flows, job applications, civic services, and education platforms before launch.

## Project structure

```text
bias-audit-platform/
|-- backend/
|-- frontend/
|-- README.md
|-- PROJECT_REPORT.md
|-- DEMO_SCRIPT.md
|-- DEPLOYMENT_GUIDE.md
```

## Run locally

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

### Open in browser

```text
http://localhost:5173
```

## Quick test

Choose `Scholarship portal` and run the sample audit, or paste:

```text
Only top students with perfect English and personal laptops should apply. Upload every certificate in one session before midnight or your request will be rejected automatically. Do not contact support for exceptions.
```

Expected result:
- high risk
- block-before-launch decision
- clear findings across language, accessibility, documentation, and deadline pressure

## Build check

```bash
cd frontend
npm run build
```

## Deployment

Use:
- Vercel for `frontend/`
- Railway for `backend/`

See `DEPLOYMENT_GUIDE.md` for full instructions.
