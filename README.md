# AccessWise

AccessWise is an inclusive service audit web application built for essential digital services such as scholarship portals, healthcare booking flows, job applications, civic service websites, and education platforms. It reviews service copy and workflow instructions for accessibility, clarity, documentation burden, language inclusion, and first-time-user friction before launch.

## Why this project stands out

- It is positioned as an `inclusive service copilot`, not a generic accessibility checker.
- It focuses on real high-impact flows where exclusion has consequences.
- It gives a clear launch decision: `Ready with improvements`, `Needs inclusive redesign`, or `Block before launch`.
- It explains who may be blocked and what to rewrite.
- It stores audit history and portfolio-level stats for repeated review patterns.
- It works locally with a deterministic rules engine and does not require an external AI key.

## Core features

- Multi-track audit flow for `scholarship`, `healthcare`, `jobs`, `civic`, and `education`.
- Actionable findings for deadline pressure, accessibility support, plain language, documentation burden, language inclusion, and dignity/tone.
- Stakeholder impact analysis for service users, trust/compliance, and operations/support.
- Action plan and audit checklist for human review.
- Searchable saved audit history.
- Aggregate stats endpoint for blocked launches, redesign cases, average risk, and top issue categories.
- Export reports as JSON or Markdown.
- Backend-served inclusion guidance rendered in the UI.

## Product workflow

1. Choose a service track.
2. Paste the portal copy or service instructions.
3. Run the inclusive audit.
4. Review the launch decision and flagged barriers.
5. Export the report or revise the draft.
6. Use saved history and stats to identify recurring exclusion patterns.

## Tech stack

### Frontend

- React 18
- Vite
- Axios
- Framer Motion
- React Icons

### Backend

- Node.js
- Express
- File-backed local history store
- Rule-based inclusive service audit engine

## API

### `POST /api/bias/analyze`

Request:

```json
{
  "text": "Only top students with perfect English and personal laptops should apply.",
  "contentType": "scholarship",
  "audience": "Students and first-time applicants",
  "intent": "Inclusive service audit before launch"
}
```

### `GET /api/bias/history`

Returns saved audit records.

### `GET /api/bias/stats`

Returns aggregate audit metrics.

### `GET /api/bias/education`

Returns inclusion guidance cards used by the frontend.

### `GET /api/health`

Returns service health and allowed origin.

## Local development

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

The frontend uses `VITE_API_URL` when provided and falls back to `http://localhost:5000`.

## Verification

### Backend syntax checks

```bash
node --check backend/server.js
node --check backend/controllers/biasController.js
node --check backend/utils/analysisEngine.js
node --check backend/utils/historyStore.js
```

### Frontend production build

```bash
cd frontend
npm run build
```

## Deployment

See `DEPLOYMENT_GUIDE.md` for Railway + Vercel setup.

Live backend:
- `https://accesswise-production.up.railway.app`

Live frontend:
- `https://accesswise-frontend-shraddha-2332s-projects.vercel.app`

## Current limitations

- The audits are powered by deterministic rules, so nuanced cases still benefit from human review.
- History is stored locally in the backend data store, not a shared database.
- Authentication and team-level permissions are not implemented yet.

## Future Implementations

- Persona-based audit modes for users with low vision, low bandwidth, or translation needs.
- Shared database-backed history and team workspaces.
- File ingestion for PDF or form-template review flows.
- Visual before/after redesign suggestions for key service screens.
