# AccessWise Hackathon Submission - Project Report

## Problem Statement

**The Challenge:**
Essential digital services such as scholarship portals, healthcare booking systems, job application websites, civic service portals, and education platforms often exclude users through confusing instructions, high-pressure deadlines, document-heavy flows, language barriers, and inaccessible assumptions.

**Real-World Impact:**
- Students lose scholarship opportunities because instructions are dense or document requirements are unclear.
- Patients struggle to complete appointment requests when service text assumes digital confidence or medical literacy.
- Job applicants are filtered out by language, bandwidth, or device assumptions rather than merit.
- Citizens face friction in public-service portals due to rigid, English-only, or smartphone-dependent workflows.

**SDG Alignment:**
- SDG 4: Quality Education
- SDG 10: Reduced Inequalities
- SDG 16: Peace, Justice and Strong Institutions

---

## Solution: AccessWise

**What It Does:**
AccessWise is an inclusive service audit web application that:
1. Reviews service copy and workflow instructions before launch
2. Detects barriers across accessibility support, plain language, documentation burden, language inclusion, deadline pressure, and dignity/tone
3. Gives a launch decision with actionable remediation guidance
4. Helps teams redesign essential digital services for real users, especially first-time and underserved users

**How It Works:**
1. A user selects a service track such as scholarship, healthcare, jobs, civic, or education
2. The user pastes portal instructions, notices, or form copy
3. The backend runs a structured inclusive-service audit using a deterministic rules engine
4. The system returns:
   - Risk score
   - Launch decision
   - Detailed findings
   - Stakeholder impacts
   - Action plan
   - Suggested inclusive rewrite
5. The frontend visualizes the results in an interactive audit dashboard

---

## Key Features

### 1. Multi-Track Essential Service Audit
- Scholarship portal review
- Healthcare booking review
- Job application review
- Civic service review
- Education portal review

### 2. Interactive Audit Dashboard
- Service decision summary
- Risk score metrics
- Findings cards with severity and explanation
- Stakeholder impact panels
- Action plan and audit checklist

### 3. Actionable Inclusion Guidance
- Exact trigger phrases highlighted
- Why each issue matters explained in plain language
- Safer rewrite recommendations
- Copy/export support for reports

### 4. Audit History and Portfolio Signals
- Searchable saved audits
- Aggregate stats for repeated barrier categories
- Repeatable review workflow for teams

### 5. Exportable Reports
- JSON export
- Markdown export
- Submission and review-friendly output

---

## Technology Stack

### Frontend
- **React 18** for UI
- **Vite** for fast development and build
- **CSS/Tailwind pipeline** for styling support
- **Framer Motion** available for motion patterns
- **React Icons** for interface clarity
- **Axios** for API calls

### Backend
- **Node.js + Express** for REST API
- **Rule-based audit engine** for deterministic analysis
- **Local JSON history store** for saved audit trails
- **CORS** for frontend integration

### Why This Stack?
- Fast to build during a hackathon
- Strong frontend polish potential
- No dependency on external paid AI APIs
- Easy deployment to Vercel + Railway
- Good foundation for future AI or ML extensions

---

## AI / Intelligence Layer Used

### Current implementation
AccessWise currently uses a deterministic inclusive-service audit engine that simulates decision support for essential digital services. It identifies risky patterns and produces structured, explainable audit outputs.

### Why this is still strong for the hackathon
- The system is transparent and explainable
- Results are consistent and demo-safe
- It avoids API dependency risk during judging
- The architecture is ready for future AI expansion

### Future AI extension
The next version can integrate an LLM to:
- generate natural-language audit summaries
- create persona-based explanations
- suggest before/after service-copy rewrites
- answer reviewer questions about flagged barriers

---

## Business / Impact Model

### Target Users
- Universities and scholarship administrators
- Hospitals and healthcare service teams
- Job and internship portal teams
- Government and civic digital-service teams
- NGOs and education platforms

### Value Proposition
AccessWise helps teams identify exclusion before launch instead of after user complaints, drop-off, or reputational damage.

### Revenue Models (Future)
1. SaaS subscription for institutions
2. Audit API for service platforms
3. Enterprise compliance and accessibility reporting
4. Sector-specific versions for education, healthcare, and public services

### Competitive Advantage
- Focused on essential services, not generic content scanning
- Human-centered and impact-oriented
- Explains who gets blocked, not just what is wrong
- Strong frontend storytelling for audits and remediation

---

## Development Timeline

### Week 1
- Existing project audit and architecture review
- Product repositioning toward inclusive service auditing
- Backend audit-engine redesign
- Frontend experience rewrite

### Week 2
- Documentation alignment
- Deployment alignment
- UI refinement
- Demo and submission preparation

### Actual Build Strategy
- Built as a practical MVP by iterating on an existing full-stack foundation
- Refocused into a clearer, more unique, more judge-friendly product

---

## Submission Deliverables

### 1. GitHub Repository
```text
https://github.com/shraddha-2332/accesswise
```

### 2. Project Documentation
- Project report
- Deployment guide
- README
- Demo script

### 3. Deployed Application
- Frontend on Vercel
- Backend on Railway
- Live URLs to be updated after final rename/alignment

### 4. Demo Video (3-5 minutes)
- Show homepage and value proposition
- Run an audit on a scholarship or civic service flow
- Explain the launch decision
- Walk through findings, stakeholder impacts, and rewrite guidance

---

## Future Scope

### Phase 2
- Persona-based audit modes for low-vision users, low-bandwidth users, older adults, and multilingual users
- Shared database for history
- Team workspaces and reviewer collaboration
- Upload support for PDF notices and forms

### Phase 3
- LLM-generated explanations and summaries
- Visual service-flow redesign suggestions
- WCAG-style scoring extensions
- Integration with CMS and design systems

---

## Why AccessWise Can Win This Hackathon

| Judging Criteria | Why We Win |
|-----------------|-----------|
| **Innovation** | Reframes accessibility into an inclusive service audit for essential platforms |
| **Frontend Quality** | Interactive audit dashboard with polished, product-like UX |
| **AI/Intelligence Thinking** | Clear explainability, strong structured reasoning, future-ready AI layer |
| **Real Problem** | Exclusion in digital services affects education, healthcare, jobs, and public access |
| **Social Impact** | Strong inclusion and public-good framing |
| **Uniqueness** | More original than generic chatbots, study apps, or resume tools |
| **Practicality** | Easy for judges to understand and easy to demo convincingly |
| **Code Quality** | Clean full-stack structure and deployable architecture |

---

## Competitive Landscape

### Existing solutions
- Generic accessibility scanners
- WCAG compliance checkers
- Website QA tools

### Why AccessWise is different
- Focuses on essential digital service flows
- Includes plain-language, dignity, language, and document-burden analysis
- Designed for non-experts and public-serving teams
- Pitches inclusion through task completion and service access, not only compliance

---

## Contact & Questions

**Team**: Shraddha Ukirade  
**GitHub**: `shraddha-2332`  

---

**Built for Frontend Development using AI 2026 Hackathon**
**Promoting accessible, inclusive, real-world digital services**
