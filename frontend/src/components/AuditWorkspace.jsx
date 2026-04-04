import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { FiArrowRight, FiClock, FiCopy, FiFileText, FiRefreshCcw, FiSearch, FiShield } from 'react-icons/fi';
import { FindingsPanel } from './FindingsPanel';
import { ToastContainer, useToast } from './Toast';

const samples = {
  scholarship:
    'Only top students with perfect English and personal laptops should apply. Upload every certificate in one session before midnight or your request will be rejected automatically. Do not contact support for exceptions.',
  healthcare:
    'Patients must complete the appointment request online without assistance. Normal users should finish this form quickly, and elderly people are expected to arrange their own help if they cannot understand the medical terms.',
  jobs:
    'Applicants must submit the form in one sitting, keep a stable high-speed connection, and provide a polished background plus clean accent for virtual screening. Incomplete submissions will not be considered.',
  civic:
    'Residents must read the full policy notice in English before applying. People without smartphones or digital payment access are responsible for finding alternatives themselves.',
  education:
    'Beginners and slow learners may struggle with this portal. Students should already know the process, attach all documents perfectly, and avoid asking for repeated clarification.',
};

const sampleScenarios = [
  {
    id: 'scholarship-rush',
    track: 'scholarship',
    title: 'Scholarship deadline trap',
    summary: 'One-session upload flow with language and device assumptions.',
  },
  {
    id: 'hospital-support',
    track: 'healthcare',
    title: 'Hospital self-service barrier',
    summary: 'Patient booking flow that assumes independent navigation and medical literacy.',
  },
  {
    id: 'job-bandwidth',
    track: 'jobs',
    title: 'Job portal bandwidth filter',
    summary: 'Application process that screens for connection quality and accent norms.',
  },
  {
    id: 'civic-language',
    track: 'civic',
    title: 'Civic notice exclusion',
    summary: 'Public-service flow with English-only and smartphone-dependent access.',
  },
];

const trackHighlights = {
  scholarship: {
    label: 'High-risk barriers',
    items: ['deadline pressure', 'document overload', 'language gatekeeping'],
  },
  healthcare: {
    label: 'High-risk barriers',
    items: ['medical jargon', 'no support path', 'stressful tone'],
  },
  jobs: {
    label: 'High-risk barriers',
    items: ['bandwidth assumptions', 'accent bias', 'one-sitting forms'],
  },
  civic: {
    label: 'High-risk barriers',
    items: ['English-only notices', 'device dependency', 'payment access'],
  },
  education: {
    label: 'High-risk barriers',
    items: ['shame framing', 'unclear process', 'repeat-help stigma'],
  },
};

