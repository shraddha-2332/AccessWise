import React, { useEffect, useState } from 'react';
import { AuditWorkspace } from './components/AuditWorkspace';
import { KnowledgeRail } from './components/KnowledgeRail';
import './index.css';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [education, setEducation] = useState(null);
  const [health, setHealth] = useState('Connecting to inclusive audit engine');

  useEffect(() => {
    const boot = async () => {
      try {
        const [healthResponse, historyResponse, statsResponse, educationResponse] = await Promise.all([
          fetch(`${apiUrl}/api/health`),
          fetch(`${apiUrl}/api/bias/history`),
          fetch(`${apiUrl}/api/bias/stats`),
          fetch(`${apiUrl}/api/bias/education`),
        ]);

        if (healthResponse.ok) {
          const payload = await healthResponse.json();
          setHealth(payload.status);
        }

        if (historyResponse.ok) {
          const payload = await historyResponse.json();
          setHistory(payload.history || []);
        }

        if (statsResponse.ok) {
          const payload = await statsResponse.json();
          setStats(payload);
        }

        if (educationResponse.ok) {
          const payload = await educationResponse.json();
          setEducation(payload);
        }
      } catch {
        setHealth('Backend unavailable');
      }
    };

    boot();
  }, []);

  const handleNewRecord = (record) => {
    setHistory((current) => {
      const next = [record, ...current.filter((item) => item.id !== record.id)].slice(0, 8);
      const reviews = next.length;
      const blocked = next.filter((entry) => entry.result?.releaseDecision === 'Block before launch').length;
      const needsReview = next.filter((entry) => entry.result?.releaseDecision === 'Needs inclusive redesign').length;
      const ready = next.filter((entry) => entry.result?.releaseDecision === 'Ready with improvements').length;
      const averageRiskScore =
        reviews === 0
          ? 0
          : Math.round(next.reduce((sum, entry) => sum + (entry.result?.overallRiskScore || 0), 0) / reviews);

      const categoryCounts = {};
      next.forEach((entry) => {
        (entry.result?.findings || []).forEach((finding) => {
          categoryCounts[finding.category] = (categoryCounts[finding.category] || 0) + 1;
        });
      });

      setStats({
        reviews,
        blocked,
        needsReview,
        ready,
        averageRiskScore,
        topCategories: Object.entries(categoryCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([category, count]) => ({ category, count })),
      });

      return next;
    });
  };

  return (
    <div className="shell">
      <div className="bg-orb bg-orb-left" />
      <div className="bg-orb bg-orb-right" />

      <header className="topbar">
        <div>
          <p className="kicker">Trust Intelligence Platform</p>
          <h1>AccessWise</h1>
          <p className="subtitle">
            A web application that audits essential digital services for accessibility, clarity,
            documentation burden, and first-time-user friction before launch.
          </p>
        </div>
        <div className="status-chip">{health}</div>
      </header>

      <section className="showcase">
        <article className="showcase-panel showcase-story">
          <p className="kicker">Why it matters</p>
          <h2>Critical services should not fail people at the instruction layer.</h2>
          <p>
            AccessWise helps teams catch exclusion before launch by reviewing the exact copy, notices,
            and workflow guidance that shape whether someone can finish a service successfully.
          </p>
        </article>

        <article className="showcase-panel">
          <p className="kicker">Built for</p>
          <div className="tag-cloud">
            <span>Scholarship portals</span>
            <span>Hospital bookings</span>
            <span>Job applications</span>
            <span>Civic services</span>
            <span>Education platforms</span>
          </div>
        </article>

        <article className="showcase-panel">
          <p className="kicker">What judges see fast</p>
          <div className="signal-list">
            <div>
              <strong>Real problem</strong>
              <p>Digital exclusion in essential services</p>
            </div>
            <div>
              <strong>Clear workflow</strong>
              <p>Audit, explain, prioritize, improve</p>
            </div>
            <div>
              <strong>Product potential</strong>
              <p>Works across public and high-stakes platforms</p>
            </div>
          </div>
        </article>
      </section>

      <main className="layout">
        <AuditWorkspace history={history} stats={stats} onSaved={handleNewRecord} apiUrl={apiUrl} />
        <KnowledgeRail education={education} stats={stats} />
      </main>
    </div>
  );
}

export default App;
