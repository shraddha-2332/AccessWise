import React from 'react';
import { FiAlertTriangle, FiCheckCircle, FiCopy, FiDownload, FiUsers } from 'react-icons/fi';

export function FindingsPanel({ result, metrics, originalText, onExport, onExportMarkdown }) {
  const findings = Array.isArray(result?.findings) ? result.findings : [];
  const stakeholderImpacts = Array.isArray(result?.stakeholderImpacts) ? result.stakeholderImpacts : [];
  const personaSimulations = Array.isArray(result?.personaSimulations) ? result.personaSimulations : [];
  const actionPlan = Array.isArray(result?.actionPlan) ? result.actionPlan : [];
  const reviewChecklist = Array.isArray(result?.reviewChecklist) ? result.reviewChecklist : [];
  const safeMetrics = Array.isArray(metrics) ? metrics : [];
  const releaseDecision = result?.releaseDecision || 'Audit complete';
  const executiveSummary = result?.executiveSummary || 'The audit finished, but some result details were unavailable.';
  const rewrittenDraft = result?.rewrittenDraft || originalText || 'No rewritten draft available yet.';

  const decisionClass = {
    'Block before launch': 'decision-block',
    'Needs inclusive redesign': 'decision-redesign',
    'Ready with improvements': 'decision-ready',
  }[releaseDecision] || 'decision-neutral';

  const categoryCounts = findings.reduce((accumulator, item) => {
    const key = item.category || 'General risk';
    accumulator[key] = (accumulator[key] || 0) + 1;
    return accumulator;
  }, {});

  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([category]) => category);

  const headlineReason =
    findings.length === 0
      ? 'No major barriers detected in the current rule set.'
      : topCategories.length === 1
        ? `Primary risk detected: ${topCategories[0]}.`
        : `Primary risks detected: ${topCategories.join(' and ')}.`;

  const engineNote =
    'Explainable MVP engine: AccessWise uses deterministic audit rules for consistent launch decisions and demo-safe review flows.';

  return (
    <section className="results">
      <div className={`panel decision-panel ${decisionClass}`}>
        <div className="results-top">
          <div>
            <p className="kicker">Launch decision</p>
            <div className="decision-heading">
              <h3>{releaseDecision}</h3>
              <span className="decision-pill">{releaseDecision}</span>
            </div>
            <p className="results-summary">{executiveSummary}</p>
          </div>
          <div className="inline-actions">
            <button type="button" className="ghost-button" onClick={async () => navigator.clipboard.writeText(rewrittenDraft)}>
              <FiCopy />
              Copy rewrite
            </button>
            <button type="button" className="ghost-button" onClick={onExportMarkdown}>
              <FiDownload />
              Export markdown
            </button>
            <button type="button" className="ghost-button" onClick={onExport}>
              <FiDownload />
              Export json
            </button>
          </div>
        </div>

        <div className="verdict-strip">
          <div className="verdict-card">
            <span>Top reason for verdict</span>
            <strong>{headlineReason}</strong>
          </div>
          <div className="verdict-card verdict-card-subtle">
            <span>Engine note</span>
            <strong>{engineNote}</strong>
          </div>
        </div>

        <div className="metric-grid">
          {safeMetrics.map((metric) => (
            <div key={metric.label} className="metric-card">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>

        {result.playbook ? (
          <div className="playbook-card">
            <p className="kicker">Active playbook</p>
            <h4>{result.playbook.title}</h4>
            <p>{result.playbook.guidance}</p>
          </div>
        ) : null}
      </div>

      <div className="results-grid">
        <div className="panel">
          <div className="section-title">
            <FiAlertTriangle />
            <h4>Issues found</h4>
          </div>
          <div className="finding-list">
            {findings.length === 0 ? (
              <div className="finding-card success">
                <strong>No major findings</strong>
                <p>The service copy is in good shape based on the current rule set.</p>
              </div>
            ) : (
              findings.map((item) => (
                <article key={item.id} className={`finding-card severity-${item.severity}`}>
                  <div className="finding-head">
                    <span>{item.category}</span>
                    <strong>{item.severity}</strong>
                  </div>
                  <h5>{item.title}</h5>
                  <p><strong>Trigger:</strong> "{item.trigger}"</p>
                  <p><strong>Why it matters:</strong> {item.whyItMatters}</p>
                  <p><strong>Stakeholder impact:</strong> {item.stakeholderImpact}</p>
                  <p><strong>Recommended fix:</strong> {item.recommendedText}</p>
                </article>
              ))
            )}
          </div>
        </div>

        <div className="stack">
          <div className="panel">
            <div className="section-title">
              <FiUsers />
              <h4>Who is affected</h4>
            </div>
            <div className="impact-list">
              {stakeholderImpacts.length === 0 ? (
                <div className="impact-card">
                  <p>Stakeholder impact details are not available for this audit response yet.</p>
                </div>
              ) : stakeholderImpacts.map((item) => (
                <div key={item.stakeholder} className="impact-card">
                  <div className="finding-head">
                    <span>{item.stakeholder}</span>
                    <strong>{item.level}</strong>
                  </div>
                  <p>{item.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="section-title">
              <FiUsers />
              <h4>Persona simulation</h4>
            </div>
            <div className="impact-list">
              {personaSimulations.length === 0 ? (
                <div className="impact-card persona-card">
                  <p>Persona simulation is not available for this audit response yet.</p>
                </div>
              ) : personaSimulations.map((item) => (
                <div key={item.persona} className="impact-card persona-card">
                  <div className="finding-head">
                    <span>{item.persona}</span>
                    <strong>{item.riskLevel}</strong>
                  </div>
                  <p><strong>Likely friction:</strong> {item.friction}</p>
                  <p><strong>What to improve:</strong> {item.recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="section-title">
              <FiCheckCircle />
              <h4>What to do next</h4>
            </div>
            <ul className="plain-list">
              {actionPlan.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h5 className="subheading">Audit checklist</h5>
            <ul className="plain-list">
              {reviewChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="results-grid">
        <div className="panel">
          <p className="kicker">Original service copy</p>
          <pre className="text-block">{originalText}</pre>
        </div>
        <div className="panel">
          <p className="kicker">Suggested improved version</p>
          <pre className="text-block">{rewrittenDraft}</pre>
        </div>
      </div>
    </section>
  );
}