export function AuditWorkspace({ history, stats, onSaved, apiUrl }) {
  const [contentType, setContentType] = useState('scholarship');
  const [audience, setAudience] = useState('Students, applicants, citizens, and first-time digital users');
  const [intent, setIntent] = useState('Inclusive service audit before launch');
  const [text, setText] = useState(samples.scholarship);
  const [historyFilter, setHistoryFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState(null);
  const [result, setResult] = useState(null);
  const { toasts, addToast, removeToast } = useToast();
  const activeTrack = trackHighlights[contentType];

  const filteredHistory = useMemo(() => {
    const query = historyFilter.trim().toLowerCase();
    if (!query) return history;
    return history.filter((item) => {
      const haystack = `${item.contentType} ${item.intent} ${item.audience} ${item.textPreview}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [history, historyFilter]);

  const summaryMetrics = useMemo(() => {
    if (!result) return null;
    return [
      { label: 'Service decision', value: result.releaseDecision },
      { label: 'Risk score', value: String(result.overallRiskScore) },
      { label: 'Findings', value: String(result.findings.length) },
      { label: 'Analyzer', value: result.meta.analyzer },
    ];
  }, [result]);

  const runAudit = async () => {
    if (!text.trim()) {
      addToast('Add service copy before running the audit.', 'warning');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/bias/analyze`, {
        text,
        contentType,
        audience,
        intent,
      });
      setResult(response.data.data);
      setRecord(response.data.record);
      onSaved?.(response.data.record);
      addToast('Audit complete. You now have a launch decision and remediation plan.', 'success');
    } catch (error) {
      addToast(error.response?.data?.error || 'Audit failed. Check the backend.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const exportJson = () => {
    if (!record || !result) return;
    const blob = new Blob([JSON.stringify({ record, result }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `accesswise-audit-${record.id}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const exportMarkdown = () => {
    if (!record || !result) return;
    const markdown = [
      `# AccessWise Inclusive Service Audit Report`,
      ``,
      `- Service decision: ${result.releaseDecision}`,
      `- Risk score: ${result.overallRiskScore}`,
      `- Service track: ${record.contentType}`,
      `- Audience: ${record.audience}`,
      `- Intent: ${record.intent}`,
      ``,
      `## Executive summary`,
      result.executiveSummary,
      ``,
      `## Action plan`,
      ...result.actionPlan.map((item) => `- ${item}`),
      ``,
      `## Findings`,
      ...(result.findings.length
        ? result.findings.map(
            (item) =>
              `- ${item.category} (${item.severity}): "${item.trigger}" -> ${item.recommendedText}`
          )
        : ['- No major findings']),
      ``,
      `## Suggested revision`,
      result.rewrittenDraft,
    ].join('\n');

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `accesswise-audit-${record.id}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <section className="workspace">
        <div className="panel hero-panel">
          <div className="hero-copy">
            <p className="kicker">Essential service workflow</p>
            <h2>Audit critical digital services before people get blocked out.</h2>
            <p>
              AccessWise reviews portal language and service instructions for accessibility, clarity,
              documentation burden, and first-time-user friction before launch.
            </p>
          </div>
          <div className="hero-badges">
            <span><FiShield /> Inclusive gate</span>
            <span><FiFileText /> Fix guidance</span>
            <span><FiClock /> Audit trail</span>
          </div>
        </div>

        <div className="track-banner panel">
          <div>
            <p className="kicker">Active track lens</p>
            <h3>{contentType.charAt(0).toUpperCase() + contentType.slice(1)} service review</h3>
          </div>
          <div className="track-pills">
            {activeTrack.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        {stats ? (
          <div className="panel compact-panel">
            <div className="metric-grid compact">
              <div className="metric-card">
                <span>Total audits</span>
                <strong>{stats.reviews}</strong>
              </div>
              <div className="metric-card">
                <span>Block launch</span>
                <strong>{stats.blocked}</strong>
              </div>
              <div className="metric-card">
                <span>Needs redesign</span>
                <strong>{stats.needsReview}</strong>
              </div>
              <div className="metric-card">
                <span>Average risk</span>
                <strong>{stats.averageRiskScore}</strong>
              </div>
            </div>
          </div>
        ) : null}

        <div className="panel">
          <div className="scenario-header">
            <div>
              <p className="kicker">Sample scenario gallery</p>
              <h3>Launch a realistic audit in one click</h3>
            </div>
            <p className="scenario-note">Useful for fast demos, judge walkthroughs, and comparing service tracks.</p>
          </div>

          <div className="scenario-grid">
            {sampleScenarios.map((scenario) => (
              <button
                type="button"
                key={scenario.id}
                className={`scenario-card ${contentType === scenario.track ? 'scenario-card-active' : ''}`}
                onClick={() => {
                  setContentType(scenario.track);
                  setText(samples[scenario.track]);
                  setResult(null);
                  setRecord(null);
                }}
              >
                <span>{scenario.track}</span>
                <strong>{scenario.title}</strong>
                <p>{scenario.summary}</p>
              </button>
            ))}
          </div>

          <div className="form-grid">
            <label>
              <span>Service track</span>
              <select
                value={contentType}
                onChange={(event) => {
                  const next = event.target.value;
                  setContentType(next);
                  setText(samples[next]);
                }}
              >
                <option value="scholarship">Scholarship portal</option>
                <option value="healthcare">Healthcare booking</option>
                <option value="jobs">Job application</option>
                <option value="civic">Civic service</option>
                <option value="education">Education portal</option>
              </select>
            </label>
            <label>
              <span>Audience</span>
              <input value={audience} onChange={(event) => setAudience(event.target.value)} />
            </label>
            <label>
              <span>Audit intent</span>
              <input value={intent} onChange={(event) => setIntent(event.target.value)} />
            </label>
          </div>

          <label className="editor">
            <span>Portal copy or service flow under audit</span>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Paste instructions, notices, form guidance, or onboarding text."
            />
          </label>

          <div className="microcopy-grid">
            <article className="microcopy-card">
              <span>{activeTrack.label}</span>
              <strong>What this track usually gets wrong</strong>
              <p>{activeTrack.items.join(', ')}.</p>
            </article>
            <article className="microcopy-card">
              <span>Best demo move</span>
              <strong>Show one realistic failure mode</strong>
              <p>Use a stressful instruction block, then let AccessWise explain who gets excluded and why.</p>
            </article>
          </div>

          <div className="actions">
            <div className="inline-actions">
              <button type="button" className="ghost-button" onClick={() => setText(samples[contentType])}>
                <FiFileText />
                Load sample
              </button>
              <button
                type="button"
                className="ghost-button"
                onClick={async () => {
                  try {
                    const clipboard = await navigator.clipboard.readText();
                    setText(clipboard);
                    addToast('Clipboard pasted into the editor.', 'success');
                  } catch {
                    addToast('Clipboard access failed.', 'error');
                  }
                }}
              >
                <FiCopy />
                Paste
              </button>
              <button
                type="button"
                className="ghost-button"
                onClick={() => {
                  setText('');
                  setResult(null);
                  setRecord(null);
                }}
              >
                <FiRefreshCcw />
                Reset
              </button>
            </div>
            <button type="button" className="primary-button" onClick={runAudit} disabled={loading}>
              {loading ? 'Auditing...' : 'Run inclusive audit'}
              <FiArrowRight />
            </button>
          </div>
        </div>

        {result ? (
          <FindingsPanel
            result={result}
            record={record}
            originalText={text}
            onExport={exportJson}
            onExportMarkdown={exportMarkdown}
            metrics={summaryMetrics}
          />
        ) : null}
      </section>

      <aside className="rail">
        <div className="panel">
          <div className="rail-header">
            <p className="kicker">Recent audits</p>
            <label className="search-field">
              <FiSearch />
              <input
                value={historyFilter}
                onChange={(event) => setHistoryFilter(event.target.value)}
                placeholder="Search audits"
              />
            </label>
          </div>
          <div className="history-list">
            {filteredHistory.length === 0 ? (
              <div className="history-card empty">Run an audit to start building an inclusion trail.</div>
            ) : (
              filteredHistory.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className="history-card"
                  onClick={() => {
                    setContentType(item.contentType || 'scholarship');
                    setAudience(item.audience || '');
                    setIntent(item.intent || '');
                    setText(item.originalText || '');
                    setRecord(item);
                    setResult(item.result);
                  }}
                >
                  <div className="history-header">
                    <span>{item.contentType}</span>
                    <strong>{item.result?.overallRiskScore ?? 0}</strong>
                  </div>
                  <p>{item.textPreview}...</p>
                </button>
              ))
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
