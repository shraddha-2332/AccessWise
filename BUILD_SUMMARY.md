# AccessWise Build Summary

**Date**: April 4, 2026  
**Status**: Complete and deployment-ready  
**Hackathon**: Frontend Development using AI 2026

## What was built

AccessWise is a full-stack web application for auditing essential digital services before launch. It focuses on inclusion barriers in scholarship portals, healthcare booking flows, job applications, civic services, and education platforms.

## Core capabilities

- Inclusive service audit by sector
- Launch decision: `Ready with improvements`, `Needs inclusive redesign`, or `Block before launch`
- Findings for deadline pressure, accessibility support, plain language, documentation burden, language inclusion, and dignity/tone
- Stakeholder impacts and action plan
- Suggested inclusive rewrite
- Searchable history and aggregate stats
- Exportable audit reports

## Product direction

This project was intentionally repositioned away from a generic bias-checking concept into a stronger and more unique hackathon product:

- from `content bias detector`
- to `inclusive service audit copilot`

That shift makes the project more professional, more socially relevant, and easier to defend as a real product.

## Key implementation areas

### Frontend

- [frontend/src/App.jsx](c:/AI%20Trust%20Intelligence%20Platform/bias-audit-platform/frontend/src/App.jsx)
- [frontend/src/components/AuditWorkspace.jsx](c:/AI%20Trust Intelligence Platform/bias-audit-platform/frontend/src/components/AuditWorkspace.jsx)
- [frontend/src/components/FindingsPanel.jsx](c:/AI%20Trust Intelligence Platform/bias-audit-platform/frontend/src/components/FindingsPanel.jsx)
- [frontend/src/components/KnowledgeRail.jsx](c:/AI%20Trust Intelligence Platform/bias-audit-platform/frontend/src/components/KnowledgeRail.jsx)
- [frontend/src/index.css](c:/AI%20Trust Intelligence Platform/bias-audit-platform/frontend/src/index.css)

### Backend

- [backend/server.js](c:/AI%20Trust Intelligence Platform/bias-audit-platform/backend/server.js)
- [backend/controllers/biasController.js](c:/AI%20Trust Intelligence Platform/bias-audit-platform/backend/controllers/biasController.js)
- [backend/utils/analysisEngine.js](c:/AI%20Trust Intelligence Platform/bias-audit-platform/backend/utils/analysisEngine.js)
- [backend/utils/historyStore.js](c:/AI%20Trust Intelligence Platform/bias-audit-platform/backend/utils/historyStore.js)

### Submission materials

- [README.md](c:/AI%20Trust Intelligence Platform/bias-audit-platform/README.md)
- [PROJECT_REPORT.md](c:/AI%20Trust Intelligence Platform/bias-audit-platform/PROJECT_REPORT.md)
- [DEMO_SCRIPT.md](c:/AI%20Trust Intelligence Platform/bias-audit-platform/DEMO_SCRIPT.md)
- [QUICKSTART.md](c:/AI%20Trust Intelligence Platform/bias-audit-platform/QUICKSTART.md)
- [DEPLOYMENT_GUIDE.md](c:/AI%20Trust Intelligence Platform/bias-audit-platform/DEPLOYMENT_GUIDE.md)

## Verification

- Backend syntax checks passed
- Frontend production build passed
- History store path bug fixed
- Stray generated `backend/backend/` folder removed

## Recommended external naming

- Product: `AccessWise`
- GitHub repo: `accesswise`
- Vercel project: `accesswise-frontend`
- Railway project: `accesswise-api`

## Next best improvements

- Add persona-based audit views
- Add richer visual severity storytelling
- Add branded screenshots and final demo assets
- Rename GitHub, Vercel, and Railway projects to match the new brand
